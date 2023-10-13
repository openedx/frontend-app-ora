import { StrictDict } from '@edx/react-unit-test-utils';

import pageData from './pageData';
import {
  progressKeys,
  stepConfigs,
  teamStates,
  viewKeys,
  stateStepConfigs,
} from './constants';

export const defaultViewProgressKeys = StrictDict({
  [viewKeys.xblock]: progressKeys.submissionUnsaved,
  [viewKeys.submission]: progressKeys.submissionSaved,
  [viewKeys.studentTraining]: progressKeys.studentTraining,
  [viewKeys.self]: progressKeys.selfAssessment,
  [viewKeys.peer]: progressKeys.peerAssessment,
  [viewKeys.myGrades]: progressKeys.graded,
});

export const loadState = (opts) => {
  const {
    view,
  } = opts;
  const progressKey = opts.progressKey || defaultViewProgressKeys[view];
  const isTeam = teamStates.includes(progressKey) || (opts.isTeam === true);
  const stepConfig = stateStepConfigs[progressKey] || stepConfigs.all;

  const state = {
    progress: pageData.getProgressState({ progressKey, stepConfig }),
    submission: pageData.getSubmissionState({ progressKey, isTeam }),
    assessments: pageData.getAssessmentState({ progressKey, stepConfig }),
  };
  console.log({ opts, progressKey, state, isTeam });
  return state;
};
