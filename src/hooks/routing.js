import { useLocation } from 'react-router-dom';
import { routeSteps } from 'constants';

export const useActiveView = () => useLocation().pathname.split('/')[1];
export const useIsEmbedded = () => useLocation().pathname.split('/')[2] === 'embedded';
export const useViewStep = () => routeSteps[useActiveView()];
