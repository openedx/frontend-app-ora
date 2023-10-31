
const actions = {
  submitResponse: {
    onClick: submitResponseHandler,
    state: submitResponseMutation.status,
    messages: submitActionMessages,
  },
  saveAndFinishLater: {
    onClick: saveResponse,
    state: saveResponseStatus,
    messages: saveActionMessages,
  },
  finishLater: {
    message: saveActionMessages[MutationStatus.idle],
  },
  startTraining: {
    onClick: saveResponse,
    message: messages.startTraining,
  },
};
