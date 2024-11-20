import React from "react";
import ResizableView from "./ResizebleView";
import SidebarMenu from "./add/navbar/view/SidebarMenu";
import ViewNavbar from "./view/ViewNavbar";
import ViewFooter from "./view/ViewFooter";

const ViewRenderer = ({
  id,
  containerRef,
  previewSection,
  dimensions,
  isSelectedView,
  isResizing,
  handleMouseDown,
  isDragging,
  handleContentFocus,
  pageSetting,
  previewNavbar,
  setPreviewNavbar,
  focusedIndex,
  renderViewNavbar,
  renderViewSections,
  renderViewFooter,
  isVisibleSidebarNav,
  toggleSidebar,
  isAnimating,
  previewFloatingSection,
  previewFooter,
  setRef,
}) => {
  return (
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
        id={id}
        previewSection={previewSection}
        pageSetting={pageSetting}
        ref={containerRef}
        dimensions={dimensions}
        isSelectedView={isSelectedView}
        isResizing={isResizing}
        handleMouseDown={handleMouseDown}
        isDragging={isDragging}
        handleContentFocus={handleContentFocus}
      >
        {isVisibleSidebarNav && (
          <SidebarMenu
            previewNavbar={previewNavbar}
            renderViewNavbar={renderViewNavbar}
            sidebar={previewNavbar[0]?.sidebar}
            logo={previewNavbar[0]?.logo}
            toggleSidebar={toggleSidebar}
            isAnimating={isAnimating}
          />
        )}

        <ViewNavbar
          previewNavbar={previewNavbar}
          setPreviewNavbar={setPreviewNavbar}
          focusedIndex={focusedIndex}
          setRef={setRef}
          renderViewNavbar={renderViewNavbar}
          widthContainer={dimensions.width}
        />
        <div
          style={{
            width: "100%",
            maxWidth: pageSetting.maxWidth,
            margin: "0px auto",
            paddingTop:
              previewNavbar[0]?.variant?.style?.position === "absolute"
                ? 70
                : 0,
          }}
        >
          {previewSection.map((item, index) => (
            <div key={item.id}>{renderViewSections(item, index)}</div>
          ))}

          {previewFloatingSection.map((item, index) => (
            <div key={item.id}>{renderViewSections(item, index)}</div>
          ))}
        </div>

        <ViewFooter
          previewFooter={previewFooter}
          focusedIndex={focusedIndex}
          setRef={setRef}
          renderViewFooter={renderViewFooter}
        />
      </ResizableView>
    </main>
  );
};

export default ViewRenderer;
