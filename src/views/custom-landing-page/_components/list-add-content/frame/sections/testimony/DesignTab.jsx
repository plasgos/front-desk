import React, { useEffect, useState } from "react";
import {
  alignOptions,
  columnTestimonyOptions,
  fontSizeOptions,
  fontStyleOptions,
  shadowOptions,
  textAlignOptions,
} from "../../../../SelectOptions";
import { FaStar } from "react-icons/fa6";
import SelectOptions from "../../../../common/SelectOptions";
import ColorPicker from "../../../../common/ColorPicker";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";
import { changeWrapperStyleFrame } from "../../helper/changeWrapperStyle";

export const layoutOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
];

export const starAmountOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
];

export const starPositionOptions = [
  { value: "top-name", label: "Di Atas Nama" },
  { value: "bottom-name", label: "Di Bawah Nama" },
  { value: "top-content", label: "Di Atas Content" },
  { value: "bottom-content", label: "Di Bawah Content" },
];

const DesignTab = ({
  currentSection,
  setPreviewSection,
  selectedColum,
  setSelectedColum,
  paddingTop,
  setPaddingTop,
  paddingBottom,
  setPaddingBottom,
  isEditingDesignTab,
  sectionId,
}) => {
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
    currentSection?.cardStyle?.bgColor || ""
  );

  const [selectedBorderCardColor, setSelectedBorderCardColor] = useState(
    currentSection?.cardStyle?.borderColor || ""
  );

  const [selectedStarColor, setSelectedStarColor] = useState(
    currentSection?.cardStyle?.starColor || ""
  );

  const [selectedAlign, setSelectedAlign] = useState(alignOptions[1]);
  const [selectedLayout, setSelectedLayout] = useState(layoutOptions[0]);
  const [selectedShadow, setSelectedShadow] = useState(shadowOptions[1]);

  const [distance, setDistance] = useState(
    currentSection?.wrapperStyle?.paddingX || 8
  );
  const [borderRadius, setBorderRadius] = useState(
    currentSection?.wrapperStyle?.borderRadius || 12
  );
  const [borderWidth, setBorderWidth] = useState(
    currentSection?.wrapperStyle?.borderWidth || 2
  );

  // Profile Style
  const [fontSizeName, setFontSizeName] = useState(
    currentSection?.profileStyle?.fontSizeName || 18
  );
  const [selectedColorName, setSelectedColorName] = useState(
    currentSection?.profileStyle?.colorName || "#000000"
  );
  const [selectedColorBorderpict, setSelectedColorBorderpict] = useState(
    currentSection?.profileStyle?.borderPictColor || "#BDBDBD"
  );
  const [distanceName, setDistanceName] = useState(
    currentSection?.profileStyle?.distanceName || 8
  );
  const [selectedShadowPict, setSelectedShadowPict] = useState(
    shadowOptions[1]
  );
  const [imageSize, setImageSize] = useState(
    currentSection?.profileStyle?.imageSize || 40
  );
  const [borderRadiusImage, setBorderRadiusImage] = useState(
    currentSection?.profileStyle?.borderRadiusImage || 70
  );
  const [borderWidthImage, setBorderWidthImage] = useState(
    currentSection?.profileStyle?.borderWidthImage || 1
  );
  const [selectedFontStyle, setSelectedFontStyle] = useState(
    fontStyleOptions[4]
  );

  // Content style
  const [selectedTextAlignContent, setSelectedTextAlignContent] = useState(
    textAlignOptions[1]
  );
  const [selectedFontSizeContent, setSelectedFontSizeContent] = useState(
    fontSizeOptions[1]
  );
  const [distanceContent, setDistanceContent] = useState(
    currentSection?.contentStyle?.distanceContent || 16
  );

  // Star Style
  const [amountStar, setAmountStar] = useState(starAmountOptions[4]);
  const [positionStar, setPositionStar] = useState(starPositionOptions[1]);
  const [sizeStar, setSizeStar] = useState(
    currentSection?.starStyle?.size || 18
  );
  const [marginXStar, setMarginXStar] = useState(
    currentSection?.starStyle?.marginX || 4
  );
  const [marginStar, setMarginStar] = useState(
    currentSection?.starStyle?.margin || 6
  );

  useEffect(() => {
    if (isEditingDesignTab) {
      const alignOption = alignOptions.find(
        (opt) => opt.value === currentSection.wrapperStyle?.jusctifyContent
      );
      if (alignOption) {
        setSelectedAlign(alignOption);
      }

      const layoutOption = layoutOptions.find(
        (opt) => opt.value === currentSection.wrapperStyle?.layout
      );
      if (layoutOption) {
        setSelectedLayout(layoutOption);
      }

      const shadowOption = shadowOptions.find(
        (opt) => opt.value === currentSection.cardStyle?.shadowCard
      );
      if (shadowOption) {
        setSelectedShadow(shadowOption);
      }

      const shadowPictOption = shadowOptions.find(
        (opt) => opt.value === currentSection.profileStyle?.shadowImageName
      );
      if (shadowPictOption) {
        setSelectedShadowPict(shadowPictOption);
      }

      const fontStyleOption = fontStyleOptions.find(
        (opt) => opt.value === currentSection.profileStyle?.fontStyle
      );
      if (fontStyleOption) {
        setSelectedFontStyle(fontStyleOption);
      }

      const textAlignOption = textAlignOptions.find(
        (opt) => opt.value === currentSection.contentStyle?.textAlign
      );
      if (textAlignOption) {
        setSelectedTextAlignContent(textAlignOption);
      }

      const fontSizeContentOption = fontSizeOptions.find(
        (opt) => opt.value === currentSection.contentStyle?.fontSize
      );
      if (fontSizeContentOption) {
        setSelectedFontSizeContent(fontSizeContentOption);
      }

      const amountStarOption = starAmountOptions.find(
        (opt) => opt.value === currentSection.starStyle?.amount
      );
      if (amountStarOption) {
        setAmountStar(amountStarOption);
      }

      const positionStarOption = starPositionOptions.find(
        (opt) => opt.value === currentSection.starStyle?.position
      );
      if (positionStarOption) {
        setPositionStar(positionStarOption);
      }
    }
  }, [
    currentSection.cardStyle.shadowCard,
    currentSection.contentStyle.fontSize,
    currentSection.contentStyle.textAlign,
    currentSection.profileStyle.fontStyle,
    currentSection.profileStyle.shadowImageName,
    currentSection.starStyle.amount,
    currentSection.starStyle.position,
    currentSection.wrapperStyle.jusctifyContent,
    currentSection.wrapperStyle.layout,
    isEditingDesignTab,
  ]);

  const handleUpdateSectionStarStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((sectionFrame) =>
                sectionFrame.id === currentSection.id
                  ? {
                      ...sectionFrame,
                      starStyle: {
                        ...sectionFrame.starStyle,
                        [key]: value,
                      },
                    }
                  : sectionFrame
              ),
            }
          : section
      )
    );
  };

  const handleUpdateSectionWrapperStyle = (key, value) => {
    const newValue = {
      [key]: value,
    };
    changeWrapperStyleFrame(
      setPreviewSection,
      sectionId,
      currentSection.id,
      newValue
    );
  };

  const handleUpdateSectionProfileStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((sectionFrame) =>
                sectionFrame.id === currentSection.id
                  ? {
                      ...sectionFrame,
                      profileStyle: {
                        ...sectionFrame.profileStyle,
                        [key]: value,
                      },
                    }
                  : sectionFrame
              ),
            }
          : section
      )
    );
  };

  const handleUpdateSectionContentStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((sectionFrame) =>
                sectionFrame.id === currentSection.id
                  ? {
                      ...sectionFrame,
                      contentStyle: {
                        ...sectionFrame.contentStyle,
                        [key]: value,
                      },
                    }
                  : sectionFrame
              ),
            }
          : section
      )
    );
  };

  const handleUpdateSectionCardStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((sectionFrame) =>
                sectionFrame.id === currentSection.id
                  ? {
                      ...sectionFrame,
                      cardStyle: {
                        ...sectionFrame.cardStyle,
                        [key]: value,
                      },
                    }
                  : sectionFrame
              ),
            }
          : section
      )
    );
  };

  const handleSetValueWhenBlurProfileStyle = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "fontSizeName") {
      setFontSizeName(newValue);
    } else if (key === "distanceName") {
      setDistanceName(newValue);
    } else if (key === "imageSize") {
      setImageSize(newValue);
    } else if (key === "borderRadiusImage") {
      setBorderRadiusImage(newValue);
    } else if (key === "borderWidthImage") {
      setBorderWidthImage(newValue);
    }
    handleUpdateSectionProfileStyle(key, newValue);
  };

  const handleSetValueWhenBlurContentStyle = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "distanceContent") {
      setDistanceContent(newValue);
    }
    handleUpdateSectionContentStyle(key, newValue);
  };

  const handleSetValueWhenBlurStarStyle = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "size") {
      setSizeStar(newValue);
    } else if (key === "marginX") {
      setMarginXStar(newValue);
    } else if (key === "margin") {
      setMarginStar(newValue);
    }
    handleUpdateSectionStarStyle(key, newValue);
  };

  const handleSetValueWhenBlurWrapperStyle = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "paddingX") {
      setDistance(newValue);
    } else if (key === "borderRadius") {
      setBorderRadius(newValue);
    } else if (key === "borderWidth") {
      setBorderWidth(newValue);
    } else if (key === "paddingTop") {
      setPaddingTop(newValue);
    } else if (key === "paddingBottom") {
      setPaddingBottom(newValue);
    }
    handleUpdateSectionWrapperStyle(key, newValue);
  };

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={selectedBackgroundColor}
          label="Background"
          onChange={(color) => {
            setSelectedBackgroundColor(color);
            handleUpdateSectionCardStyle("bgColor", color);
          }}
        />

        <ColorPicker
          initialColor={selectedBorderCardColor}
          label="Garis Luar"
          onChange={(color) => {
            setSelectedBorderCardColor(color);
            handleUpdateSectionCardStyle("borderColor", color);
          }}
        />
      </div>
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={selectedStarColor}
          label="Bintang"
          onChange={(color) => {
            setSelectedStarColor(color);
            handleUpdateSectionCardStyle("starColor", color);
          }}
        />
      </div>
      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Align"
          options={alignOptions}
          onChange={(selectedOption) => {
            setSelectedAlign(selectedOption);
            handleUpdateSectionWrapperStyle(
              "jusctifyContent",
              selectedOption.value
            );
          }}
          value={selectedAlign}
          width="50"
        />

        <SelectOptions
          label="Layout"
          options={layoutOptions}
          onChange={(selectedOption) => {
            setSelectedLayout(selectedOption);
            handleUpdateSectionWrapperStyle("layout", selectedOption.value);
          }}
          value={selectedLayout}
          width="50"
        />
      </div>
      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Kolom"
          options={columnTestimonyOptions}
          onChange={(selectedOption) => {
            setSelectedColum(selectedOption);
            handleUpdateSectionWrapperStyle("column", selectedOption.value);
          }}
          value={selectedColum}
          width="50"
        />

        <SelectOptions
          label="Bayangan"
          options={shadowOptions}
          onChange={(selectedOption) => {
            setSelectedShadow(selectedOption);
            handleUpdateSectionCardStyle("shadowCard", selectedOption.value);
          }}
          value={selectedShadow}
          width="50"
        />
      </div>
      <InputRangeWithNumber
        label="Jarak"
        value={distance}
        onChange={(newValue) => {
          setDistance(newValue);
          handleUpdateSectionWrapperStyle("paddingX", newValue);
        }}
        min={0}
        max={40}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(distance, 0, 40, "paddingX")
        }
      />
      <InputRangeWithNumber
        label="Radius"
        value={borderRadius}
        onChange={(newValue) => {
          setBorderRadius(newValue);
          handleUpdateSectionWrapperStyle("borderRadius", newValue);
        }}
        min={0}
        max={100}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(
            borderRadius,
            0,
            100,
            "borderRadius"
          )
        }
      />
      <InputRangeWithNumber
        label="Garis Luar"
        value={borderWidth}
        onChange={(newValue) => {
          setBorderWidth(newValue);
          handleUpdateSectionWrapperStyle("borderWidth", newValue);
        }}
        min={0}
        max={20}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(borderWidth, 0, 20, "borderWidth")
        }
      />
      <InputRangeWithNumber
        label="Ruang Pengisi Atas"
        value={paddingTop}
        onChange={(newValue) => {
          setPaddingTop(newValue);
          handleUpdateSectionWrapperStyle("paddingTop", newValue);
        }}
        min={0}
        max={120}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(paddingTop, 0, 120, "paddingTop")
        }
      />
      <InputRangeWithNumber
        label="Ruang Pengisi Bawah"
        value={paddingBottom}
        onChange={(newValue) => {
          setPaddingBottom(newValue);
          handleUpdateSectionWrapperStyle("paddingBottom", newValue);
        }}
        min={0}
        max={120}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(
            paddingBottom,
            0,
            120,
            "paddingBottom"
          )
        }
      />
      <h5>Nama</h5>
      <div className="mb-2">
        <ColorPicker
          initialColor={selectedColorName}
          label="Nama"
          onChange={(color) => {
            setSelectedColorName(color);
            handleUpdateSectionProfileStyle("colorName", color);
          }}
        />
      </div>

      <SelectOptions
        label="Font Style"
        options={fontStyleOptions}
        onChange={(selectedOption) => {
          setSelectedFontStyle(selectedOption);
          handleUpdateSectionProfileStyle("fontStyle", selectedOption.value);
        }}
        value={selectedFontStyle}
        width="50"
      />

      <InputRangeWithNumber
        label="Ukuran Nama"
        value={fontSizeName}
        onChange={(newValue) => {
          setFontSizeName(newValue);
          handleUpdateSectionProfileStyle("fontSizeName", newValue);
        }}
        min={11}
        max={80}
        onBlur={() =>
          handleSetValueWhenBlurProfileStyle(
            fontSizeName,
            11,
            80,
            "fontSizeName"
          )
        }
      />
      <InputRangeWithNumber
        label="Jarak"
        value={distanceName}
        onChange={(newValue) => {
          setDistanceName(newValue);
          handleUpdateSectionProfileStyle("distanceName", newValue);
        }}
        min={0}
        max={100}
        onBlur={() =>
          handleSetValueWhenBlurProfileStyle(
            distanceName,
            0,
            100,
            "distanceName"
          )
        }
      />
      <h5>Gambar</h5>
      <div className="mb-2">
        <ColorPicker
          initialColor={selectedColorBorderpict}
          label="Garis Luar"
          onChange={(color) => {
            setSelectedColorBorderpict(color);
            handleUpdateSectionProfileStyle("borderPictColor", color);
          }}
        />
      </div>
      <SelectOptions
        label="Bayangan"
        options={shadowOptions}
        onChange={(selectedOption) => {
          setSelectedShadowPict(selectedOption);
          handleUpdateSectionProfileStyle(
            "shadowImageName",
            selectedOption.value
          );
        }}
        value={selectedShadowPict}
        width="50"
      />
      <InputRangeWithNumber
        label="Ukuran Gambar"
        value={imageSize}
        onChange={(newValue) => {
          setImageSize(newValue);
          handleUpdateSectionProfileStyle("imageSize", newValue);
        }}
        min={40}
        max={200}
        onBlur={() =>
          handleSetValueWhenBlurProfileStyle(imageSize, 40, 200, "imageSize")
        }
      />
      <InputRangeWithNumber
        label="Radius"
        value={borderRadiusImage}
        onChange={(newValue) => {
          setBorderRadiusImage(newValue);
          handleUpdateSectionProfileStyle("borderRadiusImage", newValue);
        }}
        min={0}
        max={70}
        onBlur={() =>
          handleSetValueWhenBlurProfileStyle(
            borderRadiusImage,
            0,
            70,
            "borderRadiusImage"
          )
        }
      />

      <InputRangeWithNumber
        label="Garis Luar"
        value={borderWidthImage}
        onChange={(newValue) => {
          setBorderWidthImage(newValue);
          handleUpdateSectionProfileStyle("borderWidthImage", newValue);
        }}
        min={0}
        max={20}
        onBlur={() =>
          handleSetValueWhenBlurProfileStyle(
            borderWidthImage,
            0,
            20,
            "borderWidthImage"
          )
        }
      />

      <h5>Konten</h5>
      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Align"
          options={textAlignOptions}
          onChange={(selectedOption) => {
            setSelectedTextAlignContent(selectedOption);
            handleUpdateSectionContentStyle("textAlign", selectedOption.value);
          }}
          value={selectedTextAlignContent}
          width="50"
        />

        <SelectOptions
          label="Ukuran Font"
          options={fontSizeOptions}
          onChange={(selectedOption) => {
            setSelectedFontSizeContent(selectedOption);
            handleUpdateSectionContentStyle("fontSize", selectedOption.value);
          }}
          value={selectedFontSizeContent}
          width="50"
        />
      </div>

      <InputRangeWithNumber
        label="Jarak"
        value={distanceContent}
        onChange={(newValue) => {
          setDistanceContent(newValue);
          handleUpdateSectionContentStyle("distanceContent", newValue);
        }}
        min={0}
        max={100}
        onBlur={() =>
          handleSetValueWhenBlurContentStyle(
            distanceContent,
            0,
            100,
            "distanceContent"
          )
        }
      />

      <h5>Bintang</h5>

      <div className="my-2">
        <FaStar size={26} color={selectedStarColor} />
      </div>

      <div className="mb-2">
        <ColorPicker
          initialColor={selectedStarColor}
          label=""
          onChange={(color) => {
            setSelectedStarColor(color);
            handleUpdateSectionCardStyle("starColor", color);
          }}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Jumlah"
          options={starAmountOptions}
          onChange={(selectedOption) => {
            setAmountStar(selectedOption);
            handleUpdateSectionStarStyle("amount", selectedOption.value);
          }}
          value={amountStar}
          width="50"
        />

        <SelectOptions
          label="Lokasi"
          options={starPositionOptions}
          onChange={(selectedOption) => {
            setPositionStar(selectedOption);
            handleUpdateSectionStarStyle("position", selectedOption.value);
          }}
          value={positionStar}
          width="50"
        />
      </div>

      <InputRangeWithNumber
        label="Ukuran"
        value={sizeStar}
        onChange={(newValue) => {
          setSizeStar(newValue);
          handleUpdateSectionStarStyle("size", newValue);
        }}
        min={10}
        max={200}
        onBlur={() =>
          handleSetValueWhenBlurStarStyle(sizeStar, 10, 200, "size")
        }
      />

      <InputRangeWithNumber
        label="Jarak"
        value={marginXStar}
        onChange={(newValue) => {
          setMarginXStar(newValue);
          handleUpdateSectionStarStyle("marginX", newValue);
        }}
        min={0}
        max={100}
        onBlur={() =>
          handleSetValueWhenBlurStarStyle(marginXStar, 0, 100, "marginX")
        }
      />

      <InputRangeWithNumber
        label="Margin"
        value={marginStar}
        onChange={(newValue) => {
          setMarginStar(newValue);
          handleUpdateSectionStarStyle("margin", newValue);
        }}
        min={0}
        max={100}
        onBlur={() =>
          handleSetValueWhenBlurStarStyle(marginStar, 0, 100, "margin")
        }
      />
    </div>
  );
};

export default DesignTab;
