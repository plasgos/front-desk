import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useEffect, useState } from "react";
import { useFontAwesomeIconPack } from "../../../../hooks/useFontAwesomePack";

const ViewListFeature = forwardRef(
  ({ isDragging, content, isResizing, isFocused }, ref) => {
    const iconPack = useFontAwesomeIconPack();
    const [iconName, setIconName] = useState(null);

    useEffect(() => {
      if (iconPack && content.iconStyle?.icon) {
        const iconToSet = content.iconStyle?.icon || "hand-point-right";
        const iconExists = iconPack.some((icon) => icon.iconName === iconToSet);

        if (iconExists) {
          setIconName(iconToSet);
        } else {
          setIconName("hand-point-right"); // Set default icon
        }
      }
    }, [content.iconStyle.icon, iconPack]);

    useEffect(() => {
      if (content.iconStyle?.image) {
        setIconName(null);
      }
    }, [content.iconStyle.image]);

    const paddingTop = content.background?.paddingTop
      ? `calc(16px + ${content.background.paddingTop}px)`
      : content.background?.paddingY
      ? `calc(16px + ${content.background.paddingY}px)`
      : "16px";

    const paddingBottom = content.background?.paddingBottom
      ? `calc(16px + ${content.background.paddingBottom}px)`
      : content.background?.paddingY
      ? `calc(16px + ${content.background.paddingY}px)`
      : "16px";

    const backgroundImgStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${content.background?.bgImage})` || "",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: `blur(${content.background?.blur}px)`,
      zIndex: -1,
      overflow: "hidden",
    };

    const calculateOpacity = content.background?.opacity / 100;

    return (
      <div
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
          // ...backgroundImgStyle,
          paddingTop,
          paddingBottom,
          backgroundColor: content.background?.bgColor || "",
          position: "relative",
          zIndex: 1,
        }}
        className={` tw-my-2`}
      >
        <div style={backgroundImgStyle}></div>

        {content.background?.opacity ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor:
                content.background?.opacity < 0 ? "black" : "white",
              opacity: Math.abs(calculateOpacity),
            }}
          ></div>
        ) : null}

        <div className="tw-flex tw-flex-col tw-p-3">
          {content?.content?.text.map((item, index) => (
            <div
              style={{
                ...(index !== 0
                  ? { marginTop: content.content?.distance }
                  : {}),
              }}
              key={index}
              className={`tw-flex tw-items-center ${content?.content?.textAlign} `}
            >
              {iconName && (
                <div
                  style={{
                    position: "relative",
                    marginRight: content.iconStyle?.horizontalPosition,
                    top: content.iconStyle?.verticalPosition,
                    color: content.iconStyle?.color,
                  }}
                >
                  <FontAwesomeIcon
                    className={`${
                      content.iconStyle?.shadow ? content.iconStyle?.shadow : ""
                    }`}
                    icon={["fas", iconName]}
                    style={{ fontSize: content.iconStyle?.iconSize }}
                  />
                </div>
              )}

              {content.iconStyle?.image && (
                <div
                  className={`${
                    content.iconStyle?.shadow ? content.iconStyle?.shadow : ""
                  }`}
                  style={{
                    position: "relative",
                    marginRight: content.iconStyle?.horizontalPosition,
                    top: content.iconStyle?.verticalPosition,
                    color: content.iconStyle?.color,
                    width: content.iconStyle?.iconSize,
                  }}
                >
                  <img
                    src={content.iconStyle?.image}
                    alt="icon"
                    style={{ width: "100%" }}
                  />
                </div>
              )}

              <div
                style={{
                  fontSize: content.content?.fontSize,
                  color: content.content?.textColor,
                }}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default ViewListFeature;
