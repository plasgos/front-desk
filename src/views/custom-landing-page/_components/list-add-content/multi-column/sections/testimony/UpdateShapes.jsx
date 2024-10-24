import React, { useEffect, useState } from "react";
import { CCard } from "@coreui/react";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import SelectOptions from "../../../../common/SelectOptions";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";
import ColorPicker from "../../../../common/ColorPicker";

export const typeOptions = [
  { value: "triangle", label: "Triangle" },
  { value: "curve", label: "Curve" },
  { value: "circle", label: "Circle" },
];

export const positionOptions = [
  { value: "top", label: "Atas" },
  { value: "bottom", label: "Bawah" },
];

export const circleTypePosition = [
  { value: "top-left", label: "Atas Kiri" },
  { value: "top-right", label: "Atas Kanan" },
  { value: "bottom-left", label: "Bawah Kiri" },
  { value: "bottom-right", label: "Bawah Kanan" },
];

export const UpdateShapes = ({
  idSection: currentSectionId,
  currentShape,
  setPreviewSection,
  isEditingShape,
  sectionId,
  columnId,
}) => {
  const [selectedType, setSelectedType] = useState(typeOptions[0]);
  const [selectedPostion, setSelectedPostion] = useState(positionOptions[0]);
  const [selectedShapeColor, setSelectedShapeColor] = useState(
    currentShape?.color || "#FDC97D"
  );

  const [height1, setHeight1] = useState(currentShape?.height1 || 10);

  const [height2, setHeight2] = useState(currentShape?.height2 || 80);
  const [circle1, setCircle1] = useState(currentShape?.circle1 || 0);

  const [setting, setSetting] = useState({});

  const contentIdToCheck = isEditingShape ? currentShape.id : setting.id;

  useEffect(() => {
    const currentTypeOption = typeOptions.find(
      (opt) => opt.value === currentShape.type
    );
    if (currentTypeOption) {
      setSelectedType(currentTypeOption);
      if (currentTypeOption.value === "circle") {
        const currentTypeCirclePositionOptions = circleTypePosition.find(
          (opt) => opt.value === currentShape.position.value
        );
        if (currentTypeCirclePositionOptions) {
          setSelectedPostion(currentTypeCirclePositionOptions);
        }
      } else {
        const currentPositionOptions = positionOptions.find(
          (opt) => opt.value === currentShape.position.value
        );
        if (currentPositionOptions) {
          setSelectedPostion(currentPositionOptions);
        }
      }
    }
  }, [currentShape]);

  const setShapeStyleValue = (updateContent) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) =>
                        content.id === currentSectionId
                          ? {
                              ...content,
                              shape: content.shape.map((contentItem) => {
                                return contentItem.id === contentIdToCheck
                                  ? {
                                      ...contentItem,
                                      ...updateContent,
                                    }
                                  : contentItem;
                              }),
                            }
                          : content
                      ),
                    }
                  : column
              ),
            }
          : section
      )
    );
  };

  const handleUpdateSectionWrapperStyle = (key, value) => {
    const updateContent = {
      [key]: value,
    };

    setShapeStyleValue(updateContent);
  };

  const handleSetValueWhenBlurWrapperStyle = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "height1") {
      setHeight1(newValue);
    } else if (key === "height2") {
      setHeight2(newValue);
    } else if (key === "circle1") {
      setCircle1(newValue);
    }
    handleUpdateSectionWrapperStyle(key, newValue);
  };

  const handleChangeType = (selectedOptionValue) => {
    setSelectedType(selectedOptionValue);

    if (selectedOptionValue.value !== "circle") {
      const newPosition = selectedPostion.value.includes("bottom")
        ? positionOptions[1]
        : positionOptions[0];
      setSelectedPostion(newPosition);

      const updateContent = {
        position: newPosition,
      };

      setShapeStyleValue(updateContent);
    } else {
      const circlePosition = selectedPostion.value.includes("bottom")
        ? circleTypePosition[2]
        : circleTypePosition[0];

      setSelectedPostion(circlePosition);

      const updateContent = {
        position: circlePosition,
      };

      setShapeStyleValue(updateContent);
    }

    const updateContent = {
      type: selectedOptionValue.value,
    };

    setShapeStyleValue(updateContent);
  };

  const handleChangePosition = (selectedOptionValue) => {
    setSelectedPostion(selectedOptionValue);

    const updateContent = {
      position: selectedOptionValue,
    };

    setShapeStyleValue(updateContent);
  };

  const handleAddShape = () => {
    let uniqueId = createUniqueID(currentShape);
    let payload = {
      id: uniqueId,
      type: selectedType.value,
      position: selectedPostion,
      color: selectedShapeColor,
      height1,
      height2,
      circle1,
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          const updateContent = section.column.map((column) => {
            if (column.id === columnId) {
              return {
                ...column,
                content: column.content.map((content) => {
                  return content.id === currentSectionId
                    ? {
                        ...content,
                        shape: [...content.shape, payload],
                      }
                    : content;
                }),
              };
            }
            return column;
          });

          return {
            ...section,
            column: updateContent,
          };
        }

        return section;
      })
    );

    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingShape) {
      handleAddShape();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingShape]);

  useEffect(() => {
    if (!isEditingShape && selectedType.value === "circle") {
      setHeight1(40);
      setHeight2(40);

      const updateContent = {
        height1: 40,
        height2: 40,
      };

      setShapeStyleValue(updateContent);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType.value, isEditingShape]);

  return (
    <CCard
      style={{
        borderRadius: 0,
        border: 0,
      }}
    >
      <div style={{ zIndex: 1 }} className="w-100">
        <div style={{ gap: 10 }} className="d-flex align-items-center ">
          <SelectOptions
            label="Tipe"
            options={typeOptions}
            onChange={handleChangeType}
            value={selectedType}
            width="50"
          />

          <SelectOptions
            label="Posisi"
            options={
              selectedType.value === "circle"
                ? circleTypePosition
                : positionOptions
            }
            onChange={handleChangePosition}
            value={selectedPostion}
            width="50"
          />
        </div>

        <div className="mb-2">
          <ColorPicker
            initialColor={selectedShapeColor}
            label="Warna"
            onChange={(color) => {
              setSelectedShapeColor(color);
              handleUpdateSectionWrapperStyle("color", color);
            }}
            type="rgba"
          />
        </div>

        <div>
          <InputRangeWithNumber
            label="Tinggi 1"
            value={height1}
            onChange={(newValue) => {
              setHeight1(newValue);
              handleUpdateSectionWrapperStyle("height1", newValue);
            }}
            min={0}
            max={200}
            onBlur={() =>
              handleSetValueWhenBlurWrapperStyle(height1, 0, 200, "height1")
            }
          />
          <InputRangeWithNumber
            label="Tinggi 2"
            value={height2}
            onChange={(newValue) => {
              setHeight2(newValue);
              handleUpdateSectionWrapperStyle("height2", newValue);
            }}
            min={0}
            max={200}
            onBlur={() =>
              handleSetValueWhenBlurWrapperStyle(height2, 0, 200, "height2")
            }
          />

          {selectedType.value === "curve" && (
            <InputRangeWithNumber
              label="Bulat 1"
              value={circle1}
              onChange={(newValue) => {
                setCircle1(newValue);
                handleUpdateSectionWrapperStyle("circle1", newValue);
              }}
              min={-200}
              max={200}
              onBlur={() =>
                handleSetValueWhenBlurWrapperStyle(
                  circle1,
                  -200,
                  200,
                  "circle1"
                )
              }
            />
          )}
        </div>
      </div>
    </CCard>
  );
};
