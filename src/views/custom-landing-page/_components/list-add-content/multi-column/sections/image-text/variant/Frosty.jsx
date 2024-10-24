import React, { useEffect, useState } from "react";
import { shadowOptions } from "../../../../../SelectOptions";
import ColorPicker from "../../../../../common/ColorPicker";
import SelectOptions from "../../../../../common/SelectOptions";
import InputRangeWithNumber from "../../../../../common/InputRangeWithNumber";
import { handleChaneStyleImageTextSection } from "../ImageControl";

const contentPositionOptions = [
  { value: "tw-justify-start", label: "Kiri" },
  { value: "tw-justify-center", label: "Tengah" },
  { value: "tw-justify-end", label: "Kanan" },
];

const Frosty = ({ setPreviewSection, currentSection, sectionId, columnId }) => {
  const [backgroundColor, setBackgroundColor] = useState(
    currentSection?.variant?.style?.backgroundColor || "#FFF5F5"
  );
  const [borderColor, setBorderColor] = useState(
    currentSection?.variant?.style?.borderColor || "#CBCACA"
  );

  const [paddingY, setPaddingY] = useState(
    currentSection?.variant?.style?.paddingY || 40
  );

  const [blur, setBlur] = useState(currentSection?.variant?.style?.blur || 0);

  const [widthContent, setWidthContent] = useState(
    currentSection?.variant?.style?.widthContent || 380
  );

  const [borderWidth, setBorderWidth] = useState(
    currentSection?.variant?.style?.borderWidth || ``
  );

  const [paddingContentY, setPaddingContentY] = useState(
    currentSection?.variant?.style?.paddingContentY || ``
  );

  const [paddingContentX, setPaddingContentX] = useState(
    currentSection?.variant?.style?.paddingContentX || ``
  );

  const [shadow, setShadow] = useState(undefined);

  const [roundedContent, setRoundedContent] = useState(
    currentSection?.variant?.style?.roundedContent || 0
  );

  const [rotationContent, setRotationContent] = useState(
    currentSection?.variant?.style?.rotationContent || 0
  );

  const [contentPosition, setContentPosition] = useState(
    contentPositionOptions.find(
      (opt) =>
        opt.value === currentSection?.variant?.style?.contentPosition ||
        contentPositionOptions[0]
    )
  );

  useEffect(() => {
    const currentShadowOption = shadowOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.shadow
    );
    if (currentShadowOption) {
      setShadow(currentShadowOption);
    }

    const currentImagePostion = contentPositionOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.contentPosition
    );

    if (currentImagePostion) {
      setContentPosition(currentImagePostion);
    }
  }, [currentSection]);

  const handleSetValueWhenBlurWrapperStyle = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "paddingY") {
      setPaddingY(newValue);
    } else if (key === "rotationContent") {
      setRotationContent(newValue);
    } else if (key === "rounded") {
      setRoundedContent(newValue);
    } else if (key === "blur") {
      setBlur(newValue);
    } else if (key === "widthContent") {
      setWidthContent(newValue);
    } else if (key === "paddingContentY") {
      setPaddingContentY(newValue);
    } else if (key === "paddingContentX") {
      setPaddingContentX(newValue);
    } else if (key === "borderWidth") {
      setBorderWidth(newValue);
    }
    handleChangeVariantStyle(key, newValue);
  };

  const handleChangeVariantStyle = (key, value) => {
    handleChaneStyleImageTextSection(
      setPreviewSection,
      sectionId,
      columnId,
      currentSection.id,
      key,
      value
    );
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={backgroundColor}
          label="Background"
          onChange={(color) => {
            setBackgroundColor(color);
            handleChangeVariantStyle("backgroundColor", color);
          }}
        />

        <ColorPicker
          initialColor={borderColor}
          label="Garis Luar"
          onChange={(color) => {
            setBorderColor(color);
            handleChangeVariantStyle("borderColor", color);
          }}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <SelectOptions
          label="Posisi"
          options={contentPositionOptions}
          onChange={(selectedOption) => {
            setContentPosition(selectedOption);
            handleChangeVariantStyle("contentPosition", selectedOption.value);
          }}
          value={contentPosition}
          width="50"
        />

        <SelectOptions
          label="Bayangan"
          options={shadowOptions}
          onChange={(selectedOption) => {
            setShadow(selectedOption);
            handleChangeVariantStyle("shadow", selectedOption.value);
          }}
          value={shadow}
          width="50"
        />
      </div>

      <InputRangeWithNumber
        label="Ruang Pengisi"
        value={paddingY}
        onChange={(newValue) => {
          setPaddingY(newValue);
          handleChangeVariantStyle("paddingY", newValue);
        }}
        min={0}
        max={800}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(paddingY, 0, 800, "paddingY")
        }
      />

      <InputRangeWithNumber
        label="Blur"
        value={blur}
        onChange={(newValue) => {
          setBlur(newValue);
          handleChangeVariantStyle("blur", newValue);
        }}
        min={0}
        max={40}
        onBlur={() => handleSetValueWhenBlurWrapperStyle(blur, 0, 40, "blur")}
      />

      <InputRangeWithNumber
        label="Lebar Konten"
        value={widthContent}
        onChange={(newValue) => {
          setWidthContent(newValue);
          handleChangeVariantStyle("widthContent", newValue);
        }}
        min={100}
        max={1024}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(
            widthContent,
            100,
            1024,
            "widthContent"
          )
        }
      />

      <InputRangeWithNumber
        label="Melingkar"
        value={roundedContent}
        onChange={(newValue) => {
          setRoundedContent(newValue);
          handleChangeVariantStyle("roundedContent", newValue);
        }}
        min={0}
        max={100}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(
            roundedContent,
            0,
            100,
            "roundedContent"
          )
        }
      />

      <InputRangeWithNumber
        label="Konten Vertical"
        value={paddingContentY}
        onChange={(newValue) => {
          setPaddingContentY(newValue);
          handleChangeVariantStyle("paddingContentY", newValue);
        }}
        min={0}
        max={100}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(
            paddingContentY,
            0,
            100,
            "paddingContentY"
          )
        }
      />

      <InputRangeWithNumber
        label="Konten Horizontal"
        value={paddingContentX}
        onChange={(newValue) => {
          setPaddingContentX(newValue);
          handleChangeVariantStyle("paddingContentX", newValue);
        }}
        min={0}
        max={100}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(
            paddingContentX,
            0,
            100,
            "paddingContentX"
          )
        }
      />

      <InputRangeWithNumber
        label="Garis Luar"
        value={borderWidth}
        onChange={(newValue) => {
          setBorderWidth(newValue);
          handleChangeVariantStyle("borderWidth", newValue);
        }}
        min={0}
        max={10}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(borderWidth, 0, 10, "borderWidth")
        }
      />

      <InputRangeWithNumber
        label="Rotasi"
        value={rotationContent}
        onChange={(newValue) => {
          setRotationContent(newValue);
          handleChangeVariantStyle("rotationContent", newValue);
        }}
        min={-90}
        max={90}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(
            rotationContent,
            -90,
            90,
            "rotationContent"
          )
        }
      />
    </div>
  );
};

export default Frosty;
