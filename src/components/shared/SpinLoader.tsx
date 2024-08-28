import React from "react";

const SpinLoader: React.FC = () => {
  const spinnerStyle = {
    width: "50px",
    height: "50px",
    border: "2px solid #ccc",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "rotate 1s linear infinite",
  };

  return <div style={spinnerStyle} />;
};

export default SpinLoader;
