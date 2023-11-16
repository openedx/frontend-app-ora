import { useParams } from 'react-router-dom';

import { StrictDict } from '@edx/react-unit-test-utils';
import { getConfig } from '@edx/frontend-platform';

import { stepRoutes, stepNames } from 'constants';

const useBaseUrl = () => {
  const { xblockId, courseId } = useParams();
  return `${getConfig().LMS_BASE_URL}/courses/${courseId}/xblock/${xblockId}/handler`;
};

export const useSaveDraftUrl = () => {
  const baseUrl = useBaseUrl();
  return `${baseUrl}/submission/draft`;
};

export const useORAConfigUrl = () => {
  const baseUrl = useBaseUrl();
  return `${baseUrl}/get_block_info`;
};

export const useViewUrl = () => {
  const { xblockId, courseId } = useParams();
  return ({ view }) => `${getConfig().BASE_URL}/${stepRoutes[view]}/${courseId}/${xblockId}`;
};

export const usePageDataUrl = (step) => {
  const baseUrl = useBaseUrl();
  if ( [stepNames.submission, stepNames.peer].includes(step) ) {
    return `${baseUrl}/get_learner_data/${step}`;
  }
  return `${baseUrl}/get_learner_data/`;
};

export default StrictDict({
  useORAConfigUrl,
  usePageDataUrl,
});
