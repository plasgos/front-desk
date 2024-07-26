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
import { EditImages } from "./_components/list-add-content/list-images/EditImages";
import EditListImages from "./_components/list-edit-content/EditListImages";

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
  const [isSelectedView, setIsSelectedView] = useState("laptop");
  const [sections, setSections] = useState(landingPage.detail.contents || []);
  const [editing, setEditing] = useState("");
  const [isAddContent, setIsAddContent] = useState(false);
  const [previewSection, setPreviewSection] = useState(
    landingPage.detail.contents || []
  );
  const [sectionBeforeEdit, setSectionBeforeEdit] = useState([]);
  const [timers, setTimers] = useState({});
  const setRef = (el, index) => {
    previewRefs.current[index] = el;
  };
  const previewRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  console.log("🚀 ~ CustomLandingPage ~ previewSection:", previewSection);

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

  const renderViewComponent = (section, index) => {
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
          width={dimensions.width}
          isDragging={isDragging && section.id === id}
          content={section.content}
          isResizing={isResizing}
          ref={(el) => setRef(el, index)}
          isFocused={focusedIndex === index}
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
          isDragging={isDragging && section.id === id}
          width={dimensions.width}
          content={section.content}
          isResizing={isResizing}
          ref={(el) => setRef(el, index)}
          isFocused={focusedIndex === index}
        />
      );
    }

    return null;
  };

  const renderEditSection = useCallback(
    (section) => {
      if (
        editing.name === "text" &&
        section.name === "text" &&
        editing.id === section.id
      ) {
        return (
          <EditText
            id={section.id}
            text={section.content?.editorHtml}
            color={section.content?.style?.color}
            textAlign={section.content?.style?.textAlign}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            setSections={(value) => setSections(value)}
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
            id={section.id}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            setSections={(value) => setSections(value)}
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
            id={section.id}
            heightContent={section.content.height}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            setSections={(value) => setSections(value)}
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
            id={section.id}
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            setSections={(value) => setSections(value)}
            sectionBeforeEdit={sectionBeforeEdit}
          />
        );
      }

      return null;
    },
    [editing.id, editing.name, previewSection, sectionBeforeEdit]
  );

  const handleSave = () => {
    const renderedString = previewSection
      .map((item) => renderToString(renderViewComponent(item)))
      .join("");
    console.log(renderedString);
    setStrViewContent(renderedString);
  };

  const getInitialDimensions = (view) => {
    return {
      width: view === "laptop" ? "100%" : view === "tablet" ? 600 : 320,
      height: 480,
    };
  };

  const [dimensions, setDimensions] = useState(
    getInitialDimensions(isSelectedView)
  );

  useEffect(() => {
    setDimensions(getInitialDimensions(isSelectedView));
  }, [isSelectedView]);

  const { id, isDragging } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    id: monitor.getItem()?.id,
  }));

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

  const removeSection = useCallback((index) => {
    setPreviewSection((prev) => prev.filter((item, i) => i !== index));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div>
      <CRow>
        <CCol md="4">
          <div style={{ height: "80%" }}>
            {!editing && !isAddContent && (
              <CTabs activeTab="konten">
                <div className="d-flex justify-content-end align-items-center border-bottom p-2">
                  <div>
                    <CButton
                      // onClick={handelCancel}
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
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
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
          <div
            // style={{ position: "absolute", bottom: 0, width: "92%" }}
            className="d-flex justify-content-between align-items-center border rounded-sm p-2 mb-2"
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

      {strViewContent && (
        <div dangerouslySetInnerHTML={{ __html: strViewContent }} />
      )}
    </div>
  );
};

export default CustomLandingPage;
