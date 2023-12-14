import React from 'react';

import StatusBadge from './StatusBadge';
import DueDateMessage from './DueDateMessage';

const StatusRow = () => (
  <div className="mt-3">
    <StatusBadge />
    <DueDateMessage />
  </div>
);

export default StatusRow;
