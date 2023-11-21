import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
// import { queryKeys } from './constants';
import * as types from './types';
import * as urls from './urls';

export const useSubmitAssessment = () => {
  const url = urls.useSubmitAssessmentUrl();
  const client = getAuthenticatedHttpClient();
  return (data: types.AssessmentData) => {
    console.log({ submitAssessment: data });
    return client.post(url, data);
  };
};

export const useSubmitResponse = () => {
  const url = urls.useSubmitUrl();
  const client = getAuthenticatedHttpClient();
  return (data: types.ResponseData) => {
    console.log({ submitResponse: data });
    return client.post(url, { submission: data });
  };
};

export const useSaveDraft = () => {
  const url = urls.useSaveDraftUrl();
  const client = getAuthenticatedHttpClient();
  return (data: string[]) => client.post(url, { response: data });
};

export const useAddFile = () => {
  const url = urls.useAddFileUrl();
  const client = getAuthenticatedHttpClient();
  const responseUrl = urls.useUploadResponseUrl();
  const encode = (str) => encodeURIComponent(str)
    // Note that although RFC3986 reserves "!", RFC5987 does not,
    // so we do not need to escape it
    .replace(/['()]/g, escape) // i.e., %27 %28 %29
    .replace(/\*/g, '%2A')
    // The following are not required for percent-encoding per RFC5987,
    // so we can allow for a little better readability over the wire: |`^
    .replace(/%(?:7C|60|5E)/g, unescape);
  return (data: { name: string, size: number, type: string }, description: string) => {
    const file = {
      fileDescription: description,
      fileName: data.name,
      fileSize: data.size,
      contentType: data.type,
    };
    console.log({ upload: { data, description, file, url } });
    return client.post(url, file)
      .then(response => {
        console.log({ uploadResponse: response });
        return fetch(
          `${getConfig().LMS_BASE_URL}${response.data.fileUrl}`,
          {
            method: 'PUT',
            body: data,
            headers: { 'Content-Disposition': `attachment; filename*=UTF-8''${encode(data.name)}` },
          },
        ).then(response2 => {
          console.log({ uploadResponseResponse: response2 });
          return client.post(
            responseUrl,
            { fileIndex: response.data.fileIndex, success: true },
          );
        });
      });
    };
};

export const useDeleteFile = () => {
  const url = urls.useDeleteFileUrl();
  const client = getAuthenticatedHttpClient();
  return (fileIndex: number) => client.post(url, { fileIndex });
};

export const deleteFile = (fileIndex: number) => {
  console.log({ deleteFile: fileIndex });
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('deleted file');
      resolve(null);
    }, 1000);
  });
};
