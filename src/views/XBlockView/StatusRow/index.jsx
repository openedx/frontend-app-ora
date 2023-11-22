import React from 'react';

import StatusBadge from './StatusBadge';
import DueDateMessage from './DueDateMessage';

const StatusRow = () => (
  <div className="d-inline">
    <StatusBadge />
    <DueDateMessage />
  </div>
);

export default StatusRow;
