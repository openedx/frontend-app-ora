import { useState } from 'react';

const usePromptHooks = () => {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => setOpen(!open);

  return {
    open,
    toggleOpen,
  };
};

export default usePromptHooks;
