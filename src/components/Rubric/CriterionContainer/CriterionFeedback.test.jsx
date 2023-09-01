import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';
import { feedbackRequirement } from 'data/services/lms/constants';

import CriterionFeedback from './CriterionFeedback';

describe('<CriterionFeedback />', () => {
  const props = {
    criterion: {
      feedbackValue: 'feedback-1',
      feedbackIsInvalid: false,
      feedbackOnChange: jest.fn().mockName('feedbackOnChange'),
      feedbackEnabled: true,
      feedbackRequired: feedbackRequirement.required,
    },
  };
  describe('renders', () => {
    test('feedbackEnabled', () => {
      const wrapper = shallow(<CriterionFeedback {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
    });

    test('feedbackDisabled render empty', () => {
      const wrapper = shallow(
        <CriterionFeedback
          {...props}
          criterion={{ ...props.criterion, feedbackEnabled: false }}
        />,
      );
      expect(wrapper.snapshot).toMatchSnapshot();
      expect(wrapper.isEmptyRender()).toBe(true);
    });

    test('feedbackRequired disabled render empty', () => {
      const wrapper = shallow(
        <CriterionFeedback
          {...props}
          criterion={{
            ...props.criterion,
            feedbackRequired: feedbackRequirement.disabled,
          }}
        />,
      );
      expect(wrapper.snapshot).toMatchSnapshot();
      expect(wrapper.isEmptyRender()).toBe(true);
    });

    test('feedbackRequired: optional', () => {
      const wrapper = shallow(
        <CriterionFeedback
          {...props}
          criterion={{
            ...props.criterion,
            feedbackRequired: feedbackRequirement.optional,
          }}
        />,
      );
      expect(wrapper.snapshot).toMatchSnapshot();
      expect(wrapper.instance.findByType('Form.Control')[0].props.floatingLabel).toContain('Optional');
    });

    test('feedbackIsInvalid', () => {
      const wrapper = shallow(
        <CriterionFeedback
          {...props}
          criterion={{ ...props.criterion, feedbackIsInvalid: true }}
        />,
      );
      expect(wrapper.snapshot).toMatchSnapshot();
      expect(wrapper.instance.findByType('Form.Control.Feedback')[0].props.type).toBe('invalid');
    });
  });
});
