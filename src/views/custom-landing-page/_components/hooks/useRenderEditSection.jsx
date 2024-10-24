import React, { useCallback } from "react";
import Text from "../list-add-content/text";
import EmptySpace from "../list-add-content/empty-space";
import ColumnTextAndImages from "../list-add-content/colum-text-and-image";
import ListImages from "../list-add-content/list-images";
import ScrollTarget from "../list-add-content/scroll-target";
import Line from "../list-add-content/line";
import Quote from "../list-add-content/quote";
import ListFeature from "../list-add-content/list-feature";
import CallToAction from "../list-add-content/call-to-action";
import Video from "../list-add-content/video";
import VideoText from "../list-add-content/video-text";
import Image from "../list-add-content/image";
import ImageText from "../list-add-content/image-text";
import CountDown from "../list-add-content/countdown";
import FormActivity from "../list-add-content/form-activity";
import Buttons from "../list-add-content/button";
import FAQ from "../list-add-content/faq";
import Testimony from "../list-add-content/testimony";
import FormCheckout from "../list-add-content/form-checkout";
import StockCounter from "../list-add-content/stock-counter";
import FloatingButton from "../list-add-content/floating-button";
import FbPixelEvent from "../list-add-content/fb-pixel-event";
import MultiColumn from "../list-add-content/multi-column";
import FloatingButtonCircle from "../list-add-content/floating-button-circle";
import Frame from "../list-add-content/frame";
import PopUp from "../list-add-content/popup";
import FloatingContent from "../list-add-content/floating-content";
import Frames from "../list-add-content/frames";
import ArrowMoved from "../list-add-content/arrow-moved";

export function useRenderEditSection({
  previewSection,
  setPreviewSection,
  editing,
  setEditing,
  sectionBeforeEdit,
  handleSectionContentFocus,
  previewFloatingSection,
  setPreviewFloatingSection,
  sectionFloatingBeforeEdit,
  handleColumnFocus,
  isPopUpSection,
}) {
  const renderEditSection = useCallback(
    (section) => {
      if (
        editing.name === "text" &&
        section.name === "text" &&
        editing.id === section.id
      ) {
        return (
          <Text
            currentSection={section}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      if (
        editing.name === "column-text-and-image" &&
        section.name === "column-text-and-image" &&
        editing.id === section.id
      ) {
        return (
          <ColumnTextAndImages
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
            handleSectionContentFocus={handleSectionContentFocus}
            hiddenFocused={isPopUpSection}
          />
        );
      }

      if (
        editing.name === "empty-space" &&
        section.name === "empty-space" &&
        editing.id === section.id
      ) {
        return (
          <EmptySpace
            currentSection={section}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      if (
        editing.name === "list-images" &&
        section.name === "list-images" &&
        editing.id === section.id
      ) {
        return (
          <ListImages
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
            handleSectionContentFocus={handleSectionContentFocus}
            hiddenFocused={isPopUpSection}
          />
        );
      }

      if (
        editing.name === "scroll-target" &&
        section.name === "scroll-target" &&
        editing.id === section.id
      ) {
        return (
          <ScrollTarget
            currentSection={section}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      if (
        editing.name === "button" &&
        section.name === "button" &&
        editing.id === section.id
      ) {
        return (
          <Buttons
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
            handleSectionContentFocus={handleSectionContentFocus}
            hiddenFocused={isPopUpSection}
          />
        );
      }

      if (
        editing.name === "testimony" &&
        section.name === "testimony" &&
        editing.id === section.id
      ) {
        return (
          <Testimony
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
            handleSectionContentFocus={handleSectionContentFocus}
            hiddenFocused={isPopUpSection}
          />
        );
      }

      if (
        editing.name === "line" &&
        section.name === "line" &&
        editing.id === section.id
      ) {
        return (
          <Line
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditing={true}
          />
        );
      }

      if (
        editing.name === "list-feature" &&
        section.name === "list-feature" &&
        editing.id === section.id
      ) {
        return (
          <ListFeature
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      if (
        editing.name === "quote" &&
        section.name === "quote" &&
        editing.id === section.id
      ) {
        return (
          <Quote
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditing={true}
          />
        );
      }

      if (
        editing.name === "faq" &&
        section.name === "faq" &&
        editing.id === section.id
      ) {
        return (
          <FAQ
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
            handleSectionContentFocus={handleSectionContentFocus}
            hiddenFocused={isPopUpSection}
          />
        );
      }

      if (
        editing.name === "form-checkout" &&
        section.name === "form-checkout" &&
        editing.id === section.id
      ) {
        return (
          <FormCheckout
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
            handleSectionContentFocus={handleSectionContentFocus}
            hiddenFocused={isPopUpSection}
          />
        );
      }

      if (
        editing.name === "floating-button" &&
        section.name === "floating-button" &&
        editing.id === section.id
      ) {
        return (
          <FloatingButton
            currentSection={section}
            previewFloatingSection={previewFloatingSection}
            setPreviewFloatingSection={(value) =>
              setPreviewFloatingSection(value)
            }
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionFloatingBeforeEdit}
            isEditingSection={true}
            handleSectionContentFocus={handleSectionContentFocus}
          />
        );
      }

      if (
        editing.name === "floating-content" &&
        section.name === "floating-content" &&
        editing.id === section.id
      ) {
        return (
          <FloatingContent
            currentSection={section}
            previewFloatingSection={previewFloatingSection}
            setPreviewFloatingSection={(value) =>
              setPreviewFloatingSection(value)
            }
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionFloatingBeforeEdit}
            isEditingSection={true}
            handleSectionContentFocus={handleSectionContentFocus}
            handleColumnFocus={handleColumnFocus}
          />
        );
      }

      if (
        editing.name === "fb-pixel-event" &&
        section.name === "fb-pixel-event" &&
        editing.id === section.id
      ) {
        return (
          <FbPixelEvent
            currentSection={section}
            previewFloatingSection={previewFloatingSection}
            setPreviewFloatingSection={(value) =>
              setPreviewFloatingSection(value)
            }
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionFloatingBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      if (
        editing.name === "image" &&
        section.name === "image" &&
        editing.id === section.id
      ) {
        return (
          <Image
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      if (
        editing.name === "image-text" &&
        section.name === "image-text" &&
        editing.id === section.id
      ) {
        return (
          <ImageText
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      if (
        editing.name === "multi-column" &&
        section.name === "multi-column" &&
        editing.id === section.id
      ) {
        return (
          <MultiColumn
            currentSectionMultiColumn={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowMultiColumn={(value) => setEditing(value)}
            sectionMultiColumnBeforeEdit={sectionBeforeEdit}
            isEditingSectionMultiColumn={true}
            handleColumnFocus={handleColumnFocus}
          />
        );
      }

      if (
        editing.name === "video" &&
        section.name === "video" &&
        editing.id === section.id
      ) {
        return (
          <Video
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      if (
        editing.name === "video-text" &&
        section.name === "video-text" &&
        editing.id === section.id
      ) {
        return (
          <VideoText
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      if (
        editing.name === "call-to-action" &&
        section.name === "call-to-action" &&
        editing.id === section.id
      ) {
        return (
          <CallToAction
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      if (
        editing.name === "floating-button-circle" &&
        section.name === "floating-button-circle" &&
        editing.id === section.id
      ) {
        return (
          <FloatingButtonCircle
            currentSection={section}
            previewFloatingSection={previewFloatingSection}
            setPreviewFloatingSection={(value) =>
              setPreviewFloatingSection(value)
            }
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionFloatingBeforeEdit}
            isEditingSection={true}
            handleSectionContentFocus={handleSectionContentFocus}
          />
        );
      }

      if (
        editing.name === "form-activity" &&
        section.name === "form-activity" &&
        editing.id === section.id
      ) {
        return (
          <FormActivity
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      if (
        editing.name === "countdown" &&
        section.name === "countdown" &&
        editing.id === section.id
      ) {
        return (
          <CountDown
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      if (
        editing.name === "frames" &&
        section.name === "frames" &&
        editing.id === section.id
      ) {
        return (
          <Frames
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
            handleSectionContentFocus={handleSectionContentFocus}
            previewFloatingSection={previewFloatingSection}
            setPreviewFloatingSection={setPreviewFloatingSection}
            handleColumnFocus={handleColumnFocus}
          />
        );
      }

      if (
        editing.name === "stock-counter" &&
        section.name === "stock-counter" &&
        editing.id === section.id
      ) {
        return (
          <StockCounter
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      if (
        editing.name === "popup" &&
        section.name === "popup" &&
        editing.id === section.id
      ) {
        return (
          <PopUp
            currentSection={section}
            previewFloatingSection={previewFloatingSection}
            setPreviewFloatingSection={(value) =>
              setPreviewFloatingSection(value)
            }
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionFloatingBeforeEdit}
            isEditingSection={true}
            handleSectionContentFocus={handleSectionContentFocus}
            handleColumnFocus={handleColumnFocus}
          />
        );
      }

      if (
        editing.name === "arrow-moved" &&
        section.name === "arrow-moved" &&
        editing.id === section.id
      ) {
        return (
          <ArrowMoved
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      return null;
    },
    [
      editing.id,
      editing.name,
      handleColumnFocus,
      handleSectionContentFocus,
      isPopUpSection,
      previewFloatingSection,
      previewSection,
      sectionBeforeEdit,
      sectionFloatingBeforeEdit,
      setEditing,
      setPreviewFloatingSection,
      setPreviewSection,
    ]
  );

  return { renderEditSection };
}
