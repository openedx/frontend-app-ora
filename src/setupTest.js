import 'core-js/stable';
import 'regenerator-runtime/runtime';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn((val) => ({ current: val, useRef: true })),
  useCallback: jest.fn((cb, prereqs) => ({ useCallback: { cb, prereqs } })),
  useEffect: jest.fn((cb, prereqs) => ({ useEffect: { cb, prereqs } })),
  useContext: jest.fn(context => context),
}));

jest.mock('@edx/frontend-platform/i18n', () => {
  const i18n = jest.requireActual('@edx/frontend-platform/i18n');
  const { formatMessage } = jest.requireActual('@edx/react-unit-test-utils');
  // this provide consistent for the test on different platform/timezone
  const formatDate = jest.fn(date => new Date(date).toISOString()).mockName('useIntl.formatDate');
  return {
    ...i18n,
    useIntl: jest.fn(() => ({
      formatMessage,
      formatDate,
    })),
    defineMessages: m => m,
    FormattedMessage: () => 'FormattedMessage',
  };
});

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
