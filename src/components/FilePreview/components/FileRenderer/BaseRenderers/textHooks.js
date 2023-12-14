import { useEffect } from 'react';

import axios from 'axios';
import { useKeyedState, StrictDict } from '@edx/react-unit-test-utils';

export const stateKeys = StrictDict({
  content: 'content',
});

export const fetchFile = async ({
  setContent,
  url,
  onError,
  onSuccess,
  signal,
}) => axios.get(url, { signal })
  .then(({ data }) => {
    onSuccess();
    setContent(data);
  })
  .catch((e) => onError(e.response.status));

export const useTextRendererData = ({ url, onError, onSuccess }) => {
  const [content, setContent] = useKeyedState(stateKeys.content, '');
  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      await fetchFile({
        setContent,
        url,
        onError,
        onSuccess,
        signal: controller.signal,
      });
      controller = null;
    })();
    return () => controller?.abort();
  }, [onError, onSuccess, setContent, url]);
  return { content };
};

export default {
  useTextRendererData,
  fetchFile,
};
