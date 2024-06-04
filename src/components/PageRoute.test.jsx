import React from 'react';

import { shallow } from '@edx/react-unit-test-utils';
import { AuthenticatedPageRoute } from '@edx/frontend-platform/react';
import { SkeletonTheme } from '@openedx/paragon';

import AppContainer from 'components/AppContainer';
import ModalContainer from 'components/ModalContainer';
import PageRoute, { skeletonTheme } from './PageRoute';

jest.mock('react-router-dom', () => ({ Route: 'Route' }));
jest.mock('@edx/frontend-platform/react', () => ({
  AuthenticatedPageRoute: 'AuthenticatedPageRoute',
}));
jest.mock('components/AppContainer', () => 'AppContainer');
jest.mock('components/ModalContainer', () => 'ModalContainer');

const props = {
  route: 'test-route',
  children: <b>test children</b>,
};
describe('PageRoute component', () => {
  test('modal snapshot', () => {
    const el = shallow(<PageRoute {...props} isModal />);
    expect(el.snapshot).toMatchSnapshot();
    const expectedElement = shallow(
      <AuthenticatedPageRoute>
        <AppContainer>
          <SkeletonTheme {...skeletonTheme}>
            <ModalContainer>
              {props.children}
            </ModalContainer>
          </SkeletonTheme>
        </AppContainer>
      </AuthenticatedPageRoute>,
    );
    expect(el.instance.matches(expectedElement)).toEqual(true);
  });
  test('non-modal snapshot', () => {
    const el = shallow(<PageRoute {...props} />);
    expect(el.snapshot).toMatchSnapshot();
    const expectedElement = shallow(
      <AuthenticatedPageRoute>
        <AppContainer>
          <SkeletonTheme {...skeletonTheme}>
            {props.children}
          </SkeletonTheme>
        </AppContainer>
      </AuthenticatedPageRoute>,
    );
    expect(el.instance.matches(expectedElement)).toEqual(true);
  });
});
