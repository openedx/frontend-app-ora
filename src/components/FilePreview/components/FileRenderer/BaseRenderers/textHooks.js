import { useEffect, useState } from 'react';

import axios from 'axios';

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
  const [content, setContent] = useState('');
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
