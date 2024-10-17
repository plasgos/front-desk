import React, { useEffect, useState } from "react";

import pattern1 from "../../../../../../../assets/pattern/26669.jpg";
import { directionGradientOptions } from "../../common/BackgroundTabFrame";
import { PaddingYOptions } from "../../../../SelectOptions";
import SelectOptions from "../../../../common/SelectOptions";
import ColorPicker from "../../../../common/ColorPicker";
import Checkbox from "../../../../common/Checkbox";
import { gradients, patterns } from "../../../../common/BackgroundTab";
import GradientBox from "../../../../common/GradientBox";
import PatternBox from "../../../../common/PatternBox";

const backgroundType = [
  { value: undefined, label: "Tidak Ada" },
  { value: "color", label: "Warna" },
  { value: "gradient", label: "Gradasi" },
  { value: "pattern", label: "Pola" },
];

const BackgroundTabFullVariant = ({
  currentSection,
  setPreviewSection,
  type,
  sectionId,
}) => {
  const [selectedBackgroundType, setSelectedBackgroundType] = useState(
    type === "edit" ? undefined : backgroundType[0]
  );

  const [selectedBgColor, setSelectedBgColor] = useState(
    currentSection.background?.bgColor || "#EEEEEE"
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

  const setValueBackground = (newValue) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((content) =>
                content.id === currentSection.id
                  ? {
                      ...content,
                      background: {
                        ...content.background,
                        ...newValue,
                      },
                    }
                  : content
              ),
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

  const handleUpdateBackground = (key, value) => {
    const newValue = {
      [key]: value,
    };

    setValueBackground(newValue);
  };

  useEffect(() => {
    // Update tempSections setelah imageUrl berubah

    if (selectedBackgroundType?.value === "color") {
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
  }, [selectedBackgroundType, selectedBgColor]);

  return (
    <div>
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
      </div>

      {selectedBackgroundType?.value === "color" && (
        <div className="mb-2">
          <ColorPicker
            initialColor={selectedBgColor}
            label="Warna"
            onChange={(color) => {
              setSelectedBgColor(color);
              handleUpdateBackground("bgColor", color);
            }}
            top={"0"}
            right={"34px"}
            type="rgba"
          />
        </div>
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
              top={"0"}
              right={"34px"}
              type="rgba"
            />

            <ColorPicker
              initialColor={toColor}
              label="Warna 2"
              onChange={(color) => {
                setToColor(color);
                handleUpdateBackground("toColor", color);
              }}
              top={"0"}
              right={"34px"}
              type="rgba"
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

export default BackgroundTabFullVariant;
