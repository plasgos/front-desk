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

import plgLogo from "../../assets/new_plg_logo_256.png";

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
    maxWidth: 1280,
    bgColor: "#F5F5F5",
  });
  const [isResizing, setIsResizing] = useState(false);
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
      width: view === "laptop" ? "100%" : view === "tablet" ? 640 : 320,
      height: 780,
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
          style={{
            width: "400px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Navbar di atas, footer di bawah
            position: "relative", // Tetap di kiri
            top: 0,
            left: 0,
            height: "100vh", // Tinggi penuh layar
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
            }}
          >
            {!editing && !isAddContent && (
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

                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="konten">Kolom</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="desain">Desain</CNavLink>
                  </CNavItem>
                </CNav>
              </>
            )}
          </div>

          <div
            style={{
              flex: 1, // Ambil sisa ruang antara navbar dan footer
              overflowY: "auto", // Scrollable jika kontennya panjang
              // padding: "0px 20px",
            }}
          >
            {!editing && !isAddContent && (
              <CTabs activeTab="konten">
                <CTabContent
                  style={{
                    height: "100%",
                    overflowY: "auto",
                  }}
                  className="pt-2"
                >
                  <CTabPane style={{ padding: "0px 20px" }} data-tab="konten">
                    <div
                      style={{ backgroundColor: "white" }}
                      className=" w-100 px-2 pt-2 mb-3 border-bottom   "
                    >
                      <Input
                        label="Nama halaman"
                        placeholder="Masukan judul di sini"
                        type="text"
                        value={pageSetting.title}
                        onChange={(e) => handleChangeTitlePage(e.target.value)}
                      />
                    </div>

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

                    {previewFloatingSection.map((section, index) =>
                      renderListSectionFloating(section, index)
                    )}
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
                pageSetting={pageSetting}
              />
            )}
          </div>

          <div
            style={{
              zIndex: 10,
              backgroundColor: "white",
            }}
            className="d-flex justify-content-between align-items-center border rounded-sm p-2 shadow-sm"
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
        </aside>

        <main
          style={{
            flex: 1,
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "#f0f0f0",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {previewSection.map((item, index) => (
            <div key={item.id}>{renderViewSections(item, index)}</div>
          ))}

          {previewFloatingSection.map((item, index) => (
            <div key={item.id}>{renderViewSections(item, index)}</div>
          ))}

          <div
            style={{ flex: "1 0 auto" }}
            className="
    tw-flex  tw-bg-black 
    tw-items-center tw-justify-center 
    tw-w-full tw-pt-8 tw-pb-8"
          >
            <div>
              <div className=" tw-text-white tw-text-center tw-text-xs">
                Dibuat dengan
              </div>

              <img
                src={plgLogo}
                alt="logo"
                style={{
                  width: "80px",
                  objectFit: "contain",
                  marginTop: -10,
                }}
              />
            </div>
          </div>
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
