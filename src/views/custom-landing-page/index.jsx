import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDragLayer } from "react-dnd";
import { renderToString } from "react-dom/server";
import { IoIosPhonePortrait, IoIosTabletPortrait } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { MdLaptopMac } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  removeOptionScrollTarget,
  setLandingPageSection,
} from "../../redux/modules/custom-landing-page/reducer";
import DesignTabControl from "./_components/DesignTabControl";
import { ListSectionContent } from "./_components/ListSectionContent";
import ModalConfirmation from "./_components/ModalConfirmation";
import ResizableView from "./_components/ResizebleView";
import Input from "./_components/common/Input";
import ListContent from "./_components/list-add-content/";
import Buttons from "./_components/list-add-content/button";
import ColumnTextAndImages from "./_components/list-add-content/colum-text-and-image";
import EmptySpace from "./_components/list-add-content/empty-space";
import FAQ from "./_components/list-add-content/faq";
import FloatingButton from "./_components/list-add-content/floating-button";
import FormCheckout from "./_components/list-add-content/form-checkout";
import Image from "./_components/list-add-content/image";
import ImageText from "./_components/list-add-content/image-text";
import Line from "./_components/list-add-content/line/index";
import ListFeature from "./_components/list-add-content/list-feature";
import ListImages from "./_components/list-add-content/list-images";
import Quote from "./_components/list-add-content/quote";
import ScrollTarget from "./_components/list-add-content/scroll-target";
import Testimony from "./_components/list-add-content/testimony";
import Text from "./_components/list-add-content/text/index";
import ViewButtonUpdate from "./_components/view-content/ViewButtonUpdate";
import ViewColumnTextAndImage from "./_components/view-content/ViewColumnTextAndImage";
import ViewEmptySpace from "./_components/view-content/ViewEmptySpace";
import ViewFAQ from "./_components/view-content/ViewFAQ/index";
import ViewFloatingButton from "./_components/view-content/ViewFloatingButton";
import ViewFormCheckout from "./_components/view-content/ViewFormCheckout";
import ViewImage from "./_components/view-content/ViewImage";
import ViewImageText from "./_components/view-content/ViewImageText";
import ViewLine from "./_components/view-content/ViewLine";
import ViewListFeature from "./_components/view-content/ViewListFeature";
import ViewListImages from "./_components/view-content/ViewListImages";
import ViewQuote from "./_components/view-content/ViewQuote";
import ViewScrollTraget from "./_components/view-content/ViewScrollTraget";
import ViewTestimony from "./_components/view-content/ViewTestimony/index";
import ViewText from "./_components/view-content/ViewText";
import ViewMultiColumn from "./_components/view-content/ViewMultiColumn";
import MultiColumn from "./_components/list-add-content/multi-column";
import ViewVideo from "./_components/view-content/ViewVideo";
import Video from "./_components/list-add-content/video";
import VideoText from "./_components/list-add-content/video-text";
import ViewVideoText from "./_components/view-content/ViewVideoText";
import { UnDraggabelList } from "./_components/common/UnDraggabaleList";
import CallToAction from "./_components/list-add-content/call-to-action";
import ViewCallToAction from "./_components/view-content/ViewCallToAction";
import FloatingButtonCircle from "./_components/list-add-content/floating-button-circle";
import ViewFloatingButtonCircle from "./_components/view-content/ViewFloatingButtonCircle";
import FormActivity from "./_components/list-add-content/form-activity";
import ViewFormActivity from "./_components/view-content/ViewFormActivity";
import ViewCountDown from "./_components/view-content/ViewCountdown/index";
import CountDown from "./_components/list-add-content/countdown";
import ViewFrame from "./_components/view-content/ViewFrame";
import Frame from "./_components/list-add-content/frame";
import StockCounter from "./_components/list-add-content/stock-counter";
import ViewStockCounter from "./_components/view-content/ViewStockCounter";

const landingPage = {
  detail: {
    contents: [],
  },
};

const viewIcon = {
  laptop: <MdLaptopMac size={20} />,
  tablet: <IoIosTabletPortrait size={20} />,
  phone: <IoIosPhonePortrait size={20} />,
};

const CustomLandingPage = () => {
  const [pageSetting, setPageSetting] = useState({
    title: "",
    maxWidth: "1440px",
    bgColor: "#F5F5F5",
  });
  const [isResizing, setIsResizing] = useState(false);
  const [isPreview, setIsPreview] = useState(true);
  const [shouldSave, setShouldSave] = useState(false);
  const [isSelectedView, setIsSelectedView] = useState("laptop");
  const [sections, setSections] = useState(landingPage.detail.contents || []); //final section save to db
  const [editing, setEditing] = useState("");
  const [isAddContent, setIsAddContent] = useState(false);
  const [previewSection, setPreviewSection] = useState([]);
  console.log("🚀 ~ CustomLandingPage ~ previewSection:", previewSection);
  const [previewFloatingSection, setPreviewFloatingSection] = useState([]);
  console.log(
    "🚀 ~ CustomLandingPage ~ previewFloatingSection:",
    previewFloatingSection
  );
  const [sectionBeforeEdit, setSectionBeforeEdit] = useState([]);
  const [sectionFloatingBeforeEdit, setSectionFloatingBeforeEdit] = useState(
    []
  );
  const containerRef = useRef(null);

  const [timers, setTimers] = useState({});
  const setRef = (el, index) => {
    previewRefs.current[index] = el;
  };

  const dispatch = useDispatch();

  const getInitialDimensions = (view) => {
    return {
      width: view === "laptop" ? "100%" : view === "tablet" ? 640 : 320,
      height: 480,
    };
  };

  useEffect(() => {
    setDimensions(getInitialDimensions(isSelectedView));
  }, [isSelectedView]);

  const [dimensions, setDimensions] = useState(
    getInitialDimensions(isSelectedView)
  );
  const { id, isDragging } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    id: monitor.getItem()?.id,
  }));

  const previewRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [focusedIndexColumn, setFocusedIndexColumn] = useState(null);

  const [focusedIndexSectionContent, setFocusedIndexSectionContent] =
    useState(null);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const setColumnRef = (el, index) => {
    columnRefs.current[index] = el;
  };

  const columnRefs = useRef([]);

  const setSectionContentRef = (el, index) => {
    sectionContentRefs.current[index] = el;
  };

  const sectionContentRefs = useRef([]);

  const handleSectionContentFocus = useCallback(
    (index) => {
      setFocusedIndexSectionContent(index);
      // eslint-disable-next-line no-unused-expressions
      sectionContentRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });

      // Clear any existing timer for this index
      if (timers[index]) {
        clearTimeout(timers[index]);
      }

      // Set a timer to remove focus after 3 seconds
      const timer = setTimeout(() => {
        setFocusedIndexSectionContent(null);
      }, 800);

      setTimers({ ...timers, [index]: timer });
    },
    [timers]
  );

  const handleColumnFocus = useCallback(
    (index) => {
      setFocusedIndexColumn(index);
      // eslint-disable-next-line no-unused-expressions
      columnRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });

      // Clear any existing timer for this index
      if (timers[index]) {
        clearTimeout(timers[index]);
      }

      // Set a timer to remove focus after 3 seconds
      const timer = setTimeout(() => {
        setFocusedIndexColumn(null);
      }, 800);

      setTimers({ ...timers, [index]: timer });
    },
    [timers]
  );

  const handleContentFocus = useCallback(
    (index) => {
      setFocusedIndex(index);
      // eslint-disable-next-line no-unused-expressions
      previewRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });

      // Clear any existing timer for this index
      if (timers[index]) {
        clearTimeout(timers[index]);
      }

      // Set a timer to remove focus after 3 seconds
      const timer = setTimeout(() => {
        setFocusedIndex(null);
      }, 800);

      setTimers({ ...timers, [index]: timer });
    },
    [timers]
  );

  useEffect(() => {
    return () => {
      Object.values(timers).forEach(clearTimeout);
    };
  }, [timers]);

  const viewTypes = Object.keys(viewIcon);

  const [strViewContent, setStrViewContent] = useState({});
  const renderViewComponent = useCallback(
    (section, index) => {
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

      if (section.name === "frame") {
        return (
          <ViewFrame
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

      return null;
    },
    [
      dimensions.width,
      focusedIndex,
      focusedIndexColumn,
      focusedIndexSectionContent,
      id,
      isDragging,
      isPreview,
      isResizing,
    ]
  );

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
        editing.name === "frame" &&
        section.name === "frame" &&
        editing.id === section.id
      ) {
        return (
          <Frame
            currentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
            handleSectionContentFocus={handleSectionContentFocus}
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

      return null;
    },
    [
      editing.id,
      editing.name,
      handleColumnFocus,
      handleSectionContentFocus,
      previewFloatingSection,
      previewSection,
      sectionBeforeEdit,
      sectionFloatingBeforeEdit,
    ]
  );

  const handleSave = () => {
    setIsPreview(false);
    setShouldSave(true);
    dispatch(setLandingPageSection(previewSection));
  };

  useEffect(() => {
    if (!isPreview && shouldSave) {
      const renderedString = previewSection
        .map((item) => renderToString(renderViewComponent(item)))
        .join("");
      setStrViewContent(renderedString);

      // Reset shouldSave after saving
      setShouldSave(false);
      setIsPreview(true);
    }
  }, [isPreview, shouldSave, previewSection, renderViewComponent]);

  const handleMouseDown = (e, direction) => {
    if (isSelectedView === "laptop") return;

    e.preventDefault();
    setIsResizing(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth =
      dimensions.width === "100%" ? window.innerWidth : dimensions.width;
    const startHeight = dimensions.height;

    const handleMouseMove = (e) => {
      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes("right")) {
        newWidth = startWidth + (e.clientX - startX);
      } else if (direction.includes("left")) {
        newWidth = startWidth - (e.clientX - startX);
      }

      if (direction.includes("bottom")) {
        newHeight = startHeight + (e.clientY - startY);
      } else if (direction.includes("top")) {
        newHeight = startHeight - (e.clientY - startY);
      }

      // Handle corners
      if (direction === "bottomRight") {
        newWidth = startWidth + (e.clientX - startX);
        newHeight = startHeight + (e.clientY - startY);
      } else if (direction === "bottomLeft") {
        newWidth = startWidth - (e.clientX - startX);
        newHeight = startHeight + (e.clientY - startY);
      } else if (direction === "topRight") {
        newWidth = startWidth + (e.clientX - startX);
        newHeight = startHeight - (e.clientY - startY);
      } else if (direction === "topLeft") {
        newWidth = startWidth - (e.clientX - startX);
        newHeight = startHeight - (e.clientY - startY);
      }

      setDimensions({
        width: newWidth > 100 ? newWidth : 100,
        height: newHeight > 100 ? newHeight : 100,
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const moveSection = useCallback((dragIndex, hoverIndex) => {
    setPreviewSection((prevCards) => {
      const updatedSections = [...prevCards]; // Copy array lama
      const [draggedCard] = updatedSections.splice(dragIndex, 1); // Hapus item dari dragIndex
      updatedSections.splice(hoverIndex, 0, draggedCard); // Tambahkan item ke posisi hoverIndex

      return updatedSections; // Kembalikan array yang sudah diubah
    });
  }, []);

  const editSection = useCallback(
    (sectionToEdit) => {
      setSectionBeforeEdit([...previewSection]);
      setEditing(sectionToEdit);
    },
    [previewSection]
  );

  const editSectionFlaoting = useCallback(
    (sectionToEdit) => {
      setSectionFloatingBeforeEdit([...previewFloatingSection]);
      setEditing(sectionToEdit);
    },
    [previewFloatingSection]
  );

  // const { landingPageSection } = useSelector(
  //   (state) => state.customLandingPage
  // );

  const removeSection = useCallback(
    (index, id) => {
      setPreviewSection((prev) => {
        // Hapus section berdasarkan index
        const updatedPreviewSection = prev.filter((_, i) => i !== index);

        // Perbarui section yang tersisa dengan mereset target jika ID cocok dengan ID dari optionsScrolltarget
        return updatedPreviewSection.map((section) => {
          if (Array.isArray(section.content)) {
            return {
              ...section,
              content: section.content.map((contentItem) => {
                return contentItem?.target?.scrollTarget?.id === id
                  ? { ...contentItem, target: {} }
                  : contentItem;
              }),
            };
          } else {
            return section;
          }
        });
      });

      // Dispatch untuk menghapus option scroll target
      dispatch(removeOptionScrollTarget(id));
    },
    [dispatch]
  );

  const removeSectionFloating = useCallback((index) => {
    setPreviewFloatingSection((prev) => {
      // Hapus section berdasarkan index
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const renderListSectionFloating = useCallback(
    (section, index) => {
      return (
        <UnDraggabelList
          key={section.id}
          index={index}
          section={section}
          editSection={() => editSectionFlaoting(section)}
          removeSection={removeSectionFloating}
          focusContent={() => handleContentFocus(section.id)}
        />
      );
    },
    [editSectionFlaoting, handleContentFocus, removeSectionFloating]
  );

  const renderListContent = useCallback(
    (section, index) => {
      return (
        <ListSectionContent
          key={section.id}
          index={index}
          id={section.id}
          section={section}
          moveSection={section.name.includes("floating") ? null : moveSection}
          editSection={
            section.name.includes("floating")
              ? () => editSectionFlaoting(section)
              : () => editSection(section)
          }
          removeSection={
            section.name.includes("floating")
              ? removeSectionFloating
              : removeSection
          }
          focusContent={() => handleContentFocus(section.id)}
        />
      );
    },
    [
      editSection,
      editSectionFlaoting,
      handleContentFocus,
      moveSection,
      removeSection,
      removeSectionFloating,
    ]
  );

  const handleAddContent = () => {
    setIsAddContent(true);
  };

  const handleChangeTitlePage = (value) => {
    setPageSetting((prev) => ({
      ...prev,
      title: value,
    }));
  };

  return (
    <>
      <div>
        <CRow>
          <CCol className="p-0" md="4">
            <div style={{ height: "88.10%" }}>
              {!editing && !isAddContent && (
                <CTabs activeTab="konten">
                  <div className="d-flex justify-content-end align-items-center border-bottom p-2">
                    <div>
                      <CButton
                        onClick={toggleModal}
                        color="primary"
                        variant="outline"
                        className="mx-2"
                      >
                        Batal
                      </CButton>

                      <CButton onClick={handleSave} color="primary">
                        Selesai
                      </CButton>
                    </div>
                  </div>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink data-tab="konten">Kolom</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="desain">Desain</CNavLink>
                    </CNavItem>
                  </CNav>
                  <CTabContent
                    style={{
                      height: "350px",
                      paddingRight: 5,
                      overflowY: "auto",
                    }}
                    className="pt-2"
                  >
                    <CTabPane data-tab="konten">
                      <div
                        style={{ backgroundColor: "white" }}
                        className=" w-100 px-2 pt-2 mb-3 border-bottom   "
                      >
                        <Input
                          label="Nama halaman"
                          placeholder="Masukan judul di sini"
                          type="text"
                          value={pageSetting.title}
                          onChange={(e) =>
                            handleChangeTitlePage(e.target.value)
                          }
                        />
                      </div>

                      {previewSection
                        .filter((section) => section.name !== "floating-button")
                        .map((section, index) =>
                          renderListContent(section, index)
                        )}

                      <CCard
                        style={{ cursor: "pointer", marginBottom: 8 }}
                        onClick={handleAddContent}
                      >
                        <CCardBody className="p-1">
                          <div className="d-flex align-items-center ">
                            <IoAdd
                              style={{
                                cursor: "pointer",
                                margin: "0px 10px 0px 6px",
                              }}
                              size={18}
                            />

                            <div>Tambah Konten</div>
                          </div>
                        </CCardBody>
                      </CCard>

                      {previewFloatingSection.map((section, index) =>
                        renderListSectionFloating(section, index)
                      )}
                    </CTabPane>
                    <CTabPane data-tab="desain">
                      <DesignTabControl
                        previewSection={previewSection}
                        setPreviewSection={(value) => setPreviewSection(value)}
                        pageSetting={pageSetting}
                        setPageSetting={(value) => setPageSetting(value)}
                      />
                    </CTabPane>
                    <CTabPane data-tab="test2"></CTabPane>
                  </CTabContent>
                </CTabs>
              )}

              {editing && (
                <div>
                  {previewSection.map((section) => (
                    <div key={section.id}>{renderEditSection(section)}</div>
                  ))}

                  {previewFloatingSection.map((section) => (
                    <div key={section.id}>{renderEditSection(section)}</div>
                  ))}
                </div>
              )}

              {isAddContent && (
                <ListContent
                  previewSection={previewSection}
                  setPreviewSection={(value) => setPreviewSection(value)}
                  sections={sections}
                  setSections={(value) => setSections(value)}
                  isShowContent={(value) => setIsAddContent(value)}
                  previewFloatingSection={previewFloatingSection}
                  setPreviewFloatingSection={setPreviewFloatingSection}
                  handleColumnFocus={handleColumnFocus}
                  handleSectionContentFocus={handleSectionContentFocus}
                />
              )}
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 10,
                backgroundColor: "white",
              }}
              className="d-flex justify-content-between align-items-center border rounded-sm p-2 mb-2 shadow-sm"
            >
              <div
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
              >
                {viewTypes.map((view) => (
                  <div
                    key={view}
                    onClick={() => setIsSelectedView(view)}
                    style={{
                      backgroundColor:
                        isSelectedView === view ? "#fa541c" : "transparent",
                    }}
                    className="border p-1 px-2 "
                  >
                    {React.cloneElement(viewIcon[view], {
                      color: isSelectedView === view ? "white" : "black",
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CCol>

          <CCol md="8">
            <ResizableView
              previewSection={previewSection}
              pageSetting={pageSetting}
              ref={containerRef}
              dimensions={dimensions}
              isSelectedView={isSelectedView}
              isResizing={isResizing}
              handleMouseDown={handleMouseDown}
            >
              {previewSection.map((item, index) => (
                <div key={item.id}>{renderViewComponent(item, index)}</div>
              ))}

              {previewFloatingSection.map((item, index) => (
                <div key={item.id}>{renderViewComponent(item, index)}</div>
              ))}
            </ResizableView>
          </CCol>
        </CRow>

        {strViewContent && Object.keys(strViewContent).length > 0 && (
          <div dangerouslySetInnerHTML={{ __html: strViewContent }} />
        )}
      </div>

      <ModalConfirmation
        show={modal}
        toggleModal={toggleModal}
        setPreviewSection={(value) => setPreviewSection(value)}
      />
    </>
  );
};

export default CustomLandingPage;
