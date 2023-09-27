import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import ErrorBanner from './ErrorBanner';

import messages from '../messages';

describe('Error Banner component', () => {
  const children = <p>Abitary Child</p>;

  const props = {
    actions: [
      {
        id: 'action1',
        onClick: jest.fn().mockName('action1.onClick'),
        message: messages.retryButton,
      },
      {
        id: 'action2',
        onClick: jest.fn().mockName('action2.onClick'),
        message: messages.retryButton,
      },
    ],
    headerMessage: messages.unknownError,
    children,
  };

  let el;
  beforeEach(() => {
    el = shallow(<ErrorBanner {...props} />);
  });

  test('snapshot', () => {
    expect(el.snapshot).toMatchSnapshot();
  });

  describe('component', () => {
    test('children node', () => {
      el.instance.findByType('p');
      const childEl = shallow(children);
      el.instance.findByType('p')[0].matches(childEl);
    });

    test('verify actions', () => {
      const { actions } = el.instance.findByType('Alert')[0].props;
      expect(actions).toHaveLength(props.actions.length);

      actions.forEach((action, index) => {
        expect(action.type).toEqual('Button');
        expect(action.props.onClick).toEqual(props.actions[index].onClick);
        // action message
        expect(action.props.children).toEqual(props.actions[index].message.defaultMessage);
      });
    });
  });
});
