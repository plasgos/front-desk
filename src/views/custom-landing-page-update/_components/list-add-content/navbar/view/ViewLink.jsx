import React, { forwardRef } from "react";
import { useHandleClickTarget } from "../../../../../../hooks/useHandleClickTarget";
import { useFontAwesomeIconPack } from "../../../../../../hooks/useFontAwesomePack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ViewLink = forwardRef(
  (
    {
      isDragging,
      isResizing,
      section,
      content,
      focusedIndexSectionContent,
      setSectionContentRef,
      containerRef,
      mobileView,
    },
    ref
  ) => {
    const { titleColor, contentColor, hoverTitleColor } =
      section?.variant?.style || {};

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

    return (
      <div key={content.id}>
        {content?.content?.map((contentItem) => {
          const icon = getIconForSection(contentItem.icon);

          const roundedClass =
            contentItem.typeView === "button"
              ? "tw-rounded-md"
              : "tw-rounded-full";

          return (
            <div key={contentItem?.id}>
              {contentItem?.typeView === "link" ? (
                <div
                  ref={(el) => {
                    if (setSectionContentRef) {
                      setSectionContentRef(el, content.id);
                    }
                  }}
                  key={contentItem?.id}
                  style={{
                    ...(Object.keys(contentItem.target).length > 0
                      ? { cursor: "pointer" }
                      : {}),
                    ...(focusedIndexSectionContent === content.id && {
                      border: "2px solid green",
                    }),
                    ...(isResizing ? { cursor: "not-allowed" } : {}),
                    ...(isDragging ? { border: "2px solid green" } : {}),
                  }}
                  onClick={() =>
                    useHandleClickTarget(contentItem.target, containerRef)
                  }
                  className={`${
                    focusedIndexSectionContent === content.id
                      ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20  "
                      : ""
                  }`}
                >
                  <div
                    style={{
                      "--text-color-header": mobileView?.value
                        ? mobileView?.textColor
                        : titleColor,
                      "--text-color-hover-header": hoverTitleColor,
                      fontSize: mobileView?.value ? 18 : 15,
                      whiteSpace: "nowrap",
                    }}
                    className="navbarHeaderTextColor"
                  >
                    {content?.wrapperStyle?.title}
                  </div>
                </div>
              ) : (
                <div
                  key={contentItem?.id}
                  ref={(el) => {
                    if (setSectionContentRef) {
                      setSectionContentRef(el, content.id);
                    }
                  }}
                  onClick={() =>
                    useHandleClickTarget(contentItem.target, containerRef)
                  }
                  style={{
                    ...(Object.keys(contentItem.target).length > 0
                      ? { cursor: "pointer" }
                      : {}),
                    ...(focusedIndexSectionContent === content.id && {
                      border: "2px solid green",
                    }),
                    ...(isResizing ? { cursor: "not-allowed" } : {}),
                    ...(isDragging ? { border: "2px solid green" } : {}),
                    backgroundColor: contentItem?.btnColor,
                  }}
                  className={`${roundedClass} tw-px-4 tw-py-2 tw-text-sm hover:tw-bg-opacity-80 tw-shadow tw-inline-block tw-cursor-pointer tw-text-white  ${
                    focusedIndexSectionContent === content.id
                      ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20  "
                      : ""
                  }`}
                >
                  <div className="tw-flex tw-justify-center tw-items-center">
                    <div>
                      {icon && icon.prefix && icon.iconName && (
                        <div
                          style={{
                            color: contentItem?.iconColor,
                            marginRight: 8,
                            fontSize: contentItem?.iconSize,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={[`${icon.prefix}`, icon.iconName]}
                          />
                        </div>
                      )}

                      {contentItem?.image && (
                        <div
                          style={{
                            width: contentItem?.imageSize,
                            marginRight: 8,
                          }}
                        >
                          <img
                            src={contentItem?.image}
                            alt="icon"
                            style={{ width: "100%", objectFit: "contain" }}
                          />
                        </div>
                      )}
                    </div>

                    {content?.wrapperStyle?.title}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

export default ViewLink;
