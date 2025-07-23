import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { useORAConfigData } from 'hooks/app';
import { useCloseModalAction } from 'hooks/actions';
import ModalContainer from './ModalContainer';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('@edx/frontend-lib-special-exams', () => {
  // eslint-disable-next-line react/prop-types
  const OuterExamTimer = ({ courseId }) => (
    <div data-testid="outer-exam-timer">ExamTimer for {courseId}</div>
  );
  return { OuterExamTimer };
});

jest.mock('data/redux', () => ({
  selectors: {
    specialExams: {
      activeExam: jest.fn(() => null),
    },
  },
}));

jest.mock('hooks/app', () => ({
  useORAConfigData: jest.fn(),
  useIsPageDataLoaded: jest.fn(),
  useHasReceivedFinalGrade: jest.fn(),
  useGlobalState: jest.fn(),
  useAssessmentStepOrder: jest.fn(),
  useStepInfo: jest.fn(),
}));
jest.mock('hooks/actions', () => ({
  useCloseModalAction: jest.fn(),
}));
jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('hooks/modal', () => ({
  useOpenModal: jest.fn(),
}));
jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ courseId: 'test-course-id' }),
}));

const {
  useIsPageDataLoaded,
  useHasReceivedFinalGrade,
  useGlobalState,
  useAssessmentStepOrder,
  useStepInfo,
} = require('hooks/app');
const { useViewStep } = require('hooks/routing');
const { useOpenModal } = require('hooks/modal');

describe('<ModalContainer />', () => {
  beforeEach(() => {
    useORAConfigData.mockReturnValue({ title: 'Test Title' });
    useIsPageDataLoaded.mockReturnValue(true);
    useHasReceivedFinalGrade.mockReturnValue(false);
    useGlobalState.mockReturnValue({ activeStepName: 'submission' });
    useAssessmentStepOrder.mockReturnValue(['peer', 'self']);
    useViewStep.mockReturnValue('submission');
    useStepInfo.mockReturnValue({
      peer: { numberOfReceivedAssessments: 0, isWaitingForSubmissions: false },
    });
    useOpenModal.mockReturnValue(jest.fn());
    useCloseModalAction.mockReturnValue({
      confirmProps: {
        isOpen: true,
        title: 'Confirm Dialog',
        description: 'Are you sure?',
        close: jest.fn(),
      },
      action: { onClick: jest.fn() },
    });
  });

  it('renders with ConfirmDialog when confirmProps are provided', () => {
    render(
      <IntlProvider locale="en">
        <ModalContainer>
          <div>Test children</div>
        </ModalContainer>
      </IntlProvider>,
    );

    expect(screen.getByText('Confirm Dialog')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test children')).toBeInTheDocument();
    expect(screen.getByTestId('outer-exam-timer')).toBeInTheDocument();
  });

  it('renders without ConfirmDialog when confirmProps is null', () => {
    useCloseModalAction.mockReturnValue({
      confirmProps: null,
      action: { onClick: jest.fn() },
    });
    render(
      <IntlProvider locale="en">
        <ModalContainer>
          <div>Test children</div>
        </ModalContainer>
      </IntlProvider>,
    );

    expect(screen.queryByText('Confirm Dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test children')).toBeInTheDocument();
    expect(screen.getByTestId('outer-exam-timer')).toBeInTheDocument();
  });
});
