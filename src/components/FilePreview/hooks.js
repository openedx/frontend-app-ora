import { useKeyedState, StrictDict } from '@edx/react-unit-test-utils';

import {
  PDFRenderer,
  ImageRenderer,
  TXTRenderer,
} from 'components/FilePreview/BaseRenderers';

import messages from './messages';

export const ErrorStatuses = StrictDict({
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  serverError: 500,
});

export const FileTypes = StrictDict({
  pdf: 'pdf',
  jpg: 'jpg',
  jpeg: 'jpeg',
  png: 'png',
  bmp: 'bmp',
  txt: 'txt',
  gif: 'gif',
  jfif: 'jfif',
  pjpeg: 'pjpeg',
  pjp: 'pjp',
  svg: 'svg',
});

/**
 * Config data
 */
export const RENDERERS = {
  [FileTypes.pdf]: PDFRenderer,
  [FileTypes.jpg]: ImageRenderer,
  [FileTypes.jpeg]: ImageRenderer,
  [FileTypes.bmp]: ImageRenderer,
  [FileTypes.png]: ImageRenderer,
  [FileTypes.txt]: TXTRenderer,
  [FileTypes.gif]: ImageRenderer,
  [FileTypes.jfif]: ImageRenderer,
  [FileTypes.pjpeg]: ImageRenderer,
  [FileTypes.pjp]: ImageRenderer,
  [FileTypes.svg]: ImageRenderer,
};

export const SUPPORTED_TYPES = Object.keys(RENDERERS);

export const ERROR_STATUSES = {
  [ErrorStatuses.notFound]: messages.fileNotFoundError,
  [ErrorStatuses.serverError]: messages.unknownError,
};

/**
 * Util methods and transforms
 */
export const getFileType = (fileName) => fileName.split('.').pop()?.toLowerCase();
export const isSupported = (file) => SUPPORTED_TYPES.includes(
  getFileType(file.name),
);

export const stateKeys = StrictDict({
  errorStatus: 'errorStatus',
  isLoading: 'isLoading',
});

/**
 * component hooks
 */
export const renderHooks = ({
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
    ERROR_STATUSES[errorStatus] || ERROR_STATUSES[ErrorStatuses.serverError]
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

  const Renderer = RENDERERS[getFileType(file.name)];
  const rendererProps = {
    fileName: file.name,
    url: file.downloadUrl,
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
