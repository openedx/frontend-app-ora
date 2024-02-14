import { shallow } from '@edx/react-unit-test-utils';

import {
  useAssessmentStepOrder,
  useGlobalState,
  useHasReceivedFinalGrade,
  useIsPageDataLoaded,
} from 'hooks/app';
import { stepNames } from 'constants/index';
import { useViewStep } from 'hooks/routing';
import { isXblockStep } from 'utils';

import ProgressBar from './index';

jest.mock('hooks/app', () => ({
  useAssessmentStepOrder: jest.fn(),
  useGlobalState: jest.fn(),
  useHasReceivedFinalGrade: jest.fn(),
  useIsPageDataLoaded: jest.fn(),
}));
jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('utils', () => ({
  isXblockStep: jest.fn(),
}));
jest.mock('./ProgressStep', () => 'ProgressStep');

describe('<ProgressBar />', () => {
  const props = {
    className: 'test-class',
  };

  beforeEach(() => {
    useIsPageDataLoaded.mockReturnValue(true);
    useHasReceivedFinalGrade.mockReturnValue(false);
    useGlobalState.mockReturnValue({ activeStepName: stepNames.submission });
    useAssessmentStepOrder.mockReturnValue([]);
    useViewStep.mockReturnValue(stepNames.submission);
    isXblockStep.mockReturnValue(false);
  });

  it('renders null when page data is not loaded', () => {
    useIsPageDataLoaded.mockReturnValueOnce(false);
    const wrapper = shallow(<ProgressBar {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('renders at least 2 steps: submission and done', () => {
    const wrapper = shallow(<ProgressBar {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('ProgressStep')).toHaveLength(2);
  });

  it('renders all steps', () => {
    isXblockStep.mockReturnValueOnce(true);
    useAssessmentStepOrder.mockReturnValueOnce([
      stepNames.studentTraining,
      stepNames.self,
      stepNames.peer,
    ]);
    const wrapper = shallow(<ProgressBar {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('ProgressStep')).toHaveLength(5);
  });
});
