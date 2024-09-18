import React, { forwardRef } from "react";

const ViewFrosty = forwardRef(
  ({ isDragging, isResizing, content, isFocused }, ref) => {
    const backgroundImgStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: content.variant?.style?.image
        ? `url(${content.variant?.style?.image})`
        : "",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: -1,
      overflow: "hidden",
    };

    const paddingCalculateRadius = content.variant?.style?.roundedContent
      ? `calc(${parseInt(content.variant?.style?.roundedContent)}px / 3)`
      : "0px";

    // Menggabungkan paddingCalculateRadius dengan paddingContentY untuk atas dan bawah
    const paddingYCombined = content.variant?.style?.paddingContentY
      ? `calc(${paddingCalculateRadius} + ${content.variant?.style?.paddingContentY}px)`
      : paddingCalculateRadius;

    // Menggabungkan paddingCalculateRadius dengan paddingContentX untuk kiri dan kanan
    const paddingXCombined = content.variant?.style?.paddingContentX
      ? `calc(${paddingCalculateRadius} + ${content.variant?.style?.paddingContentX}px)`
      : paddingCalculateRadius;

    // Fungsi untuk mengonversi hex ke RGBA
    const convertHexToRGBA = (hex, alpha) => {
      // Hapus simbol '#' jika ada
      hex = hex.replace("#", "");

      // Cek apakah hex terdiri dari 3 atau 6 karakter
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((char) => char + char)
          .join(""); // Mengonversi 3 digit hex menjadi 6 digit
      }

      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Mengatur backgroundColor dengan alpha 0.3
    const backgroundColorWithAlpha = content.variant?.style?.backgroundColor
      ? convertHexToRGBA(content.variant?.style?.backgroundColor, 0.3)
      : "transparent"; // Default jika tidak ada backgroundColor

    const defaultBlur = 3;
    const backdropFilterValue = content.variant?.style?.blur
      ? `blur(${defaultBlur + content.variant?.style?.blur}px)`
      : `blur(${defaultBlur}px)`;

    const boxShadowColor = content.variant?.style?.borderColor
      ? convertHexToRGBA(content.variant?.style?.borderColor, 0.3)
      : "rgba(0, 0, 0, 0.3)"; // Default jika tidak ada borderColor

    const borderWidth = content.variant?.style?.borderWidth || 0;

    const boxShadowValue = `${boxShadowColor} 0px 0px 0px ${borderWidth}px inset`;

    return (
      <div
        key={content.id}
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
          paddingTop: content.variant?.style?.paddingY,
          paddingBottom: content.variant?.style?.paddingY,
          position: "relative",
          zIndex: 1,
        }}
        className={` tw-flex tw-flex-row tw-flex-wrap  tw-items-center  ${
          content.variant?.group !== "Page" ? "tw-p-0" : "tw-p-4"
        } `}
      >
        <div style={backgroundImgStyle}></div>

        <div
          className={`tw-flex tw-w-full tw-p-3 ${content.variant?.style?.contentPosition} `}
        >
          <div
            style={{
              backdropFilter: backdropFilterValue,
              width: content.variant?.style?.widthContent,
              borderRadius: content.variant?.style?.roundedContent,
              padding: `${paddingYCombined} ${paddingXCombined}`,
              zIndex: -1,
              transform: `rotate(${content?.variant?.style?.rotationContent}deg)`,
              backgroundColor: backgroundColorWithAlpha,
              boxShadow: boxShadowValue,
            }}
            className={`${content.variant?.style?.shadow}`}
          >
            {content?.content.map((contentItem) => {
              const cleanContent = contentItem.content
                .replace(/<p>/g, "<div>")
                .replace(/<\/p>/g, "</div>");
              return (
                <div key={contentItem.id} className="">
                  <div
                    style={{
                      color: content?.variant?.style?.textColor,
                      textShadow: content?.variant?.style?.textShadow,
                    }}
                    className={`tw-p-2 ${content?.variant?.style?.fontSize} ${content?.variant?.style?.textAlign}`}
                    dangerouslySetInnerHTML={{ __html: cleanContent }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

export default ViewFrosty;
