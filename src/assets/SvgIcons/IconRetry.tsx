import SvgIcon from "src/components/shared/SvgIcon";

const IconRetry = (props: any) => {
  const size = props?.size || 16;
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        width={size}
        height={size}
      >
        {/* <!--!Font Awesome Pro v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2026 Fonticons, Inc.--> */}
        <path d="M552.2 64C538.9 64 528.2 74.7 528.2 88L528.2 166.1L501.1 139C401.1 39 239 39 139.1 139C39.2 239 39.1 401.1 139.1 501C239.1 600.9 401.2 601 501.1 501C516 486.1 528.7 469.8 539.2 452.5C546.1 441.2 542.4 426.4 531.1 419.5C519.8 412.6 505 416.3 498.1 427.6C489.6 441.6 479.3 454.9 467.1 467C385.9 548.2 254.2 548.2 172.9 467C91.6 385.8 91.7 254.1 172.9 172.8C254.1 91.5 385.8 91.6 467.1 172.8L494.2 199.9L416 199.9C402.7 199.9 392 210.6 392 223.9C392 237.2 402.7 247.9 416 247.9L552.1 247.9C565.4 247.9 576.1 237.2 576.1 223.9L576.1 87.9C576.1 74.6 565.4 63.9 552.1 63.9z" />
      </svg>
    </SvgIcon>
  );
};

export default IconRetry;
