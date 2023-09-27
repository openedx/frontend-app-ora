import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import OverallFeedback from '.';
import messages from 'components/Assessment/messages';

describe('<OverallFeedback />', () => {
  const props = {
    prompt: 'props.overallFeedbackPrompt',
    feedback: 'props.overallFeedback',
    isDisabled: false,
    isInvalid: false,
    onChange: jest.fn().mockName('props.onChange'),
  };

  describe('renders', () => {
    test('overall feedback is enabled', () => {
      const wrapper = shallow(<OverallFeedback {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Form.Control.Feedback').length).toBe(0);
      expect(wrapper.instance.findByType('Form.Control')[0].props.disabled).toBe(false);
      expect(wrapper.instance.findByType('Form.Control')[0].props.floatingLabel).toBe(messages.addComments.defaultMessage);
    });

    test('overall feedback is disabled', () => {
      const wrapper = shallow(<OverallFeedback {...props} isDisabled />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Form.Control.Feedback').length).toBe(0);
      expect(wrapper.instance.findByType('Form.Control')[0].props.disabled).toBe(true);
      expect(wrapper.instance.findByType('Form.Control')[0].props.floatingLabel).toBe(messages.comments.defaultMessage);
    });

    test('overall feedback is invalid', () => {
      const wrapper = shallow(<OverallFeedback {...props} isInvalid />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Form.Control.Feedback').length).toBe(1);
    });
  });
});
