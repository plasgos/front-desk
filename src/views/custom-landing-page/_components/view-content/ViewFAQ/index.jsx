import React, { forwardRef, useEffect, useState } from "react";
import { useBackgroundStyles } from "../../../../../hooks/useBackgroundStyles";
import { useFontAwesomeIconPack } from "../../../../../hooks/useFontAwesomePack";
import PlainSimple from "./PlainSimple";
import KapsulSimple from "./KapsulSimple";
import Accordion from "./Accordion";

const ViewFAQ = forwardRef(
  ({ isDragging, content, isResizing, isFocused, isPreview, width }, ref) => {
    const stylesBg = useBackgroundStyles(content);

    const iconPack = useFontAwesomeIconPack();
    const [iconName, setIconName] = useState(null);

    useEffect(() => {
      if (iconPack && content.variant?.style?.icon) {
        const iconToSet = content.variant?.style?.icon || "plus";
        const iconExists = iconPack.some((icon) => icon.iconName === iconToSet);

        if (iconExists) {
          setIconName(iconToSet);
        } else {
          setIconName("plus"); // Set default icon
        }
      }
    }, [content.variant.style.icon, iconPack]);

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
        className={`tw-w-full tw-flex tw-flex-wrap tw-px-4 `}
      >
        <div style={stylesBg.backgroundImgStyle}></div>

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

        {content.content.map((item) => {
          let wrapperStyle = {};

          if (content?.variant?.id === "1" || content?.variant?.id === "2") {
            wrapperStyle.className = isPreview
              ? `${
                  width === "100%" || width >= 640
                    ? `${content?.variant?.style?.maxColumn}`
                    : "tw-w-full"
                } `
              : `tw-w-full sm:${content?.variant?.style?.maxColumn}`;
          } else {
            wrapperStyle.className = "tw-w-full";
          }

          return (
            <div key={item.id} className={wrapperStyle.className}>
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
