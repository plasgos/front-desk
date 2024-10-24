import React, { forwardRef } from "react";
import { useHandleClickTarget } from "../../../../hooks/useHandleClickTarget";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";
import { useFontAwesomeIconPack } from "../../../../hooks/useFontAwesomePack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { handleButtonSectionClick } from "./ViewButtonUpdate";

const ViewFloatingButtonCircle = forwardRef(
  (
    {
      containerRef,
      content,
      isResizing,
      setSectionContentRef,
      focusedIndexSectionContent,
    },
    ref
  ) => {
    const iconPack = useFontAwesomeIconPack();
    const dispatch = useDispatch();

    const getIconForSection = (icon) => {
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

    const stylesBg = useBackgroundStyles(content);

    const sizeClassesMap = {
      sm: 40,
      md: 48,
      lg: 60,
      xl: 68,
      default: 48,
    };

    const iconSizeMap = {
      sm: 16,
      md: 20,
      lg: 26,
      xl: 32,
      default: 20,
    };

    return (
      <div
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          backgroundColor: content.background.bgColor || "",
          position: "absolute",
          bottom: 10 + content.wrapperStyle.position,
          zIndex: 999,
          right: 10,
        }}
        className={`  tw-p-1 tw-flex tw-flex-col tw-items-center  `}
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

        {content.content.map((section) => {
          const sizeClasses =
            sizeClassesMap[section.buttonSize] || sizeClassesMap.default;

          const iconSizeClasses =
            iconSizeMap[section.buttonSize] || iconSizeMap.default;

          const shadowClass = section.shadow ? `${section.shadow}` : "";

          const icon = getIconForSection(section.icon);
          return (
            <div
              ref={(el) => {
                if (setSectionContentRef) {
                  setSectionContentRef(el, section.id);
                }
              }}
              style={{
                zIndex: 2,

                ...(focusedIndexSectionContent === section.id && {
                  border: "2px solid green",
                }),
              }}
              key={section.id}
              className={` ${
                section.target?.scrollTarget?.value === "back-to-top" &&
                "tw-cursor-pointer"
              } ${
                focusedIndexSectionContent === section.id
                  ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20"
                  : ""
              }  tw-mb-${content.wrapperStyle.distance}  `}
            >
              <div
                onClick={() =>
                  handleButtonSectionClick(
                    section.target,
                    containerRef,
                    dispatch
                  )
                }
                style={{
                  //   width: "100%",
                  textAlign: "center",
                  backgroundColor: section.btnColor,
                  width: sizeClasses,
                  height: sizeClasses,
                }}
                className={` tw-flex tw-justify-center tw-items-center tw-rounded-full   hover:tw-bg-opacity-80 ${shadowClass}   tw-cursor-pointer`}
              >
                <div className="">
                  {icon && icon.prefix && icon.iconName && (
                    <div
                      style={{
                        color: section.iconColor,
                        fontSize: iconSizeClasses,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={[`${icon.prefix}`, icon.iconName]}
                      />
                    </div>
                  )}

                  {section.image && (
                    <div
                      style={{
                        width: 30,
                      }}
                    >
                      <img
                        src={section.image}
                        alt="icon"
                        style={{ width: "100%", objectFit: "contain" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default ViewFloatingButtonCircle;
