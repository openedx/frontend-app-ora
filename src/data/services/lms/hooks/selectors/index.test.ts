import moment from 'moment';

import { stepNames, stepStates } from 'constants/index';
import * as oraConfigSelectors from './oraConfig';
import * as pageDataSelectors from './pageData';
import { useStepState } from './index';

// Mock all selector dependencies
jest.mock('./oraConfig', () => ({
  useStepIndex: jest.fn(),
  useAssessmentStepConfig: jest.fn(),
}));

jest.mock('./pageData', () => ({
  useActiveStepName: jest.fn(),
  useHasCancelled: jest.fn(),
  useHasReceivedFinalGrade: jest.fn(),
  useStepInfo: jest.fn(),
  useSubmissionState: jest.fn(),
  useTrainingStepIsCompleted: jest.fn(),
}));

// Mock moment
jest.mock('moment', () => jest.fn(() => ({
  isBefore: jest.fn(),
  isAfter: jest.fn(),
})));

describe('useStepState', () => {
  const mockMoment = moment as jest.MockedFunction<typeof moment>;
  const mockNow = {
    isBefore: jest.fn(),
    isAfter: jest.fn(),
  };

  const mockPeerStart = '2025-01-01T00:00:00Z';
  const mockPeerEnd = '2025-12-31T23:59:59Z';

  const mockSelfStart = '2025-01-01T00:00:00Z';
  const mockSelfEnd = '2025-12-31T23:59:59Z';

  beforeEach(() => {
    jest.clearAllMocks();
    mockMoment.mockReturnValue(mockNow as any);

    // Default mocks
    (pageDataSelectors.useActiveStepName as jest.Mock).mockReturnValue(stepNames.peer);
    (oraConfigSelectors.useStepIndex as jest.Mock).mockReturnValue(1);
    (oraConfigSelectors.useAssessmentStepConfig as jest.Mock).mockReturnValue({
      settings: {
        [stepNames.peer]: {
          minNumberToGrade: 3,
          minNumberToBeGradedBy: 3,
          startDatetime: mockPeerStart,
          endDatetime: mockPeerEnd,
        },
        [stepNames.self]: {
          startDatetime: mockSelfStart,
          endDatetime: mockSelfEnd,
        },
      },
    });
    (pageDataSelectors.useHasCancelled as jest.Mock).mockReturnValue(false);
    (pageDataSelectors.useHasReceivedFinalGrade as jest.Mock).mockReturnValue(false);
    (pageDataSelectors.useSubmissionState as jest.Mock).mockReturnValue(stepStates.inProgress);
    (pageDataSelectors.useTrainingStepIsCompleted as jest.Mock).mockReturnValue(false);
    (pageDataSelectors.useStepInfo as jest.Mock).mockReturnValue({
      [stepNames.peer]: {
        numberOfAssessmentsCompleted: 2,
        numberOfReceivedAssessments: 1,
        isWaitingForSubmissions: false,
      },
    });
  });

  describe('peer step', () => {
    it('should return notAvailable when current time is before peer step start datetime', () => {
      // If we are before the peer step start datetime
      mockNow.isBefore.mockReturnValue(true);
      mockNow.isAfter.mockReturnValue(false);

      // When checking peer step
      const result = useStepState({ step: stepNames.peer as any });

      // Then the step state should be notAvailable
      expect(result).toBe(stepStates.notAvailable);
    });

    it('should return closed when current time is after peer step end datetime', () => {
      // If we are after the peer step end datetime
      mockNow.isBefore.mockReturnValue(false);
      mockNow.isAfter.mockReturnValue(true);

      // When checking peer step
      const result = useStepState({ step: stepNames.peer as any });

      // Then the step state should be closed
      expect(result).toBe(stepStates.closed);
    });

    it('should return waitingForPeerGrades when grading is done but receiving is not', () => {
      // If we are within the peer grading period
      mockNow.isBefore.mockReturnValue(false);
      mockNow.isAfter.mockReturnValue(false);

      // And we have completed grading but not receiving enough assessments
      (pageDataSelectors.useStepInfo as jest.Mock).mockReturnValue({
        [stepNames.peer]: {
          numberOfAssessmentsCompleted: 3, // meets minNumberToGrade (3)
          numberOfReceivedAssessments: 1, // less than minNumberToBeGradedBy (3)
          isWaitingForSubmissions: false,
        },
      });

      // When checking peer step
      const result = useStepState({ step: stepNames.peer as any });

      // Then the step state should be waitingForPeerGrades
      expect(result).toBe(stepStates.waitingForPeerGrades);
    });

    it('should not return waitingForPeerGrades when both grading and receiving are done', () => {
      // Given we are within the peer grading period
      mockNow.isBefore.mockReturnValue(false);
      mockNow.isAfter.mockReturnValue(false);

      // And we have completed both grading and receiving enough assessments
      (pageDataSelectors.useStepInfo as jest.Mock).mockReturnValue({
        [stepNames.peer]: {
          numberOfAssessmentsCompleted: 3, // meets minNumberToGrade (3)
          numberOfReceivedAssessments: 3, // meets minNumberToBeGradedBy (3)
          isWaitingForSubmissions: false,
        },
      });

      // When checking peer step
      const result = useStepState({ step: stepNames.peer as any });

      // Then the step state should not be waitingForPeerGrades, and should have advanced to the next state
      expect(result).not.toBe(stepStates.waitingForPeerGrades);
    });

    it('should not return waitingForPeerGrades when grading is not done', () => {
      // Given we are within the peer grading period
      mockNow.isBefore.mockReturnValue(false);
      mockNow.isAfter.mockReturnValue(false);

      // And we have not completed grading enough assessments
      (pageDataSelectors.useStepInfo as jest.Mock).mockReturnValue({
        [stepNames.peer]: {
          numberOfAssessmentsCompleted: 2, // less than minNumberToGrade (3)
          numberOfReceivedAssessments: 1, // less than minNumberToBeGradedBy (3)
          isWaitingForSubmissions: false,
        },
      });

      // When checking peer step
      const result = useStepState({ step: stepNames.peer as any });

      // Then the step state should not be waitingForPeerGrades
      expect(result).not.toBe(stepStates.waitingForPeerGrades);
    });

    it('should return waiting when isWaitingForSubmissions is true', () => {
      // Given we are within the peer grading period
      mockNow.isBefore.mockReturnValue(false);
      mockNow.isAfter.mockReturnValue(false);

      // And we are waiting for additional submissions to grade
      (pageDataSelectors.useStepInfo as jest.Mock).mockReturnValue({
        [stepNames.peer]: {
          numberOfAssessmentsCompleted: 1,
          numberOfReceivedAssessments: 1,
          isWaitingForSubmissions: true, // This should trigger the waiting state
        },
      });

      // When checking peer step
      const result = useStepState({ step: stepNames.peer as any });

      // Then the step state should be waiting
      expect(result).toBe(stepStates.waiting);
    });

    it('should not return waiting when isWaitingForSubmissions is false', () => {
      // Given we are within the peer grading period
      mockNow.isBefore.mockReturnValue(false);
      mockNow.isAfter.mockReturnValue(false);

      // And we have not completed grading enough assessments, and are not waiting for submissions
      (pageDataSelectors.useStepInfo as jest.Mock).mockReturnValue({
        [stepNames.peer]: {
          numberOfAssessmentsCompleted: 1,
          numberOfReceivedAssessments: 1,
          isWaitingForSubmissions: false,
        },
      });

      // When checking peer step
      const result = useStepState({ step: stepNames.peer as any });

      // Then the step state should not be waiting
      expect(result).not.toBe(stepStates.waiting);
    });
  });

  describe('self step', () => {
    it('should return notAvailable when current time is before self step start datetime', () => {
      // Given we are before the self step start datetime
      mockNow.isBefore.mockReturnValue(true);
      mockNow.isAfter.mockReturnValue(false);

      // When checking self step
      const result = useStepState({ step: stepNames.self as any });

      // Then the step state should be notAvailable
      expect(result).toBe(stepStates.notAvailable);
    });

    it('should not return notAvailable when current time is after self step start datetime', () => {
      // Given we are after the self step start datetime
      mockNow.isBefore.mockReturnValue(false);
      mockNow.isAfter.mockReturnValue(false);

      // When checking self step
      const result = useStepState({ step: stepNames.self as any });

      // Then the step state should not be notAvailable
      expect(result).not.toBe(stepStates.notAvailable);
    });

    it('should handle self step without config gracefully', () => {
      // Remove self step config
      (oraConfigSelectors.useAssessmentStepConfig as jest.Mock).mockReturnValue({
        settings: {
          [stepNames.peer]: {
            minNumberToGrade: 3,
            minNumberToBeGradedBy: 3,
            startDatetime: '2023-01-01T00:00:00Z',
            endDatetime: '2023-12-31T23:59:59Z',
          },
          // No self step config
        },
      });

      mockNow.isBefore.mockReturnValue(false);
      mockNow.isAfter.mockReturnValue(false);

      // Should not throw error and should not return notAvailable due to missing config
      const result = useStepState({ step: stepNames.self as any });

      expect(result).not.toBe(stepStates.notAvailable);
    });
  });

  describe('edge cases and context', () => {
    it('should handle peer step after end datetime', () => {
      mockNow.isBefore.mockReturnValue(false);
      mockNow.isAfter.mockReturnValue(true); // After end datetime

      const result = useStepState({ step: stepNames.peer as any });

      expect(result).toBe(stepStates.closed);
    });

    it('should handle self step after end datetime', () => {
      mockNow.isBefore.mockReturnValue(false);
      mockNow.isAfter.mockReturnValue(true); // After end datetime

      const result = useStepState({ step: stepNames.self as any });

      expect(result).toBe(stepStates.closed);
    });

    it('should prioritize early return conditions over tested lines', () => {
      // Test that hasReceivedFinalGrade takes precedence
      (pageDataSelectors.useHasReceivedFinalGrade as jest.Mock).mockReturnValue(true);
      mockNow.isBefore.mockReturnValue(true); // Would normally return notAvailable

      const result = useStepState({ step: stepNames.peer as any });

      expect(result).toBe(stepStates.done);
      // The isBefore check should not even be called due to early return
    });

    it('should handle missing stepInfo for peer step', () => {
      (pageDataSelectors.useStepInfo as jest.Mock).mockReturnValue(null);
      mockNow.isBefore.mockReturnValue(false);
      mockNow.isAfter.mockReturnValue(false);

      const result = useStepState({ step: stepNames.peer as any });

      expect(result).toBe(''); // Returns empty string when stepInfo is missing
    });
  });
});
