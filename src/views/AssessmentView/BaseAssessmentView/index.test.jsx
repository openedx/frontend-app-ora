import { shallow } from '@edx/react-unit-test-utils';

import { useViewStep } from 'hooks/routing';

import { stepNames } from 'constants/index';

import BaseAssessmentView from './index';

jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('components/Assessment', () => 'Assessment');
jest.mock('components/Instructions', () => 'Instructions');
jest.mock('components/ModalActions', () => 'ModalActions');
jest.mock('components/StatusAlert', () => 'StatusAlert');
jest.mock('components/StepProgressIndicator', () => 'StepProgressIndicator');

describe('<BaseAssessmentView />', () => {
  it('render default', () => {
    useViewStep.mockReturnValue(stepNames.self);
    const wrapper = shallow(<BaseAssessmentView>children</BaseAssessmentView>);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
