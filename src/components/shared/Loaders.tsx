export const CircularLoader = (props: any) => {
  const size = props.size || 16;
  return (
    <div className="circular-loader" style={{ width: size, height: size }} />
  );
};
