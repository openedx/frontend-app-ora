import { useState } from 'react';

const usePromptHooks = ({ defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);

  const toggleOpen = () => setOpen(!open);

  return {
    open,
    toggleOpen,
  };
};

export default usePromptHooks;
