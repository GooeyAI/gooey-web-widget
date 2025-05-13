import { ReactNode, useCallback, useState } from "react";

const useSecondaryDrawerController = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [contentRenderer, setContentRenderer] = useState<() => ReactNode>(
      () => null
    );
    const toggleSecondaryDrawer = useCallback(
      (content: (() => ReactNode) | null) => {
        setIsOpen(!!content);
        setContentRenderer(() => content || (() => null));
      },
      []
    );
    return {
      isSecondaryDrawerOpen: isOpen,
      secondaryDrawerContent: contentRenderer,
      toggleSecondaryDrawer,
    };
  };
  export default useSecondaryDrawerController;