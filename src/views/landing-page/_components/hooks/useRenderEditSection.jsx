import React, { useCallback } from "react";
import ArrowMoved from "../add/arrow-moved";
import Buttons from "../add/button";
import CallToAction from "../add/call-to-action";
import ColumnTextAndImages from "../add/colum-text-and-image";
import CountDown from "../add/countdown";
import EmptySpace from "../add/empty-space";
import FAQ from "../add/faq";
import FbPixelEvent from "../add/fb-pixel-event";
import FloatingButton from "../add/floating-button";
import FloatingButtonCircle from "../add/floating-button-circle";
import FloatingContent from "../add/floating-content";
import FormActivity from "../add/form-activity";
import FormCheckout from "../add/form-checkout";
import Frames from "../add/frames";
import Image from "../add/image";
import ImageText from "../add/image-text";
import Line from "../add/line";
import ListFeature from "../add/list-feature";
import ListImages from "../add/list-images";
import MultiColumnUpdate from "../add/multi-column-update";
import PopUp from "../add/popup";
import Quote from "../add/quote";
import SalesNotification from "../add/sales-notification";
import ScrollTarget from "../add/scroll-target";
import SliderImage from "../add/slider-image";
import StockCounter from "../add/stock-counter";
import Testimony from "../add/testimony";
import Text from "../add/text";
import Video from "../add/video";
import VideoText from "../add/video-text";
import Tabs from "../add/tabs";

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
  pageSetting,
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
            setPreviewFloatingSection={setPreviewFloatingSection}
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
        editing.name === "slider-image" &&
        section.name === "slider-image" &&
        editing.id === section.id
      ) {
        return (
          <SliderImage
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
          <MultiColumnUpdate
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            currentSection={section}
            isShowContent={(value) => setEditing(value)}
            handleSectionContentFocus={handleSectionContentFocus}
            previewFloatingSection={previewFloatingSection}
            setPreviewFloatingSection={setPreviewFloatingSection}
            handleSectionFocus={handleColumnFocus}
            pageSetting={pageSetting}
            isEditing={true}
            sectionBeforeEdit={sectionBeforeEdit}
            handleColumnFocus={handleColumnFocus}
          />
        );
      }

      if (
        editing.name === "tabs" &&
        section.name === "tabs" &&
        editing.id === section.id
      ) {
        return (
          <Tabs
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            currentSection={section}
            isShowContent={(value) => setEditing(value)}
            handleSectionContentFocus={handleSectionContentFocus}
            previewFloatingSection={previewFloatingSection}
            setPreviewFloatingSection={setPreviewFloatingSection}
            handleSectionFocus={handleColumnFocus}
            isEditing={true}
            sectionBeforeEdit={sectionBeforeEdit}
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
        editing.name === "sales-notification" &&
        section.name === "sales-notification" &&
        editing.id === section.id
      ) {
        return (
          <SalesNotification
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
      pageSetting,
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
