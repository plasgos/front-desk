import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const PatternBox = ({ img, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className="gradient-box"
      style={{
        borderRadius: 10,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.1s ease-in-out",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src={img}
        alt="pattern"
        style={{ objectFit: "cover", width: "100%", height: 90 }}
      />

      {isSelected && (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <FaCheckCircle size={24} color="green" />
        </div>
      )}
    </div>
  );
};

export default PatternBox;
