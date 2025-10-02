import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ImageRenderer from './ImageRenderer';

describe('<ImageRenderer />', () => {
  const props = {
    fileName: 'test-image.jpg',
    url: 'https://example.com/test-image.jpg',
    onError: jest.fn().mockName('onError'),
    onSuccess: jest.fn().mockName('onSuccess'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders image with correct attributes', () => {
    render(<ImageRenderer {...props} />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', props.url);
    expect(image).toHaveAttribute('alt', props.fileName);
    expect(image).toHaveClass('image-renderer');
  });

  it('calls onError when image fails to load', () => {
    render(<ImageRenderer {...props} />);

    const image = screen.getByRole('img');
    fireEvent.error(image);

    expect(props.onError).toHaveBeenCalledTimes(1);
  });

  it('calls onSuccess when image loads successfully', () => {
    render(<ImageRenderer {...props} />);

    const image = screen.getByRole('img');
    fireEvent.load(image);

    expect(props.onSuccess).toHaveBeenCalledTimes(1);
  });

  it('uses empty string as alt text when fileName is not provided', () => {
    const propsWithoutFileName = { ...props, fileName: undefined };
    const { container } = render(<ImageRenderer {...propsWithoutFileName} />);

    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', '');
  });
});
