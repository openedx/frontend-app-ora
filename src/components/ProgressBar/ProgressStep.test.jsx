import { shallow } from '@edx/react-unit-test-utils';

import { CheckCircle, Error } from '@openedx/paragon/icons';

import { stepNames } from 'constants/index';
import { useProgressStepData } from './hooks';

import ProgressStep, { stepIcons } from './ProgressStep';

jest.mock('./hooks', () => ({
  useProgressStepData: jest.fn(),
}));

describe('<ProgressStep />', () => {
  const props = {
    step: stepNames.submission,
    canRevisit: true,
    label: 'Test Step',
  };

  const mockProgressStepData = {
    onClick: jest.fn().mockName('onClick'),
    href: 'link',
    isActive: false,
    isEnabled: true,
    isComplete: false,
    isPastDue: false,
    myGrade: null,
  };

  Object.keys(stepIcons).forEach((step) => {
    it(`renders ${step} step with correct icon`, () => {
      useProgressStepData.mockReturnValueOnce(mockProgressStepData);

      const wrapper = shallow(<ProgressStep {...props} step={step} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Icon')[0].props.src).toBe(
        stepIcons[step],
      );
    });
  });

  it('render error on past due', () => {
    useProgressStepData.mockReturnValue({
      ...mockProgressStepData,
      isPastDue: true,
    });

    const wrapper = shallow(<ProgressStep {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Icon')[0].props.src).toBe(Error);
  });

  it('render is complete but not done', () => {
    useProgressStepData.mockReturnValue({
      ...mockProgressStepData,
      isComplete: true,
    });

    const wrapper = shallow(<ProgressStep {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Icon')[0].props.src).toBe(CheckCircle);
  });

  it('render is complete and done will have sublabel', () => {
    useProgressStepData.mockReturnValue({
      ...mockProgressStepData,
      isComplete: true,
      myGrade: {
        stepScore: {
          earned: 1,
          possible: 2,
        },
      },
    });

    const wrapper = shallow(<ProgressStep {...props} step={stepNames.done} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByTestId('sublabel-test-id')[0].children[0].el).toContain('1 / 2');
  });
});
