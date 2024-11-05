import React, { forwardRef, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";
import { useFontAwesomeIconPack } from "../../../../hooks/useFontAwesomePack";
import { ViewMultipleContent } from "./ViewMultipleContent";

const ViewTabs = forwardRef(
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

    const [activeTab, setActiveTab] = useState(undefined);

    useEffect(() => {
      setActiveTab(content?.wrapperStyle?.defaultTab);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const iconPack = useFontAwesomeIconPack();

    const getIconEachTab = (icon) => {
      if (iconPack) {
        // Pastikan 'icon' bukan undefined atau null
        const iconToSet = icon || "";

        // Pastikan iconToSet memiliki properti iconName
        if (iconToSet.iconName) {
          const iconExists = iconPack.some(
            (iconItem) => iconItem.iconName === iconToSet?.iconName
          );
          return iconExists ? iconToSet : null;
        }
      }
      return null;
    };

    const paddingTop = content.background?.paddingTop
      ? `calc(0px + ${content.background.paddingTop}px)`
      : content.background?.paddingY
      ? `calc(0px + ${content.background.paddingY}px)`
      : "0px";

    const paddingBottom = content.background?.paddingBottom
      ? `calc(0px + ${content.background.paddingBottom}px)`
      : content.background?.paddingY
      ? `calc(0px + ${content.background.paddingY}px)`
      : "0px";

    const {
      tabsPosition,
      bgColor,
      activeBg,
      textColor,
      textHover,
      activeText,
      lineTab,
      lineContent,
      fontSize,
      iconSize,
      imageSize,
    } = content?.wrapperStyle;

    const tabPositionValue =
      tabsPosition === "top" ? "tw-flex-col" : "tw-flex-col-reverse";

    return (
      <>
        <div
          ref={ref}
          style={{
            ...(isResizing ? { cursor: "not-allowed" } : {}),
            ...(isDragging ? { border: "2px solid green" } : {}),
            ...(isFocused && { border: "2px solid green" }),
            paddingTop,
            paddingBottom,
            backgroundColor: content.background.bgColor || "",
            position: "relative",
            zIndex: 1,
            maxWidth: "100%",
          }}
          className={`    ${
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

          <div className={`tw-flex ${tabPositionValue}`}>
            <div className="tw-flex tw-px-5">
              {content.content.map((tabs) => {
                const isActive = tabs.id === activeTab;
                const icon = getIconEachTab(tabs.icon);

                return (
                  <div
                    key={tabs.id}
                    onClick={() => setActiveTab(tabs.id)}
                    style={{
                      border: `1px solid ${lineTab}`,
                      backgroundColor: isActive ? activeBg : bgColor,
                      fontSize,
                      color: isActive && activeText,
                      "--tabs-hover-color": textHover,
                      "--tabs-text-color": textColor,
                      padding: "8px 12px",
                    }}
                    className={`tw-cursor-pointer tabs-hover-text tw-font-semibold tw-relative tw-flex tw-items-center  tw-justify-center `}
                  >
                    <div className="tw-flex tw-items-center tw-gap-x-3 tw-justify-center "></div>

                    <div className="">
                      {icon && icon.prefix && icon.iconName && (
                        <div
                          style={{
                            color: activeText,
                            fontSize: iconSize,
                            marginRight: 8,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={[`${icon.prefix}`, icon.iconName]}
                          />
                        </div>
                      )}

                      {tabs.image && (
                        <div
                          style={{
                            width: imageSize,
                          }}
                        >
                          <img
                            src={tabs.image}
                            alt="icon"
                            style={{
                              width: "100%",
                              objectFit: "contain",
                              marginRight: 8,
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div>{tabs.name}</div>

                    <div
                      style={{ backgroundColor: isActive && activeText }}
                      className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-h-1 tw-w-full"
                    ></div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                border: `1px solid ${lineContent} `,
              }}
              className={`tw-w-full tw-h-auto`}
            >
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

                if (column.id === activeTab) {
                  return (
                    <div
                      ref={(el) => {
                        if (setColumnRef) {
                          setColumnRef(el, column?.id);
                        }
                      }}
                      style={{
                        ...(focusedIndexColumn === column?.id && {
                          border: "2px solid green",
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
                                column.background?.opacity < 0
                                  ? "black"
                                  : "white",
                              opacity: Math.abs(calculateOpacity),
                            }}
                          ></div>
                        ) : null}

                        {column.content.map((contentItem) => {
                          return (
                            <ViewMultipleContent
                              content={contentItem}
                              focusedIndexColumn={focusedIndexColumn}
                              setSectionContentRef={setSectionContentRef}
                              containerRef={containerRef}
                              focusedIndexSectionContent={
                                focusedIndexSectionContent
                              }
                              isPreview={isPreview}
                              setColumnRef={setColumnRef}
                              setPreviewSection={setPreviewSection}
                              width={width}
                              key={contentItem.id}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default ViewTabs;
