import React, { useEffect, useState } from "react";
import imageDefault from "../../../../assets/bg.jpg";
import { CButton } from "@coreui/react";
import { backgroundType, PaddingYOptions } from "../SelectOptions";
import InputRangeWithNumber from "./InputRangeWithNumber";
import ColorPicker from "./ColorPicker";
import SelectOptions from "./SelectOptions";
import Checkbox from "./Checkbox";
import GradientBox from "./GradientBox";

import pattern1 from "../../../../assets/pattern/26669.jpg";
import pattern2 from "../../../../assets/pattern/5570863.jpg";
import pattern3 from "../../../../assets/pattern/geometric-blue-line-pattern.jpg";
import pattern4 from "../../../../assets/pattern/gray_line_drawings_of_organic_shapes_background.jpg";
import pattern5 from "../../../../assets/pattern/sl_022120_28320_22.jpg";
import pattern6 from "../../../../assets/pattern/vecteezy_geometric-line-circles-pattern-background-design-perfect_7167520.jpg";
import PatternBox from "./PatternBox";

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

const BackgroundTab = ({ currentSection, setPreviewSection, type }) => {
  const [selectedBackgroundType, setSelectedBackgroundType] = useState(
    backgroundType[0]
  );

  const [selectedPadding, setSelectedPadding] = useState(PaddingYOptions[0]);

  const [paddingY, setPaddingY] = useState(
    currentSection.background?.paddingY || 0
  );
  const [paddingTop, setPaddingTop] = useState(
    currentSection.background?.paddingTop || 0
  );
  const [paddingBottom, setPaddingBottom] = useState(
    currentSection.background?.paddingBottom || 0
  );

  const [selectedBgColor, setSelectedBgColor] = useState(
    currentSection.background?.bgColor || "#EEEEEE"
  );

  const [imageUrl, setImageUrl] = useState(
    currentSection.background?.bgImage || imageDefault
  );
  const [blur, setBlur] = useState(currentSection.background?.blur || 0);
  const [opacity, setOpacity] = useState(
    currentSection.background?.opacity || 0
  );

  const [fromColor, setFromColor] = useState(
    currentSection?.background?.fromColor || "#FF6F61"
  );

  const [toColor, setToColor] = useState(
    currentSection?.background?.toColor || "#6B5B95"
  );

  const [direction, setDirection] = useState(
    directionGradientOptions.find(
      (opt) => opt.value === currentSection?.background?.direction
    ) || directionGradientOptions[1]
  );

  const [isRevert, setIsRevert] = useState(
    currentSection?.background?.isRevert || false
  );

  const [selectedPattern, setSelectedPattern] = useState(
    currentSection?.background?.pattern || pattern1
  );

  useEffect(() => {
    const currentBgTypeOption = backgroundType.find(
      (opt) => opt.value === currentSection.background?.bgType
    );
    if (currentBgTypeOption) {
      setSelectedBackgroundType(currentBgTypeOption);
    }

    const currentBgColor = currentSection.background?.bgColor;

    if (currentBgColor) {
      setSelectedBgColor(currentBgColor);
    }

    const currentPaddingTypeOption = PaddingYOptions.find(
      (opt) => opt.value === currentSection.background?.paddingType
    );

    if (currentPaddingTypeOption) {
      setSelectedPadding(currentPaddingTypeOption);
    }

    const currentPaddingY = currentSection.background?.paddingY;

    if (currentPaddingY) {
      setPaddingY(currentPaddingY);
    }

    const currentPattern = currentSection.background?.pattern;

    if (currentPattern) {
      setSelectedPattern(currentPattern);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, backgroundType, PaddingYOptions, currentSection.background]);

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

  const handleChangeValueOptions = (selectedOption, key) => {
    if (!selectedOption.value) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                background: defaultBgValues,
              }
            : item
        )
      );
    } else if (selectedOption !== "image") {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                background: {
                  ...item.background,
                  bgImage: "",
                },
              }
            : item
        )
      );
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              background: {
                ...item.background,
                [key]: selectedOption.value,
              },
            }
          : item
      )
    );
  };

  const handleChangePaddingOptions = (selectedOption) => {
    setSelectedPadding(selectedOption);

    if (selectedOption.value !== "equal") {
      setPaddingY(0);
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                background: {
                  ...item.background,
                  paddingY: 0,
                  paddingType: selectedOption.value,
                },
              }
            : item
        )
      );
    } else {
      setPaddingTop(0);
      setPaddingBottom(0);
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                background: {
                  ...item.background,
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingType: selectedOption.value,
                },
              }
            : item
        )
      );
    }
  };

  const handleUpdateBackground = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              background: {
                ...item.background,
                [key]: value,
              },
            }
          : item
      )
    );
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
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                background: {
                  ...item.background,
                  bgImage: imageUrl,
                  bgColor: "",
                  ...resetGradient,
                  pattern: "",
                },
              }
            : item
        )
      );
    } else if (selectedBackgroundType?.value === "color") {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                background: {
                  ...item.background,
                  bgColor: selectedBgColor,
                  ...resetGradient,
                  pattern: "",
                },
              }
            : item
        )
      );
    } else if (selectedBackgroundType?.value === "gradient") {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                background: {
                  ...item.background,
                  bgColor: "",
                  bgImage: "",
                  direction: direction.value,
                  fromColor,
                  toColor,
                  isRevert,
                  pattern: "",
                },
              }
            : item
        )
      );
    } else if (selectedBackgroundType?.value === "pattern") {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                background: {
                  ...item.background,
                  bgColor: "",
                  bgImage: "",
                  ...resetGradient,
                  pattern: selectedPattern,
                },
              }
            : item
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl, selectedBackgroundType, selectedBgColor]);

  return (
    <div style={{ height: "70vh" }} className="pb-3">
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
          <div
            style={{ gap: 20, width: "85%" }}
            className="d-flex align-items-center mb-3 "
          >
            <ColorPicker
              initialColor={fromColor}
              label="Warna 1"
              onChange={(color) => {
                setFromColor(color);
                handleUpdateBackground("fromColor", color);
              }}
              type="rgba"
              width="w-0"
            />

            <ColorPicker
              initialColor={toColor}
              label="Warna 2"
              onChange={(color) => {
                setToColor(color);
                handleUpdateBackground("toColor", color);
              }}
              type="rgba"
              width="w-0"
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
          {patterns.map((pattern, index) => {
            const handleSelectPattern = () => {
              setSelectedPattern(pattern.img);
              handleUpdateBackground("pattern", pattern.img);
            };

            const isSelected = pattern.img === selectedPattern;

            return (
              <div
                key={index}
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

export default BackgroundTab;
