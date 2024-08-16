import React, { useState } from "react";
import ColorPicker from "../../common/ColorPicker";
import SelectOptions from "../../common/SelectOptions";
import {
  alignOptions,
  columnTestimonyOptions,
  fontSizeOptions,
  fontStyleOptions,
  shadowOptions,
  textAlignOptions,
} from "../../SelectOptions";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import { FaStar } from "react-icons/fa6";

const layoutOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
];

const starAmountOptions = [
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

const starPositionOptions = [
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

  const [distance, setDistance] = useState(8);
  const [borderRadius, setBorderRadius] = useState(12);
  const [borderWidth, setBorderWidth] = useState(2);
  // const [paddingTop, setPaddingTop] = useState(0);
  // const [paddingBottom, setPaddingBottom] = useState(0);

  // Profile Style
  const [fontSizeName, setfontSizeName] = useState(18);
  const [selectedColorName, setSetselectedColorName] = useState("#000000");
  const [selectedColorBorderpict, setSetselectedBorderpict] =
    useState("#BDBDBD");
  const [distanceName, setSetdistanceName] = useState(8);
  const [selectedShadowPict, setSelectedShadowPict] = useState(
    shadowOptions[1]
  );
  const [imageSize, seImageSize] = useState(40);
  const [borderRadiusImage, setBorderRadiusImage] = useState(70);
  const [borderWidthImage, setBorderWidthImage] = useState(1);
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
  const [distanceContent, setdistanceContent] = useState(16);

  // Star Style
  const [amountStar, setAmountStar] = useState(starAmountOptions[4]);
  const [positionStar, setPositionStar] = useState(starPositionOptions[1]);
  const [sizeStar, setSizeStar] = useState(18);
  const [marginXStar, setMarginXStar] = useState(4);
  const [marginStar, setMarginStar] = useState(6);

  const handleUpdateSectionStarStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              starStyle: {
                ...item.starStyle,
                [key]: value,
              },
            }
          : item
      )
    );
  };

  const handleUpdateSectionWrapperStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                [key]: value,
              },
            }
          : item
      )
    );
  };

  const handleUpdateSectionProfileStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              profileStyle: {
                ...item.profileStyle,
                [key]: value,
              },
            }
          : item
      )
    );
  };

  const handleUpdateSectionContentStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              contentStyle: {
                ...item.contentStyle,
                [key]: value,
              },
            }
          : item
      )
    );
  };

  const handleSetValueWhenBlurProfileStyle = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "fontSizeName") {
      setfontSizeName(newValue);
    } else if (key === "distanceName") {
      setSetdistanceName(newValue);
    } else if (key === "imageSize") {
      seImageSize(newValue);
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
      setdistanceContent(newValue);
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

  const handleChangeBackgroundColor = (color) => {
    setSelectedBackgroundColor(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              cardStyle: {
                ...item.cardStyle,
                bgColor: color,
              },
            }
          : item
      )
    );
  };

  const handleChangeBorderCardColor = (color) => {
    setSelectedBorderCardColor(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              cardStyle: {
                ...item.cardStyle,
                borderColor: color,
              },
            }
          : item
      )
    );
  };

  const handleChangeStarColor = (color) => {
    setSelectedStarColor(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              cardStyle: {
                ...item.cardStyle,
                starColor: color,
              },
            }
          : item
      )
    );
  };

  const handleChangeAlign = (selectedOptionValue) => {
    setSelectedAlign(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                jusctifyContent: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeLayout = (selectedOptionValue) => {
    setSelectedLayout(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                layout: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeColumn = (selectedOptionValue) => {
    setSelectedColum(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                column: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeShadow = (selectedOptionValue) => {
    setSelectedShadow(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              cardStyle: {
                ...item.cardStyle,
                shadowCard: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeColorName = (color) => {
    setSetselectedColorName(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              profileStyle: {
                ...item.profileStyle,
                colorName: color,
              },
            }
          : item
      )
    );
  };

  const handleChangeFontStyle = (selectedOptionValue) => {
    setSelectedFontStyle(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              profileStyle: {
                ...item.profileStyle,
                fontStyle: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeColorBorderPictColor = (color) => {
    setSetselectedBorderpict(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              profileStyle: {
                ...item.profileStyle,
                borderPictColor: color,
              },
            }
          : item
      )
    );
  };

  const handleChangeShadowPict = (selectedOptionValue) => {
    setSelectedShadowPict(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              profileStyle: {
                ...item.profileStyle,
                shadowImageName: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeTextAlignContent = (selectedOptionValue) => {
    setSelectedTextAlignContent(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              contentStyle: {
                ...item.contentStyle,
                textAlign: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeFontSizeContent = (selectedOptionValue) => {
    setSelectedFontSizeContent(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              contentStyle: {
                ...item.contentStyle,
                fontSize: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeAmountStar = (selectedOptionValue) => {
    setAmountStar(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              starStyle: {
                ...item.starStyle,
                amount: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  const handleChangePositiontStar = (selectedOptionValue) => {
    setPositionStar(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              starStyle: {
                ...item.starStyle,
                position: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={selectedBackgroundColor}
          label="Background"
          onChange={handleChangeBackgroundColor}
          bottom={"10px"}
        />

        <ColorPicker
          initialColor={selectedBorderCardColor}
          label="Garis Luar"
          onChange={handleChangeBorderCardColor}
          bottom={"10px"}
        />
      </div>
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={selectedStarColor}
          label="Bintang"
          onChange={handleChangeStarColor}
          bottom={"-40px"}
        />
      </div>
      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Align"
          options={alignOptions}
          onChange={handleChangeAlign}
          value={selectedAlign}
          width="50"
        />

        <SelectOptions
          label="Layout"
          options={layoutOptions}
          onChange={handleChangeLayout}
          value={selectedLayout}
          width="50"
        />
      </div>
      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Kolom"
          options={columnTestimonyOptions}
          onChange={handleChangeColumn}
          value={selectedColum}
          width="50"
        />

        <SelectOptions
          label="Bayangan"
          options={shadowOptions}
          onChange={handleChangeShadow}
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
          onChange={handleChangeColorName}
          bottom={"-30px"}
          right={"130px"}
        />
      </div>

      <SelectOptions
        label="Font Style"
        options={fontStyleOptions}
        onChange={handleChangeFontStyle}
        value={selectedFontStyle}
        width="50"
      />

      <InputRangeWithNumber
        label="Ukuran Nama"
        value={fontSizeName}
        onChange={(newValue) => {
          setfontSizeName(newValue);
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
          setSetdistanceName(newValue);
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
          onChange={handleChangeColorBorderPictColor}
          bottom={"-30px"}
          right={"130px"}
        />
      </div>
      <SelectOptions
        label="Bayangan"
        options={shadowOptions}
        onChange={handleChangeShadowPict}
        value={selectedShadowPict}
        width="50"
      />
      <InputRangeWithNumber
        label="Ukuran Gambar"
        value={imageSize}
        onChange={(newValue) => {
          seImageSize(newValue);
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
          onChange={handleChangeTextAlignContent}
          value={selectedTextAlignContent}
          width="50"
        />

        <SelectOptions
          label="Ukuran Font"
          options={fontSizeOptions}
          onChange={handleChangeFontSizeContent}
          value={selectedFontSizeContent}
          width="50"
        />
      </div>

      <InputRangeWithNumber
        label="Jarak"
        value={distanceContent}
        onChange={(newValue) => {
          setdistanceContent(newValue);
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
          onChange={handleChangeStarColor}
          bottom={"10px"}
          left={"70px"}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Jumlah"
          options={starAmountOptions}
          onChange={handleChangeAmountStar}
          value={amountStar}
          width="50"
        />

        <SelectOptions
          label="Lokasi"
          options={starPositionOptions}
          onChange={handleChangePositiontStar}
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
