import React, { useEffect, useState } from "react";
import imageDefault from "../../../../../assets/bg.jpg";
import { CButton } from "@coreui/react";

import pattern1 from "../../../../../assets/pattern/26669.jpg";
import pattern2 from "../../../../../assets/pattern/5570863.jpg";
import pattern3 from "../../../../../assets/pattern/geometric-blue-line-pattern.jpg";
import pattern4 from "../../../../../assets/pattern/gray_line_drawings_of_organic_shapes_background.jpg";
import pattern5 from "../../../../../assets/pattern/sl_022120_28320_22.jpg";
import pattern6 from "../../../../../assets/pattern/vecteezy_geometric-line-circles-pattern-background-design-perfect_7167520.jpg";
import {
  backgroundType,
  PaddingYOptions,
  shadowOptions,
} from "../../SelectOptions";
import SelectOptions from "../../common/SelectOptions";
import ColorPicker from "../../common/ColorPicker";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import GradientBox from "../../common/GradientBox";
import Checkbox from "../../common/Checkbox";
import PatternBox from "../../common/PatternBox";

export const patterns = [
  { id: "1", img: pattern1 },
  { id: "2", img: pattern2 },
  { id: "3", img: pattern3 },
  { id: "4", img: pattern4 },
  { id: "5", img: pattern5 },
  { id: "6", img: pattern6 },
];

export const directionGradientOptions = [
  { value: "to bottom", label: "Ke Bawah" },
  { value: "to right", label: "Ke Kanan" },
  { value: "to right bottom", label: "Ke Kanan Bawah" },
  { value: "to right top", label: "Ke Kanan Atas" },
];
export const gradients = [
  { from: "#FF6F61", to: "#6B5B95" },
  { from: "#88B04B", to: "#F7CAC9" },
  { from: "#92A8D1", to: "#81F3FD" },
  { from: "#FFF176", to: "#66BB6A" },
  { from: "#98B4D4", to: "#FFDDC1" },
  { from: "#D4A5A5", to: "#B565A7" },
  { from: "#DECD63", to: "#FF6F61" },
  { from: "#2E4057", to: "#FFD662" },
  { from: "#45B8AC", to: "#EFC050" },
  { from: "#F5F5F5", to: "#37474F" },
  { from: "#6B5B95", to: "#BC70A4" },
  { from: "#92A8D1", to: "#F7CAC9" },
];

const FrameControl = ({ currentSection, setPreviewSection, type }) => {
  const [selectedBackgroundType, setSelectedBackgroundType] = useState(
    backgroundType[0]
  );

  const [width, setWidth] = useState(
    currentSection?.wrapperStyle?.width || 600
  );

  const [rotation, setRotation] = useState(
    currentSection?.wrapperStyle?.rotation || 0
  );

  const [rounded, setRounded] = useState(
    currentSection?.wrapperStyle?.rounded || 40
  );

  const [selectedPadding, setSelectedPadding] = useState(PaddingYOptions[0]);

  const [shadow, setShadow] = useState(
    shadowOptions.find(
      (opt) => opt.value === currentSection?.wrapperStyle?.shadow
    ) || shadowOptions[4]
  );

  const [paddingY, setPaddingY] = useState(
    currentSection?.wrapperStyle?.paddingY || 0
  );
  const [paddingTop, setPaddingTop] = useState(
    currentSection?.wrapperStyle?.paddingTop || 0
  );
  const [paddingBottom, setPaddingBottom] = useState(
    currentSection?.wrapperStyle?.paddingBottom || 0
  );

  const [selectedBgColor, setSelectedBgColor] = useState(
    currentSection?.wrapperStyle?.bgColor || "#EEEEEE"
  );

  const [imageUrl, setImageUrl] = useState(
    currentSection?.wrapperStyle?.bgImage || imageDefault
  );
  const [blur, setBlur] = useState(currentSection?.wrapperStyle?.blur || 0);
  const [opacity, setOpacity] = useState(
    currentSection?.wrapperStyle?.opacity || 0
  );

  const [fromColor, setFromColor] = useState(
    currentSection?.wrapperStyle?.fromColor || "#FF6F61"
  );

  const [toColor, setToColor] = useState(
    currentSection?.wrapperStyle?.toColor || "#6B5B95"
  );

  const [direction, setDirection] = useState(
    directionGradientOptions.find(
      (opt) => opt.value === currentSection?.wrapperStyle?.direction
    ) || directionGradientOptions[1]
  );

  const [isRevert, setIsRevert] = useState(
    currentSection?.wrapperStyle?.isRevert || false
  );

  const [selectedPattern, setSelectedPattern] = useState(
    currentSection?.wrapperStyle?.pattern || pattern1
  );

  useEffect(() => {
    const currentBgTypeOption = backgroundType.find(
      (opt) => opt.value === currentSection?.wrapperStyle?.bgType
    );
    if (currentBgTypeOption) {
      setSelectedBackgroundType(currentBgTypeOption);
    }

    const currentPaddingTypeOption = PaddingYOptions.find(
      (opt) => opt.value === currentSection?.wrapperStyle?.paddingType
    );

    if (currentPaddingTypeOption) {
      setSelectedPadding(currentPaddingTypeOption);
    }

    const currentPaddingY = currentSection?.wrapperStyle?.paddingY;

    if (currentPaddingY) {
      setPaddingY(currentPaddingY);
    }

    const currentPattern = currentSection?.wrapperStyle?.pattern;

    if (currentPattern) {
      setSelectedPattern(currentPattern);
    }

    const currentShadow = shadowOptions.find(
      (opt) => opt.value === currentSection?.wrapperStyle?.shadow
    );
    if (currentShadow) {
      setShadow(currentShadow);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, backgroundType, PaddingYOptions, currentSection]);

  const defaultBgValues = {
    bgType: undefined,
    bgColor: "",
    bgImage: "",
    blur: 0,
    opacity: 0,
    paddingY: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingType: "equal",
    direction: "",
    fromColor: "",
    toColor: "",
    isRevert: false,
    pattern: "",
  };

  const resetGradient = {
    direction: "",
    fromColor: "",
    toColor: "",
    isRevert: false,
  };

  const setValueBackground = (newValue) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection.id
          ? {
              ...section,
              wrapperStyle: {
                ...section.wrapperStyle,
                ...newValue,
              },
            }
          : section
      )
    );
  };

  const handleChangeValueOptions = (selectedOption, key) => {
    if (!selectedOption.value) {
      const newValue = {
        background: defaultBgValues,
      };

      setValueBackground(newValue);
    } else if (selectedOption !== "image") {
      const newValue = {
        bgImage: "",
      };

      setValueBackground(newValue);
    }

    const newValue = {
      [key]: selectedOption.value,
    };

    setValueBackground(newValue);
  };

  const handleChangePaddingOptions = (selectedOption) => {
    setSelectedPadding(selectedOption);

    if (selectedOption.value !== "equal") {
      setPaddingY(0);

      const newValue = {
        paddingY: 0,
        paddingType: selectedOption.value,
      };

      setValueBackground(newValue);
    } else {
      setPaddingTop(0);
      setPaddingBottom(0);

      const newValue = {
        paddingTop: 0,
        paddingBottom: 0,
        paddingType: selectedOption.value,
      };

      setValueBackground(newValue);
    }
  };

  const handleUpdateBackground = (key, value) => {
    const newValue = {
      [key]: value,
    };

    setValueBackground(newValue);
  };

  const handleSetValueWhenBlurBackground = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "paddingY") {
      setPaddingY(newValue);
    } else if (key === "paddingTop") {
      setPaddingTop(newValue);
    } else if (key === "paddingBottom") {
      setPaddingBottom(newValue);
    } else if (key === "blur") {
      setBlur(newValue);
    } else if (key === "opacity") {
      setOpacity(newValue);
    } else if (key === "width") {
      setWidth(newValue);
    } else if (key === "rotation") {
      setRotation(newValue);
    } else if (key === "rounded") {
      setRounded(newValue);
    }
    handleUpdateBackground(key, newValue);
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImageUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    };
  };

  useEffect(() => {
    // Update tempSections setelah imageUrl berubah

    if (selectedBackgroundType?.value === "image") {
      const newValue = {
        bgImage: imageUrl,
        bgColor: "",
        ...resetGradient,
        pattern: "",
      };

      setValueBackground(newValue);
    } else if (selectedBackgroundType?.value === "color") {
      const newValue = {
        bgColor: selectedBgColor,
        ...resetGradient,
        pattern: "",
      };

      setValueBackground(newValue);
    } else if (selectedBackgroundType?.value === "gradient") {
      const newValue = {
        bgColor: "",
        bgImage: "",
        direction: direction.value,
        fromColor,
        toColor,
        isRevert,
        pattern: "",
      };

      setValueBackground(newValue);
    } else if (selectedBackgroundType?.value === "pattern") {
      const newValue = {
        bgColor: "",
        bgImage: "",
        ...resetGradient,
        pattern: selectedPattern,
      };

      setValueBackground(newValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl, selectedBackgroundType, selectedBgColor]);

  return (
    <div className="pb-3">
      <InputRangeWithNumber
        label="Lebar"
        value={width}
        onChange={(newValue) => {
          setWidth(newValue);
          handleUpdateBackground("width", newValue);
        }}
        min={100}
        max={1200}
        onBlur={() =>
          handleSetValueWhenBlurBackground(width, 100, 1200, "width")
        }
      />

      <InputRangeWithNumber
        label="Melingkar"
        value={rounded}
        onChange={(newValue) => {
          setRounded(newValue);
          handleUpdateBackground("rounded", newValue);
        }}
        min={0}
        max={100}
        onBlur={() =>
          handleSetValueWhenBlurBackground(rounded, 0, 100, "rounded")
        }
      />

      <InputRangeWithNumber
        label="Rotasi"
        value={rotation}
        onChange={(newValue) => {
          setRotation(newValue);
          handleUpdateBackground("rotation", newValue);
        }}
        min={-90}
        max={90}
        onBlur={() =>
          handleSetValueWhenBlurBackground(rotation, -90, 90, "rotation")
        }
      />

      <SelectOptions
        label="Bayangan"
        options={shadowOptions}
        onChange={(selectedOption) => {
          setShadow(selectedOption);
          handleUpdateBackground("shadow", selectedOption.value);
        }}
        value={shadow}
        width="50"
      />

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Tipe Background"
          options={backgroundType}
          onChange={(selectedOption) => {
            handleChangeValueOptions(selectedOption, "bgType");
            setSelectedBackgroundType(selectedOption);
          }}
          value={selectedBackgroundType}
          width="50"
          positionShown="top"
        />

        <SelectOptions
          label="Pengisi Atas dan Bawah"
          options={PaddingYOptions}
          onChange={handleChangePaddingOptions}
          value={selectedPadding}
          width="50"
        />
      </div>

      {selectedPadding?.value === "equal" ? (
        <InputRangeWithNumber
          label="Ruang Pengisi"
          value={paddingY}
          onChange={(newValue) => {
            setPaddingY(newValue);
            handleUpdateBackground("paddingY", newValue);
          }}
          min={0}
          max={200}
          onBlur={() =>
            handleSetValueWhenBlurBackground(paddingY, 0, 200, "paddingY")
          }
        />
      ) : (
        <div>
          <InputRangeWithNumber
            label="Ruang Pengisi Atas"
            value={paddingTop}
            onChange={(newValue) => {
              setPaddingTop(newValue);
              handleUpdateBackground("paddingTop", newValue);
            }}
            min={0}
            max={200}
            onBlur={() =>
              handleSetValueWhenBlurBackground(paddingTop, 0, 200, "paddingTop")
            }
          />
          <InputRangeWithNumber
            label="Ruang Pengisi Bawah"
            value={paddingBottom}
            onChange={(newValue) => {
              setPaddingBottom(newValue);
              handleUpdateBackground("paddingBottom", newValue);
            }}
            min={0}
            max={200}
            onBlur={() =>
              handleSetValueWhenBlurBackground(
                paddingBottom,
                0,
                200,
                "paddingBottom"
              )
            }
          />
        </div>
      )}

      {selectedBackgroundType?.value === "color" && (
        <div className="mb-2">
          <ColorPicker
            initialColor={selectedBgColor}
            label="Warna"
            onChange={(color) => {
              setSelectedBgColor(color);
              handleUpdateBackground("bgColor", color);
            }}
            type="rgba"
            isCustomPosition={true}
            bottom={40}
          />
        </div>
      )}

      {selectedBackgroundType?.value === "image" && (
        <>
          <div className="mb-2">
            <div
              style={{
                backgroundColor: "#F5F5F5",
                width: "100%",
                overflow: "hidden",
              }}
              className="mx-auto mb-2"
            >
              <img
                style={{ objectFit: "contain", width: "100%", height: 100 }}
                src={imageUrl || imageDefault}
                alt="img"
              />
            </div>

            <CButton
              onClick={handleFileUpload}
              color="primary"
              variant="outline"
              className="btn-block"
            >
              Upload
            </CButton>
          </div>

          <InputRangeWithNumber
            label="Blur"
            value={blur}
            onChange={(newValue) => {
              setBlur(newValue);
              handleUpdateBackground("blur", newValue);
            }}
            min={0}
            max={40}
            onBlur={() => handleSetValueWhenBlurBackground(blur, 0, 40, "blur")}
          />

          <InputRangeWithNumber
            label="Opacity"
            value={opacity}
            onChange={(newValue) => {
              setOpacity(newValue);
              handleUpdateBackground("opacity", newValue);
            }}
            min={-50}
            max={50}
            onBlur={() =>
              handleSetValueWhenBlurBackground(opacity, -50, 50, "opacity")
            }
          />
        </>
      )}

      {selectedBackgroundType?.value === "gradient" && (
        <>
          <div style={{ gap: 10 }} className="d-flex align-items-center mb-2">
            <ColorPicker
              initialColor={fromColor}
              label="Warna 1"
              onChange={(color) => {
                setFromColor(color);
                handleUpdateBackground("fromColor", color);
              }}
              type="rgba"
              isCustomPosition={true}
              bottom={40}
            />

            <ColorPicker
              initialColor={toColor}
              label="Warna 2"
              onChange={(color) => {
                setToColor(color);
                handleUpdateBackground("toColor", color);
              }}
              type="rgba"
              isCustomPosition={true}
              bottom={40}
            />
          </div>

          <div style={{ gap: 10 }} className="d-flex align-items-center mb-2">
            <SelectOptions
              label="Arah"
              options={directionGradientOptions}
              onChange={(selectedOption) => {
                setDirection(selectedOption);
                handleUpdateBackground("direction", selectedOption.value);
              }}
              value={direction}
              width="50"
            />

            <Checkbox
              id="isRevert"
              label="Terbalik"
              checked={isRevert}
              onChange={(e) => {
                const { checked } = e.target;
                setIsRevert(checked);
                handleUpdateBackground("isRevert", checked);
              }}
            />
          </div>

          <div
            style={{ gap: 10 }}
            className="d-flex align-items-center mb-5 flex-wrap"
          >
            {gradients.map((gradient, index) => {
              const handleClick = () => {
                setFromColor(gradient.from);
                handleUpdateBackground("fromColor", gradient.from);
                setToColor(gradient.to);
                handleUpdateBackground("toColor", gradient.to);
              };

              const isSelected =
                gradient.from === fromColor && gradient.to === toColor;

              return (
                <div
                  key={index}
                  style={{
                    flex: "1 1 calc(25% - 10px)",
                    maxWidth: "calc(25% - 10px)",
                  }}
                >
                  <GradientBox
                    isSelected={isSelected}
                    onClick={handleClick}
                    key={index}
                    fromColor={gradient.from}
                    toColor={gradient.to}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}

      {selectedBackgroundType?.value === "pattern" && (
        <div
          style={{ gap: 10 }}
          className="d-flex align-items-center mb-5 flex-wrap px-1"
        >
          {patterns.map((pattern) => {
            const handleSelectPattern = () => {
              setSelectedPattern(pattern.img);
              handleUpdateBackground("pattern", pattern.img);
            };

            const isSelected = pattern.img === selectedPattern;

            return (
              <div
                style={{
                  flex: "1 1 calc(50% - 10px)",
                  maxWidth: "calc(50% - 10px)",
                }}
              >
                <PatternBox
                  img={pattern.img}
                  isSelected={isSelected}
                  onClick={handleSelectPattern}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FrameControl;
