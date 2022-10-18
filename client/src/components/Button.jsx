import React from "react";

const Button = ({ bgColor, color, size, text, bRadius, width }) => {
  return (
    <button
      type="button"
      style={{
        backgroundColor: bgColor,
        color: color,
        width: width,
        borderRadius: bRadius,
      }}
      className={`text-${size} p-3  hover:drop-shadow-xl`}
    >
      {text}
    </button>
  );
};

export default Button;
