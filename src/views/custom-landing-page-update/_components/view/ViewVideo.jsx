import React, { forwardRef } from "react";
import useAnimatedVisibility from "../../../../hooks/useAnimatedVisibility";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";

const ViewVideo = forwardRef(
  ({ isDragging, isResizing, content, isFocused }, ref) => {
    const stylesBg = useBackgroundStyles(content);

    const { elementRef, getClassName, duration } =
      useAnimatedVisibility(content);

    const getYoutubeUrl = (url) => {
      if (url) {
        const urlObj = new URL(url);
        const videoId = urlObj.searchParams.get("v"); // Mendapatkan parameter 'v' dari URL
        return videoId;
      }
    };

    return (
      <div
        key={content.id}
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
          paddingTop: stylesBg.paddingTop,
          paddingBottom: stylesBg.paddingBottom,
          backgroundColor: content.background.bgColor || "",
          position: "relative",
          zIndex: 1,
        }}
        className=" tw-flex tw-flex-row tw-flex-wrap tw-justify-center tw-items-center  "
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
          ref={elementRef}
          className={`${getClassName()} `}
          style={{
            transform: `rotate(${content.content.rotation}deg)`,
            zIndex: 999,
            overflow: "hidden",
            margin: "auto",
            aspectRatio: content.content.ratio,
            "--animation-duration": `${duration}s`,
            width: `${content.content.width}px`,
            height: `${content.content.width * content.content.ratio}`,
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${getYoutubeUrl(
              content.content.url
            )}?autoplay=${content.content.isAutoPlay ? 1 : 0}&mute=${
              content.content.isMuted ? 1 : 0
            }&playlist=${getYoutubeUrl(content.content.url)}&loop=${
              content.content.isLoop ? 1 : 0
            }&controls=${content.content.isControl ? 0 : 1}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video"
          />
        </div>
      </div>
    );
  }
);

export default ViewVideo;
