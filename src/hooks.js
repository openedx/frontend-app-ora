import { useLocation } from 'react-router-dom';
import { useViewUrl } from 'data/services/lms/urls';

export const nullMethod = () => ({});

export const useActiveView = () => useLocation().pathname.split('/')[1];
export const useIsEmbedded = () => useLocation().pathname.split('/')[2] === 'embedded';

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

export default {
  nullMethod,
};
