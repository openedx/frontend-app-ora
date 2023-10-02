import React from 'react';

import { Button } from '@edx/paragon';
import { useIsORAConfigLoaded } from 'data/services/lms/hooks/selectors';
import BaseAssessmentView from 'components/BaseAssessmentView';
import AssessmentContent from './Content';

export const PeerAssessmentView = () => useIsORAConfigLoaded() && (
  <BaseAssessmentView
    actions={[
      <Button variant="secondary" key="cancel">Cancel</Button>,
      <Button key="submit">Submit</Button>,
    ]}
    submitAssessment={() => {}}
  >
    <AssessmentContent />
  </BaseAssessmentView>
);

export default PeerAssessmentView;
