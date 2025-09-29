import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import Assessment from './index';
import { useAssessmentData } from './useAssessmentData';

jest.mock('./useAssessmentData', () => ({
  useAssessmentData: jest.fn(),
}));

jest.mock('./EditableAssessment', () => () => <div>Editable Assessment</div>);

jest.mock('./ReadonlyAssessment', () => () => <div>Readonly Assessment</div>);

const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

describe('<Assessment />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the ReadonlyAssessment when assessment has been submitted', () => {
    useAssessmentData.mockReturnValue({
      initialized: true,
      hasSubmitted: true,
    });
    renderWithIntl(<Assessment />);

    expect(screen.getByText('Readonly Assessment')).toBeInTheDocument();
    expect(screen.queryByText('Editable Assessment')).not.toBeInTheDocument();
  });

  it('renders the EditableAssessment when assessment has not been submitted', () => {
    useAssessmentData.mockReturnValue({
      initialized: true,
      hasSubmitted: false,
    });
    renderWithIntl(<Assessment />);

    expect(screen.getByText('Editable Assessment')).toBeInTheDocument();
    expect(screen.queryByText('Readonly Assessment')).not.toBeInTheDocument();
  });

  it('renders nothing when assessment data is not initialized', () => {
    useAssessmentData.mockReturnValue({ initialized: false });
    const { container } = renderWithIntl(<Assessment />);

    expect(container).toBeEmptyDOMElement();
  });
});
