import React, { forwardRef } from "react";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";

const ViewQuote = forwardRef(
  ({ isDragging, isResizing, content, isFocused }, ref) => {
    const {
      quoteText,
      quoteTextColor,
      quoteTagColor,
      writer,
      writerColor,
      fontSize,
    } = content.content;

    const stylesBg = useBackgroundStyles(content);

    const sanitizedQuoteText = quoteText.replace(
      /<p>/g,
      `<p style="margin: 0; padding: 0; ">`
    );

    return (
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
        className={`  ${
          isFocused &&
          "animate__animated  animate__headShake animate__fast tw-bg-green-300/20 "
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
          style={{ zIndex: 2 }}
          className="tw-flex tw-flex-col tw-items-center tw-p-3 tw-w-full "
        >
          <div className="tw-flex tw-shrink-0 tw-items-center tw-w-full tw-justify-center ">
            <span
              style={{ fontSize: 40, color: quoteTagColor }}
              className="tw-font-bold  tw-self-start"
            >
              “
            </span>

            <div
              sty
              className={` tw-text-center tw-font-bold tw-px-2 custom-quote ${fontSize}  `}
              style={{
                color: quoteTextColor,
              }}
              dangerouslySetInnerHTML={{ __html: sanitizedQuoteText }}
            />

            <span
              style={{
                fontSize: 40,
                color: quoteTagColor,
              }}
              className="tw-font-bold  tw-self-end"
            >
              ”
            </span>
          </div>

          <div style={{ color: writerColor }} className="tw-mt-3">
            {writer}
          </div>
        </div>
      </div>
    );
  }
);

export default ViewQuote;
