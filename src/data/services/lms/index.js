import { StrictDict } from '@edx/react-unit-test-utils';
import urls from './urls';
import data from './hooks/data';
import selectors from './hooks/selectors';
import actions from './hooks/actions';

export default StrictDict({
  data,
  selectors,
  urls,
  actions,
});
