import { useViewUrl } from 'data/services/lms/urls';
import { debug } from 'utils';
import eventTypes from 'constants/eventTypes';

export const useRefreshUpstream = () => {
  if (document.referrer !== '') {
    const postMessage = (data) => window.parent.postMessage(data, process.env.BASE_URL);
    return () => {
      postMessage({ type: eventTypes.refresh });
    };
  }
  return () => {
    debug('refresh upstream');
  };
};

export const useCloseModal = () => {
  if (document.referrer !== '') {
    const postMessage = (data) => window.parent.postMessage(data, '*');
    return () => {
      postMessage({ type: eventTypes.refresh });
      postMessage({ type: eventTypes.modalClose });
    };
  }
  return () => {
    debug('Close Modal');
  };
};

export const modalHeight = 'calc(100vh - 37px)';

export const useOpenModal = () => {
  const postMessage = (data) => window.parent.postMessage(data, '*');
  const viewUrl = useViewUrl();
  return ({ view, title }) => {
    postMessage({
      type: eventTypes.modalOpen,
      payload: {
        url: viewUrl({ view }),
        isFullscreen: true,
        title,
        height: modalHeight,
      },
    });
  };
};
