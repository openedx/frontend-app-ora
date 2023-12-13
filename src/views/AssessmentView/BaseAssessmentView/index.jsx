import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Col, Row } from '@edx/paragon';

import { useViewStep } from 'hooks/routing';

import Assessment from 'components/Assessment';
import Instructions from 'components/Instructions';
import ModalActions from 'components/ModalActions';
import StatusAlert from 'components/StatusAlert';
import StepProgressIndicator from 'components/StepProgressIndicator';

import messages from '../messages';

import './BaseAssessmentView.scss';

const BaseAssessmentView = ({
  children,
}) => {
  const { formatMessage } = useIntl();
  const step = useViewStep();
  return (
    <div className="assessment-content-layout mr-auto ml-auto">
      <div className="content-wrapper">
        <StatusAlert />
        <Row className="flex-nowrap m-0 position-relative">
          <h1>{formatMessage(messages[step])}</h1>
          <StepProgressIndicator step={step} />
        </Row>
        <Row className="flex-nowrap m-0 content-body">
          <Col className="p-0">
            <Instructions />
            {children}
            <ModalActions />
          </Col>
          <Col className="p-0 col-3 assessment-col">
            <Assessment />
          </Col>
        </Row>
      </div>
    </div>
  );
};
BaseAssessmentView.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseAssessmentView;
