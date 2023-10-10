import { useLocation } from 'react-router-dom';

export const nullMethod = () => ({});

export const useActiveView = () => useLocation().pathname.split('/')[1];
export const useIsEmbedded = () => useLocation().pathname.split('/')[2] === 'embedded';

export default {
  nullMethod,
};
