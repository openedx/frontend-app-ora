import { useEffect, useReducer } from 'react';

import { useORAConfigData, usePageData } from 'data/services/lms/hooks/selectors';

import { submitResponse, saveResponse, uploadFiles, deleteFile } from 'data/services/lms/hooks/actions';
import { MutationStatus } from 'data/services/lms/constants';

const useAssessmentViewHooks = () => {
  const submitResponseMutation = submitResponse();
  const saveResponseMutation = saveResponse();
  const pageData = usePageData();
  const oraConfigData = useORAConfigData();

  const [submission, dispatchAssessment] = useReducer(
    (state, payload) => ({ ...state, isDirty: true, ...payload }),
    { ...pageData?.submission, isDirty: false },
  );

  useEffect(() => {
    // a workaround to update the submission state when the pageData changes
    if (pageData?.submission) {
      dispatchAssessment({ ...pageData.submission, isDirty: false });
    }
  }, [pageData?.submission]);

  const submitResponseHandler = () => {
    dispatchAssessment({ isDirty: false });
    submitResponseMutation.mutate(submission);
  };

  const saveResponseHandler = () => {
    dispatchAssessment({ isDirty: false });
    saveResponseMutation.mutate(submission);
  };

  return {
    submitResponseHandler,
    submitResponseStatus: submitResponseMutation.status,
    saveResponseHandler,
    saveResponseStatus: saveResponseMutation.status,
    pageData,
    oraConfigData,
    submission,
    dispatchAssessment,
  };
};

export default useAssessmentViewHooks;
