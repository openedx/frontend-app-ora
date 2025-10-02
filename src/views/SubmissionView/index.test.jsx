import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithIntl } from '../../testUtils';
import useSubmissionViewData from './hooks';
import SubmissionView from './index';

jest.mock('components/Rubric', () => () => <div>Rubric</div>);
jest.mock('components/ModalActions', () => () => <div>Modal Actions</div>);
jest.mock('components/FileUpload', () => () => <div>File Upload</div>);
jest.mock('components/Instructions', () => () => <div>Instructions</div>);
jest.mock('components/StatusAlert', () => () => <div>Status Alert</div>);
jest.mock('./SubmissionPrompts', () => () => <div>Submission Prompts</div>);
jest.mock('./hooks', () => jest.fn());

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

    expect(screen.queryByText('Rubric')).not.toBeInTheDocument();
    expect(screen.getByText('Modal Actions')).toBeInTheDocument();
    expect(screen.getByText('Submission Prompts')).toBeInTheDocument();
  });

  it('renders rubric when showRubric is true', () => {
    useSubmissionViewData.mockReturnValue({
      ...mockUseSubmissionViewData,
      showRubric: true,
    });
    renderWithIntl(<SubmissionView />);

    expect(screen.getByText('Rubric')).toBeInTheDocument();
    expect(screen.getByText('Modal Actions')).toBeInTheDocument();
    expect(screen.getByText('Submission Prompts')).toBeInTheDocument();
  });
});
