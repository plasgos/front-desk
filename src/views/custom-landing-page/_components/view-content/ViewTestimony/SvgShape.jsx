import React from "react";

const SvgCurve = ({
  type,
  width = "100%",
  height1 = 99, // Tinggi SVG secara keseluruhan
  height2 = 85, // Posisi Y dari titik awal lengkung
  curveDepth = -161, // Kedalaman cekungan
  position = "top", // Posisi dari SVG: top, bottom, top-left, top-right, bottom-left, bottom-right
  fill = "rgba(255,152,0,0.5)", // Warna isi SVG
}) => {
  console.log("🚀 ~ position:", position);
  const transformStyle = position.includes("bottom") ? "scaleY(-1)" : "";

  // Menyesuaikan posisi berdasarkan nilai `position`
  const positionStyles = {
    position: "absolute",
    width: type === "circle" ? "" : "100%",
    [position.includes("top") ? "top" : "bottom"]: 0,
    [position.includes("left")
      ? "left"
      : position.includes("right")
      ? "right"
      : ""]: 0,
    zIndex: -1,
    transform: transformStyle,
  };

  // Data path SVG dengan nilai-nilai dinamis
  const pathData = `
    M100,0 
    L0,0 
    L0,${height1} 
    Q50,${curveDepth} 
    100,${height2}
    Z`;

  const polygonPoints = `
    100,0 
    0,0 
    0,${height1} 
    100,${height2}`;

  const maxHeight = Math.max(height1, height2);
  const adjustedHeight = maxHeight + Math.abs(curveDepth);

  return (
    <div className="" style={positionStyles}>
      {type === "curve" ? (
        <svg
          preserveAspectRatio="none"
          width={width}
          height={adjustedHeight}
          viewBox={`0 0 100 ${adjustedHeight}`}
        >
          <path d={pathData} fill={fill}></path>
        </svg>
      ) : type === "triangle" ? (
        <svg
          preserveAspectRatio="none"
          width={width}
          height={maxHeight}
          viewBox={`0 0 100 ${maxHeight}`}
        >
          <polygon points={polygonPoints} fill={fill}></polygon>
        </svg>
      ) : type === "circle" ? (
        <svg
          preserveAspectRatio="none"
          width={height1}
          height={height2}
          viewBox={`0 0 50 50`}
        >
          {position === "top-left" || position === "bottom-left" ? (
            <circle cx="0" cy="0" r="50" fill={fill}></circle>
          ) : (
            <circle cx="50" cy="0" r="50" fill={fill}></circle>
          )}
        </svg>
      ) : null}
    </div>
  );
};

export default SvgCurve;
