import React, { forwardRef } from "react";
import useAnimatedVisibility from "../../../../hooks/useAnimatedVisibility";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";

const ViewVideoText = forwardRef(
  ({ isDragging, isResizing, content, isFocused, isPreview, width }, ref) => {
    const stylesBg = useBackgroundStyles(content);

    const { elementRef, getClassName, duration } =
      useAnimatedVisibility(content);

    const {
      elementRef: elementRefContent,
      getClassName: getClassNameContent,
      duration: durationContent,
    } = useAnimatedVisibility(content.content);

    const getYoutubeUrl = (url) => {
      if (url) {
        const urlObj = new URL(url);
        const videoId = urlObj.searchParams.get("v"); // Mendapatkan parameter 'v' dari URL
        return videoId;
      }
    };

    const cleanContent = content.content.text
      .replace(/<p>/g, "<div>")
      .replace(/<\/p>/g, "</div>");

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
        className=" tw-flex tw-flex-row tw-flex-wrap  tw-items-center  tw-px-3 "
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
          style={{ gap: 10 }}
          className={` ${
            isPreview
              ? `tw-flex tw-max-w-full ${
                  width === "100%"
                    ? "tw-flex-nowrap"
                    : width < 420
                    ? "tw-flex-wrap"
                    : ""
                }`
              : "parent-container-video-text-view"
          }`}
        >
          <div
            ref={elementRef}
            className={`${getClassName()}   `}
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

          <div
            ref={elementRefContent}
            className={`${getClassNameContent()} tw-w-full  `}
            style={{
              "--animation-duration": `${durationContent}s`,
            }}
          >
            <div
              style={{
                color: content?.content.textColor,
                textShadow: content?.content.textShadow,
              }}
              className={`tw-p-2 ${content?.content.fontSize} ${content?.content.textAlign}`}
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default ViewVideoText;
