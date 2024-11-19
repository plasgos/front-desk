import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDragLayer } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  removeOptionScrollTarget,
  removePopupOption,
  removePopupOptionShown,
} from "../../redux/modules/custom-landing-page/reducer";
import { ListSectionContent } from "./_components/ListSectionContent";
import ModalConfirmation from "./_components/ModalConfirmation";
import { UnDraggabelList } from "./_components/common/UnDraggabaleList";
import { useRenderEditSection } from "./_components/hooks/useRenderEditSection";
import { useRenderViewSections } from "./_components/hooks/useRenderViewSections";

import MenuContent from "./_components/MenuContent";
import ViewRenderer from "./_components/ViewRenderer";
import { useRenderViewFooter } from "./_components/hooks/useRenderViewFooter";
import { useRenderViewNavbar } from "./_components/hooks/useRenderViewNavbar";
import { initialFooterSection } from "./_components/list-add-content/footer";
import { initialNavbarSection } from "./_components/list-add-content/navbar";

const CustomLandingPage = () => {
  const [pageSetting, setPageSetting] = useState({
    title: "",
    maxWidth: "1280px",
    bgColor: "#F5F5F5",
  });
  const [isResizing, setIsResizing] = useState(false);
  const [previewNavbar, setPreviewNavbar] = useState(initialNavbarSection);
  console.log("🚀 ~ CustomLandingPage ~ previewNavbar:", previewNavbar);

  const [previewFooter, setPreviewFooter] = useState(initialFooterSection);
  console.log("🚀 ~ CustomLandingPage ~ previewFooter:", previewFooter);

  const [isPreview, setIsPreview] = useState(true);
  // const [shouldSave, setShouldSave] = useState(false);
  const [isSelectedView, setIsSelectedView] = useState("laptop");

  const [editing, setEditing] = useState("");

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
      width: view === "laptop" ? "100%" : view === "tablet" ? 600 : 320,
      height: "100vh",
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

  // const [strViewContent, setStrViewContent] = useState({});

  const { renderViewSections } = useRenderViewSections({
    id,
    setPreviewSection,
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
    setPreviewFloatingSection,
    pageSetting,
  });

  const { renderEditSection } = useRenderEditSection({
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
    pageSetting,
  });

  const { renderViewFooter } = useRenderViewFooter({
    id,
    isDragging,
    isResizing,
    focusedIndexSectionContent,
    containerRef,
    setSectionContentRef,
  });

  const { renderViewNavbar } = useRenderViewNavbar({
    id,
    isDragging,
    isResizing,
    focusedIndexSectionContent,
    containerRef,
    setSectionContentRef,
  });

  // const handleSave = () => {
  //   setIsPreview(false);
  //   setShouldSave(true);
  //   dispatch(setLandingPageSection(previewSection));
  // };

  // useEffect(() => {
  //   if (!isPreview && shouldSave) {
  //     const renderedString = previewSection
  //       .map((item) => renderToString(renderViewComponent(item)))
  //       .join("");
  //     setStrViewContent(renderedString);

  //     // Reset shouldSave after saving
  //     setShouldSave(false);
  //     setIsPreview(true);
  //   }
  // }, [isPreview, shouldSave, previewSection, renderViewComponent]);

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
        height: newHeight > 100 ? newHeight : "100vh",
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

  const removeSection = useCallback(
    (sectionId) => {
      setPreviewSection((prev) =>
        prev.filter((section) => section.id !== sectionId)
      );

      const updateScrollTarget = (sections) =>
        sections.map((section) => {
          if (Array.isArray(section.content)) {
            return {
              ...section,
              content: section.content.map((contentItem) => {
                const { target } = contentItem || {};

                // Jika target.scrollTarget.id cocok dengan sectionId
                if (target?.scrollTarget?.id === sectionId) {
                  // Jika section.name mengandung 'button'
                  if (section.name?.toLowerCase().includes("button")) {
                    return {
                      ...contentItem,
                      target: {
                        localPage: { value: "home" },
                      },
                    };
                  }

                  // Jika tidak mengandung 'button'
                  return {
                    ...contentItem,
                    target: {},
                  };
                }

                return contentItem;
              }),
            };
          }

          return section;
        });

      setPreviewSection((prev) => updateScrollTarget(prev));
      setPreviewFloatingSection((prev) => updateScrollTarget(prev));

      // Dispatch untuk menghapus option scroll target
      dispatch(removeOptionScrollTarget(sectionId));
    },
    [dispatch]
  );

  const removeSectionFloating = useCallback(
    (sectionId) => {
      // Fungsi utility untuk mereset target popup pada section utama
      const resetPopupTarget = (sections) =>
        sections.map((section) => {
          if (Array.isArray(section.content)) {
            return {
              ...section,
              content: section.content.map((contentItem) => {
                const { target } = contentItem || {};
                // Reset target jika popup.id cocok dengan sectionId
                if (target?.popup?.id === sectionId) {
                  return {
                    ...contentItem,
                    target: {
                      localPage: { value: "home" },
                    },
                  };
                }
                return contentItem;
              }),
            };
          }
          return section;
        });

      // Hapus section dari preview floating section
      setPreviewFloatingSection((prev) =>
        prev.filter((section) => section.id !== sectionId)
      );

      // Reset target popup di section utama
      setPreviewSection((prev) => resetPopupTarget(prev));
      setPreviewFloatingSection((prev) => resetPopupTarget(prev));

      // Dispatch untuk menghapus opsi popup
      dispatch(removePopupOption(sectionId));
      dispatch(removePopupOptionShown(sectionId));
    },
    [dispatch]
  );

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
          moveSection={moveSection}
          editSection={() => editSection(section)}
          removeSection={removeSection}
          focusContent={() => handleContentFocus(section.id)}
        />
      );
    },
    [editSection, handleContentFocus, moveSection, removeSection]
  );

  const handleChangeTitlePage = (value) => {
    setPageSetting((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const toggleSidebar = (value) => {
    setPreviewNavbar((arr) =>
      arr.map((section) => ({
        ...section,
        sidebar: {
          ...section.sidebar,
          isShowSidebar: value,
        },
      }))
    );
  };

  const [isVisibleSidebarNav, setIsVisibleSidebarNav] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (previewNavbar[0]?.sidebar?.isShowSidebar) {
      setIsVisibleSidebarNav(true); // Tampilkan sidebar di DOM
      setTimeout(() => setIsAnimating(true), 10); // Mulai transisi masuk setelah rendering
    } else {
      setIsAnimating(false); // Mulai transisi keluar
      setTimeout(() => setIsVisibleSidebarNav(false), 300); // Hapus dari DOM setelah transisi selesai
    }
  }, [previewNavbar]);

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* sidebar */}
        <MenuContent
          editing={editing}
          toggleModal={toggleModal}
          pageSetting={pageSetting}
          setPageSetting={(value) => setPageSetting(value)}
          handleChangeTitlePage={handleChangeTitlePage}
          isSelectedView={isSelectedView}
          setIsSelectedView={setIsSelectedView}
          previewSection={previewSection}
          setPreviewSection={setPreviewSection}
          previewFloatingSection={previewFloatingSection}
          setPreviewFloatingSection={setPreviewFloatingSection}
          previewNavbar={previewNavbar}
          setPreviewNavbar={setPreviewNavbar}
          previewFooter={previewFooter}
          setPreviewFooter={setPreviewFooter}
          renderEditSection={renderEditSection}
          renderListContent={renderListContent}
          renderListSectionFloating={renderListSectionFloating}
          handleContentFocus={handleContentFocus}
          handleSectionContentFocus={handleSectionContentFocus}
          handleColumnFocus={handleColumnFocus}
        />

        {/* Preview Landingpage */}
        <ViewRenderer
          id={id}
          containerRef={containerRef}
          previewSection={previewSection}
          dimensions={dimensions}
          isSelectedView={isSelectedView}
          isResizing={isResizing}
          handleMouseDown={handleMouseDown}
          isDragging={isDragging}
          handleContentFocus={handleContentFocus}
          pageSetting={pageSetting}
          previewNavbar={previewNavbar}
          setPreviewNavbar={setPreviewNavbar}
          focusedIndex={focusedIndex}
          renderViewNavbar={renderViewNavbar}
          renderViewSections={renderViewSections}
          renderViewFooter={renderViewFooter}
          isVisibleSidebarNav={isVisibleSidebarNav}
          toggleSidebar={toggleSidebar}
          isAnimating={isAnimating}
          previewFloatingSection={previewFloatingSection}
          previewFooter={previewFooter}
          setRef={setRef}
        />
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
