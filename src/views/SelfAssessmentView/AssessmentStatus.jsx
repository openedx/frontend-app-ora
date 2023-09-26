import React from 'react';
import PropTypes from 'prop-types';

import { Button, Alert, Icon } from '@edx/paragon';
import { Edit } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import StatefulStatus from 'components/StatefulStatus';
import messages from './messages';

const AssessmentStatus = ({ status, dueDate }) => {
  const { formatMessage } = useIntl();
  return (
    <StatefulStatus
      state={status}
      status={{
        default: {
          badgeText: formatMessage(messages.inProgressBadge),
          headerText: formatMessage(messages.inProgressHeader, { dueDate }),
          content: (
            <div>
              <p>
                <strong>{formatMessage(messages.instructions)}: </strong>{formatMessage(messages.inProgressText)}
              </p>

              <Button
                className='d-flex m-auto'
                variant='primary'
                onClick={() => {}}
              >
                <Icon src={Edit} />
                {formatMessage(messages.inProgressButton)}
              </Button>
            </div>
          ),
        },
        success: {
          badgeText: formatMessage(messages.completedBadge),
          headerText: formatMessage(messages.completedHeader),
          content: (
            <div className='d-flex align-items-center'>
              <div className='d-flex flex-column'>
                <Alert.Heading>{formatMessage(messages.completedBodyHeader)}</Alert.Heading>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam euismod, nisl eget ultricies aliquet, mauris quam
                  sodales
                </p>
              </div>
              <Button
                className='text-nowrap'
                variant='primary'
                onClick={() => {}}
              >
                {formatMessage(messages.completedBodyButton)}
              </Button>
            </div>
          ),
        },
        error: {
          badgeText: formatMessage(messages.errorBadge),
          headerText: formatMessage(messages.errorHeader),
          content: (
            <>
              <Alert.Heading>
                {formatMessage(messages.errorBodyHeader)}
              </Alert.Heading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod, nisl eget ultricies aliquet, mauris quam sodales
              </p>
            </>
          ),
        },
        cancelled: {
          badgeText: formatMessage(messages.cancelledBadge),
          headerText: formatMessage(messages.cancelledHeader, { dueDate }),
          content: (
            <>
              <Alert.Heading>{formatMessage(messages.cancelledBodyHeader)}</Alert.Heading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod, nisl eget ultricies aliquet, mauris quam sodales
              </p>
            </>
          ),
        },
      }}
    />
  );
};

AssessmentStatus.propTypes = {
  status: PropTypes.oneOf(['default', 'success', 'error', 'cancelled'])
    .isRequired,
  dueDate: PropTypes.string,
};

export default AssessmentStatus;
