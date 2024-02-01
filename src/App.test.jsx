import React from 'react';
import { when } from 'jest-when';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { formatMessage, shallow } from '@edx/react-unit-test-utils';

import AssessmentView from 'views/AssessmentView';
import SubmissionView from 'views/SubmissionView';
import XBlockView from 'views/XBlockView';
import XBlockStudioView from 'views/XBlockStudioView';
import GradeView from 'views/GradeView';

import PageRoute from 'components/PageRoute';

import { useHandleModalCloseEvent } from 'hooks/modal';

import messages from './messages';
import routes from './routes';

import App from './App';

jest.mock('react-router-dom', () => ({
  Routes: 'Routes',
  Route: 'Route',
}));

jest.mock('@edx/frontend-platform/react', () => ({
  AuthenticatedPageRoute: 'AuthenticatedPageRoute',
  ErrorPage: 'ErrorPage',
}));
jest.mock('views/AssessmentView', () => 'AssessmentView');
jest.mock('views/SubmissionView', () => 'SubmissionView');
jest.mock('views/XBlockView', () => 'XBlockView');
jest.mock('views/XBlockStudioView', () => 'XBlockStudioView');
jest.mock('views/GradeView', () => 'GradeView');
jest.mock('components/PageRoute', () => 'PageRoute');

jest.mock('hooks/modal', () => ({
  useHandleModalCloseEvent: jest.fn(),
}));

const handleModalClose = jest.fn();
when(useHandleModalCloseEvent).calledWith().mockReturnValue(handleModalClose);
const addEventListener = jest.fn();
const removeEventListener = jest.fn();

let el;
describe('App component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, 'addEventListener').mockImplementation(addEventListener);
    jest.spyOn(window, 'removeEventListener').mockImplementation(removeEventListener);
    el = shallow(<App />);
  });
  describe('behavior', () => {
    it('initializes i18n and refresh event from hooks', () => {
      expect(useIntl).toHaveBeenCalled();
      expect(useHandleModalCloseEvent).toHaveBeenCalled();
    });
    it('adds handler for modal close event that refreshes page data', () => {
      expect(React.useEffect.mock.calls.length).toEqual(1);
      const [[effect, prereqs]] = React.useEffect.mock.calls;
      expect(prereqs).toEqual([handleModalClose]);
      const out = effect();
      expect(addEventListener).toHaveBeenCalledWith('message', handleModalClose);
      out();
      expect(removeEventListener).toHaveBeenCalledWith('message', handleModalClose);
    });
  });
  describe('render', () => {
    test('snapshot', () => {
      expect(el.snapshot).toMatchSnapshot();
    });
    const testComponent = (toTest, { route, Component, isModal }) => {
      expect(toTest.type).toEqual(Route);
      expect(toTest.props.path).toEqual(route);
      const { element } = toTest.props;
      expect(toTest.props.element.type).toEqual(PageRoute);
      if (isModal) {
        expect(toTest.props.element.props.isModal).toEqual(true);
      }
      const expectedElement = shallow(<PageRoute><Component /></PageRoute>);
      expect(shallow(element)).toMatchObject(expectedElement);
    };
    const testAssessmentRoute = (toTest, { route }) => {
      testComponent(toTest, { route, Component: AssessmentView, isModal: true });
    };
    test('route order', () => {
      const renderedRoutes = el.instance.findByType(Routes)[0].children;
      testComponent(renderedRoutes[0], { route: routes.xblock, Component: XBlockView });
      testComponent(renderedRoutes[1], { route: routes.xblockStudio, Component: XBlockStudioView });
      testComponent(renderedRoutes[2], { route: routes.xblockPreview, Component: XBlockView });
      testAssessmentRoute(renderedRoutes[3], { route: routes.peerAssessment });
      testAssessmentRoute(renderedRoutes[4], { route: routes.selfAssessment });
      testAssessmentRoute(renderedRoutes[5], { route: routes.studentTraining });
      testComponent(renderedRoutes[6], {
        route: routes.submission,
        Component: SubmissionView,
        isModal: true,
      });
      testComponent(renderedRoutes[7], {
        route: routes.graded,
        Component: GradeView,
        isModal: true,
      });
      expect(renderedRoutes[8].matches(shallow(
        <Route
          key="error"
          path={routes.root}
          element={<ErrorPage message={formatMessage(messages.error404Message)} />}
        />,
      )));
    });
  });
});
