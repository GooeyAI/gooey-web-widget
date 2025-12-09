import SvgIcon from "src/components/shared/SvgIcon";

const IconArrowUpBracket = (props: any) => {
  const size = props.size || 16;
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        width={size}
        height={size}
        {...props}
      >
        <path opacity=".4" d="" />
        <path d="M337 71C327.6 61.6 312.4 61.6 303.1 71L167 207C157.6 216.4 157.6 231.6 167 240.9C176.4 250.2 191.6 250.3 200.9 240.9L295.9 145.9L295.9 392C295.9 405.3 306.6 416 319.9 416C333.2 416 343.9 405.3 343.9 392L343.9 145.9L438.9 240.9C448.3 250.3 463.5 250.3 472.8 240.9C482.1 231.5 482.2 216.3 472.8 207L337 71zM144 408C144 394.7 133.3 384 120 384C106.7 384 96 394.7 96 408L96 480C96 533 139 576 192 576L448 576C501 576 544 533 544 480L544 408C544 394.7 533.3 384 520 384C506.7 384 496 394.7 496 408L496 480C496 506.5 474.5 528 448 528L192 528C165.5 528 144 506.5 144 480L144 408z" />
      </svg>
    </SvgIcon>
  );
};

export default IconArrowUpBracket;
