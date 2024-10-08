import React, { forwardRef } from "react";
import { useHandleClickTarget } from "../../../../hooks/useHandleClickTarget";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";
import { useFontAwesomeIconPack } from "../../../../hooks/useFontAwesomePack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ViewButtonUpdate = forwardRef(
  (
    {
      containerRef,
      isDragging,
      content,
      isResizing,
      isFocused,
      setSectionContentRef,
      focusedIndexSectionContent,
    },
    ref
  ) => {
    const iconPack = useFontAwesomeIconPack();

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
      sm: "tw-px-2 tw-py-1 tw-text-xs",
      md: "tw-px-4 tw-py-2 tw-text-sm",
      lg: "tw-px-6 tw-py-3 tw-text-base",
      xl: "tw-px-8 tw-py-4 tw-text-lg",
      default: "tw-px-4 tw-py-2 tw-text-sm",
    };

    const isFlexColumnItemsPosition =
      content.wrapperStyle.flexDirection === "tw-flex-col" &&
      content.wrapperStyle.jusctifyContent === "tw-justify-start"
        ? "tw-items-start"
        : content.wrapperStyle.flexDirection === "tw-flex-col" &&
          content.wrapperStyle.jusctifyContent === "tw-justify-center"
        ? "tw-items-center"
        : "tw-items-end";

    const isFlexColumnGapY =
      content.wrapperStyle.flexDirection === "tw-flex-col" &&
      content.wrapperStyle.marginX === "0"
        ? ""
        : content.wrapperStyle.flexDirection === "tw-flex-col" &&
          content.wrapperStyle.marginX === "1"
        ? "tw-gap-y-2"
        : content.wrapperStyle.flexDirection === "tw-flex-col" &&
          content.wrapperStyle.marginX === "2"
        ? "tw-gap-y-4"
        : content.wrapperStyle.flexDirection === "tw-flex-col" &&
          content.wrapperStyle.marginX === "3"
        ? "tw-gap-y-6"
        : content.wrapperStyle.flexDirection === "tw-flex-col" &&
          content.wrapperStyle.marginX === "4"
        ? "tw-gap-y-8"
        : "";

    return (
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
        }}
        className={`tw-flex ${
          content.wrapperStyle.flexDirection
        } ${isFlexColumnItemsPosition} ${isFlexColumnGapY}   ${
          content.wrapperStyle.jusctifyContent
        } ${
          content.wrapperStyle.flexDirection === "tw-flex-row" && "tw-gap-y-2"
        }   tw-p-3   ${
          isFocused &&
          "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20 "
        }`}
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

        {content.content.map((section, indexContent) => {
          const sizeClasses =
            sizeClassesMap[section.content.style.buttonSize] ||
            sizeClassesMap.default;

          const buttonColorClass =
            section.content.style.variant === "fill"
              ? { backgroundColor: section.content.style.btnColor }
              : { border: `1px solid ${section.content.style.btnColor}` };

          // Generate dynamic classes for text color, rounded corners, and shadow

          const roundedClass = section.content.style.rounded
            ? `${section.content.style.rounded}`
            : "";
          const shadowClass = section.content.style.shadow
            ? `${section.content.style.shadow}`
            : "";
          const icon = getIconForSection(section.content.icon);

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
              className={`${
                content.wrapperStyle.flexDirection === "tw-flex-row" &&
                `tw-mx-${content.wrapperStyle.marginX}`
              } ${
                section.target?.scrollTarget?.value === "back-to-top" &&
                "tw-cursor-pointer"
              } 
               ${
                 focusedIndexSectionContent === section.id
                   ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20"
                   : ""
               }
              `}
            >
              <div
                onClick={() =>
                  useHandleClickTarget(section.target, containerRef)
                }
                style={{
                  ...buttonColorClass,
                  color: section.content.style.textColor,
                }}
                className={`${roundedClass} ${sizeClasses} hover:tw-bg-opacity-80 ${shadowClass}  tw-inline-block tw-cursor-pointer`}
              >
                <div className="tw-flex tw-justify-center tw-items-center">
                  <div>
                    {icon && icon.prefix && icon.iconName && (
                      <div
                        style={{
                          color: section.content.iconColor,
                          marginRight: 8,
                        }}
                      >
                        <FontAwesomeIcon
                          size="lg"
                          icon={[`${icon.prefix}`, icon.iconName]}
                        />
                      </div>
                    )}

                    {section.content.image && (
                      <div
                        style={{
                          width: 30,
                          marginRight: 8,
                        }}
                      >
                        <img
                          src={section.content.image}
                          alt="icon"
                          style={{ width: "100%", objectFit: "contain" }}
                        />
                      </div>
                    )}
                  </div>

                  {section.content.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default ViewButtonUpdate;
