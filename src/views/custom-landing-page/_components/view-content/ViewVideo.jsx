import React, { forwardRef } from "react";
import useAnimatedVisibility from "../../../../hooks/useAnimatedVisibility";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";

const ViewVideo = forwardRef(
  ({ isDragging, isResizing, content, isFocused }, ref) => {
    const stylesBg = useBackgroundStyles(content);

    const { elementRef, getClassName, duration } =
      useAnimatedVisibility(content);

    const getYoutubeUrl = (url) => {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v"); // Mendapatkan parameter 'v' dari URL
      return videoId;
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
        <div style={stylesBg.backgroundImgStyle}></div>

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
            transform: `rotate(${content.content.rotation}deg)`,
            zIndex: 999,
            position: "relative",
            overflow: "hidden",
            height: 0,
            width: "100%",
            paddingBottom: `${content.content.ratio}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <iframe
            width={content.content.width || 360}
            height="100%"
            // height={content.content.height || 200}
            src={`https://www.youtube.com/embed/${getYoutubeUrl(
              content.content.url
            )}?autoplay=${content.content.isAutoPlay ? 1 : 0}&mute=${
              content.content.isMuted ? 1 : 0
            }&loop=${content.content.isLoop ? 1 : 0}&controls=${
              content.content.isControl ? 0 : 1
            }`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video"
            style={{
              position: "absolute", // Posisi absolute agar memenuhi div pembungkus
              top: 0,
              left: 0,
            }}
          />
        </div>
      </div>
    );
  }
);

export default ViewVideo;
