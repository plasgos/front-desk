import React, { forwardRef } from "react";

const ViewLine = forwardRef(
  ({ isDragging, isResizing, content, isFocused }, ref) => {
    const {
      width1,
      width2,
      height,
      color1,
      color2,
      distance,
      isFlip,
      isFloating,
      variant,
      heightBasicLine,
      colorBasicLine,
    } = content || {};
    // Ensure valid width values (avoid division by zero)
    const adjustedWidth1 = Math.max(width1 || 0, 1);
    const adjustedWidth2 = Math.max(width2 || 0, 1);

    const skewX = 10;
    const totalWidth = adjustedWidth1 + adjustedWidth2 + distance + skewX;

    const transform = isFlip ? `scaleX(-1) translate(${-totalWidth}, 0)` : "";

    const svgBackground = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${totalWidth} ${height}' ${
      transform ? `transform="${transform}"` : ""
    }>
        <!-- Path untuk color1 -->
        <path d='M${skewX},0 L${
      adjustedWidth1 + skewX
    },0 L${adjustedWidth1},${height} L0,${height} Z' fill='${color1}'/>

        <!-- Spasi transparan antara path1 dan path2 -->
        <rect x="${adjustedWidth1}" y="0" width="${distance}" height="${height}" fill="transparent" />

        <!-- Path untuk color2 -->
        <path d='M${adjustedWidth1 + distance + skewX},0 L${
      adjustedWidth1 + adjustedWidth2 + distance + skewX
    },0 L${adjustedWidth1 + adjustedWidth2 + distance},${height} L${
      adjustedWidth1 + distance
    },${height} Z' fill='${color2}'/>
      </svg>`;

    return (
      <div
        ref={ref}
        style={{
          color: content?.style?.color,
          ...(isResizing && { cursor: "not-allowed" }),
          ...(isDragging && { border: "2px solid green" }),
          ...(isFocused && { border: "2px solid green" }),
          transform: isFlip ? `scaleX(-1)` : "",
          transformOrigin: "center",
          position: "relative",
        }}
      >
        {variant === "Basic" ? (
          <div
            style={{
              width: "100%",
              height: heightBasicLine,
              backgroundColor: colorBasicLine,
            }}
          ></div>
        ) : (
          <div
            style={{
              height: `${height}px`,
              zIndex: 1,
              width: "100%",
              backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
                svgBackground
              )}")`,
              backgroundRepeat: "repeat-x",
              ...(isFloating && {
                position: "absolute",
                left: 0,
                right: 0,
                top: "-5px",
              }),
            }}
          />
        )}
      </div>
    );
  }
);

export default ViewLine;
