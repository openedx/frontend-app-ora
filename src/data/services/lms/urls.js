import React from 'react';
import { useParams } from 'react-router-dom';

import { StrictDict } from '@edx/react-unit-test-utils';
import { getConfig } from '@edx/frontend-platform';

import { stepNames, stepRoutes } from 'constants/index';

export const useBaseUrl = () => {
  const { xblockId, courseId } = useParams();
  // xblock studio
  if (window.location.pathname.match(/^\/xblock_studio\//)) {
    return `${getConfig().STUDIO_BASE_URL}/preview/xblock/${xblockId}/handler`;
  }
  return `${getConfig().LMS_BASE_URL}/courses/${courseId}/xblock/${xblockId}/handler`;
};

export const useViewUrl = () => {
  const { xblockId, courseId } = useParams();
  return ({ view }) => `${getConfig().BASE_URL}/${stepRoutes[view]}/${courseId}/${xblockId}`;
};

export const usePageDataUrl = (hasSubmitted) => {
  const baseUrl = useBaseUrl();
  const url = `${baseUrl}/get_learner_data/`;
  return React.useCallback((step) => (
    (step === stepNames.xblock || step === stepNames.xblockStudio || hasSubmitted) ? url : `${url}${step}`
  ), [hasSubmitted, url]);
};

export const paths = {
  saveDraft: '/submission/draft',
  submit: '/submission/submit',
  submitAssessment: '/assessment/submit',
  getPeer: '/assessment/get_peer',
  addFile: '/file/add',
  uploadResponse: '/file/upload_response',
  deleteFile: '/file/delete',
  oraConfig: '/get_block_info',
};
// actions

export const useORAConfigUrl = () => `${useBaseUrl()}${paths.oraConfig}`;
export const useSaveDraftUrl = () => `${useBaseUrl()}${paths.saveDraft}`;
export const useSubmitUrl = () => `${useBaseUrl()}${paths.submit}`;
export const useSubmitAssessmentUrl = () => `${useBaseUrl()}${paths.submitAssessment}`;
export const useGetPeerUrl = () => `${useBaseUrl()}${paths.getPeer}`;
export const useAddFileUrl = () => `${useBaseUrl()}${paths.addFile}`;
export const useUploadResponseUrl = () => `${useBaseUrl()}${paths.uploadResponse}`;
export const useDeleteFileUrl = () => `${useBaseUrl()}${paths.deleteFile}`;

export default StrictDict({
  useORAConfigUrl,
  usePageDataUrl,
});
