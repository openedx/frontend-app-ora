import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Col, Row } from '@edx/paragon';

import { useShowTrainingError } from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';

import Assessment from 'components/Assessment';
import Instructions from 'components/Instructions';
import ModalActions from 'components/ModalActions';
import StatusAlert from 'components/StatusAlert';
import StepProgressIndicator from 'components/StepProgressIndicator';

import messages from '../messages';

const BaseAssessmentView = ({
  children,
}) => {
  const showTrainingError = useShowTrainingError();
  const { formatMessage } = useIntl();
  const step = useViewStep();
  return (
    <div className="assessment-content-layout mr-auto ml-auto">
      <div className="content-wrapper">
        <StatusAlert showTrainingError={showTrainingError} />
        <Row className="flex-nowrap m-0 position-relative">
          <h1>{formatMessage(messages[step])}</h1>
          <StepProgressIndicator step={step} />
        </Row>
        <Row className="flex-nowrap m-0">
          <Col className="p-0">
            <Instructions />
            {children}
            <ModalActions showTrainingError={showTrainingError} />
          </Col>
          <Assessment />
        </Row>
      </div>
    </div>
  );
};
BaseAssessmentView.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseAssessmentView;
