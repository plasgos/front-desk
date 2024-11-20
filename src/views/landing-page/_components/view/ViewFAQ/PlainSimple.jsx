import React from "react";

const PlainSimple = ({ content, contentVariant }) => {
  const { colorTitle, colorContent, fontSize } = contentVariant?.style;
  return (
    <div className="tw-flex  tw-items-center ">
      <div className="tw-p-2">
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

export default PlainSimple;
