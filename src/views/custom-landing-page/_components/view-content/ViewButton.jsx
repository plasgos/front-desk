import React, { forwardRef } from "react";
import { handleScrollToTop } from "../../../../hooks/useScrollToTop";

const ViewButton = forwardRef(
  ({ containerRef, isDragging, content, isResizing, isFocused }, ref) => {
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
        }}
        className={`tw-flex ${
          content.wrapperStyle.flexDirection
        } ${isFlexColumnItemsPosition} ${isFlexColumnGapY}  tw-flex-wrap ${
          content.wrapperStyle.jusctifyContent
        } ${
          content.wrapperStyle.flexDirection === "tw-flex-row" && "tw-gap-y-2"
        }   tw-p-3`}
      >
        {content.content.map((section, index) => {
          const sizeClasses =
            sizeClassesMap[section.content.style.buttonSize] ||
            sizeClassesMap.default;

          // Generate dynamic classes for button color and border
          const buttonColorClass =
            section.content.style.variant === "fill"
              ? `tw-bg-[${section.content.style.btnColor}]`
              : `!tw-border !tw-border-[${section.content.style.btnColor}]`;

          // Generate dynamic classes for text color, rounded corners, and shadow
          const textColorClass = `!tw-text-[${section.content.style.textColor}]`;
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
                    content.wrapperStyle.flexDirection === "tw-flex-row" &&
                    `tw-mx-${content.wrapperStyle.marginX}`
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
                    className={`${buttonColorClass} ${textColorClass} ${roundedClass} ${sizeClasses} hover:tw-bg-opacity-80 ${shadowClass} !tw-no-underline tw-inline-block`}
                  >
                    {section.content.title}
                  </a>
                </div>
              ) : section.target && section.target?.whatApps?.phoneNumber ? (
                <div
                  className={`${
                    content.wrapperStyle.flexDirection === "tw-flex-row" &&
                    `tw-mx-${content.wrapperStyle.marginX}`
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
                    className={`${buttonColorClass} ${textColorClass} ${roundedClass} ${sizeClasses} hover:tw-bg-opacity-80 ${shadowClass} !tw-no-underline tw-inline-block`}
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
                    content.wrapperStyle.flexDirection === "tw-flex-row" &&
                    `tw-mx-${content.wrapperStyle.marginX}`
                  } ${
                    section.target.scrollTarget.value === "back-to-top" &&
                    "tw-cursor-pointer"
                  } `}
                >
                  <a
                    href={
                      section.target.scrollTarget.value !== "back-to-top"
                        ? `#${section.target.scrollTarget.value}`
                        : undefined
                    }
                    className={`${buttonColorClass} ${textColorClass} ${roundedClass} ${sizeClasses} hover:tw-bg-opacity-80 ${shadowClass} !tw-no-underline tw-inline-block`}
                  >
                    {section.content.title}
                  </a>
                </div>
              ) : (
                <div
                  className={`${
                    content.wrapperStyle.flexDirection === "tw-flex-row" &&
                    `tw-mx-${content.wrapperStyle.marginX}`
                  }`}
                >
                  <button
                    className={`${buttonColorClass} ${textColorClass} ${roundedClass} ${sizeClasses} hover:tw-bg-opacity-80 ${shadowClass} focus:tw-outline-none  focus:tw-ring-0 focus:tw-border-none `}
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
