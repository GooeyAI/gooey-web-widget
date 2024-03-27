import SvgIcon from "src/components/shared/SvgIcon";

const CircleBeat = (props: any) => {
  const size = props.size || 24;
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={size}
        height={size}
        {...props}
      >
        // --!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
      </svg>
    </SvgIcon>
  );
};

export default CircleBeat;
