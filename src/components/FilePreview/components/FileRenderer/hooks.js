import { useKeyedState, StrictDict } from '@edx/react-unit-test-utils';

import { errorStatuses, errorMessages, renderers } from '../constants';
import { getFileType } from '../utils';
import messages from './messages';

export const stateKeys = StrictDict({
  errorStatus: 'errorStatus',
  isLoading: 'isLoading',
});

/**
 * component hooks
 */
export const useRenderData = ({
  file,
  formatMessage,
}) => {
  const [errorStatus, setErrorStatus] = useKeyedState(stateKeys.errorStatus, null);
  const [isLoading, setIsLoading] = useKeyedState(stateKeys.isLoading, true);

  const setState = (newState) => {
    setErrorStatus(newState.errorStatus);
    setIsLoading(newState.isLoading);
  };

  const stopLoading = (status = null) => setState({ isLoading: false, errorStatus: status });

  const errorMessage = (
    errorMessages[errorStatus] || errorMessages[errorStatuses.serverError]
  );
  const errorAction = {
    id: 'retry',
    onClick: () => setState({ errorStatus: null, isLoading: true }),
    message: messages.retryButton,
  };
  const error = {
    headerMessage: errorMessage,
    children: formatMessage(errorMessage),
    actions: [errorAction],
  };

  const Renderer = renderers[getFileType(file.fileName)];
  const rendererProps = {
    fileName: file.fileName,
    url: file.fileUrl,
    onError: stopLoading,
    onSuccess: () => stopLoading(),
  };

  return {
    errorStatus,
    isLoading,
    error,
    Renderer,
    rendererProps,
  };
};
