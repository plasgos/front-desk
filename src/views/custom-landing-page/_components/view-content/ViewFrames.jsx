import React, { forwardRef } from "react";
import useAnimatedVisibility from "../../../../hooks/useAnimatedVisibility";
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
import ViewMultiColumn from "./ViewMultiColumn";

const ViewFrames = forwardRef(
  (
    {
      containerRef,
      isPreview,
      width,
      isDragging,
      isResizing,
      content,
      isFocused,
      setSectionContentRef,
      focusedIndexSectionContent,
      setPreviewSection,
      setColumnRef,
      focusedIndexColumn,
    },
    ref
  ) => {
    const stylesBg = useBackgroundStyles(content);

    const { elementRef, getClassName, duration } =
      useAnimatedVisibility(content);

    const paddingTop = content.wrapperStyle?.paddingTop
      ? `calc(16px + ${content.wrapperStyle.paddingTop}px)`
      : content.wrapperStyle?.paddingY
      ? `calc(16px + ${content.wrapperStyle.paddingY}px)`
      : "16px";

    const paddingBottom = content.wrapperStyle?.paddingBottom
      ? `calc(16px + ${content.wrapperStyle.paddingBottom}px)`
      : content.wrapperStyle?.paddingY
      ? `calc(16px + ${content.wrapperStyle.paddingY}px)`
      : "16px";

    const backgroundImgStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: content.wrapperStyle?.bgImage
        ? `url(${content.wrapperStyle.bgImage})`
        : "",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: `blur(${content.wrapperStyle?.blur}px)`,
      zIndex: -1,
      overflow: "hidden",
    };

    const calculateOpacity = content.wrapperStyle?.opacity / 100;

    const gradientStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      zIndex: -1,
      backgroundImage: `linear-gradient(${content.wrapperStyle?.direction}, ${
        content.wrapperStyle?.isRevert
          ? content.wrapperStyle?.toColor
          : content.wrapperStyle?.fromColor
      }, ${
        content.wrapperStyle?.isRevert
          ? content.wrapperStyle?.fromColor
          : content.wrapperStyle?.toColor
      })`,
    };

    const backgroundPatternStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: content.wrapperStyle?.pattern
        ? `url(${content.wrapperStyle.pattern})`
        : "",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: -1,
      overflow: "hidden",
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
        className={` tw-flex tw-flex-row tw-flex-wrap tw-justify-center tw-items-center ${
          isFocused &&
          "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20 "
        }  `}
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
          className={`${getClassName()} ${
            content.wrapperStyle?.shadow ? content.wrapperStyle?.shadow : ""
          }`}
          style={{
            width: width < 420 ? "80%" : content.wrapperStyle.width,
            borderRadius: content.wrapperStyle?.rounded,
            transform: `rotate(${content.wrapperStyle?.rotation}deg)`,
            transition: "transform 0.5s ease",
            paddingTop,
            paddingBottom,
            backgroundColor: content?.wrapperStyle.bgColor,
            position: "relative",
            overflow: "hidden",
            zIndex: 1,
            "--animation-duration": `${duration}s`,
          }}
        >
          {content?.wrapperStyle?.bgImage ? (
            <div style={backgroundImgStyle}></div>
          ) : content?.wrapperStyle?.bgType === "gradient" ? (
            <div style={gradientStyle}></div>
          ) : content?.wrapperStyle?.bgType === "pattern" ? (
            <div style={backgroundPatternStyle}></div>
          ) : null}

          {content.wrapperStyle?.opacity ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor:
                  content.wrapperStyle?.opacity < 0 ? "black" : "white",
                opacity: Math.abs(calculateOpacity),
              }}
            ></div>
          ) : null}

          {content.content.map((section) => {
            return (
              <div
                style={{
                  ...(focusedIndexSectionContent === section.id && {
                    border: "2px solid green",
                  }),
                }}
                ref={(el) => setSectionContentRef(el, section.id)}
                key={section.id}
                className={`${
                  focusedIndexSectionContent === section.id
                    ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20  "
                    : ""
                }`}
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
                    width={content?.wrapperStyle?.width}
                  />
                )}

                {section.name === "list-images" && (
                  <ViewListImages
                    containerRef={containerRef}
                    content={section}
                    isPreview={isPreview}
                    width={content?.wrapperStyle?.width}
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
                    width={content?.wrapperStyle?.width}
                    content={section}
                  />
                )}

                {section.name === "image" && (
                  <ViewImage containerRef={containerRef} content={section} />
                )}

                {section.name === "image-text" && (
                  <ViewImageText
                    isPreview={isPreview}
                    width={content?.wrapperStyle?.width}
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
                    width={content?.wrapperStyle?.width}
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
      </div>
    );
  }
);

export default ViewFrames;
