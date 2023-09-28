import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import ImageRenderer from './ImageRenderer';

describe('Image Renderer Component', () => {
  const props = {
    url: 'some_url.jpg',
    fileName: 'some_file_name.jpg',
    onError: jest.fn().mockName('onError'),
    onSuccess: jest.fn().mockName('onSuccess'),
  };

  let el;
  beforeEach(() => {
    el = shallow(<ImageRenderer {...props} />);
  });
  test('snapshot', () => {
    expect(el.snapshot).toMatchSnapshot();
  });
});
