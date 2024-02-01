import React from 'react';
import PropTypes from 'prop-types';
import { AuthenticatedPageRoute } from '@edx/frontend-platform/react';

import { SkeletonTheme } from '@edx/paragon';

import ModalContainer from 'components/ModalContainer';
import AppContainer from 'components/AppContainer';

export const skeletonTheme = {
  baseColor: '#888',
  highlightColor: '#444',
};

const PageRoute = ({ children, isModal }) => (
  <AuthenticatedPageRoute>
    <AppContainer>
      <SkeletonTheme {...skeletonTheme}>
        { isModal ? <ModalContainer>{children}</ModalContainer> : children }
      </SkeletonTheme>
    </AppContainer>
  </AuthenticatedPageRoute>
);
PageRoute.defaultProps = {
  isModal: false,
};
PageRoute.propTypes = {
  isModal: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default PageRoute;
