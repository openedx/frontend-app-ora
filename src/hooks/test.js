import React from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import {
  queryKeys,
  stepNames,
  stepRoutes,
} from 'constants';
import { progressKeys, defaultViewProgressKeys } from 'constants/mockData';

import * as reduxHooks from 'data/redux/hooks';
import { useViewStep } from './routing';

export const {
  useSetTestProgressKey,
  useTestDirty,
  useTestProgressKey,
} = reduxHooks;

export const useUpdateTestProgressKey = () => {
  const queryClient = useQueryClient();
  const hasSubmitted = reduxHooks.useHasSubmitted();
  const params = useParams();
  const testProgressKey = useTestProgressKey();
  const setTestProgressKey = useSetTestProgressKey();
  const viewStep = useViewStep();
  const viewKey = stepRoutes[viewStep];
  const progressKey = testProgressKey || params.progressKey || defaultViewProgressKeys[viewKey];
  const testDirty = useTestDirty();
  React.useEffect(() => {
    console.log({ hasSubmitted, viewStep, progressKey, testDirty });
    if (!testDirty || !hasSubmitted) { return; }
    if (viewStep === stepNames.submission) {
      setTestProgressKey(progressKeys.studentTraining);
    }
    if (viewStep === stepNames.studentTraining) {
      if (progressKey === progressKeys.studentTrainingPartial) {
        setTestProgressKey(progressKeys.selfAssessment);
      } else {
        setTestProgressKey(progressKeys.studentTrainingPartial);
      }
    }
    if (viewStep === stepNames.self) {
      setTestProgressKey(progressKeys.peerAssessment);
    }
    if (viewStep === stepNames.peer) {
      if (progressKey === progressKeys.peerAssessment) {
        setTestProgressKey(progressKeys.peerAssessmentPartial);
      } else if (progressKey === progressKeys.peerAssessmentPartial) {
        setTestProgressKey(progressKeys.staffAfterPeer);
      }
    }
  }, [
    hasSubmitted,
    viewStep,
  ]);
  React.useEffect(() => {
    if (!testDirty) {
      console.log({ testDirty, testProgressKey });
      queryClient.invalidateQueries({ queryKey: [queryKeys.pageData] });
      console.log("invalidated");
    }
  }, [testDirty]);
};

export default {
  useTestProgressKey,
  useSetTestProgressKey,
};
