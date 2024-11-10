import {
  CButton,
  CCard,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDragLayer } from "react-dnd";
import { IoIosPhonePortrait, IoIosTabletPortrait } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { MdLaptopMac } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  removeOptionScrollTarget,
  removePopupOption,
  removePopupOptionShown,
} from "../../redux/modules/custom-landing-page/reducer";
import DesignTabControl from "./_components/DesignTabControl";
import { ListSectionContent } from "./_components/ListSectionContent";
import ModalConfirmation from "./_components/ModalConfirmation";
import Input from "./_components/common/Input";
import { UnDraggabelList } from "./_components/common/UnDraggabaleList";
import { useRenderEditSection } from "./_components/hooks/useRenderEditSection";
import { useRenderViewSections } from "./_components/hooks/useRenderViewSections";
import ListContent from "./_components/list-add-content/";

import { FaChevronLeft } from "react-icons/fa6";
import plgLogo from "../../assets/new_plg_logo_256.png";
import ResizableView from "./_components/ResizebleView";
import FooterAndNavbarControl from "./_components/common/FooterAndNavbarControl";
import Footer, {
  initialFooterSection,
} from "./_components/list-add-content/footer";
import { useRenderViewFooter } from "./_components/hooks/useRenderViewFooter";
import ViewFooter from "./_components/view-content/ViewFooter";

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
    maxWidth: "1280px",
    bgColor: "#F5F5F5",
  });
  const [isResizing, setIsResizing] = useState(false);
  const [footerIsVisble, setFooterIsVisble] = useState(false);
  const [isEditFooter, setIsEditFooter] = useState(false);
  const [previewFooter, setPreviewFooter] = useState(initialFooterSection);
  console.log("🚀 ~ CustomLandingPage ~ previewFooter:", previewFooter);
  const [isHideSideBar, setIsHideSideBar] = useState(false);
  const [isPreview, setIsPreview] = useState(true);
  // const [shouldSave, setShouldSave] = useState(false);
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

  const viewTypes = Object.keys(viewIcon);

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
    (sectionId) => {
      setPreviewSection((prev) => {
        // Hapus section berdasarkan index
        const updatedPreviewSection = prev.filter(
          (section) => section.id !== sectionId
        );

        // Perbarui section yang tersisa dengan mereset target jika ID cocok dengan ID dari optionsScrolltarget
        return updatedPreviewSection.map((section) => {
          if (Array.isArray(section.content)) {
            return {
              ...section,
              content: section.content.map((contentItem) => {
                return contentItem?.target?.scrollTarget?.id === sectionId
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
      dispatch(removeOptionScrollTarget(sectionId));
    },
    [dispatch]
  );

  const removeSectionFloating = useCallback(
    (sectionId) => {
      // Hapus section dari preview floating section
      setPreviewFloatingSection((prev) =>
        prev.filter((section) => section.id !== sectionId)
      );

      // Reset target popup di section utama yang merujuk ke floating section
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (Array.isArray(section.content)) {
            return {
              ...section,
              content: section.content.map((contentItem) => {
                const { target } = contentItem || {};

                // Reset target jika popup.id cocok dengan sectionId
                if (target?.popup?.id === sectionId) {
                  return { ...contentItem, target: {} };
                }
                return contentItem;
              }),
            };
          }
          return section;
        })
      );

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

  const handleAddContent = () => {
    setIsAddContent(true);
  };

  const handleChangeTitlePage = (value) => {
    setPageSetting((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleHideSideBar = () => {
    setIsHideSideBar((prev) => !prev);
  };
  const handleToggleFooter = () => {
    const newFooterVisibility = !footerIsVisble;

    setFooterIsVisble(newFooterVisibility);

    setPreviewFooter((arr) =>
      arr.map((section) => ({
        ...section,
        isShowFooter: newFooterVisibility,
      }))
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <aside
          className={`${
            !isHideSideBar ? "" : "animate__animated animate__slideOutLeft"
          }`}
          style={{
            width: isHideSideBar ? "0px" : "400px",
            transition: "width 0.3s ease",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            top: 0,
            left: 0,
            height: "100vh",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
            }}
          >
            {!editing && !isAddContent && !isEditFooter && (
              <>
                <div className="d-flex justify-content-end align-items-center border-bottom p-3">
                  <div>
                    <CButton
                      onClick={toggleModal}
                      color="primary"
                      variant="outline"
                      className="mx-2"
                    >
                      Kembali
                    </CButton>

                    <CButton color="primary">Simpan</CButton>
                  </div>
                </div>
              </>
            )}
          </div>

          <div
            style={{
              flex: 1,
            }}
          >
            {!editing && !isAddContent && !isEditFooter && (
              <CTabs activeTab="konten">
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
                    overflowY: "auto",
                    height: "calc(100vh - 140px)",
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <CTabPane data-tab="konten">
                    <div
                      style={{
                        backgroundColor: "white",
                        boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.1)",
                      }}
                      className=" w-100 p-3 mb-3 border-bottom   "
                    >
                      <Input
                        label="Nama halaman"
                        placeholder="Masukan judul di sini"
                        type="text"
                        value={pageSetting.title}
                        onChange={(e) => handleChangeTitlePage(e.target.value)}
                      />
                    </div>

                    <div style={{ padding: "0px 20px" }}>
                      {previewSection.map((section, index) =>
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

                      <FooterAndNavbarControl
                        label="Footer"
                        isVisible={footerIsVisble}
                        toggleVisible={handleToggleFooter}
                        editSection={() => setIsEditFooter(true)}
                        handleFocus={() =>
                          handleContentFocus(previewFooter[0]?.id)
                        }
                      />

                      {previewFloatingSection.map((section, index) =>
                        renderListSectionFloating(section, index)
                      )}
                    </div>
                  </CTabPane>
                  <CTabPane data-tab="desain">
                    <DesignTabControl
                      previewSection={previewSection}
                      setPreviewSection={(value) => setPreviewSection(value)}
                      previewFloatingSection={previewFloatingSection}
                      setPreviewFloatingSection={(value) =>
                        setPreviewFloatingSection(value)
                      }
                      pageSetting={pageSetting}
                      setPageSetting={(value) => setPageSetting(value)}
                    />
                  </CTabPane>
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
                pageSetting={pageSetting}
              />
            )}

            {isEditFooter && (
              <div>
                <Footer
                  previewSection={previewFooter}
                  setPreviewSection={setPreviewFooter}
                  isShowContent={(value) => setIsEditFooter(value)}
                  pageSetting={pageSetting}
                  setPageSetting={(value) => setPageSetting(value)}
                  handleSectionContentFocus={handleSectionContentFocus}
                />
              </div>
            )}
          </div>

          <div
            style={{
              zIndex: 10,
              backgroundColor: "white",
              width: "100%",
              position: "absolute",
              bottom: 0,
            }}
            className="d-flex justify-content-between align-items-center border rounded-sm p-2 shadow-sm "
          >
            <div
              className="d-flex align-items-center "
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
            <CButton
              onClick={handleHideSideBar}
              active={isHideSideBar}
              variant="outline"
              color="primary"
            >
              <FaChevronLeft size={14} />
            </CButton>
          </div>
        </aside>

        {isHideSideBar && (
          <div
            style={{
              position: "absolute",
              left: 20,
              bottom: 20,
              zIndex: 9999,
            }}
          >
            <CButton
              onClick={handleHideSideBar}
              active={isHideSideBar}
              variant="outline"
              color="primary"
            >
              <FaChevronLeft size={14} />
            </CButton>
          </div>
        )}

        <main
          style={{
            flex: 1,
            backgroundColor: "#f0f0f0",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <ResizableView
            previewSection={previewSection}
            pageSetting={pageSetting}
            ref={containerRef}
            dimensions={dimensions}
            isSelectedView={isSelectedView}
            isResizing={isResizing}
            handleMouseDown={handleMouseDown}
            previewFooter={previewFooter}
            focusedIndex={focusedIndex}
            setRef={setRef}
            renderViewFooter={renderViewFooter}
          >
            {previewSection.map((item, index) => (
              <div key={item.id}>{renderViewSections(item, index)}</div>
            ))}

            {previewFloatingSection.map((item, index) => (
              <div key={item.id}>{renderViewSections(item, index)}</div>
            ))}
          </ResizableView>
        </main>
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
