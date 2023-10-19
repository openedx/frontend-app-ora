import React from 'react';

import { Button } from '@edx/paragon';
import { useIsORAConfigLoaded } from 'data/services/lms/hooks/selectors';

import StatusAlert from 'components/StatusAlert';
import BaseAssessmentView from 'components/BaseAssessmentView';
import AssessmentContent from './Content';

export const SelfAssessmentView = () => {
  if (!useIsORAConfigLoaded()) {
    return null;
  }
  return (
    <BaseAssessmentView
      actions={[
        <Button variant="secondary" key="cancel">Cancel</Button>,
        <Button key="submit">Submit</Button>,
      ]}
      submitAssessment={() => {}}
    >
      <StatusAlert />
      <AssessmentContent />
    </BaseAssessmentView>
  );
};

export default SelfAssessmentView;
