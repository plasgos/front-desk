import React, { useCallback } from "react";
import ViewText from "../view-content/ViewText";
import ViewColumnTextAndImage from "../view-content/ViewColumnTextAndImage";
import ViewEmptySpace from "../view-content/ViewEmptySpace";
import ViewListImages from "../view-content/ViewListImages";
import ViewScrollTraget from "../view-content/ViewScrollTraget";
import ViewButtonUpdate from "../view-content/ViewButtonUpdate";
import ViewTestimony from "../view-content/ViewTestimony";
import ViewLine from "../view-content/ViewLine";
import ViewListFeature from "../view-content/ViewListFeature";
import ViewQuote from "../view-content/ViewQuote";
import ViewFAQ from "../view-content/ViewFAQ";
import ViewFormCheckout from "../view-content/ViewFormCheckout";
import ViewFloatingButton from "../view-content/ViewFloatingButton";
import ViewFloatingButtonCircle from "../view-content/ViewFloatingButtonCircle";
import ViewImage from "../view-content/ViewImage";
import ViewImageText from "../view-content/ViewImageText";
import ViewMultiColumn from "../view-content/ViewMultiColumn";
import ViewVideo from "../view-content/ViewVideo";
import ViewVideoText from "../view-content/ViewVideoText";
import ViewCallToAction from "../view-content/ViewCallToAction";
import ViewFormActivity from "../view-content/ViewFormActivity";
import ViewCountDown from "../view-content/ViewCountdown";
import ViewFrame from "../view-content/ViewFrame";
import ViewStockCounter from "../view-content/ViewStockCounter";
import ViewPopUp from "../view-content/ViewPopUp";
import ViewFloatingContent from "../view-content/ViewFloatingContent";
import ViewFrames from "../view-content/ViewFrames";

export function useRenderViewSections({
  id,
  setPreviewSection,
  setPreviewFloatingSection,
  isDragging,
  isResizing,
  setRef,
  focusedIndex,
  focusedIndexSectionContent,
  isPreview,
  dimensions,
  containerRef,
  setSectionContentRef,
  setColumnRef,
  focusedIndexColumn,
}) {
  const renderViewSections = useCallback(
    (section) => {
      if (section.name === "text") {
        return (
          <ViewText
            isDragging={isDragging && section.id === id}
            section={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "column-text-and-image") {
        return (
          <ViewColumnTextAndImage
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            isPreview={isPreview}
            width={dimensions.width}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (section.name === "empty-space") {
        return (
          <ViewEmptySpace
            isDragging={isDragging && section.id === id}
            width={dimensions.width}
            content={section.content}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "list-images") {
        return (
          <ViewListImages
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            width={dimensions.width}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            isPreview={isPreview}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (section.name === "scroll-target") {
        return (
          <ViewScrollTraget
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "button") {
        return (
          <ViewButtonUpdate
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (section.name === "testimony") {
        return (
          <ViewTestimony
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            width={dimensions.width}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            isPreview={isPreview}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (section.name === "line") {
        return (
          <ViewLine
            isDragging={isDragging && section.id === id}
            content={section.content}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "list-feature") {
        return (
          <ViewListFeature
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "quote") {
        return (
          <ViewQuote
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "faq") {
        return (
          <ViewFAQ
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            isPreview={isPreview}
            width={dimensions.width}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (section.name === "form-checkout") {
        return (
          <ViewFormCheckout
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            setPreviewSection={setPreviewSection}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (section.name === "floating-button") {
        return (
          <ViewFloatingButton
            containerRef={containerRef}
            content={section}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (section.name === "floating-button-circle") {
        return (
          <ViewFloatingButtonCircle
            containerRef={containerRef}
            content={section}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (section.name === "image") {
        return (
          <ViewImage
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "image-text") {
        return (
          <ViewImageText
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            isPreview={isPreview}
            width={dimensions.width}
          />
        );
      }

      if (section.name === "multi-column") {
        return (
          <ViewMultiColumn
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            width={dimensions.width}
            isPreview={isPreview}
            setPreviewSection={setPreviewSection}
            setColumnRef={setColumnRef}
            focusedIndexColumn={focusedIndexColumn}
          />
        );
      }

      if (section.name === "video") {
        return (
          <ViewVideo
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "video-text") {
        return (
          <ViewVideoText
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            isPreview={isPreview}
            width={dimensions.width}
          />
        );
      }

      if (section.name === "call-to-action") {
        return (
          <ViewCallToAction
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "form-activity") {
        return (
          <ViewFormActivity
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "countdown") {
        return (
          <ViewCountDown
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "frames") {
        return (
          <ViewFrames
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
            isPreview={isPreview}
            width={dimensions.width}
            setPreviewSection={setPreviewSection}
            setColumnRef={setColumnRef}
            focusedIndexColumn={focusedIndexColumn}
          />
        );
      }

      if (section.name === "stock-counter") {
        return (
          <ViewStockCounter
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, section.id)}
            isFocused={focusedIndex === section.id}
          />
        );
      }

      if (section.name === "popup") {
        return (
          <ViewPopUp
            containerRef={containerRef}
            content={section}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
            setPreviewFloatingSection={setPreviewFloatingSection}
            setPreviewSection={setPreviewSection}
            isPreview={isPreview}
            width={dimensions.width}
            setColumnRef={setColumnRef}
            focusedIndexColumn={focusedIndexColumn}
          />
        );
      }

      if (section.name === "floating-content") {
        return (
          <ViewFloatingContent
            containerRef={containerRef}
            content={section}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
            setPreviewFloatingSection={setPreviewFloatingSection}
            setPreviewSection={setPreviewSection}
            isPreview={isPreview}
            width={dimensions.width}
            setColumnRef={setColumnRef}
            focusedIndexColumn={focusedIndexColumn}
          />
        );
      }

      return null;
    },
    [
      containerRef,
      dimensions.width,
      focusedIndex,
      focusedIndexColumn,
      focusedIndexSectionContent,
      id,
      isDragging,
      isPreview,
      isResizing,
      setColumnRef,
      setPreviewFloatingSection,
      setPreviewSection,
      setRef,
      setSectionContentRef,
    ]
  );

  return { renderViewSections };
}
