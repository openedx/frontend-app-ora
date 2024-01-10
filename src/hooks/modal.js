import { useViewUrl } from 'data/services/lms/urls';
import { debug } from 'utils';
import eventTypes from 'constants/eventTypes';

/**
 * useCloseModal()
 * @description returns callback to close modal if opened in iframe
 * @returns {function}
 */
export const useCloseModal = () => {
  if (document.referrer !== '') {
    const postMessage = (data) => window.parent.postMessage(data, '*');
    return () => {
      postMessage({ type: eventTypes.modalClose });
    };
  }
  return () => {
    debug('Close Modal');
  };
};

export const modalHeight = 'calc(100vh - 37px)';

/**
 * useOpenModal()
 * @description returns callback to open modal in iframe
 * @returns {function}
 */
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
