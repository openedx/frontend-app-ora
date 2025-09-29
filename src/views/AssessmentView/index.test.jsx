import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useViewStep } from 'hooks/routing';
import { stepNames } from 'constants/index';
import useAssessmentData from './useAssessmentData';
import AssessmentView from './index';

/* eslint-disable react/prop-types */

jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));

jest.mock('./useAssessmentData', () => jest.fn());

jest.mock('components/Prompt', () => () => <div>Prompt</div>);
jest.mock('components/TextResponse', () => () => <div>Text Response</div>);
jest.mock('components/FileUpload', () => () => <div>File Upload</div>);
jest.mock('./BaseAssessmentView', () => ({ children }) => (
  <div>Base View {children}</div>
));

const renderComponent = (component) => render(
  <IntlProvider messages={{}} locale="en">
    {component}
  </IntlProvider>,
);

describe('AssessmentView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when data is not loaded', () => {
    useAssessmentData.mockReturnValue({ isLoaded: false });
    const { container } = renderComponent(<AssessmentView />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders prompts without responses when text responses are empty', () => {
    useAssessmentData.mockReturnValue({
      isLoaded: true,
      prompts: [{ id: 1 }, { id: 2 }],
      response: {
        textResponses: [],
        uploadedFiles: [],
      },
    });
    useViewStep.mockReturnValue(stepNames.submission);

    renderComponent(<AssessmentView />);

    const prompts = screen.getAllByText('Prompt');
    expect(prompts).toHaveLength(2);
    expect(screen.queryByText('Text Response')).not.toBeInTheDocument();
  });

  it('renders file upload when there are uploaded files', () => {
    useAssessmentData.mockReturnValue({
      isLoaded: true,
      prompts: [],
      response: {
        textResponses: [],
        uploadedFiles: [{ id: 1 }],
      },
    });

    renderComponent(<AssessmentView />);

    expect(screen.getByText('File Upload')).toBeInTheDocument();
  });

  it('does not render file upload when there are no files', () => {
    useAssessmentData.mockReturnValue({
      isLoaded: true,
      prompts: [],
      response: {
        textResponses: [],
        uploadedFiles: [],
      },
    });

    renderComponent(<AssessmentView />);

    expect(screen.queryByText('File Upload')).not.toBeInTheDocument();
  });
});
