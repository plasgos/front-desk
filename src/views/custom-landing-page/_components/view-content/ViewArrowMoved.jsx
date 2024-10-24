import React, { forwardRef } from "react";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";

const ViewArrowMoved = forwardRef(
  ({ isDragging, isResizing, content, isFocused }, ref) => {
    const stylesBg = useBackgroundStyles(content);

    const {
      ammount,
      rotation,
      distanceX,
      distanceY,
      borderWidth,
      fillColor,
      outlineColor,
      size,
      position,
      image,
    } = content?.wrapperStyle;

    const { variant } = content;

    const arrows = Array.from({ length: ammount });

    const flipArrow = position === "bottom" ? "rotate(0deg)" : "rotate(180deg)";

    const arrowCount = arrows.length;

    const virtualCenter = (arrowCount - 1) / 2;

    return (
      <div
        key={content.id}
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && {
            border: "2px solid green",
          }),
          paddingTop: stylesBg.paddingTop,
          paddingBottom: stylesBg.paddingBottom,
          backgroundColor: content.background.bgColor || "",
          position: "relative",
          zIndex: 1,
        }}
        className={` tw-flex tw-flex-row tw-flex-wrap tw-justify-center tw-items-center  ${
          isFocused &&
          "animate__animated  animate__headShake animate__fast tw-bg-green-300/20"
        } `}
      >
        {content?.background?.bgImage ? (
          <div style={stylesBg.backgroundImgStyle}></div>
        ) : content?.background?.bgType === "gradient" ? (
          <div style={stylesBg.gradientStyle}></div>
        ) : content?.background?.bgType === "pattern" ? (
          <div style={stylesBg.backgroundPatternStyle}></div>
        ) : null}

        {content.background?.opacity ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor:
                content.background?.opacity < 0 ? "black" : "white",
              opacity: Math.abs(stylesBg.calculateOpacity),
            }}
          ></div>
        ) : null}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            transform: flipArrow,
          }}
        >
          {variant === "arrow" ? (
            <>
              {arrows.map((_, index) => {
                const rotationCircle =
                  arrowCount === 1
                    ? rotation // Rotasi penuh jika hanya 1 panah
                    : ((index < virtualCenter ? -1 : 1) *
                        rotation *
                        Math.abs(index - virtualCenter)) /
                      virtualCenter;

                const translateY =
                  Math.abs(index - virtualCenter) < 1 ? distanceY : 0;

                return (
                  <div
                    style={{
                      margin: ` 0px ${distanceX}px`,
                      position: "relative",
                      // top: distanceY,
                    }}
                    key={index}
                    className="infiniteBounce"
                  >
                    <svg
                      style={{
                        transform: `rotate(${rotationCircle}deg) translateY(${translateY}px)`,
                        transition: "transform 0.5s ease",
                      }}
                      fill={fillColor}
                      width={`${size}px`}
                      height={`${size}px`}
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill={fillColor}
                        stroke={outlineColor}
                        strokeWidth={borderWidth / 10}
                        d="M10 19.25L4.5 14H8V1h4v13h3.5L10 19.25z"
                      />
                    </svg>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {arrows.map((_, index) => {
                const rotationCircle =
                  arrowCount === 1
                    ? rotation // Rotasi penuh jika hanya 1 panah
                    : ((index < virtualCenter ? -1 : 1) *
                        rotation *
                        Math.abs(index - virtualCenter)) /
                      virtualCenter;

                const translateY =
                  Math.abs(index - virtualCenter) < 1 ? distanceY : 0;

                return (
                  <div
                    style={{
                      width: size,
                      margin: ` 0px ${distanceX}px`,
                      position: "relative",
                      top: distanceY,
                    }}
                    key={index}
                    className="infiniteBounce"
                  >
                    <img
                      className={`${
                        content.wrapperStyle.shadow
                          ? content.wrapperStyle.shadow
                          : ""
                      }`}
                      src={image}
                      alt={""}
                      style={{
                        width: "100%",
                        objectFit: "contain",
                        transform: `rotate(${rotationCircle}deg) translateY(${translateY}px)`,
                        transition: "transform 0.5s ease",
                      }}
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    );
  }
);

export default ViewArrowMoved;
