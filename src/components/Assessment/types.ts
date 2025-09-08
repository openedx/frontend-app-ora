import { CriterionConfig, MutationStatus } from 'data/services/lms/types';

export type Criterion = {
  optionsValue: string | null;
  optionsIsInvalid: boolean;
  optionsOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  feedbackValue: string | null;
  feedbackIsInvalid: boolean;
  feedbackOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & CriterionConfig;

export type RubricHookData = {
  criteria: Criterion[];
  onSubmit: () => void;
  submitStatus: MutationStatus;

  // overall feedback
  overallFeedback: string;
  onOverallFeedbackChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  overallFeedbackDisabled: boolean;
  overallFeedbackIsInvalid: boolean;
  overallFeedbackPrompt: string;
};
