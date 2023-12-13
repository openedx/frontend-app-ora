import React from 'react';

import useDueDateMessage from './useDueDateMessage';

const DueDateMessage = () => {
  const dueDateMessage = useDueDateMessage();
  return (
    <div className="d-inline pl-1 py-3 small">{dueDateMessage}</div>
  );
};

export default DueDateMessage;
