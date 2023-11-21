import * as zip from '@zip.js/zip.js';
import FileSaver from 'file-saver';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform';
import { useMutation } from '@tanstack/react-query';

import { queryKeys } from 'constants';

import * as api from 'data/services/lms/api';
import { useTestDataPath } from 'hooks/test';

import fakeData from '../../fakeData';
import { UploadedFile } from '../../types';

import { useCreateMutationAction } from './utils';

export const fakeProgress = async (requestConfig) => {
  for (let i = 0; i <= 50; i++) {
    // eslint-disable-next-line no-await-in-loop, no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 100));
    requestConfig.onUploadProgress({ loaded: i, total: 50 });
  }
};

export const DownloadException = (errors: string[]) => ({
  errors,
  name: 'DownloadException',
});

export const FetchSubmissionFilesException = () => ({
  name: 'FetchSubmissionFilesException',
});

/**
 * Generate a manifest file content based on files object
 */
export const genManifest = (files: UploadedFile[]) =>
  files
    .map(
      (file, i) =>
        `Filename: ${i}-${file.fileName}\nDescription: ${file.fileDescription}\nSize: ${file.fileSize}`
    )
    .join('\n\n');

/**
 * Zip the blob output of a set of files with a manifest file.
 */
export const zipFiles = async (
  files: UploadedFile[],
  blobs: Blob[],
  zipFileName: string
) => {
  const zipWriter = new zip.ZipWriter(new zip.BlobWriter('application/zip'));
  await zipWriter.add('manifest.txt', new zip.TextReader(genManifest(files)));

  // forEach or map will create additional thread. It is less readable if we create more
  // promise or async function just to circumvent that.
  for (let i = 0; i < blobs.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await zipWriter.add(
      `${i}-${files[i].fileName}`,
      new zip.BlobReader(blobs[i]),
      {
        bufferedWrite: true,
      }
    );
  }

  const zipFile = await zipWriter.close();
  const zipName = `${zipFileName}.zip`;
  FileSaver.saveAs(zipFile, zipName);
};

/**
 * Download a file and return its blob is successful, or null if not.
 */
export const downloadFile = (file: UploadedFile) =>
  fetch(file.fileUrl).then((response) => {
    if (!response.ok) {
      // This is necessary because some of the error such as 404 does not throw.
      // Due to that inconsistency, I have decide to share catch statement like this.
      throw new Error(response.statusText);
    }
    return response.blob();
  });

/**
 * Download blobs given file objects.  Returns a promise map.
 */
export const downloadBlobs = async (files: UploadedFile[]) => {
  const blobs: Blob[] = [];
  const errors: string[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    try {
      // eslint-disable-next-line no-await-in-loop
      blobs.push(await downloadFile(file));
    } catch (error) {
      errors.push(file.fileName);
    }
  }
  if (errors.length) {
    throw DownloadException(errors);
  }
  return { blobs, files };
};

export const useUploadFiles = () => {
  const testDataPath = useTestDataPath();
  const addFile = api.useAddFile();
  const apiFn = (data) => {
    const { fileData, description } = data;
    const file = fileData.getAll('file')[0];
    return addFile(file, description);
  };
  const mockFn = (data, description) => {
    const { fileData, requestConfig } = data;
    return fakeProgress(requestConfig);
  };
  return useMutation({
    mutationFn: testDataPath ? mockFn : apiFn,
  });
};

export const useDeleteFile = () => {
  const testDataPath = useTestDataPath();
  const deleteFile = api.useDeleteFile();
  const apiFn = (index) => {
    console.log({ deleteFile: index });
    return deleteFile(index);
  };
  const mockFn = (data) => Promise.resolve(data);
  return useMutation({
    mutationFn: testDataPath ? mockFn : apiFn,
  });
};

export const useDownloadFiles = () =>
  useCreateMutationAction(
    async ({
      files,
      zipFileName,
    }: {
      files: UploadedFile[];
      zipFileName: string;
    }) => {
      const { blobs } = await downloadBlobs(files);
      return zipFiles(files, blobs, zipFileName);
    }
  );
