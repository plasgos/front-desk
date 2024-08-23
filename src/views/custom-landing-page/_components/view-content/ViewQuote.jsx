import React, { forwardRef } from "react";

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
      backgroundImage: `url(${content.background?.bgImage})` || "",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: `blur(${content.background?.blur}px)`,
      zIndex: -1,
      overflow: "hidden",
    };

    const calculateOpacity = content.background?.opacity / 100;

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
          // ...backgroundImgStyle,
          paddingTop,
          paddingBottom,
          backgroundColor: content.background?.bgColor || "",
          position: "relative",
          zIndex: 1,
        }}
        className={` tw-my-2`}
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

        <div className="tw-flex tw-flex-col tw-items-center tw-p-3 tw-w-full ">
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
