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
import ResizableView from "./_components/ResizebleView";
import { ListSectionContent } from "./_components/ListSectionContent";
import { MdLaptopMac } from "react-icons/md";
import { IoIosPhonePortrait, IoIosTabletPortrait } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import ListContent from "./_components/list-add-content/";
import ViewText from "./_components/view-content/ViewText";
import { useDragLayer } from "react-dnd";

import { renderToString } from "react-dom/server";
import EditText from "./_components/list-edit-content/EditText";
import ViewColumnTextAndImage from "./_components/view-content/ViewColumnTextAndImage";
import EditColumnTextAndImage from "./_components/list-edit-content/EditColumnTextAndImage";
import ViewEmptySpace from "./_components/view-content/ViewEmptySpace";
import EditEmptySpace from "./_components/list-edit-content/EditEmptySpace";
import ViewListImages from "./_components/view-content/ViewListImages";
import EditListImages from "./_components/list-edit-content/EditListImages";
import ViewScrollTraget from "./_components/view-content/ViewScrollTraget";
import EditScrollTarget from "./_components/list-edit-content/EditScrollTarget";
import { useDispatch, useSelector } from "react-redux";
import {
  removeOptionScrollTarget,
  setLandingPageSection,
} from "../../redux/modules/custom-landing-page/reducer";
import ViewButton from "./_components/view-content/ViewButton";
import EditListButton from "./_components/list-edit-content/EditListButton";
import ModalConfirmation from "./_components/ModalConfirmation";
import ViewTestimony from "./_components/view-content/ViewTestimony";

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
  const [isResizing, setIsResizing] = useState(false);
  const [isPreview, setIsPreview] = useState(true);
  const [shouldSave, setShouldSave] = useState(false);
  const [isSelectedView, setIsSelectedView] = useState("laptop");
  const [sections, setSections] = useState(landingPage.detail.contents || []); //final section save to db
  const [editing, setEditing] = useState("");
  const [isAddContent, setIsAddContent] = useState(false);
  const [previewSection, setPreviewSection] = useState([]);
  const [sectionBeforeEdit, setSectionBeforeEdit] = useState([]);
  const [timers, setTimers] = useState({});
  const setRef = (el, index) => {
    previewRefs.current[index] = el;
  };
  const containerRef = useRef(null);
  const previewRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  console.log("🚀 ~ CustomLandingPage ~ previewSection:", previewSection);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();

  const getInitialDimensions = (view) => {
    return {
      width: view === "laptop" ? "100%" : view === "tablet" ? 600 : 320,
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
      }, 2000);

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
            content={section.content}
            isResizing={isResizing}
            ref={(el) => setRef(el, index)}
            isFocused={focusedIndex === index}
          />
        );
      }

      if (section.name === "column-text-and-image") {
        return (
          <ViewColumnTextAndImage
            containerRef={containerRef}
            width={dimensions.width}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, index)}
            isFocused={focusedIndex === index}
            isPreview={isPreview}
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
            ref={(el) => setRef(el, index)}
            isFocused={focusedIndex === index}
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
            ref={(el) => setRef(el, index)}
            isFocused={focusedIndex === index}
            isPreview={isPreview}
          />
        );
      }

      if (section.name === "scroll-target") {
        return (
          <ViewScrollTraget
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, index)}
            isFocused={focusedIndex === index}
          />
        );
      }

      if (section.name === "button") {
        return (
          <ViewButton
            containerRef={containerRef}
            isDragging={isDragging && section.id === id}
            content={section}
            isResizing={isResizing}
            ref={(el) => setRef(el, index)}
            isFocused={focusedIndex === index}
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
            ref={(el) => setRef(el, index)}
            isFocused={focusedIndex === index}
            isPreview={isPreview}
          />
        );
      }

      return null;
    },
    [dimensions.width, focusedIndex, id, isDragging, isPreview, isResizing]
  );

  const renderEditSection = useCallback(
    (section) => {
      if (
        editing.name === "text" &&
        section.name === "text" &&
        editing.id === section.id
      ) {
        return (
          <EditText
            currentSection={section}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
          />
        );
      }

      if (
        editing.name === "column-text-and-image" &&
        section.name === "column-text-and-image" &&
        editing.id === section.id
      ) {
        return (
          <EditColumnTextAndImage
            curentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
          />
        );
      }

      if (
        editing.name === "empty-space" &&
        section.name === "empty-space" &&
        editing.id === section.id
      ) {
        return (
          <EditEmptySpace
            curentSection={section}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
          />
        );
      }

      if (
        editing.name === "list-images" &&
        section.name === "list-images" &&
        editing.id === section.id
      ) {
        return (
          <EditListImages
            curentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
          />
        );
      }

      if (
        editing.name === "scroll-target" &&
        section.name === "scroll-target" &&
        editing.id === section.id
      ) {
        return (
          <EditScrollTarget
            curentSection={section}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
          />
        );
      }

      if (
        editing.name === "button" &&
        section.name === "button" &&
        editing.id === section.id
      ) {
        return (
          <EditListButton
            curentSection={section}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
          />
        );
      }

      return null;
    },
    [editing.id, editing.name, previewSection, sectionBeforeEdit]
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
      const draggedCard = prevCards[dragIndex];
      const updatedSections = prevCards
        .slice(0, dragIndex)
        .concat(prevCards.slice(dragIndex + 1));

      return updatedSections
        .slice(0, hoverIndex)
        .concat([draggedCard])
        .concat(updatedSections.slice(hoverIndex));
    });
    return () => {};
  }, []);

  const editSection = useCallback(
    (sectionToEdit) => {
      setSectionBeforeEdit([...previewSection]);
      setEditing(sectionToEdit);
    },
    [previewSection]
  );

  const { landingPageSection } = useSelector(
    (state) => state.customLandingPage
  );

  console.log(
    "🚀 ~ CustomLandingPage ~ landingPageSection:",
    landingPageSection
  );

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
                return contentItem.target.scrollTarget?.id === id
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

  const renderListContent = useCallback(
    (section, index) => {
      return (
        <ListSectionContent
          key={section.id}
          index={index}
          id={section.id}
          section={section}
          moveSection={moveSection}
          editSection={() => editSection(section)}
          removeSection={removeSection}
          focusContent={() => handleContentFocus(index)}
        />
      );
    },
    [editSection, handleContentFocus, moveSection, removeSection]
  );

  const handleAddContent = () => {
    setIsAddContent(true);
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
                      <CNavLink data-tab="test1">test1</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="test2">test2</CNavLink>
                    </CNavItem>
                  </CNav>
                  <CTabContent
                    style={{
                      height: "350px",
                      paddingRight: 5,
                      overflowY: "auto",
                    }}
                    className="pt-3"
                  >
                    <CTabPane data-tab="konten">
                      {previewSection.map((section, index) =>
                        renderListContent(section, index)
                      )}
                      <CCard
                        style={{ cursor: "pointer" }}
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
                    </CTabPane>
                    <CTabPane data-tab="test1">
                      <p>test1</p>
                    </CTabPane>
                    <CTabPane data-tab="test2">
                      <p>kolom2</p>
                    </CTabPane>
                  </CTabContent>
                </CTabs>
              )}

              {editing &&
                previewSection.map((section) => (
                  <div key={section.id}>{renderEditSection(section)}</div>
                ))}

              {isAddContent && (
                <ListContent
                  previewSection={previewSection}
                  setPreviewSection={(value) => setPreviewSection(value)}
                  sections={sections}
                  setSections={(value) => setSections(value)}
                  isShowContent={(value) => setIsAddContent(value)}
                />
              )}
            </div>
            <div className="d-flex justify-content-between align-items-center border rounded-sm p-2 mb-2 shadow-sm">
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
              containerRef={containerRef}
              dimensions={dimensions}
              isSelectedView={isSelectedView}
              isResizing={isResizing}
              handleMouseDown={handleMouseDown}
            >
              {previewSection.map((item, index) => (
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
