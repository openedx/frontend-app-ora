import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
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

export const encode = (str) => encodeURIComponent(str)
  // Note that although RFC3986 reserves "!", RFC5987 does not,
  // so we do not need to escape it
  .replace(/['()]/g, escape) // i.e., %27 %28 %29
  .replace(/\*/g, '%2A')
  // The following are not required for percent-encoding per RFC5987,
  // so we can allow for a little better readability over the wire: |`^
  .replace(/%(?:7C|60|5E)/g, unescape);

export const uploadKeys = {
  contentDisposition: 'Content-Disposition',
  attachmentPrefix: 'attachment; filename*=UTF-8\'\'',
};
export const fileHeader = (name) => ({
  [uploadKeys.contentDisposition]: `${uploadKeys.attachmentPrefix}${encode(name)}`,
});
export const uploadFile = (data, fileUrl) => fetch(
  fileUrl,
  {
    method: 'PUT',
    body: data,
    headers: fileHeader(data.name),
  },
);

export const useAddFile = () => {
  const url = urls.useAddFileUrl();
  const client = getAuthenticatedHttpClient();
  const responseUrl = urls.useUploadResponseUrl();
  return (data: File, description: string) => {
    const file = {
      fileDescription: description,
      fileName: data.name,
      fileSize: data.size,
      contentType: data.type,
    };

    return client.post(url, file).then(response => {
      const { fileIndex, fileUrl } = response.data;
      return uploadFile(data, fileUrl)
        .then(() => client.post(responseUrl, { fileIndex, success: true }))
        .then((uploadResponse) => ({ ...file, fileIndex, fileUrl: uploadResponse.data.downloadUrl }));
    });
  };
};

export const useDeleteFile = () => {
  const url = urls.useDeleteFileUrl();
  const client = getAuthenticatedHttpClient();
  return (fileIndex: number) => client.post(url, { fileIndex });
};
