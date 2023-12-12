/* eslint-disable camelcase */
import { StrictDict } from '@edx/react-unit-test-utils';

import { progressKeys } from 'constants/mockData';

const files = [
  {
    file_name: 'test.png',
    file_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png',
    file_description: 'test description',
  },
  {
    file_name: 'test.txt',
    file_url: 'https://raw.githubusercontent.com/openedx/edx-ora2/master/README.rst',
    file_description: 'test description',
  },
  {
    file_name: 'test.pdf',
    file_url: 'https://raw.githubusercontent.com/py-pdf/sample-files/main/004-pdflatex-4-pages/pdflatex-4-pages.pdf',
    file_description: 'test description',
  },
  {
    file_name: 'error.pdf',
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    file_description: 'failed to load',
  },
];

export const fileUrls = files.map(({ file_url }) => file_url);

const users = ['user1', 'user2', 'user3', 'user4'];

/// Submission
export const createFiles = (numFiles, { isTeam = false } = {}) => Array.from(Array(numFiles)).map(
  (_, i) => ({
    ...files[i],
    file_size: 100,
    file_index: i,
    uploaded_by: isTeam ? users[0] : users[numFiles % i],
  }),
);

export const createResponse = ({
  text_responses = null,
  uploaded_files = null,
  team_uploaded_files = null,
} = {}) => ({
  text_responses,
  uploaded_files,
  team_uploaded_files,
});

export const states = StrictDict({
  individual: {
    empty: createResponse({
      text_responses: ['', ''],
      uploaded_files: [],
    }),
    filled: createResponse({
      text_responses: ['Response 1', 'Response 2'],
      uploaded_files: createFiles(2),
    }),
    cancelled: null,
  },
  team: {
    empty: createResponse({
      text_responses: ['', ''],
      uploaded_files: [],
      team_uploaded_files: [],
    }),
    filled: createResponse({
      text_responses: ['Example Data Response 1', 'Example Data Response 2'],
      uploaded_files: createFiles(2),
      team_uploaded_files: createFiles(3, { isTeam: true }),
    }),
  },
});

export const getResponseState = ({ progressKey, isTeam }) => {
  if ([
    progressKeys.cancelledDuringSubmission,
    progressKeys.cancelledDuringStudentTraining,
    progressKeys.cancelledDuringSubmission,
    progressKeys.cancelledDuringStudentTraining,
    progressKeys.cancelledDuringSelf,
    progressKeys.cancelledDuringPeer,
    progressKeys.cancelledDuringStaff,
    progressKeys.submissionEarly,
    progressKeys.submissionClosed,
    progressKeys.submissionTeamAlreadySubmitted,
    progressKeys.submissionNeedTeam,
  ].includes(progressKey)) {
    return null;
  } // no submission info for these views

  if (!isTeam) {
    return progressKey === progressKeys.submissionUnsaved
      ? states.individual.empty
      : states.individual.filled;
  }
  return progressKey === progressKeys.submissionUnsaved
    ? states.team.empty
    : states.team.filled;
};

export default StrictDict({
  getResponseState,
});
