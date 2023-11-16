import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { queryKeys } from './constants';
import { AssessmentData } from './types';
import * as urls from './urls';

export const submitAssessment = (data: AssessmentData) => {
  // TODO: submit rubric
  console.log({ submitAssessment: data });
  let resolvePromise;
  const promise = new Promise((resolve) => {
    resolvePromise = resolve;
  });
  setTimeout(() => {
    console.log('assessment submitted');
    resolvePromise(data);
    console.log("Should have resolved");
  }, 1000);
  return promise;
};

export const submitResponse = (data: any) => {
  console.log({ submitResponse: data });
  let resolvePromise;
  const promise = new Promise((resolve) => {
    resolvePromise = resolve;
  });
  setTimeout(() => {
    console.log('response submitted');
    resolvePromise(null);
    console.log("Should have resolved");
  }, 1000);
  return promise;
};

export const useSaveDraft = () => {
  const url = urls.useSaveDraftUrl();
  return (data: any) => {
    console.log({ save: data });
    return getAuthenticatedHttpClient().post(url, { response: data });
  };
};

export const fakeProgress = async (requestConfig) => {
  for (let i = 0; i <= 50; i++) {
    // eslint-disable-next-line no-await-in-loop, no-promise-executor-return
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    requestConfig.onUploadProgress({ loaded: i, total: 50 });
  }
};

export const uploadFiles = (data: any) => {
  const { fileData, requestConfig } = data;
  console.log({ uploadFiles: { fileData, requestConfig } });
  // TODO: upload files
  /*
  * const files = fileData.getAll('file');
   * const addFileResponse = await post(`{xblock_id}/handler/file/add`, file);
   * const uploadResponse = await(post(response.fileUrl, file));
   * post(`${xblock_id}/handler/download_url', (response));
   */
  return fakeProgress(data.requestConfig).then(() => {
    Promise.resolve();
  });
};

export const deleteFile = (fileIndex) => {
  console.log({ deleteFile: fileIndex });
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('deleted file');
      resolve(null);
    }, 1000);
  });
};
