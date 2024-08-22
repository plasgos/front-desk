import React, { forwardRef } from "react";
import { useHandleClickTarget } from "../../../../hooks/useHandleClickTarget";

const ViewButtonUpdate = forwardRef(
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
        {content.content.map((section) => {
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

          return (
            <div
              key={section.id}
              className={`${
                content.wrapperStyle.flexDirection === "tw-flex-row" &&
                `tw-mx-${content.wrapperStyle.marginX}`
              } ${
                section.target?.scrollTarget?.value === "back-to-top" &&
                "tw-cursor-pointer"
              }`}
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
                {section.content.title}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default ViewButtonUpdate;
