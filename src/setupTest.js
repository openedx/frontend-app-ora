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

jest.mock('@openedx/paragon', () => jest.requireActual('@edx/react-unit-test-utils').mockComponents({
  Alert: {
    Heading: 'Alert.Heading',
  },
  AlertModal: 'AlertModal',
  ActionRow: 'ActionRow',
  Badge: 'Badge',
  Button: 'Button',
  Card: {
    Body: 'Card.Body',
    Section: 'Card.Section',
    Footer: 'Card.Footer',
  },
  Col: 'Col',
  Collapsible: {
    Advanced: 'Collapsible.Advanced',
    Body: 'Collapsible.Body',
    Trigger: 'Collapsible.Trigger',
    Visible: 'Collapsible.Visible',
  },
  Container: 'Container',
  DataTable: {
    EmptyTable: 'DataTable.EmptyTable',
    Table: 'DataTable.Table',
    TableControlBar: 'DataTable.TableControlBar',
    TableController: 'DataTable.TableController',
    TableFooter: 'DataTable.TableFooter',
  },
  Dropzone: 'Dropzone',
  Dropdown: {
    Item: 'Dropdown.Item',
    Menu: 'Dropdown.Menu',
    Toggle: 'Dropdown.Toggle',
  },
  Form: {
    Control: {
      Feedback: 'Form.Control.Feedback',
    },
    Group: 'Form.Group',
    Label: 'Form.Label',
    Radio: 'Form.Radio',
    RadioSet: 'Form.RadioSet',
  },
  FormControlFeedback: 'FormControlFeedback',
  FormLabel: 'FormLabel',
  FullscreenModal: 'FullscreenModal',
  Hyperlink: 'Hyperlink',
  Icon: 'Icon',
  IconButton: 'IconButton',
  Layout: {
    Element: 'Layout.Element',
  },
  ModalDialog: {
    Body: 'ModalDialog.Body',
    Footer: 'ModalDialog.Footer',
    Header: 'ModalDialog.Header',
    Title: 'ModalDialog.Title',
    CloseButton: 'ModalDialog.CloseButton',
  },
  MultiSelectDropdownFilter: 'MultiSelectDropdownFilter',
  Nav: {
    Item: 'Nav.Item',
    Link: 'Nav.Link',
  },
  Navbar: {
    Brand: 'Navbar.Brand',
    Collapse: 'Navbar.Collapse',
    Nav: 'Navbar.Nav',
    Toggle: 'Navbar.Toggle',
  },
  OverlayTrigger: 'OverlayTrigger',
  PageBanner: 'PageBanner',
  Popover: {
    Content: 'Popover.Content',
  },
  Row: 'Row',
  Skeleton: 'Skeleton',
  SkeletonTheme: 'SkeletonTheme',
  StatefulButton: 'StatefulButton',
  TextFilter: 'TextFilter',
  TextArea: 'TextArea',
  Spinner: 'Spinner',
}));
jest.mock('@openedx/paragon/icons', () => ({
  CheckCircle: jest.fn().mockName('icons.CheckCircle'),
  Edit: jest.fn().mockName('icons.Edit'),
  Error: jest.fn().mockName('icons.Error'),
  Highlight: jest.fn().mockName('icons.Highlight'),
  Rule: jest.fn().mockName('icons.Rule'),
}));

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
