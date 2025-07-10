import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import Assessment from './index';
import { useAssessmentData } from './useAssessmentData';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('./useAssessmentData', () => ({
  useAssessmentData: jest.fn(),
}));

jest.mock('./EditableAssessment', () => () => (
  <div data-testid="editable-assessment" />
));

jest.mock('./ReadonlyAssessment', () => () => (
  <div data-testid="readonly-assessment" />
));

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

    expect(screen.getByTestId('readonly-assessment')).toBeInTheDocument();
    expect(screen.queryByTestId('editable-assessment')).not.toBeInTheDocument();
  });

  it('renders the EditableAssessment when assessment has not been submitted', () => {
    useAssessmentData.mockReturnValue({
      initialized: true,
      hasSubmitted: false,
    });
    renderWithIntl(<Assessment />);

    expect(screen.getByTestId('editable-assessment')).toBeInTheDocument();
    expect(screen.queryByTestId('readonly-assessment')).not.toBeInTheDocument();
  });

  it('renders nothing when assessment data is not initialized', () => {
    useAssessmentData.mockReturnValue({ initialized: false });
    const { container } = renderWithIntl(<Assessment />);

    expect(container).toBeEmptyDOMElement();
  });
});
