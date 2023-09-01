import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import RadioCriterion from './RadioCriterion';

describe('<RadioCriterion />', () => {
  const props = {
    isGrading: true,
    criterion: {
      name: 'criterion-1',
      optionsValue: 'option-1',
      optionsIsInvalid: true,
      optionsOnChange: jest.fn().mockName('optionsOnChange'),
      options: [
        {
          name: 'option-1',
          description: 'description-1',
          points: 1,
        },
        {
          name: 'option-2',
          description: 'description-2',
          points: 2,
        },
      ],
    },
  };
  describe('renders', () => {
    test('options is invalid', () => {
      const wrapper = shallow(<RadioCriterion {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Form.Radio').length).toEqual(
        props.criterion.options.length,
      );
      wrapper.instance.findByType('Form.Radio').forEach((radio) => {
        expect(radio.props.disabled).toEqual(false);
      });
      expect(
        wrapper.instance.findByType('Form.Control.Feedback')[0].props.type,
      ).toEqual('invalid');
    });

    test('options is valid no invalid feedback get render', () => {
      const wrapper = shallow(
        <RadioCriterion
          {...props}
          criterion={{ ...props.criterion, optionsIsInvalid: false }}
        />,
      );
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(
        wrapper.instance.findByType('Form.Control.Feedback').length,
      ).toEqual(0);
    });

    test('not isGrading all radios will be disabled', () => {
      const wrapper = shallow(<RadioCriterion {...props} isGrading={false} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      wrapper.instance.findByType('Form.Radio').forEach((radio) => {
        expect(radio.props.disabled).toEqual(true);
      });
    });
  });
});
