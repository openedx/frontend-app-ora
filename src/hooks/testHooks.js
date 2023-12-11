import React from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import {
  queryKeys,
  stepNames,
  stepRoutes,
} from 'constants/index';
import { progressKeys, defaultViewProgressKeys } from 'constants/mockData';

import * as reduxHooks from 'data/redux/hooks';
import { useViewStep } from './routing';

export const {
  useSetTestDataPath,
  useSetTestProgressKey,
  useTestDataPath,
  useTestDirty,
  useTestProgressKey,
} = reduxHooks;

export const useUpdateTestProgressKey = () => {
  const queryClient = useQueryClient();
  const hasSubmitted = reduxHooks.useHasSubmitted();
  const params = useParams();
  const viewStep = useViewStep();
  const testProgressKey = useTestProgressKey();
  const setTestProgressKey = useSetTestProgressKey();
  const testDataPath = useTestDataPath();
  const setTestDataPath = useSetTestDataPath();
  const testDirty = useTestDirty();

  React.useEffect(() => {
    window.useTestData = () => setTestDataPath(true);
  }, [setTestDataPath]);

  const viewKey = stepRoutes[viewStep];
  const progressKey = testProgressKey || params.progressKey || defaultViewProgressKeys[viewKey];

  React.useEffect(() => {
    if (testDataPath) {
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
    }
  }, [ // eslint-disable-line react-hooks/exhaustive-deps
    hasSubmitted,
    viewStep,
    testDataPath,
  ]);
  React.useEffect(() => {
    if (testDataPath && !testDirty) {
      console.log({ testDirty, testProgressKey });
      queryClient.invalidateQueries({ queryKey: [queryKeys.pageData] });
      console.log('invalidated');
    }
  }, [testDirty]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default {
  useTestProgressKey,
  useSetTestProgressKey,
  useTestDataPath,
  useSetTestDataPath,
};
