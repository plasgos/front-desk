import React, { forwardRef } from "react";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";
import ViewButtonUpdate from "./ViewButtonUpdate";
import ViewCallToAction from "./ViewCallToAction";
import ViewColumnTextAndImage from "./ViewColumnTextAndImage";
import ViewCountDown from "./ViewCountdown";
import ViewEmptySpace from "./ViewEmptySpace";
import ViewFAQ from "./ViewFAQ";
import ViewFormActivity from "./ViewFormActivity";
import ViewFormCheckout from "./ViewFormCheckout";
import ViewImage from "./ViewImage";
import ViewImageText from "./ViewImageText";
import ViewLine from "./ViewLine";
import ViewListFeature from "./ViewListFeature";
import ViewListImages from "./ViewListImages";
import ViewQuote from "./ViewQuote";
import ViewScrollTraget from "./ViewScrollTraget";
import ViewStockCounter from "./ViewStockCounter";
import ViewTestimony from "./ViewTestimony";
import ViewText from "./ViewText";
import ViewVideo from "./ViewVideo";
import ViewVideoText from "./ViewVideoText";
import useAnimatedVisibility from "../../../../hooks/useAnimatedVisibility";
import ViewMultiColumn from "./ViewMultiColumn";
import ViewArrowMoved from "./ViewArrowMoved";
import ViewSliderImage from "./ViewSliderImage";
import ViewFrames from "./ViewFrames";
const ViewFloatingContent = forwardRef(
  ({
    containerRef,
    isDragging,
    width,
    isResizing,
    content,
    isFocused,
    isPreview,
    setSectionContentRef = null,
    focusedIndexSectionContent = null,
    setPreviewFloatingSection,
    setPreviewSection,
    setColumnRef,
    focusedIndexColumn,
  }) => {
    const stylesBg = useBackgroundStyles(content);

    const { elementRef, getClassName, duration } =
      useAnimatedVisibility(content);

    return (
      <div
        ref={elementRef}
        className={`${content?.wrapperStyle?.shadow} ${getClassName()}`}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(content?.wrapperStyle?.position === "bottom"
            ? { bottom: 0 }
            : {}),
          paddingTop: stylesBg.paddingTop,
          paddingBottom: stylesBg.paddingBottom,
          backgroundColor: content.background.bgColor || "",
          position: "absolute",
          width: "100%",
          zIndex: 999,
          "--animation-duration": `${duration}s`,
        }}
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

        {content.content.map((section) => {
          return (
            <div
              ref={(el) => {
                if (setSectionContentRef) {
                  setSectionContentRef(el, section.id);
                }
              }}
              style={{
                zIndex: 2,
                flexGrow: 1,
                ...(focusedIndexSectionContent === section.id && {
                  border: "2px solid green",
                }),
              }}
              key={section.id}
              className={` tw-flex tw-flex-col  ${
                focusedIndexSectionContent === section.id
                  ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20"
                  : ""
              } `}
            >
              {section.name === "text" && <ViewText section={section} />}

              {section.name === "empty-space" && (
                <ViewEmptySpace content={section.content} />
              )}

              {section.name === "column-text-and-image" && (
                <ViewColumnTextAndImage
                  containerRef={containerRef}
                  content={section}
                  isPreview={isPreview}
                  width={width}
                />
              )}

              {section.name === "list-images" && (
                <ViewListImages
                  containerRef={containerRef}
                  content={section}
                  isPreview={isPreview}
                  width={width}
                />
              )}

              {section.name === "scroll-target" && (
                <ViewScrollTraget content={section} />
              )}

              {section.name === "line" && (
                <ViewLine content={section.content} />
              )}

              {section.name === "quote" && <ViewQuote content={section} />}

              {section.name === "list-feature" && (
                <ViewListFeature content={section} />
              )}

              {section.name === "call-to-action" && (
                <ViewCallToAction
                  containerRef={containerRef}
                  content={section}
                />
              )}

              {section.name === "video" && <ViewVideo content={section} />}

              {section.name === "video-text" && (
                <ViewVideoText
                  isPreview={isPreview}
                  width={width}
                  content={section}
                />
              )}

              {section.name === "image" && (
                <ViewImage containerRef={containerRef} content={section} />
              )}

              {section.name === "image-text" && (
                <ViewImageText
                  isPreview={isPreview}
                  width={width}
                  content={section}
                />
              )}

              {section.name === "slider-image" && (
                <ViewSliderImage
                  containerRef={containerRef}
                  content={section}
                />
              )}

              {section.name === "countdown" && (
                <ViewCountDown content={section} />
              )}

              {section.name === "form-activity" && (
                <ViewFormActivity content={section} />
              )}

              {section.name === "button" && (
                <ViewButtonUpdate
                  containerRef={containerRef}
                  content={section}
                />
              )}

              {section.name === "faq" && <ViewFAQ content={section} />}

              {section.name === "testimony" && (
                <ViewTestimony
                  content={section}
                  isPreview={isPreview}
                  width={width}
                />
              )}

              {section.name === "form-checkout" && (
                <ViewFormCheckout
                  setPreviewSection={setPreviewSection}
                  content={section}
                />
              )}

              {section.name === "stock-counter" && (
                <ViewStockCounter
                  setPreviewSection={setPreviewSection}
                  content={section}
                />
              )}

              {section.name === "arrow-moved" && (
                <ViewArrowMoved content={section} />
              )}

              {section.name === "frames" && (
                <ViewFrames
                  content={section}
                  setSectionContentRef={setSectionContentRef}
                  focusedIndexSectionContent={focusedIndexSectionContent}
                />
              )}

              {section.name === "multi-column" && (
                <ViewMultiColumn
                  containerRef={containerRef}
                  content={section}
                  isPreview={isPreview}
                  width={content?.wrapperStyle?.width}
                  setPreviewSection={setPreviewSection}
                  setColumnRef={setColumnRef}
                  focusedIndexColumn={focusedIndexColumn}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

export default ViewFloatingContent;
