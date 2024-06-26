export const SkeletonBox = () => {
  return (
    <div
      className="loading-skeleton bg-grey"
      style={{ width: "100px", height: "100px" }}
    ></div>
  );
};

export const CircularLoader = (props: any) => {
  const size = props.size || 16;
  return (
    <div className="circular-loader">
      <svg
        className="circular"
        viewBox="25 25 50 50"
        height={size}
        width={size}
      >
        <circle
          className="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="2"
          stroke-miterlimit="10"
        ></circle>
      </svg>
    </div>
  );
};
