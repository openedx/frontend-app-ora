import { shallow } from '@edx/react-unit-test-utils';

import { useExitWithoutSavingAction, useSubmitAssessmentAction } from 'hooks/actions';
import AssessmentActions from './AssessmentActions';

jest.mock('hooks/actions', () => ({
  useExitWithoutSavingAction: jest.fn(),
  useSubmitAssessmentAction: jest.fn(),
}));

jest.mock('components/ActionButton', () => 'ActionButton');
jest.mock('components/ConfirmDialog', () => 'ConfirmDialog');

describe('<AssessmentActions />', () => {
  const mockExitWithoutSavingAction = {
    action: {
      onClick: jest.fn().mockName('useExitWithoutSavingAction.onClick'),
    },
    confirmProps: {
      onConfirm: jest.fn().mockName('useExitWithoutSavingAction.onConfirm'),
    },
  };
  const mockSubmitAssessmentAction = {
    action: {
      onClick: jest.fn().mockName('useSubmitAssessmentAction.onClick'),
    },
    confirmProps: {
      onConfirm: jest.fn().mockName('useSubmitAssessmentAction.onConfirm'),
    },
  };

  beforeEach(() => {
    useExitWithoutSavingAction.mockReturnValue(mockExitWithoutSavingAction);
    useSubmitAssessmentAction.mockReturnValue(mockSubmitAssessmentAction);
  });

  it('render default', () => {
    const wrapper = shallow(<AssessmentActions />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('ActionButton')).toHaveLength(2);
    expect(wrapper.instance.findByType('ConfirmDialog')).toHaveLength(2);
  });

  it('render without submitConfirmDialog', () => {
    useSubmitAssessmentAction.mockReturnValueOnce({
      action: mockSubmitAssessmentAction.action,
      confirmProps: null,
    });
    const wrapper = shallow(<AssessmentActions />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('ActionButton')).toHaveLength(2);
    expect(wrapper.instance.findByType('ConfirmDialog')).toHaveLength(1);
  });

  it('has correct mock value', () => {
    const wrapper = shallow(<AssessmentActions />);

    const exitButton = wrapper.instance.findByType('ActionButton')[0];
    expect(exitButton.props).toMatchObject(mockExitWithoutSavingAction.action);

    const exitConfirmDialog = wrapper.instance.findByType('ConfirmDialog')[0];
    expect(exitConfirmDialog.props).toMatchObject(mockExitWithoutSavingAction.confirmProps);

    const submitButton = wrapper.instance.findByType('ActionButton')[1];
    expect(submitButton.props).toMatchObject(mockSubmitAssessmentAction.action);

    const submitConfirmDialog = wrapper.instance.findByType('ConfirmDialog')[1];
    expect(submitConfirmDialog.props).toMatchObject(mockSubmitAssessmentAction.confirmProps);
  });
});
