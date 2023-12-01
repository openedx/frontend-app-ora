import * as zip from '@zip.js/zip.js';
import FileSaver from 'file-saver';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { queryKeys } from 'constants/index';
import * as api from 'data/services/lms/api';
import { PageData, UploadedFile } from '../../types';

export const DownloadException = (errors: string[]) => new Error(
  `DownloadException: ${errors.join(', ')}`
);

export const FetchSubmissionFilesException = () => ({
  name: 'FetchSubmissionFilesException',
});

/**
 * Generate a manifest file content based on files object
 */
export const manifestString = ({ fileName, fileDescription, fileSize }, index) => (
  `Filename: ${index}-${fileName}\nDescription: ${fileDescription}\nSize: ${fileSize}`
);
export const genManifest = (files: UploadedFile[]) => files.map(manifestString).join('\n\n');

/**
 * Zip the blob output of a set of files with a manifest file.
 */
export const zipSubFileName = ({ fileName }, index) => `${index}-${fileName}`;
export const zipFiles = async (
  files: UploadedFile[],
  blobs: Blob[],
  zipFileName: string,
) => {
  const zipWriter = new zip.ZipWriter(new zip.BlobWriter('application/zip'));
  await zipWriter.add('manifest.txt', new zip.TextReader(genManifest(files)));

  // forEach or map will create additional thread. It is less readable if we create more
  // promise or async function just to circumvent that.
  const promises: Promise<any>[] = [];
  for (let i = 0; i < blobs.length; i++) {
    const blob = new zip.BlobReader(blobs[i]);
    promises.push(zipWriter.add(
      zipSubFileName(files[i], i),
      blob,
      { bufferedWrite: true },
    ));
  }
  await Promise.all(promises);
  const zipFile = await zipWriter.close();
  const zipName = `${zipFileName}.zip`;
  FileSaver.saveAs(zipFile, zipName);
};

/**
 * Download a file and return its blob is successful, or null if not.
 */
export const downloadFile = (file: UploadedFile) => fetch(file.fileUrl).then((response) => {
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

  const promises: Promise<any>[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    try {
      promises.push(downloadFile(file).then(blobs.push));
    } catch (error) {
      errors.push(file.fileName);
    }
  }
  await Promise.all(promises);
  if (errors.length) {
    throw DownloadException(errors);
  }
  return { blobs, files };
};

export const transforms: ({ [k: string]: any }) = {
  loadResponse: (oldData, response) => ({ ...oldData, response }),
};
transforms.loadFiles = (oldData, uploadedFiles) => transforms.loadResponse(
  oldData,
  { ...oldData.response, uploadedFiles },
);
transforms.deleteFile = (oldData, index) => {
  const { uploadedFiles } = oldData.response;
  return uploadedFiles
    ? transforms.loadFiles(oldData, uploadedFiles.filter(f => f.fileIndex !== index))
    : oldData;
};
transforms.addFile = (oldData, addedFile) => {
  const { uploadedFiles } = oldData.response;
  return uploadedFiles
    ? transforms.loadFiles(oldData, [...uploadedFiles, addedFile])
    : oldData;
};

export const useUploadFiles = () => {
  const addFile = api.useAddFile();
  const queryClient = useQueryClient();
  const apiFn = (data) => {
    const { fileData, description } = data;
    const file = fileData.getAll('file')[0];
    return addFile(file, description).then(addedFile => {
      queryClient.setQueryData(
        [queryKeys.pageData],
        (oldData: PageData) => transforms.addFile(oldData, addedFile),
      );
    });
  };
  return useMutation({ mutationFn: apiFn });
};

export const useDeleteFile = () => {
  const deleteFile = api.useDeleteFile();
  const queryClient = useQueryClient();
  const apiFn = (index) => {
    console.log({ deleteFile: index });
    return deleteFile(index).then(() => {
      queryClient.setQueryData(
        [queryKeys.pageData],
        (oldData: PageData) => transforms.deleteFile(oldData, index),
      );
    });
  };
  return useMutation({ mutationFn: apiFn });
};

export const useDownloadFiles = () => useMutation({
  mutationFn: async ({ files, zipFileName }: { files: UploadedFile[], zipFileName: string }) => {
    const { blobs } = await downloadBlobs(files);
    return zipFiles(files, blobs, zipFileName);
  },
});
