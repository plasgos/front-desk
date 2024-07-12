import React, { useCallback, useEffect, useState } from "react";
import { ViewTextAndImage } from "./_components/Commons";
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

import image from "../../assets/action-figure.jpg";

import { IoAdd } from "react-icons/io5";
import { AddContent } from "./_components/AddContent";
import { EditContent } from "./_components/EditContent";
import { CardList } from "./_components/CardList";

import { MdLaptopMac } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoIosTabletPortrait } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ResizableView from "./_components/ResizebleView";

const viewIcon = {
  laptop: <MdLaptopMac size={20} />,
  tablet: <IoIosTabletPortrait size={20} />,
  phone: <IoIosPhonePortrait size={20} />,
};

const contents = [
  {
    id: "adguiwbj",
    name: "text-image",
    content: {
      title: "Rahasia untuk maju adalah memulai",
      description:
        "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
      image: image,
    },
  },
  {
    id: "adgdawdw",
    name: "text-image",
    content: {
      title: "Rahasia untuk maju adalah memulai",
      description:
        "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
      image: image,
    },
  },
  {
    id: "feqawd",
    name: "text-image",
    content: {
      title: "Rahasia untuk maju adalah memulai",
      description:
        "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
      image: image,
    },
  },
];

const CustomLandingPage = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const [isAddContent, setIsAddContent] = useState(false);
  const [sections, setSections] = useState(contents || []);
  const [tempSections, setTempSections] = useState(contents || []);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState({});
  const [isSelectedView, setIsSelectedView] = useState("laptop");
  const [isResizing, setIsResizing] = useState(false);

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

  const viewTypes = Object.keys(viewIcon);

  const handleAddContent = () => {
    setIsAddContent(true);
  };

  const handelCancel = () => {
    setIsAddContent(false);
    setIsEditing(false);
    setTempSections(sections);
  };

  const handelConfirm = () => {
    setIsAddContent(false);
    setIsEditing(false);
    setSections(tempSections);
  };

  const removeSection = useCallback((index) => {
    setSections((prev) => prev.filter((item, i) => i !== index));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moveSection = useCallback((dragIndex, hoverIndex) => {
    setSections((prevCards) => {
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

  useEffect(() => {
    setTempSections(sections);
  }, [sections]);

  const editSection = (section) => {
    setSelectedSection(section);
    setIsEditing(true);
  };

  const renderSection = useCallback((section, index) => {
    return (
      <CardList
        key={section.id}
        index={index}
        id={section.id}
        section={section}
        moveSection={moveSection}
        editSection={() => editSection(section, index)}
        removeSection={removeSection}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={isResizing ? { cursor: "not-allowed" } : {}}>
      <CRow>
        {isMenuVisible && (
          <CCol md="4">
            <div style={{ height: 400 }}>
              <div className="d-flex justify-content-end align-items-center border-bottom p-2">
                <div>
                  {/* <CButton onClick={() => {}} variant="ghost">
                <IoSearch style={{ cursor: "pointer" }} size={18} />
              </CButton> */}
                  <CButton
                    onClick={handelCancel}
                    color="primary"
                    variant="outline"
                    className="mx-2"
                  >
                    Batal
                  </CButton>

                  <CButton onClick={handelConfirm} color="primary">
                    Selesai
                  </CButton>
                </div>
              </div>

              <CTabs activeTab="kolom">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="kolom">Kolom</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <CTabPane data-tab="kolom">
                    {isAddContent ? (
                      <AddContent
                        sections={sections}
                        setSections={setSections}
                        setTempSections={setTempSections}
                      />
                    ) : isEditing ? (
                      <EditContent
                        id={selectedSection.id}
                        titleValue={selectedSection.content.title}
                        descriptionValue={selectedSection.content.description}
                        image={selectedSection.content.image}
                        setTempSections={setTempSections}
                      />
                    ) : (
                      <div>
                        {sections.map((section, i) =>
                          renderSection(section, i)
                        )}
                      </div>
                    )}

                    {!isAddContent && !isEditing && (
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
                    )}
                  </CTabPane>
                </CTabContent>
              </CTabs>

              <div
                style={{ position: "absolute", bottom: 0, width: "92%" }}
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

                <CButton
                  onClick={() => setIsMenuVisible((prev) => !prev)}
                  size="sm"
                  color="primary"
                  variant="outline"
                >
                  <FaChevronLeft size={20} />
                </CButton>
              </div>
            </div>
          </CCol>
        )}

        <CCol>
          <ResizableView
            dimensions={dimensions}
            isSelectedView={isSelectedView}
            isResizing={isResizing}
            handleMouseDown={handleMouseDown}
          >
            <ViewTextAndImage
              width={dimensions.width}
              tempSections={tempSections}
              isResizing={isResizing}
            />
          </ResizableView>
        </CCol>
      </CRow>

      {!isMenuVisible && (
        <div
          style={{ position: "fixed", bottom: 40, left: 265, zIndex: 1000 }}
          className="shadow-lg"
        >
          <CButton
            onClick={() => setIsMenuVisible((prev) => !prev)}
            size="sm"
            color="primary"
            className=""
          >
            <FaChevronRight size={20} />
          </CButton>
        </div>
      )}
    </div>
  );
};

export default CustomLandingPage;
