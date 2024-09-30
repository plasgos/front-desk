import React, { forwardRef } from "react";
import useAnimatedVisibility from "../../../../../hooks/useAnimatedVisibility";

import ViewText from "../ViewText";
import { useBackgroundStyles } from "../../../../../hooks/useBackgroundStyles";
import ViewColumnTextAndImage from "../ViewColumnTextAndImage";
import ViewEmptySpace from "../ViewEmptySpace";
import ViewListImages from "../ViewListImages";
import ViewScrollTraget from "../ViewScrollTraget";
import ViewQuote from "../ViewQuote";
import ViewImage from "../ViewImage";
import ViewImageText from "../ViewImageText";
import ViewLine from "../ViewLine";
import ViewListFeature from "../ViewListFeature";
import ViewTestimony from "../ViewTestimony";
import ViewButtonUpdate from "../ViewButtonUpdate";
import ViewFAQ from "../ViewFAQ";

const ViewMultiColumn = forwardRef(
  (
    {
      containerRef,
      isDragging,
      isResizing,
      content,
      isFocused,
      width,
      isPreview,
    },
    ref
  ) => {
    const stylesBg = useBackgroundStyles(content);

    const { elementRef, getClassName, duration } =
      useAnimatedVisibility(content);

    return (
      <>
        <div
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
          // className="tw-flex tw-flex-row tw-justify-center tw-items-center tw-flex-wrap tw-p-3 tw-gap-y-3"
          className=" tw-flex   "
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

          {content?.column.map((column) => {
            const paddingTop = column.background?.paddingTop
              ? `calc(16px + ${column.background.paddingTop}px)`
              : column.background?.paddingY
              ? `calc(16px + ${column.background.paddingY}px)`
              : "16px";

            const paddingBottom = column.background?.paddingBottom
              ? `calc(16px + ${column.background.paddingBottom}px)`
              : column.background?.paddingY
              ? `calc(16px + ${column.background.paddingY}px)`
              : "16px";

            const backgroundImgStyle = {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: column.background?.bgImage
                ? `url(${column.background.bgImage})`
                : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: `blur(${column.background?.blur}px)`,
              zIndex: -1,
              overflow: "hidden",
            };

            const calculateOpacity = column.background?.opacity / 100;
            return (
              <div
                style={{
                  ...(content?.wrapperStyle?.isWidthCustom === "equal"
                    ? { flex: "1 1 0%" }
                    : { flex: `${column.width} 1 0% ` }),
                }}
                className={`${
                  content?.wrapperStyle?.isWidthCustom === "equal"
                    ? "tw-flex-1"
                    : ""
                }`}
                key={column.id}
              >
                <div
                  style={{
                    paddingTop: paddingTop,
                    paddingBottom: paddingBottom,
                    backgroundColor: column.background.bgColor || "",
                    position: "relative",
                    zIndex: 1,
                  }}
                  className="tw-flex tw-flex-col "
                >
                  <div style={backgroundImgStyle}></div>

                  {column.background?.opacity ? (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor:
                          column.background?.opacity < 0 ? "black" : "white",
                        opacity: Math.abs(calculateOpacity),
                      }}
                    ></div>
                  ) : null}

                  {column.content.map((content) => {
                    return (
                      <div key={content.id}>
                        {content.name === "text" && (
                          <ViewText section={content} isResizing={isResizing} />
                        )}

                        {content.name === "column-text-and-image" && (
                          <ViewColumnTextAndImage
                            containerRef={containerRef}
                            content={content}
                            isResizing={isResizing}
                            isPreview={isPreview}
                            width={width}
                          />
                        )}

                        {content.name === "empty-space" && (
                          <ViewEmptySpace
                            content={content.content}
                            isResizing={isResizing}
                          />
                        )}

                        {content.name === "list-images" && (
                          <ViewListImages
                            containerRef={containerRef}
                            content={content}
                            isResizing={isResizing}
                            isPreview={isPreview}
                            width={width}
                          />
                        )}

                        {content.name === "scroll-target" && (
                          <ViewScrollTraget
                            content={content}
                            isResizing={isResizing}
                          />
                        )}

                        {content.name === "quote" && (
                          <ViewQuote
                            content={content}
                            isResizing={isResizing}
                          />
                        )}

                        {content.name === "image" && (
                          <ViewImage
                            content={content}
                            isResizing={isResizing}
                          />
                        )}

                        {content.name === "image-text" && (
                          <ViewImageText
                            content={content}
                            isResizing={isResizing}
                          />
                        )}

                        {content.name === "line" && (
                          <ViewLine
                            content={content.content}
                            isResizing={isResizing}
                          />
                        )}

                        {content.name === "list-feature" && (
                          <ViewListFeature
                            content={content}
                            isResizing={isResizing}
                          />
                        )}

                        {content.name === "testimony" && (
                          <ViewTestimony
                            content={content}
                            isResizing={isResizing}
                          />
                        )}

                        {content.name === "button" && (
                          <ViewButtonUpdate
                            content={content}
                            isResizing={isResizing}
                          />
                        )}

                        {content.name === "faq" && (
                          <ViewFAQ content={content} isResizing={isResizing} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
);

export default ViewMultiColumn;
