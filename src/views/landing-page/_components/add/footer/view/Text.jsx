import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useEffect, useState } from "react";
import { useFontAwesomeIconPack } from "../../../../../../hooks/useFontAwesomePack";

const ViewText = forwardRef(
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
    const { titleColor, contentColor, innerOutline } =
      section?.variant?.style || {};

    const cleanContent = content?.content?.text
      .replace(/<p>/g, "<div>")
      .replace(/<\/p>/g, "</div>");

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
          className={`${content.content?.textAlign} ${content?.content?.fontSize} `}
        >
          {content.content.text && (
            <div
              style={{
                color: contentColor,
              }}
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />
          )}
        </div>
      </div>
    );
  }
);

export default ViewText;
