import {
  CButton,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";
import ResizableView from "./_components/ResizebleView";
import { ViewTextAndImage } from "./_components/Commons";

const listContents = [
  { id: "1", name: "column", content: <ViewTextAndImage /> },
];

const CustomLandingPage = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const [isResizing, setIsResizing] = useState(false);
  const [isSelectedView, setIsSelectedView] = useState("laptop");

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

  // const renderSection = useCallback((section, index) => {
  //   return (
  //     <CardList
  //       key={section.id}
  //       index={index}
  //       id={section.id}
  //       section={section}
  //       moveSection={moveSection}
  //       editSection={() => editSection(section, index)}
  //       removeSection={removeSection}
  //     />
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      <CRow>
        <CCol md="4">
          <CTabs activeTab="konten">
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
                <p>kolom1</p>
              </CTabPane>
              <CTabPane data-tab="test1">
                <p>test1</p>
              </CTabPane>
              <CTabPane data-tab="test2">
                <p>kolom2</p>
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCol>
        <CCol md="8">
          <ResizableView
            dimensions={dimensions}
            isSelectedView={isSelectedView}
            isResizing={isResizing}
            handleMouseDown={handleMouseDown}
          ></ResizableView>
        </CCol>
      </CRow>
    </div>
  );
};

export default CustomLandingPage;
