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
  return (data: { name: string, size: number, type: string }, description: string) => {
    const file = {
      fileDescription: description,
      fileName: data.name,
      fileSize: data.size,
      contentType: data.type,
    };
    return client.post(url, file).then(
      response => client.post(
        responseUrl,
        { fileIndex: response.data.fileIndex, success: true },
      ),
    );
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
