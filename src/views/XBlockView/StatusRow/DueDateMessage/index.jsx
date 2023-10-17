import React from 'react';

import useDueDateMessage from './useDueDateMessage';

const DueDateMessage = () => {
  const dueDateMessage = useDueDateMessage();
  return (
    <div className="d-inline pl-1">{dueDateMessage}</div>
  );
};

export default DueDateMessage;
