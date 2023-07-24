import React from 'react';

import { ActionRow, Button } from '@edx/paragon';

const SubmissionActions = () => {
  return (
    <ActionRow className="border mt-3">
      <Button variant="secondary">Secondary Action</Button>
      <Button>Primary Action</Button>
    </ActionRow>
  );
};

export default SubmissionActions;
