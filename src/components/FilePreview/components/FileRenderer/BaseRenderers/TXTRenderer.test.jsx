import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import TXTRenderer from './TXTRenderer';
import { useTextRendererData } from './textHooks';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('./textHooks', () => ({
  useTextRendererData: jest
    .fn()
    .mockReturnValue({ content: 'Sample text content' }),
}));

describe('<TXTRenderer />', () => {
  const props = {
    url: 'https://example.com/sample.txt',
    onError: jest.fn().mockName('onError'),
    onSuccess: jest.fn().mockName('onSuccess'),
  };

  it('renders text content in a pre element', () => {
    render(<TXTRenderer {...props} />);

    const preElement = screen.getByText('Sample text content');
    expect(preElement).toBeInTheDocument();
    expect(preElement).toHaveClass('txt-renderer');
    expect(preElement.tagName).toBe('PRE');
  });

  it('calls useTextRendererData hook with correct props', () => {
    render(<TXTRenderer {...props} />);

    expect(useTextRendererData).toHaveBeenCalledWith({
      url: props.url,
      onError: props.onError,
      onSuccess: props.onSuccess,
    });
  });
});
