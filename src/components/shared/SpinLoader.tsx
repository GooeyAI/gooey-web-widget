import "../../css/_animations.scss";

const SpinLoader = ({ size = 50 }: { size?: number }) => {
  const spinnerStyle = {
    width: size + "px",
    height: size + "px",
    border: "2px solid #ccc",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "rotate 1s linear infinite",
  };

  return <div style={spinnerStyle} />;
};

export default SpinLoader;
