import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import RubricFeedback from './RubricFeedback';
import messages from './messages';

describe('<RubricFeedback />', () => {
  const props = {
    overallFeedbackPrompt: 'overallFeedbackPrompt',
    overallFeedback: 'overallFeedback',
    overallFeedbackDisabled: false,
    overallFeedbackIsInvalid: false,
    onOverallFeedbackChange: jest.fn().mockName('onOverallFeedbackChange'),
  };

  describe('renders', () => {
    test('overall feedback is enabled', () => {
      const wrapper = shallow(<RubricFeedback {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Form.Control.Feedback').length).toBe(0);
      expect(wrapper.instance.findByType('Form.Control')[0].props.disabled).toBe(false);
      expect(wrapper.instance.findByType('Form.Control')[0].props.floatingLabel).toBe(messages.addComments.defaultMessage);
    });

    test('overall feedback is disabled', () => {
      const wrapper = shallow(<RubricFeedback {...props} overallFeedbackDisabled />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Form.Control.Feedback').length).toBe(0);
      expect(wrapper.instance.findByType('Form.Control')[0].props.disabled).toBe(true);
      expect(wrapper.instance.findByType('Form.Control')[0].props.floatingLabel).toBe(messages.comments.defaultMessage);
    });

    test('overall feedback is invalid', () => {
      const wrapper = shallow(<RubricFeedback {...props} overallFeedbackIsInvalid />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Form.Control.Feedback').length).toBe(1);
    });
  });
});
