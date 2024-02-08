import { shallow } from '@edx/react-unit-test-utils';

import { useORAConfigData } from 'hooks/app';
import { stepNames } from 'constants/index';

import StudioSchedule from './index';

jest.mock('hooks/app', () => ({
  useORAConfigData: jest.fn(),
}));
jest.mock('../XBlockStudioViewProvider', () => ({
  useXBlockStudioViewContext: () => ({
    scheduleIsOpen: true,
    toggleSchedule: jest.fn().mockName('toggleSchedule'),
  }),
}));
jest.mock('./FormatDateTime', () => 'FormatDateTime');
jest.mock('./StepInfo', () => 'StepInfo');

describe('<StudioSchedule />', () => {
  it('render without assesssment steps', () => {
    useORAConfigData.mockReturnValue({
      assessmentSteps: {
        settings: {},
      },
      submissionConfig: {
        startDatetime: '2020-01-01T00:00:00Z',
        endDatetime: '2020-01-01T00:00:00Z',
      },
    });

    const wrapper = shallow(<StudioSchedule />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('StepInfo')).toHaveLength(0);
  });

  it('render with assesssment steps', () => {
    useORAConfigData.mockReturnValue({
      assessmentSteps: {
        settings: {
          [stepNames.self]: {
            abc: 'def',
          },
          [stepNames.peer]: {
            ghi: 'jkl',
          },
        },
      },
      submissionConfig: {
        startDatetime: '2020-01-01T00:00:00Z',
        endDatetime: '2020-01-01T00:00:00Z',
      },
    });

    const wrapper = shallow(<StudioSchedule />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('StepInfo')).toHaveLength(2);
  });
});
