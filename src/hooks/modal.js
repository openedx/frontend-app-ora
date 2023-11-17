import { useLocation } from 'react-router-dom';
import { useViewUrl } from 'data/services/lms/urls';
import { routeSteps } from 'constants';

export const useRefreshUpstream = () => {
  if (document.referrer !== '') {
    const postMessage = (data) => window.parent.postMessage(data, process.env.BASE_URL);
    return () => {
      console.log("Send refresh upstream");
      postMessage({ type: 'ora-refresh' });
    };
  }
  return () => {
    console.log("refresh upstream");
  };
};

export const useCloseModal = () => {
  if (document.referrer !== '') {
    const postMessage = (data) => window.parent.postMessage(data, '*');
    return () => {
      postMessage({ type: 'ora-refresh' });
      postMessage({ type: 'plugin.modal-close' });
    };
  }
  return () => {
    console.log("CLose Modal");
  };
};

export const useOpenModal = () => {
  const postMessage = (data) => window.parent.postMessage(data, '*');
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
