import React, { forwardRef, useEffect, useRef, useState } from "react";

import { useBackgroundStyles } from "../../../../../hooks/useBackgroundStyles";
import { ViewMultipleContent } from "../ViewMultipleContent";

const ViewMultiColumn = forwardRef(
  (
    {
      containerRef,
      isDragging,
      isResizing,
      content,
      isFocused,
      width,
      isPreview,
      setPreviewSection,
      setColumnRef,
      focusedIndexColumn,
      setSectionContentRef,
      focusedIndexSectionContent,
    },
    ref
  ) => {
    const stylesBg = useBackgroundStyles(content);

    const { combineColumnInMobileView } = content.wrapperStyle;

    const parentMultiColumnRef = useRef(null); // Referensi ke elemen parent
    const [containerWidthMultiColumn, setContainerWidthMultiColumn] =
      useState(0);

    useEffect(() => {
      const updateWidth = () => {
        if (parentMultiColumnRef.current) {
          setContainerWidthMultiColumn(
            parentMultiColumnRef.current.offsetWidth * 0.5
          ); // Mengatur lebar dari parent
        }
      };
      updateWidth();

      // Menggunakan ResizeObserver untuk mendeteksi perubahan lebar
      const resizeObserver = new ResizeObserver(updateWidth);
      if (parentMultiColumnRef.current) {
        resizeObserver.observe(parentMultiColumnRef.current);
      }

      return () => {
        if (parentMultiColumnRef.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          resizeObserver.unobserve(parentMultiColumnRef.current);
        }
      };
    }, []);

    return (
      <>
        <div
          ref={ref}
          style={{
            ...(isResizing ? { cursor: "not-allowed" } : {}),
            ...(isDragging ? { border: "2px solid green" } : {}),
            ...(isFocused && { border: "2px solid green" }),
            paddingTop: stylesBg.paddingTop,
            paddingBottom: stylesBg.paddingBottom,
            backgroundColor: content.background.bgColor || "",
            position: "relative",
            zIndex: 1,
            flexWrap:
              isPreview && combineColumnInMobileView && width < 420
                ? "wrap"
                : "nowrap",
          }}
          className={` tw-flex    ${
            isFocused &&
            "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20 "
          } `}
        >
          {content?.background?.bgImage ? (
            <div style={stylesBg.backgroundImgStyle}></div>
          ) : content?.background?.bgType === "gradient" ? (
            <div style={stylesBg.gradientStyle}></div>
          ) : content?.background?.bgType === "pattern" ? (
            <div style={stylesBg.backgroundPatternStyle}></div>
          ) : null}

          {content.background?.opacity ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor:
                  content.background?.opacity < 0 ? "black" : "white",
                opacity: Math.abs(stylesBg.calculateOpacity),
              }}
            ></div>
          ) : null}

          {content?.content.map((column) => {
            const paddingTop = column.background?.paddingTop
              ? `calc(16px + ${column.background.paddingTop}px)`
              : column.background?.paddingY
              ? `calc(16px + ${column.background.paddingY}px)`
              : "16px";

            const paddingBottom = column.background?.paddingBottom
              ? `calc(16px + ${column.background.paddingBottom}px)`
              : column.background?.paddingY
              ? `calc(16px + ${column.background.paddingY}px)`
              : "16px";

            const backgroundImgStyle = {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: column.background?.bgImage
                ? `url(${column.background.bgImage})`
                : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: `blur(${column.background?.blur}px)`,
              zIndex: -1,
              overflow: "hidden",
            };

            const calculateOpacity = column.background?.opacity / 100;

            const gradientStyle = {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              zIndex: -1,
              backgroundImage: `linear-gradient(${
                column.background?.direction
              }, ${
                column.background?.isRevert
                  ? column.background?.toColor
                  : column.background?.fromColor
              }, ${
                column.background?.isRevert
                  ? column.background?.fromColor
                  : column.background?.toColor
              })`,
            };

            const backgroundPatternStyle = {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: column.background?.pattern
                ? `url(${column.background.pattern})`
                : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              zIndex: -1,
              overflow: "hidden",
            };

            const wrapperPreview = combineColumnInMobileView
              ? {
                  display: isPreview && width < 420 ? "flex" : "",
                  width: "100%",
                  justifyContent: isPreview && width < 420 ? "center" : "",
                }
              : {
                  ...(content?.wrapperStyle?.isWidthCustom === "equal"
                    ? { flex: "1 1 0%" }
                    : { flex: `${column.width} 1 0% ` }),
                };

            return (
              <div
                ref={(el) => {
                  if (setColumnRef) {
                    setColumnRef(el, column?.id);
                  }
                }}
                style={{
                  ...wrapperPreview,
                  ...(focusedIndexColumn === column?.id && {
                    border: "2px solid green",
                    maxWidth: "100%",
                    position: "relative",
                  }),
                }}
                className={`${
                  focusedIndexColumn === column?.id
                    ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20  "
                    : ""
                }`}
                key={column.id}
              >
                <div
                  style={{
                    paddingTop: paddingTop,
                    paddingBottom: paddingBottom,
                    backgroundColor: column.background.bgColor || "",
                    position: "relative",
                    zIndex: 1,
                  }}
                  className={`tw-flex tw-flex-col`}
                >
                  <div style={backgroundImgStyle}></div>

                  {column?.background?.bgImage ? (
                    <div style={backgroundImgStyle}></div>
                  ) : column?.background?.bgType === "gradient" ? (
                    <div style={gradientStyle}></div>
                  ) : column?.background?.bgType === "pattern" ? (
                    <div style={backgroundPatternStyle}></div>
                  ) : null}

                  {column.background?.opacity ? (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor:
                          column.background?.opacity < 0 ? "black" : "white",
                        opacity: Math.abs(calculateOpacity),
                      }}
                    ></div>
                  ) : null}

                  {column.content.map((contentItem) => {
                    return (
                      // <div ref={parentMultiColumnRef}>
                      // </div>
                      <ViewMultipleContent
                        content={contentItem}
                        focusedIndexColumn={focusedIndexColumn}
                        setSectionContentRef={setSectionContentRef}
                        containerRef={containerRef}
                        focusedIndexSectionContent={focusedIndexSectionContent}
                        isPreview={isPreview}
                        setColumnRef={setColumnRef}
                        setPreviewSection={setPreviewSection}
                        width={width}
                        key={contentItem.id}
                        parentMultiColumnRef={parentMultiColumnRef}
                        containerWidthMultiColumn={containerWidthMultiColumn}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
);

export default ViewMultiColumn;
