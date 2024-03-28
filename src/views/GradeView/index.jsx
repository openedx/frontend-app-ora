import React from 'react';

import { Layout } from '@openedx/paragon';

import ModalActions from 'components/ModalActions';

import FinalGrade from './FinalGrade';
import Content from './Content';

import './index.scss';

const GradeView = () => {
  const gradeContent = [
    <Layout.Element key="grade"><FinalGrade /></Layout.Element>,
    <Layout.Element key="content"><Content /></Layout.Element>,
  ];
  const actions = [
    <Layout.Element key="actions">
      <ModalActions />
    </Layout.Element>,
  ];
  return (
    <div className="m-0 d-flex justify-content-center">
      <div className="grade-view-body">
        <Layout
          xl={[{ span: 6, offset: 0 }, { span: 6, offset: 0 }]}
          lg={[{ span: 6, offset: 0 }, { span: 6, offset: 0 }]}
          md={[{ span: 8, offset: 0 }, { span: 4, offset: 0 }]}
          sm={[{ span: 12, offset: 0 }, { span: 12, offset: 0 }]}
          xs={[{ span: 12, offset: 0 }, { span: 12, offset: 0 }]}
        >
          {gradeContent}
        </Layout>
        <Layout
          xl={[{ span: 12, offset: 0 }]}
          lg={[{ span: 12, offset: 0 }]}
          md={[{ span: 12, offset: 0 }]}
          sm={[{ span: 12, offset: 0 }]}
          xs={[{ span: 12, offset: 0 }]}
        >
          {actions}
        </Layout>
      </div>
    </div>
  );
};
GradeView.defaultProps = {};
GradeView.propTypes = {};

export default GradeView;
