import React from 'react';

import { Layout, Row } from '@edx/paragon';

import { stepNames } from 'data/services/lms/constants';

import ModalActions from 'components/ModalActions';

import FinalGrade from './FinalGrade';
import Content from './Content';

import './index.scss';
import { useActiveStepName } from 'data/services/lms/hooks/selectors';
import StatusAlert from 'components/StatusAlert';

const GradeView = () => {
  const activeStepName = useActiveStepName();
  if ( activeStepName !== stepNames.done ) return <StatusAlert step={activeStepName} />;

  return <div className="m-0 justify-content-center">
    <Layout
      lg={[{ span: 6, offset: 0 }, { span: 6, offset: 0 }]}
      md={[{ span: 8, offset: 0 }, { span: 4, offset: 0 }]}
      sm={[{ span: 12, offset: 0 }, { span: 12, offset: 0 }]}
    >
      <Layout.Element><FinalGrade /></Layout.Element>
      <Layout.Element><Content /></Layout.Element>
    </Layout>
    <Layout
      lg={[{ span: 12, offset: 0 }]}
      md={[{ span: 12, offset: 0 }]}
      sm={[{ span: 12, offset: 0 }]}
    >
      <Layout.Element>
        <ModalActions step={stepNames.done} />
      </Layout.Element>
    </Layout>
  </div>
};
GradeView.defaultProps = {};
GradeView.propTypes = {};

export default GradeView;
