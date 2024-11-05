import React from "react";

import ViewText from "./ViewText";
import ViewEmptySpace from "./ViewEmptySpace";
import ViewColumnTextAndImage from "./ViewColumnTextAndImage";
import ViewListImages from "./ViewListImages";
import ViewScrollTraget from "./ViewScrollTraget";
import ViewLine from "./ViewLine";
import ViewQuote from "./ViewQuote";
import ViewListFeature from "./ViewListFeature";
import ViewCallToAction from "./ViewCallToAction";
import ViewVideo from "./ViewVideo";
import ViewVideoText from "./ViewVideoText";
import ViewImage from "./ViewImage";
import ViewImageText from "./ViewImageText";
import ViewCountDown from "./ViewCountdown";
import ViewFormActivity from "./ViewFormActivity";
import ViewButtonUpdate from "./ViewButtonUpdate";
import ViewFAQ from "./ViewFAQ";
import ViewTestimony from "./ViewTestimony";
import ViewFormCheckout from "./ViewFormCheckout";
import ViewStockCounter from "./ViewStockCounter";
import ViewMultiColumn from "./ViewMultiColumn";
import ViewArrowMoved from "./ViewArrowMoved";
import ViewSliderImage from "./ViewSliderImage";
import ViewTabs from "./ViewTabs";
import ViewFrames from "./ViewFrames";

export const ViewMultipleContent = ({
  content,
  focusedIndexSectionContent,
  setSectionContentRef,
  containerRef,
  setPreviewSection,
  isPreview,
  focusedIndexColumn,
  setColumnRef,
  width,
}) => {
  return (
    <>
      <div
        ref={(el) => {
          if (setSectionContentRef) {
            setSectionContentRef(el, content.id);
          }
        }}
        style={{
          ...(focusedIndexSectionContent === content.id && {
            border: "2px solid green",
          }),
        }}
        key={content.id}
        className={`${
          focusedIndexSectionContent === content.id
            ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20  "
            : ""
        }`}
      >
        {content.name === "text" && <ViewText section={content} />}

        {content.name === "empty-space" && (
          <ViewEmptySpace content={content.content} />
        )}

        {content.name === "column-text-and-image" && (
          <ViewColumnTextAndImage
            containerRef={containerRef}
            content={content}
            isPreview={isPreview}
            width={width}
          />
        )}

        {content.name === "list-images" && (
          <ViewListImages
            containerRef={containerRef}
            content={content}
            isPreview={isPreview}
            width={width}
          />
        )}

        {content.name === "scroll-target" && (
          <ViewScrollTraget content={content} />
        )}

        {content.name === "line" && <ViewLine content={content.content} />}

        {content.name === "quote" && <ViewQuote content={content} />}

        {content.name === "list-feature" && (
          <ViewListFeature content={content} />
        )}

        {content.name === "call-to-action" && (
          <ViewCallToAction containerRef={containerRef} content={content} />
        )}

        {content.name === "video" && <ViewVideo content={content} />}

        {content.name === "video-text" && (
          <ViewVideoText
            isPreview={isPreview}
            width={width}
            content={content}
          />
        )}

        {content.name === "image" && (
          <ViewImage containerRef={containerRef} content={content} />
        )}

        {content.name === "image-text" && (
          <ViewImageText
            isPreview={isPreview}
            width={width}
            content={content}
          />
        )}

        {content.name === "slider-image" && (
          <ViewSliderImage containerRef={containerRef} content={content} />
        )}

        {content.name === "countdown" && <ViewCountDown content={content} />}

        {content.name === "form-activity" && (
          <ViewFormActivity content={content} />
        )}

        {content.name === "button" && (
          <ViewButtonUpdate containerRef={containerRef} content={content} />
        )}

        {content.name === "faq" && <ViewFAQ content={content} />}

        {content.name === "testimony" && (
          <ViewTestimony
            content={content}
            isPreview={isPreview}
            width={width}
          />
        )}

        {content.name === "form-checkout" && (
          <ViewFormCheckout
            setPreviewSection={setPreviewSection}
            content={content}
          />
        )}

        {content.name === "stock-counter" && (
          <ViewStockCounter
            setPreviewSection={setPreviewSection}
            content={content}
          />
        )}

        {content.name === "arrow-moved" && (
          <ViewArrowMoved
            setPreviewSection={setPreviewSection}
            content={content}
          />
        )}

        {content.name === "multi-column" && (
          <ViewMultiColumn
            containerRef={containerRef}
            content={content}
            isPreview={isPreview}
            width={content?.wrapperStyle?.width}
            setPreviewSection={setPreviewSection}
            setColumnRef={setColumnRef}
            focusedIndexColumn={focusedIndexColumn}
          />
        )}

        {content.name === "tabs" && (
          <ViewTabs
            containerRef={containerRef}
            content={content}
            isPreview={isPreview}
            width={width}
            setPreviewSection={setPreviewSection}
            setColumnRef={setColumnRef}
            focusedIndexColumn={focusedIndexColumn}
          />
        )}

        {content.name === "frames" && (
          <ViewFrames
            content={content}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        )}
      </div>
    </>
  );
};
