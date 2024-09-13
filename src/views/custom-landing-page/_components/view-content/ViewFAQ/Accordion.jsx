import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Accordion = ({ content, contentVariant, icon }) => {
  const {
    colorTitle,
    colorContent,
    fontSize,
    bgColor,
    borderColor,
    iconColor,
    dividerColor,
    bgContent,
    shadow,
    distance,
    borderWidth,
    isIconOnRight,
    iconSize,
    image,
  } = contentVariant?.style;
  const [isShowContent, setIsShowContent] = useState(false);

  return (
    <div
      className={`tw-w-full ${shadow}`}
      style={{
        border: `${borderWidth}px solid ${borderColor}`,
        marginBottom: distance,
      }}
    >
      <div
        style={{
          borderBottom: `1px solid ${dividerColor}`,
          backgroundColor: bgColor,
        }}
        className="tw-flex tw-items-center tw-w-full"
      >
        {/* Render icon or image on the left if isIconOnRight is false */}
        {!isIconOnRight && (
          <>
            {icon && (
              <div
                style={{
                  color: iconColor,
                  padding: 10,
                }}
              >
                <FontAwesomeIcon
                  onClick={() => setIsShowContent((prev) => !prev)}
                  icon={[`${icon.prefix}`, icon.iconName]}
                  style={{ fontSize: iconSize, cursor: "pointer" }}
                />
              </div>
            )}

            {image && (
              <div
                style={{
                  width: iconSize,
                  margin: 10,
                }}
              >
                <img
                  src={image}
                  alt="icon"
                  style={{ width: "100%", objectFit: "contain" }}
                />
              </div>
            )}
          </>
        )}

        {/* Title Section */}
        <div
          className="tw-flex-1 tw-p-2 tw-w-full tw-font-semibold"
          style={{ fontSize, color: colorTitle, backgroundColor: bgColor }}
        >
          {content.title}
        </div>

        {/* Render icon or image on the right if isIconOnRight is true */}
        {isIconOnRight && (
          <>
            {icon && (
              <div
                style={{
                  color: iconColor,
                  padding: 10,
                }}
              >
                <FontAwesomeIcon
                  onClick={() => setIsShowContent((prev) => !prev)}
                  icon={[`${icon.prefix}`, icon.iconName]}
                  style={{ fontSize: iconSize, cursor: "pointer" }}
                />
              </div>
            )}

            {image && (
              <div
                style={{
                  width: iconSize,
                  margin: 10,
                }}
              >
                <img
                  src={image}
                  alt="icon"
                  style={{ width: "100%", objectFit: "contain" }}
                />
              </div>
            )}
          </>
        )}
      </div>

      {isShowContent && (
        <div
          className="tw-p-2"
          style={{
            color: colorContent,
            fontSize: 16,
            backgroundColor: bgContent,
          }}
          dangerouslySetInnerHTML={{ __html: content.desc }}
        />
      )}
    </div>
  );
};

export default Accordion;
