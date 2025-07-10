import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import useSubmissionViewData from './hooks';
import SubmissionView from './index';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('components/Rubric', () => () => <div data-testid="rubric" />);
jest.mock('components/ModalActions', () => () => (
  <div data-testid="modal-actions" />
));
jest.mock('components/FileUpload', () => () => (
  <div data-testid="file-upload" />
));
jest.mock('components/Instructions', () => () => (
  <div data-testid="instructions" />
));
jest.mock('components/StatusAlert', () => () => (
  <div data-testid="status-alert" />
));
jest.mock('./SubmissionPrompts', () => () => (
  <div data-testid="submission-prompts" />
));
jest.mock('./hooks', () => jest.fn());

const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

describe('<SubmissionView />', () => {
  const mockUseSubmissionViewData = {
    actionOptions: {
      hasSubmitted: false,
    },
    showRubric: false,
    response: {
      textResponses: ['response1', 'response2'],
      uploadedFiles: [],
    },
    onUpdateTextResponse: jest.fn(),
    isDraftSaved: false,
    onDeletedFile: jest.fn(),
    onFileUploaded: jest.fn(),
    isReadOnly: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useSubmissionViewData.mockReturnValue(mockUseSubmissionViewData);
  });

  it('does not render rubric when showRubric is false', () => {
    renderWithIntl(<SubmissionView />);

    expect(screen.queryByTestId('rubric')).not.toBeInTheDocument();
    expect(screen.getByTestId('modal-actions')).toBeInTheDocument();
    expect(screen.getByTestId('submission-prompts')).toBeInTheDocument();
  });

  it('renders rubric when showRubric is true', () => {
    useSubmissionViewData.mockReturnValue({
      ...mockUseSubmissionViewData,
      showRubric: true,
    });
    renderWithIntl(<SubmissionView />);

    expect(screen.getByTestId('rubric')).toBeInTheDocument();
    expect(screen.getByTestId('modal-actions')).toBeInTheDocument();
    expect(screen.getByTestId('submission-prompts')).toBeInTheDocument();
  });
});
