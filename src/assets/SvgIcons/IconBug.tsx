import SvgIcon from "src/components/shared/SvgIcon";

const IconBug = (props: any) => {
  const { size, ...restProps } = props;
  const iconSize = size || 12;

  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        width={iconSize}
        height={iconSize}
        {...restProps}
      >
        {/* <!--!Font Awesome Pro v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2026 Fonticons, Inc.--> */}
        <path d="M320 64C373 64 416 107 416 160L416 192L224 192L224 160C224 107 267 64 320 64zM432 416L432 288L208 288L208 416C208 469.6 245.7 514.4 296 525.4L296 336L344 336L344 525.4C394.3 514.4 432 469.6 432 416zM160 268C91.2 216.4 56 190 54.4 188.8L83.2 150.4L102.4 164.8L202.7 240L437.4 240L537.7 164.8L556.9 150.4L585.7 188.8C584 190 548.8 216.4 480 268L480 328L608 328L608 376L480 376L480 416C480 422.5 479.6 428.9 478.9 435.1C548.7 487.4 584.2 514.1 585.6 515.2L556.8 553.6C553 550.7 522.2 527.7 464.6 484.5C438.9 538.6 383.8 576 320 576C256.2 576 201 538.6 175.4 484.5C117.8 527.7 87 550.7 83.2 553.6L54.4 515.2C55.8 514.1 91.4 487.5 161.1 435.1C160.4 428.8 160 422.4 160 416L160 376L32 376L32 328L160 328L160 268z" />
      </svg>
    </SvgIcon>
  );
};

export default IconBug;
