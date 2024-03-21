import { useEffect } from "react";

interface TooltipProps {
  open: boolean;
  fadeOutDelay?: string;
  position?: "top" | "bottom" | "left" | "right";
  children?: any;
}

const Tooltip = ({
  open,
  // position,
  // fadeOutDelay = "2s",
  children,
}: TooltipProps) => {
  // const [show, setShow] = useState(false);
  // const ElemRef = useRef(null);

  // const closeTooptip = () => {};

  useEffect(() => {
    // if (open) {
    // }
  }, [open]);

  // if (open) return null;
  return <div>{children}</div>;
};

export default Tooltip;
