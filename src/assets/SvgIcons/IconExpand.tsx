import SvgIcon from "src/components/shared/SvgIcon";

const IconExpand = (props: any) => {
  const size = props?.size || 16;
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height={size}
        width={size}
      >
        <path d="M352 0H320V64h32 50.7L297.4 169.4 274.7 192 320 237.3l22.6-22.6L448 109.3V160v32h64V160 32 0H480 352zM214.6 342.6L237.3 320 192 274.7l-22.6 22.6L64 402.7V352 320H0v32V480v32H32 160h32V448H160 109.3L214.6 342.6z" />
      </svg>
    </SvgIcon>
  );
};

export default IconExpand;
