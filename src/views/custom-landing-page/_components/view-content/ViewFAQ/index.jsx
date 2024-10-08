import React, { forwardRef, useEffect, useState } from "react";
import { useBackgroundStyles } from "../../../../../hooks/useBackgroundStyles";
import { useFontAwesomeIconPack } from "../../../../../hooks/useFontAwesomePack";
import PlainSimple from "./PlainSimple";
import KapsulSimple from "./KapsulSimple";
import Accordion from "./Accordion";

const ViewFAQ = forwardRef(
  (
    {
      isDragging,
      content,
      isResizing,
      isFocused,
      isPreview,
      width,
      setSectionContentRef,
      focusedIndexSectionContent,
    },
    ref
  ) => {
    const stylesBg = useBackgroundStyles(content);

    const iconPack = useFontAwesomeIconPack();
    const [iconName, setIconName] = useState(null);

    useEffect(() => {
      if (iconPack && iconPack.length > 0) {
        const iconToSet = content.variant?.style?.icon;

        if (iconToSet && Object.keys(iconToSet).length > 0) {
          const iconExists = iconPack.some(
            (icon) => icon.iconName === iconToSet.iconName
          );

          setIconName(iconExists ? iconToSet : {});
        }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content, iconPack]);

    useEffect(() => {
      if (content.variant?.style?.image) {
        setIconName(null);
      }
    }, [content.variant.style.image]);

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
        className={`tw-w-full tw-flex tw-flex-wrap tw-px-4 ${
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

        {content.content.map((item, indexContent) => {
          let wrapperStyle = {};

          if (content?.variant?.id === "1" || content?.variant?.id === "2") {
            wrapperStyle.className = isPreview
              ? `${
                  width === "100%" || width >= 640
                    ? `${content?.variant?.style?.maxColumn}`
                    : "tw-w-full"
                }   ${
                  focusedIndexSectionContent === item.id
                    ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20"
                    : ""
                } `
              : `tw-w-full sm:${content?.variant?.style?.maxColumn}  ${
                  focusedIndexSectionContent === item.id
                    ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20"
                    : ""
                }`;
          } else {
            wrapperStyle.className = `tw-w-full  ${
              focusedIndexSectionContent === item.id
                ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20"
                : ""
            }`;
          }

          return (
            <div
              ref={(el) => {
                if (setSectionContentRef) {
                  setSectionContentRef(el, item.id);
                }
              }}
              style={{
                ...(focusedIndexSectionContent === item.id && {
                  border: "2px solid green",
                }),
              }}
              key={item.id}
              className={wrapperStyle.className}
            >
              {content.variant?.id === "1" && (
                <PlainSimple content={item} contentVariant={content.variant} />
              )}

              {content.variant?.id === "2" && (
                <KapsulSimple content={item} contentVariant={content.variant} />
              )}

              {(content.variant?.id === "3" || content.variant?.id === "4") && (
                <Accordion
                  content={item}
                  contentVariant={content.variant}
                  icon={iconName}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

export default ViewFAQ;
