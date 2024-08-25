import React, { forwardRef } from "react";
import Layout8 from "./Layout8";
import Layout7 from "./Layout7";
import Layout6 from "./Layout6";
import Layout5 from "./Layout5";
import Layout4 from "./Layout4";
import Layout3 from "./Layout3";
import Layout2 from "./Layout2";
import Layout1 from "./Layout1";

const ViewTestimony = forwardRef(
  ({ isPreview, width, isDragging, content, isResizing, isFocused }, ref) => {
    const paddingTop = content.background?.paddingTop
      ? `calc(16px + ${content.background.paddingTop}px)`
      : content.background?.paddingY
      ? `calc(16px + ${content.background.paddingY}px)`
      : "16px";

    const paddingBottom = content.background?.paddingBottom
      ? `calc(16px + ${content.background.paddingBottom}px)`
      : content.background?.paddingY
      ? `calc(16px + ${content.background.paddingY}px)`
      : "16px";

    const backgroundImgStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${content.background.bgImage})` || "",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: `blur(${content.background?.blur}px)`,
      zIndex: -1,
      overflow: "hidden",
    };

    const calculateOpacity = content.background?.opacity / 100;

    return (
      <div
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
          paddingTop,
          paddingBottom,
          backgroundColor: content.background.bgColor || "",
          position: "relative",
          zIndex: 1,
        }}
        className={`tw-w-full tw-flex tw-flex-wrap ${content.wrapperStyle?.jusctifyContent} tw-items-center tw-p-4 
          `}
      >
        <div style={backgroundImgStyle}></div>

        {content.background?.opacity ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor:
                content.background?.opacity < 0 ? "black" : "white",
              opacity: Math.abs(calculateOpacity),
            }}
          ></div>
        ) : null}
        {content.content?.map((item) => (
          <div
            style={{
              zIndex: 2,
              paddingLeft: content.wrapperStyle?.paddingX,
              paddingRight: content.wrapperStyle?.paddingX,
              paddingBottom: content.wrapperStyle?.paddingX
                ? `calc(${content.wrapperStyle.paddingX}px * 2)`
                : "0px",
            }}
            key={item.id}
            className={
              isPreview
                ? `${
                    width === "100%" || width >= 640
                      ? `${content?.wrapperStyle?.column}`
                      : "tw-w-full"
                  } `
                : `tw-w-full sm:${content.wrapperStyle?.column}   `
            }
          >
            {content.wrapperStyle?.layout === "1" && (
              <Layout1 content={content} item={item} />
            )}
            {content.wrapperStyle?.layout === "2" && (
              <Layout2 content={content} item={item} />
            )}

            {content.wrapperStyle?.layout === "3" && (
              <Layout3 content={content} item={item} />
            )}

            {content.wrapperStyle?.layout === "4" && (
              <Layout4 content={content} item={item} />
            )}
            {content.wrapperStyle?.layout === "5" && (
              <Layout5 content={content} item={item} />
            )}

            {content.wrapperStyle?.layout === "6" && (
              <Layout6 content={content} item={item} />
            )}

            {content.wrapperStyle?.layout === "7" && (
              <Layout7 content={content} item={item} />
            )}

            {content.wrapperStyle?.layout === "8" && (
              <Layout8 content={content} item={item} />
            )}
          </div>
        ))}
      </div>
    );
  }
);

export default ViewTestimony;
