import SvgIcon from "src/components/shared/SvgIcon";

const IconCollapse = (props: any) => {
  const size = props?.size || 16;
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height={size}
        width={size}
      >
        <path d="M381.3 176L502.6 54.6 457.4 9.4 336 130.7V80 48H272V80 208v32h32H432h32V176H432 381.3zM80 272H48v64H80h50.7L9.4 457.4l45.3 45.3L176 381.3V432v32h64V432 304 272H208 80z" />
      </svg>
    </SvgIcon>
  );
};

export default IconCollapse;
