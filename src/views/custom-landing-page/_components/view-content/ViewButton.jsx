import React, { forwardRef } from "react";
import { handleScrollToTop } from "../../../../hooks/useScrollToTop";

const ViewButton = forwardRef(
  ({ containerRef, isDragging, content, isResizing, isFocused }, ref) => {
    const sizeClassesMap = {
      sm: "px-2 py-1 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
      xl: "px-8 py-4 text-lg",
      default: "px-4 py-2 text-sm",
    };

    const isFlexColumnItemsPosition =
      content.wrapperStyle.flexDirection === "flex-col" &&
      content.wrapperStyle.jusctifyContent === "justify-start"
        ? "items-start"
        : content.wrapperStyle.flexDirection === "flex-col" &&
          content.wrapperStyle.jusctifyContent === "justify-center"
        ? "items-center"
        : "items-end";

    const isFlexColumnGapY =
      content.wrapperStyle.flexDirection === "flex-col" &&
      content.wrapperStyle.marginX === "0"
        ? ""
        : content.wrapperStyle.flexDirection === "flex-col" &&
          content.wrapperStyle.marginX === "1"
        ? "gap-y-2"
        : content.wrapperStyle.flexDirection === "flex-col" &&
          content.wrapperStyle.marginX === "2"
        ? "gap-y-4"
        : content.wrapperStyle.flexDirection === "flex-col" &&
          content.wrapperStyle.marginX === "3"
        ? "gap-y-6"
        : content.wrapperStyle.flexDirection === "flex-col" &&
          content.wrapperStyle.marginX === "4"
        ? "gap-y-8"
        : "";

    return (
      <div
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
        }}
        className={`flex ${
          content.wrapperStyle.flexDirection
        } ${isFlexColumnItemsPosition} ${isFlexColumnGapY}  flex-wrap ${
          content.wrapperStyle.jusctifyContent
        } ${
          content.wrapperStyle.flexDirection === "flex-row" && "gap-y-2"
        }   p-3  `}
      >
        {content.content.map((section, index) => {
          const sizeClasses =
            sizeClassesMap[section.content.style.buttonSize] ||
            sizeClassesMap.default;

          // Generate dynamic classes for button color and border
          const buttonColorClass =
            section.content.style.variant === "fill"
              ? `bg-[${section.content.style.btnColor}]`
              : `!border !border-[${section.content.style.btnColor}]`;

          // Generate dynamic classes for text color, rounded corners, and shadow
          const textColorClass = `!text-[${section.content.style.textColor}]`;
          const roundedClass = section.content.style.rounded
            ? `${section.content.style.rounded}`
            : "";
          const shadowClass = section.content.style.shadow
            ? `!${section.content.style.shadow}`
            : "";

          return (
            <React.Fragment key={index}>
              {section.target && section.target?.url?.url ? (
                <div
                  className={`${
                    content.wrapperStyle.flexDirection === "flex-row" &&
                    `mx-${content.wrapperStyle.marginX}`
                  }`}
                >
                  <a
                    href={section.target.url.url}
                    target={
                      section.target?.url?.isOpenNewTab ? "_blank" : "_self"
                    }
                    role="button"
                    rel={
                      section.target?.url?.isOpenNewTab
                        ? "noopener noreferrer"
                        : ""
                    }
                    className={`${buttonColorClass} ${textColorClass} ${roundedClass} ${sizeClasses} hover:bg-opacity-80 ${shadowClass} !no-underline inline-block`}
                  >
                    {section.content.title}
                  </a>
                </div>
              ) : section.target && section.target?.whatApps?.phoneNumber ? (
                <div
                  className={`${
                    content.wrapperStyle.flexDirection === "flex-row" &&
                    `mx-${content.wrapperStyle.marginX}`
                  }`}
                >
                  <a
                    target={
                      section.target.whatApps.isOpenNewTab ? "_blank" : "_self"
                    }
                    href={`https://wa.me/+62${
                      section.target.whatApps.phoneNumber
                    }?text=${encodeURIComponent(
                      section.target.whatApps.message
                    )}`}
                    rel={
                      section.target.whatApps.isOpenNewTab
                        ? "noopener noreferrer"
                        : ""
                    }
                    className={`${buttonColorClass} ${textColorClass} ${roundedClass} ${sizeClasses} hover:bg-opacity-80 ${shadowClass} !no-underline inline-block`}
                  >
                    {section.content.title}
                  </a>
                </div>
              ) : section.target && section.target?.scrollTarget?.value ? (
                <div
                  onClick={() =>
                    handleScrollToTop(
                      section.target.scrollTarget.value,
                      containerRef
                    )
                  }
                  className={`${
                    content.wrapperStyle.flexDirection === "flex-row" &&
                    `mx-${content.wrapperStyle.marginX}`
                  } ${
                    section.target.scrollTarget.value === "back-to-top" &&
                    "cursor-pointer"
                  } `}
                >
                  <a
                    href={
                      section.target.scrollTarget.value !== "back-to-top"
                        ? `#${section.target.scrollTarget.value}`
                        : undefined
                    }
                    className={`${buttonColorClass} ${textColorClass} ${roundedClass} ${sizeClasses} hover:bg-opacity-80 ${shadowClass} !no-underline inline-block`}
                  >
                    {section.content.title}
                  </a>
                </div>
              ) : (
                <div
                  className={`${
                    content.wrapperStyle.flexDirection === "flex-row" &&
                    `mx-${content.wrapperStyle.marginX}`
                  }`}
                >
                  <button
                    className={`${buttonColorClass} ${textColorClass} ${roundedClass} ${sizeClasses} hover:bg-opacity-80 ${shadowClass} `}
                  >
                    {section.content.title}
                  </button>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

export default ViewButton;
