import React, { useEffect, useState } from "react";

import { CButton } from "@coreui/react";
import { shadowOptions } from "../../../../SelectOptions";
import Input from "../../../../common/Input";
import ColorPicker from "../../../../common/ColorPicker";
import SelectOptions from "../../../../common/SelectOptions";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";

const animationIndicatorOptions = [
  { value: undefined, label: "Tidak Ada" },
  { value: "expandWidthFillIn", label: "Mengisi" },
  { value: "expandWidthFillOut", label: "Mengosongkan" },
];

const UpdateDesign = ({
  setPreviewSection,
  currentSection,
  isEditingSection,
  sectionId,
  columnId,
}) => {
  const [animation, setAnimation] = useState(
    currentSection?.animation?.type || animationIndicatorOptions[2]
  );

  const [isReplay, setIsReplay] = useState(true);

  const [innerShadow, setInnerShadow] = useState(shadowOptions[4]);

  const [outerShadow, setOuterShadow] = useState(shadowOptions[2]);

  const [currentStock, setCurrentStock] = useState(
    currentSection?.content?.design?.currentStock || 5
  );

  const [maxStock, setMaxStock] = useState(
    currentSection?.content?.design?.maxStock || 20
  );

  const [startColor, setStartColor] = useState(
    currentSection?.content?.design?.startColor || "#CDDC39"
  );

  const [finishColor, setFinishColor] = useState(
    currentSection?.content?.design?.finishColor || "#388E3C"
  );

  const [outlineColor, setOutlineColor] = useState(
    currentSection?.content?.design?.outlineColor || "#EF5350"
  );

  const [bgColor, setBgColor] = useState(
    currentSection?.content?.design?.bgColor || "#ffffff"
  );

  const [height, setHeight] = useState(
    currentSection?.content?.design?.height || 30
  );

  const [width, setWidth] = useState(
    currentSection?.content?.design?.width || 500
  );

  const [borderWidth, setBorderWidth] = useState(
    currentSection?.content?.design?.borderWidth || 4
  );

  const [outerRounded, setOuterRounded] = useState(
    currentSection?.content?.design?.outerRounded || 20
  );

  const [innerRounded, setInnerRounded] = useState(
    currentSection?.content?.design?.innerRounded || 20
  );

  useEffect(() => {
    const currentOuterShadow = shadowOptions.find(
      (opt) => opt.value === currentSection?.content?.design?.outerShadow
    );

    if (currentOuterShadow) {
      setOuterShadow(currentOuterShadow);
    }

    const currentInnerShadow = shadowOptions.find(
      (opt) => opt.value === currentSection?.content?.design?.innerShadow
    );

    if (currentInnerShadow) {
      setInnerShadow(currentInnerShadow);
    }

    const currentAnimation = animationIndicatorOptions.find(
      (opt) => opt.value === currentSection?.animation?.type
    );

    if (currentAnimation) {
      setAnimation(currentAnimation);
    }
  }, [currentSection]);

  const handleChangeValue = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) => {
        return String(section.id) === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) => {
                        return content.id === currentSection.id
                          ? {
                              ...content,
                              content: {
                                ...content.content,
                                design: {
                                  ...content.content.design,
                                  [key]: value,
                                },
                              },
                            }
                          : content;
                      }),
                    }
                  : column
              ),
            }
          : section;
      })
    );
  };

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "height") {
      setHeight(newValue);
    } else if (key === "width") {
      setWidth(newValue);
    } else if (key === "borderWidth") {
      setBorderWidth(newValue);
    } else if (key === "outerRounded") {
      setOuterRounded(newValue);
    } else if (key === "innerRounded") {
      setInnerRounded(newValue);
    }
    handleChangeValue(key, newValue);
  };

  const handleChangeAnimation = (value) => {
    setPreviewSection((arr) =>
      arr.map((section) => {
        return String(section.id) === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) => {
                        return content.id === currentSection.id
                          ? {
                              ...content,
                              animation: {
                                ...content.animation,
                                type: value,
                              },
                            }
                          : content;
                      }),
                    }
                  : column
              ),
            }
          : section;
      })
    );
  };

  const handleReplay = () => {
    setIsReplay((prev) => !prev);

    setPreviewSection((arr) =>
      arr.map((section) => {
        return String(section.id) === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) => {
                        return content.id === currentSection.id
                          ? {
                              ...content,
                              animation: {
                                ...content.animation,
                                isReplay,
                              },
                            }
                          : content;
                      }),
                    }
                  : column
              ),
            }
          : section;
      })
    );
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <Input
          label="Stok Saat Ini"
          type="number"
          value={currentStock || ""}
          onChange={(e) => {
            const { value } = e.target;
            setCurrentStock(value);
            handleChangeValue("currentStock", value);
          }}
        />

        <Input
          label="Stok Maksimal"
          type="number"
          value={maxStock || ""}
          onChange={(e) => {
            const { value } = e.target;
            setMaxStock(value);
            handleChangeValue("maxStock", value);
          }}
        />
      </div>

      <h5>Progres</h5>

      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={startColor}
          label="Mulai"
          onChange={(color) => {
            setStartColor(color);
            handleChangeValue("startColor", color);
          }}
        />

        <ColorPicker
          initialColor={finishColor}
          label="Akhir"
          onChange={(color) => {
            setFinishColor(color);
            handleChangeValue("finishColor", color);
          }}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={outlineColor}
          label="Garis Luar"
          onChange={(color) => {
            setOutlineColor(color);
            handleChangeValue("outlineColor", color);
          }}
        />

        <ColorPicker
          initialColor={bgColor}
          label="Background"
          onChange={(color) => {
            setBgColor(color);
            handleChangeValue("bgColor", color);
          }}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <SelectOptions
          label="Bayangan Luar"
          options={shadowOptions}
          value={outerShadow}
          onChange={(selectedOption) => {
            setOuterShadow(selectedOption);
            handleChangeValue("outerShadow", selectedOption.value);
          }}
        />

        <SelectOptions
          label="Bayangan Dalam"
          options={shadowOptions}
          value={innerShadow}
          onChange={(selectedOption) => {
            setInnerShadow(selectedOption);
            handleChangeValue("innerShadow", selectedOption.value);
          }}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <SelectOptions
          label="Animasi"
          options={animationIndicatorOptions}
          value={animation}
          onChange={(selectedOption) => {
            setAnimation(selectedOption);
            handleChangeAnimation(selectedOption.value);
          }}
        />

        <CButton onClick={handleReplay} color="primary" variant="outline">
          Replay
        </CButton>
      </div>

      <div>
        <InputRangeWithNumber
          label="Tinggi"
          value={height}
          onChange={(newValue) => {
            setHeight(newValue);
            handleChangeValue("height", newValue);
          }}
          min={6}
          max={200}
          onBlur={() => handleSetValueWhenBlur(height, 6, 200, "height")}
        />

        <InputRangeWithNumber
          label="Lebar"
          value={width}
          onChange={(newValue) => {
            setWidth(newValue);
            handleChangeValue("width", newValue);
          }}
          min={20}
          max={1400}
          onBlur={() => handleSetValueWhenBlur(width, 20, 1400, "width")}
        />

        <InputRangeWithNumber
          label="Garis Luar"
          value={borderWidth}
          onChange={(newValue) => {
            setBorderWidth(newValue);
            handleChangeValue("borderWidth", newValue);
          }}
          min={0}
          max={30}
          onBlur={() =>
            handleSetValueWhenBlur(borderWidth, 0, 30, "borderWidth")
          }
        />

        <InputRangeWithNumber
          label="Melingkar Luar"
          value={outerRounded}
          onChange={(newValue) => {
            setOuterRounded(newValue);
            handleChangeValue("outerRounded", newValue);
          }}
          min={0}
          max={50}
          onBlur={() =>
            handleSetValueWhenBlur(outerRounded, 0, 50, "outerRounded")
          }
        />

        <InputRangeWithNumber
          label="Melingkar Dalam"
          value={innerRounded}
          onChange={(newValue) => {
            setInnerRounded(newValue);
            handleChangeValue("innerRounded", newValue);
          }}
          min={0}
          max={50}
          onBlur={() =>
            handleSetValueWhenBlur(innerRounded, 0, 50, "innerRounded")
          }
        />
      </div>
    </div>
  );
};

export default UpdateDesign;
