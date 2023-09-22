import { useState } from 'react';

export const usePromptHooks = () => {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => setOpen(!open);

  return {
    open,
    toggleOpen,
  };
};

export default usePromptHooks;