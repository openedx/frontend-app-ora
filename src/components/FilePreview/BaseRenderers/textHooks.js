import { useEffect } from 'react';

import { get } from 'axios';
import { useKeyedState, StrictDict } from '@edx/react-unit-test-utils';

export const stateKeys = StrictDict({
  content: 'content',
});

export const fetchFile = async ({
  setContent,
  url,
  onError,
  onSuccess,
}) => get(url)
  .then(({ data }) => {
    onSuccess();
    setContent(data);
  })
  .catch((e) => onError(e.response.status));

export const rendererHooks = ({ url, onError, onSuccess }) => {
  const [content, setContent] = useKeyedState(stateKeys.content, '');
  useEffect(() => {
    fetchFile({
      setContent,
      url,
      onError,
      onSuccess,
    });
  }, [onError, onSuccess, setContent, url]);
  return { content };
};

export default {
  rendererHooks,
  fetchFile,
};
