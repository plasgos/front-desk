import React from "react";

const KapsulSimple = ({ content, contentVariant }) => {
  const {
    colorTitle,
    colorContent,
    bgColor,
    borderColor,
    shadow,
    rounded,
    fontSize,
  } = contentVariant?.style;
  return (
    <div className="tw-flex  tw-items-center ">
      <div
        style={{
          borderRadius: rounded,
          backgroundColor: bgColor,
          border: `1px solid ${borderColor}`,
        }}
        className={`tw-p-2 tw-m-2 ${shadow}`}
      >
        <div style={{ fontSize, color: colorTitle, marginBottom: 10 }}>
          {content.title}
        </div>

        <div
          className="tw-p-2"
          style={{
            color: colorContent,
            fontSize: 16,
          }}
          dangerouslySetInnerHTML={{ __html: content.desc }}
        />
      </div>
    </div>
  );
};

export default KapsulSimple;
