import SvgIcon from "src/components/shared/SvgIcon";

const IconAlertCircle = (props: any) => {
  const size = props?.size || 16;
  return (
    <SvgIcon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={size} height={size}>
        {/* <!--!Font Awesome Pro v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2026 Fonticons, Inc.--> */}
        <path d="M388.2 64.1C405.2 64.1 421.5 70.8 433.5 82.8L557.6 206.9C569.6 218.9 576.3 235.2 576.3 252.1L576.3 387.7C576.3 404.7 569.5 420.9 557.6 432.9L433.5 557.2C421.5 569.2 405.2 576 388.2 576L252.6 576C235.6 576 219.3 569.2 207.4 557.2L83.3 433C71.3 421 64.5 404.8 64.5 387.8L64.5 252.2C64.5 235.2 71.3 218.9 83.3 207L207.4 82.8C219.4 70.8 235.7 64.1 252.6 64.1L388.2 64.1zM320.4 384C302.7 384 288.4 398.3 288.4 416C288.4 433.7 302.7 448 320.4 448C338.1 448 352.4 433.7 352.4 416C352.4 398.3 338.1 384 320.4 384zM320.4 192C302.2 192 287.7 207.5 289 225.7L296.4 329.7C297.3 342.3 307.8 352 320.3 352C332.9 352 343.3 342.3 344.2 329.7L351.6 225.7C352.9 207.5 338.5 192 320.2 192z" />
      </svg>
    </SvgIcon>
  );
};

export default IconAlertCircle;
