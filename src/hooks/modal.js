import { useLocation } from 'react-router-dom';
import { useViewUrl } from 'data/services/lms/urls';
import { routeSteps } from 'constants';

export const useCloseModal = () => {
  if (document.referrer !== '') {
    const postMessage = (data) => window.parent.postMessage(data, document.referrer);
    return () => postMessage({ type: 'plugin.modal-close' });
  }
  return () => {
    console.log("CLose Modal");
  };
};

export const useOpenModal = () => {
  const postMessage = (data) => window.parent.postMessage(data, document.referrer);
  const viewUrl = useViewUrl();
  return ({ view, title }) => {
    postMessage({
      type: 'plugin.modal',
      payload: {
        url: viewUrl({ view }),
        title,
        height: '83vh',
      },
    });
  };
};
