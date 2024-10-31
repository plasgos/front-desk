import React, { forwardRef } from "react";

import { useBackgroundStyles } from "../../../../../hooks/useBackgroundStyles";
import ViewButtonUpdate from "../ViewButtonUpdate";
import ViewColumnTextAndImage from "../ViewColumnTextAndImage";
import ViewEmptySpace from "../ViewEmptySpace";
import ViewFAQ from "../ViewFAQ";
import ViewFormCheckout from "../ViewFormCheckout";
import ViewImage from "../ViewImage";
import ViewImageText from "../ViewImageText";
import ViewLine from "../ViewLine";
import ViewListFeature from "../ViewListFeature";
import ViewListImages from "../ViewListImages";
import ViewQuote from "../ViewQuote";
import ViewScrollTraget from "../ViewScrollTraget";
import ViewTestimony from "../ViewTestimony";
import ViewText from "../ViewText";
import ViewVideo from "../ViewVideo";
import ViewVideoText from "../ViewVideoText";
import ViewCallToAction from "../ViewCallToAction";
import ViewFormActivity from "../ViewFormActivity";
import ViewCountDown from "../ViewCountdown";
import ViewStockCounter from "../ViewStockCounter";
import ViewArrowMoved from "../ViewArrowMoved";
import ViewFrames from "../ViewFrames";

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
      setPreviewSection,
      setColumnRef,
      focusedIndexColumn,
      setSectionContentRef,
      focusedIndexSectionContent,
    },
    ref
  ) => {
    const stylesBg = useBackgroundStyles(content);

    const { combineColumnInMobileView } = content.wrapperStyle;

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
            maxWidth: "100%",
            flexWrap:
              isPreview && combineColumnInMobileView && width < 420
                ? "wrap"
                : "nowrap",
          }}
          className={` tw-flex    ${
            isFocused &&
            "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20 "
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

          {content?.content.map((column) => {
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

            const gradientStyle = {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              zIndex: -1,
              backgroundImage: `linear-gradient(${
                column.background?.direction
              }, ${
                column.background?.isRevert
                  ? column.background?.toColor
                  : column.background?.fromColor
              }, ${
                column.background?.isRevert
                  ? column.background?.fromColor
                  : column.background?.toColor
              })`,
            };

            const backgroundPatternStyle = {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: column.background?.pattern
                ? `url(${column.background.pattern})`
                : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              zIndex: -1,
              overflow: "hidden",
            };

            const wrapperPreview = combineColumnInMobileView
              ? {
                  display: isPreview && width < 420 ? "flex" : "",
                  width: "100%",
                  justifyContent: isPreview && width < 420 ? "center" : "",
                }
              : {
                  ...(content?.wrapperStyle?.isWidthCustom === "equal"
                    ? { flex: "1 1 0%" }
                    : { flex: `${column.width} 1 0% ` }),
                };

            return (
              <div
                ref={(el) => {
                  if (setColumnRef) {
                    setColumnRef(el, column?.id);
                  }
                }}
                style={{
                  ...wrapperPreview,
                  ...(focusedIndexColumn === column?.id && {
                    border: "2px solid green",
                  }),
                }}
                className={`${
                  focusedIndexColumn === column?.id
                    ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20  "
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
                  className={`tw-flex tw-flex-col`}
                >
                  <div style={backgroundImgStyle}></div>

                  {column?.background?.bgImage ? (
                    <div style={backgroundImgStyle}></div>
                  ) : column?.background?.bgType === "gradient" ? (
                    <div style={gradientStyle}></div>
                  ) : column?.background?.bgType === "pattern" ? (
                    <div style={backgroundPatternStyle}></div>
                  ) : null}

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

                  {column.content.map((contentItem) => {
                    return (
                      <div key={contentItem.id}>
                        {contentItem.name === "text" && (
                          <ViewText
                            section={contentItem}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "column-text-and-image" && (
                          <ViewColumnTextAndImage
                            containerRef={containerRef}
                            content={contentItem}
                            isResizing={isResizing}
                            isPreview={isPreview}
                            width={width}
                          />
                        )}

                        {contentItem.name === "empty-space" && (
                          <ViewEmptySpace
                            content={contentItem.content}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "list-images" && (
                          <ViewListImages
                            containerRef={containerRef}
                            content={contentItem}
                            isResizing={isResizing}
                            isPreview={isPreview}
                            width={width}
                          />
                        )}

                        {contentItem.name === "scroll-target" && (
                          <ViewScrollTraget
                            content={contentItem}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "quote" && (
                          <ViewQuote
                            content={contentItem}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "image" && (
                          <ViewImage
                            content={contentItem}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "image-text" && (
                          <ViewImageText
                            content={contentItem}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "line" && (
                          <ViewLine
                            content={contentItem.content}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "list-feature" && (
                          <ViewListFeature
                            content={contentItem}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "testimony" && (
                          <ViewTestimony
                            content={contentItem}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "button" && (
                          <ViewButtonUpdate
                            content={contentItem}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "faq" && (
                          <ViewFAQ
                            content={contentItem}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "form-checkout" && (
                          <ViewFormCheckout
                            setPreviewSection={setPreviewSection}
                            content={contentItem}
                            isResizing={isResizing}
                            sectionId={content.id}
                            columnId={column.id}
                            isMultiColumn={true}
                          />
                        )}

                        {contentItem.name === "video" && (
                          <ViewVideo
                            content={contentItem}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "video-text" && (
                          <ViewVideoText
                            content={contentItem}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "call-to-action" && (
                          <ViewCallToAction
                            content={contentItem}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "form-activity" && (
                          <ViewFormActivity
                            content={contentItem}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "countdown" && (
                          <ViewCountDown
                            content={contentItem}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "stock-counter" && (
                          <ViewStockCounter
                            content={contentItem}
                            isResizing={isResizing}
                          />
                        )}

                        {contentItem.name === "arrow-moved" && (
                          <ViewArrowMoved content={contentItem} />
                        )}

                        {contentItem.name === "frames" && (
                          <ViewFrames
                            content={contentItem}
                            setSectionContentRef={setSectionContentRef}
                            focusedIndexSectionContent={
                              focusedIndexSectionContent
                            }
                          />
                        )}

                        {contentItem.name === "multi-column" && (
                          <ViewMultiColumn
                            setPreviewSection={setPreviewSection}
                            content={contentItem}
                          />
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
