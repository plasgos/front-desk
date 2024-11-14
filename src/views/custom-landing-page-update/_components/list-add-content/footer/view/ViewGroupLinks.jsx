import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useEffect, useState } from "react";
import { useFontAwesomeIconPack } from "../../../../../../hooks/useFontAwesomePack";
import { useHandleClickTarget } from "../../../../../../hooks/useHandleClickTarget";

const ViewGroupLinks = forwardRef(
  (
    {
      isDragging,
      isResizing,
      section,
      content,
      focusedIndexSectionContent,
      setSectionContentRef,
      containerRef,
    },
    ref
  ) => {
    const { titleColor, innerOutline, contentColor } =
      section?.variant?.style || {};

    const iconPack = useFontAwesomeIconPack();
    const [icon, setIcon] = useState(null);

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

    useEffect(() => {
      if (iconPack && iconPack.length > 0) {
        const iconToSet = content?.wrapperStyle?.icon;

        if (iconToSet && Object.keys(iconToSet).length > 0) {
          const iconExists = iconPack.some(
            (icon) => icon.iconName === iconToSet.iconName
          );

          setIcon(iconExists ? iconToSet : {});
        }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [iconPack, content]);

    useEffect(() => {
      if (!content.wrapperStyle.icon) {
        setIcon(null);
      }
    }, [content.wrapperStyle.icon]);

    useEffect(() => {
      if (content.wrapperStyle?.image) {
        setIcon(null);
      }
    }, [content.wrapperStyle.image]);

    return (
      <div
        ref={(el) => {
          if (setSectionContentRef) {
            setSectionContentRef(el, content.id);
          }
        }}
        style={{
          ...(focusedIndexSectionContent === content.id && {
            border: "2px solid green",
          }),
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          width: content?.wrapperStyle?.maxWidth,
          padding: 10,
        }}
        key={content.id}
        className={`${
          focusedIndexSectionContent === content.id
            ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20  "
            : ""
        }`}
      >
        <div className="tw-flex tw-items-center tw-mb-3">
          {icon && (
            <div
              style={{
                position: "relative",
                marginRight: 8,
                color: titleColor,
              }}
            >
              <FontAwesomeIcon
                icon={[`${icon.prefix}`, icon.iconName]}
                style={{ fontSize: content.wrapperStyle?.iconSize }}
              />
            </div>
          )}

          {content?.wrapperStyle?.image && (
            <div
              style={{
                position: "relative",
                marginRight: 8,
                width: content.wrapperStyle?.imageSize,
              }}
            >
              <img
                src={content?.wrapperStyle?.image}
                alt="icon"
                style={{ width: "100%", objectFit: "contain" }}
              />
            </div>
          )}

          <div
            style={{
              color: titleColor,
            }}
          >
            {content?.wrapperStyle?.title}
          </div>
        </div>

        <div
          style={{
            borderTop: `1px solid ${innerOutline} `,
            paddingTop: 10,
          }}
          className="tw-flex tw-flex-col tw-flex-wrap  tw-gap-3"
        >
          {content?.content?.map((contentItem) => {
            const iconContent = getIconForSection(contentItem?.icon);

            return (
              <div
                key={contentItem?.id}
                style={{
                  ...(Object.keys(contentItem.target).length > 0
                    ? { cursor: "pointer" }
                    : {}),
                }}
                onClick={() =>
                  useHandleClickTarget(contentItem.target, containerRef)
                }
                className={`tw-max-w-40`}
              >
                <div className="tw-flex tw-items-center">
                  <div>
                    {iconContent &&
                      iconContent.prefix &&
                      iconContent.iconName && (
                        <div
                          style={{
                            color: contentColor,
                            marginRight: 8,
                          }}
                        >
                          <FontAwesomeIcon
                            style={{ fontSize: contentItem?.iconSize }}
                            icon={[
                              `${iconContent.prefix}`,
                              iconContent.iconName,
                            ]}
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

                  <div
                    style={{
                      color: contentColor,
                    }}
                  >
                    {contentItem?.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default ViewGroupLinks;
