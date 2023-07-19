import { StrictDict } from '@edx/react-unit-test-utils';
import urls from './urls';
import api from './hooks/api';
import selectors from './hooks/selectors';

export default StrictDict({
  api,
  selectors,
  urls,
});
