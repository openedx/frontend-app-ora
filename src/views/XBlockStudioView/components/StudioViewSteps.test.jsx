import { shallow } from '@edx/react-unit-test-utils';

import { useORAConfigData } from 'hooks/app';
import { stepNames } from 'constants/index';

import StudioViewSteps from './StudioViewSteps';

jest.mock('hooks/app', () => ({
  useORAConfigData: jest.fn(),
}));
jest.mock('./XBlockStudioViewProvider', () => ({
  useXBlockStudioViewContext: () => ({
    assessmentStepsIsOpen: true,
    toggleAssessmentSteps: jest.fn().mockName('toggleAssessmentSteps'),
  }),
}));

describe('<StudioViewSteps />', () => {
  it('render without steps', () => {
    useORAConfigData.mockReturnValue({
      assessmentSteps: {
        order: [],
      },
    });

    const wrapper = shallow(<StudioViewSteps />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('p')).toHaveLength(0);
  });

  it('render with steps', () => {
    useORAConfigData.mockReturnValue({
      assessmentSteps: {
        order: [stepNames.self, stepNames.peer],
      },
    });

    const wrapper = shallow(<StudioViewSteps />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('p')).toHaveLength(2);
  });
});
