import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useEffect, useState } from "react";
import { useFontAwesomeIconPack } from "../../../../../../hooks/useFontAwesomePack";

const ViewSocialLink = forwardRef(
  (
    {
      isDragging,
      isResizing,
      section,
      content,
      focusedIndexSectionContent,
      setSectionContentRef,
    },
    ref
  ) => {
    const { titleColor, innerOutline, contentColor } =
      section?.variant?.style || {};

    const iconPack = useFontAwesomeIconPack();
    const [icon, setIcon] = useState(null);
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

    const onClickTarget = (target) => {
      window.open(target, "_blank", "noopener noreferrer");
    };

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
          className="tw-flex  tw-flex-wrap  tw-gap-3"
        >
          {content?.content?.map((contentItem) => {
            const iconContent = getIconForSection(contentItem?.type?.icon);

            return (
              <div
                key={contentItem?.id}
                onClick={() =>
                  onClickTarget(
                    `${contentItem?.type?.link}${contentItem?.type?.path}`
                  )
                }
                style={{
                  color: contentColor,
                  cursor: "pointer",
                }}
              >
                <div>
                  {iconContent &&
                    iconContent.prefix &&
                    iconContent.iconName && (
                      <div
                        style={{
                          color: contentColor,
                        }}
                      >
                        <FontAwesomeIcon
                          style={{ fontSize: 20 }}
                          icon={[`${iconContent.prefix}`, iconContent.iconName]}
                        />
                      </div>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default ViewSocialLink;
