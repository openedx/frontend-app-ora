import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { when } from 'jest-when';

import * as api from './api';
import * as urls from './urls';

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedHttpClient: jest.fn(),
}));
jest.mock('./urls', () => ({
  useSubmitAssessmentUrl: jest.fn(),
  useSubmitUrl: jest.fn(),
  useSaveDraftUrl: jest.fn(),
  useAddFileUrl: jest.fn(),
  useUploadResponseUrl: jest.fn(),
  useDeleteFileUrl: jest.fn(),
}));

const testUrls = {
  submitAssessment: 'test-submit-assessment-url',
  submit: 'test-submit-url',
  saveDraft: 'test-save-draft-url',
  addFile: 'test-add-file-url',
  uploadResponse: 'test-upload-response-url',
  deleteFile: 'test-delete-file-url',
};
when(urls.useSubmitAssessmentUrl).calledWith().mockReturnValue(testUrls.submitAssessment);
when(urls.useSubmitUrl).calledWith().mockReturnValue(testUrls.submit);
when(urls.useSaveDraftUrl).calledWith().mockReturnValue(testUrls.saveDraft);
when(urls.useAddFileUrl).calledWith().mockReturnValue(testUrls.addFile);
when(urls.useUploadResponseUrl).calledWith().mockReturnValue(testUrls.uploadResponse);
when(urls.useDeleteFileUrl).calledWith().mockReturnValue(testUrls.deleteFile);

const authClient = { post: jest.fn((...args) => ({ post: args })) };
when(getAuthenticatedHttpClient).calledWith().mockReturnValue(authClient);

const testData = 'test-data';
global.fetch = jest.fn();

let hook;
describe('lms api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const testLoadsClient = () => {
    it('loads authenticated http client', () => {
      expect(getAuthenticatedHttpClient).toHaveBeenCalledWith();
    });
  };
  describe('useSubmitAssessment', () => {
    beforeEach(() => {
      hook = api.useSubmitAssessment();
    });
    describe('behavior', () => {
      it('loads url from hook', () => {
        expect(urls.useSubmitAssessmentUrl).toHaveBeenCalledWith();
      });
      testLoadsClient();
    });
    describe('output', () => {
      it('returns a method that posts data to submitAssessment url', () => {
        expect(hook(testData)).toEqual(
          authClient.post(testUrls.submitAssessment, testData),
        );
      });
    });
  });
  describe('useSubmitResponse', () => {
    beforeEach(() => {
      hook = api.useSubmitResponse();
    });
    describe('behavior', () => {
      it('loads url from hook', () => {
        expect(urls.useSubmitUrl).toHaveBeenCalledWith();
      });
      testLoadsClient();
    });
    describe('output', () => {
      it('returns a method that posts data as submission to submit url', () => {
        expect(hook(testData)).toEqual(
          authClient.post(testUrls.submit, { submission: testData }),
        );
      });
    });
  });
  describe('useSaveDraft', () => {
    beforeEach(() => {
      hook = api.useSaveDraft();
    });
    describe('behavior', () => {
      it('loads url from hook', () => {
        expect(urls.useSaveDraftUrl).toHaveBeenCalledWith();
      });
      testLoadsClient();
    });
    describe('output', () => {
      it('returns a method that posts data as submission to submit url', () => {
        expect(hook(testData)).toEqual(
          authClient.post(testUrls.saveDraft, { response: testData }),
        );
      });
    });
  });
  describe('encode', () => {
    it('escapes invalid characters', () => {
      const testString = '()*^`' + "'"; // eslint-disable-line no-useless-concat
      expect(api.encode(testString)).toEqual('%28%29%2A^`%27');
    });
  });
  describe('fileHeader', () => {
    it('returns object with content disposition', () => {
      const encodedName = 'encoded-name';
      const encode = jest.spyOn(api, 'encode');
      when(encode).calledWith(testData).mockReturnValue(encodedName);
      const keys = api.uploadKeys;
      expect(api.fileHeader(testData)).toEqual({
        [keys.contentDisposition]: `${keys.attachmentPrefix}${encodedName}`,
      });
    });
  });
  describe('uploadFile', () => {
    it('PUTS data to fileUrl with fileHeaders for file name', () => {
    });
  });
  describe('useAddFile', () => {
    const fileData = {
      name: 'test-name',
      size: 'test-size',
      type: 'test-type',
    };
    const description = 'test-description';
    const file = {
      fileDescription: description,
      fileName: fileData.name,
      fileSize: fileData.size,
      contentType: fileData.type,
    };
    const fileIndex = 23;
    const fileUrl = 'test-file-url';
    const downloadUrl = 'test-download-url';
    const addFileResponse = { data: { fileIndex, fileUrl } };
    const uploadFile = jest.spyOn(api, 'uploadFile');
    beforeEach(() => {
      when(authClient.post)
        .calledWith(testUrls.addFile, expect.anything())
        .mockResolvedValue(addFileResponse);
      when(authClient.post)
        .calledWith(fileUrl, expect.anything())
        .mockResolvedValue();
      when(authClient.post)
        .calledWith(testUrls.uploadResponse, expect.anything())
        .mockResolvedValue({ data: { downloadUrl } });
      when(uploadFile)
        .calledWith(fileData, fileUrl)
        .mockResolvedValue();
      hook = api.useAddFile();
    });
    describe('behavior', () => {
      it('loads url from hook', () => {
        expect(urls.useAddFileUrl).toHaveBeenCalledWith();
        expect(urls.useUploadResponseUrl).toHaveBeenCalledWith();
      });
      testLoadsClient();
    });
    describe('output', () => {
      it('returns callback that takes file and description, adds and uploads file', async () => {
        await expect(hook(fileData, description)).resolves.toStrictEqual({
          ...file,
          fileIndex,
          fileUrl: downloadUrl,
        });
      });
    });
  });
  describe('useDeleteFile', () => {
    beforeEach(() => {
      hook = api.useDeleteFile();
    });
    describe('behavior', () => {
      it('loads url from hook', () => {
        expect(urls.useDeleteFileUrl).toHaveBeenCalledWith();
      });
      testLoadsClient();
    });
    describe('output', () => {
      it('returns a method that posts data as submission to submit url', () => {
        const fileIndex = 3;
        expect(hook(fileIndex)).toEqual(
          authClient.post(testUrls.deleteFile, { fileIndex }),
        );
      });
    });
  });
});
