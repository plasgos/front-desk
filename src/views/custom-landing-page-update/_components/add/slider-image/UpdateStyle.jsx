import React, { useEffect, useState } from "react";
import SelectOptions from "../../common/SelectOptions";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";

export const aspectRatioSliderImageOptions = [
  {
    label: "Kotak",
    options: [{ value: 1 / 1, label: "1:1" }],
  },
  {
    label: "Melebar",
    options: [
      { value: 2 / 1, label: "2:1" },
      { value: 5 / 2, label: "5:2" },
      { value: 3 / 1, label: "3:1" },
      { value: 4 / 1, label: "4:1" },
      { value: 4 / 3, label: "4:3" },
      { value: 5 / 1, label: "5:1" },
      { value: 10 / 1, label: "10:1" },
    ],
  },
  {
    label: "Potret",
    options: [
      { value: 1 / 2, label: "1:2" },
      { value: 2 / 3, label: "2:3" },
      { value: 3 / 5, label: "3:5" },
      { value: 4 / 5, label: "4:5" },
      { value: 9 / 16, label: "9:16" },
    ],
  },
];

export const timeOptions = [
  { value: undefined, label: "Tidak Ada" },
  { value: 1, label: "1 detik" },
  { value: 2, label: "2 detik" },
  { value: 3, label: "3 detik" },
  { value: 5, label: "5 detik" },
  { value: 10, label: "10 detik" },
  { value: 15, label: "15 detik" },
  { value: 20, label: "20 detik" },
];

export const transitionOptions = [
  { value: "scroll", label: "Scroll" },
  { value: "fade", label: "Fade" },
  { value: "slide-button", label: "Slide Button" },
];

const UpdateStyle = ({ setPreviewSection, currentSection }) => {
  const [selectedImageRatio, setSelectedImageRatio] = useState(
    aspectRatioSliderImageOptions[1].options[1]
  );

  const [autoScroll, setAutoScroll] = useState(timeOptions[0]);

  const [transition, setTransition] = useState(transitionOptions[0]);

  const [width, setWidth] = useState(
    currentSection?.variant?.style?.width || 800
  );

  const variant = currentSection?.variant?.value || "page-slider";
  console.log("🚀 ~ UpdateStyle ~ variant:", variant);

  useEffect(() => {
    const currentTransition = transitionOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.transition
    );

    if (currentTransition) {
      setTransition(currentTransition);
    }

    const currentAutoScroll = timeOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.autoScroll
    );

    if (currentAutoScroll) {
      setAutoScroll(currentAutoScroll);
    }
  }, [currentSection]);

  const handleChangeStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              variant: {
                ...section.variant,
                style: {
                  ...section.variant.style,
                  [key]: value,
                },
              },
            }
          : section
      )
    );
  };

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "width") {
      setWidth(newValue);
    }
    handleChangeStyle(key, newValue);
  };

  return (
    <div>
      <div
        style={{
          boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.1)",
        }}
        className="mb-3 border-bottom pb-3"
      >
        <div style={{ gap: 10 }} className="d-flex align-items-center ">
          <SelectOptions
            label="Rasio Gambar"
            options={aspectRatioSliderImageOptions}
            onChange={(selectedOption) => {
              setSelectedImageRatio(selectedOption);
              handleChangeStyle("aspectRatio", selectedOption.value);
            }}
            value={selectedImageRatio}
            width="50"
          />

          <SelectOptions
            label="Pindah Otomatis"
            options={timeOptions}
            onChange={(selectedOption) => {
              setAutoScroll(selectedOption);
              handleChangeStyle("autoScroll", selectedOption.value);
            }}
            value={autoScroll}
            width="50"
          />
        </div>

        {(variant === "full-slider" || variant === "page-slider") && (
          <SelectOptions
            label="Transisi"
            options={transitionOptions}
            onChange={(selectedOption) => {
              setTransition(selectedOption);
              handleChangeStyle("transition", selectedOption.value);
            }}
            value={transition}
            width="50"
          />
        )}

        {variant === "full-slider" ? null : (
          <div style={{ overflowX: "hidden" }}>
            <InputRangeWithNumber
              label="Lebar Maksimal"
              value={width}
              onChange={(newValue) => {
                setWidth(newValue);
                handleChangeStyle("width", newValue);
              }}
              min={100}
              max={1200}
              onBlur={() => handleSetValueWhenBlur(width, 100, 1200, "width")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateStyle;
