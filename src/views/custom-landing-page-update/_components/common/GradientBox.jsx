import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const GradientBox = ({ fromColor, toColor, onClick, isSelected }) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor} )`,
    height: 30,
    width: 60,
    borderRadius: 10,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.1s ease-in-out",
    position: "relative",
  };

  return (
    <div onClick={onClick} className="gradient-box" style={gradientStyle}>
      {isSelected && (
        <div style={{ position: "absolute", right: 0 }}>
          <FaCheckCircle color="white" />
        </div>
      )}
    </div>
  );
};

export default GradientBox;
