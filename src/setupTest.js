import 'core-js/stable';
import 'regenerator-runtime/runtime';

jest.mock('@zip.js/zip.js', () => ({}));

jest.mock('uuid', () => ({
  v4: () => 'some_uuid',
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    media: query,
    matches: false,
    onChange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

global.MathJax = {
  Hub: {
    Queue: jest.fn(),
    Config: jest.fn(),
  },
};
