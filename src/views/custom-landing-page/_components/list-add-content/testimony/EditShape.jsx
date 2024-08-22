import React, { useEffect, useState } from "react";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import { CCard } from "@coreui/react";
import SelectOptions from "../../common/SelectOptions";
import ColorPicker from "../../common/ColorPicker";
import { circleTypePosition, positionOptions, typeOptions } from "./AddShape";

const EditShape = ({ idSection, selectedSectionToEdit, setPreviewSection }) => {
  const [selectedType, setSelectedType] = useState(undefined);
  const [selectedPostion, setSelectedPostion] = useState(undefined);
  const [selectedShapeColor, setSelectedShapeColor] = useState(
    selectedSectionToEdit.color
  );
  const [height1, setHeight1] = useState(selectedSectionToEdit.height1);
  const [height2, setHeight2] = useState(selectedSectionToEdit.height2);
  const [circle1, setCircle1] = useState(selectedSectionToEdit.circle1);

  useEffect(() => {
    const currentTypeOption = typeOptions.find(
      (opt) => opt.value === selectedSectionToEdit.type
    );
    if (currentTypeOption) {
      setSelectedType(currentTypeOption);
      if (currentTypeOption.value === "circle") {
        const currentTypeCirclePositionOptions = circleTypePosition.find(
          (opt) => opt.value === selectedSectionToEdit.position.value
        );
        if (currentTypeCirclePositionOptions) {
          setSelectedPostion(currentTypeCirclePositionOptions);
        }
      } else {
        const currentPositionOptions = positionOptions.find(
          (opt) => opt.value === selectedSectionToEdit.position.value
        );
        if (currentPositionOptions) {
          setSelectedPostion(currentPositionOptions);
        }
      }
    }
  }, [
    selectedSectionToEdit.id,
    idSection,
    selectedSectionToEdit.type,
    selectedSectionToEdit.position,
  ]);

  const handleUpdateSectionWrapperStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              shape: item.shape.map((contentItem) =>
                String(contentItem.id) === String(selectedSectionToEdit.id)
                  ? {
                      ...contentItem,
                      [key]: value,
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
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
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === idSection
            ? {
                ...item,
                shape: item.shape.map((contentItem) =>
                  String(contentItem.id) === String(selectedSectionToEdit.id)
                    ? {
                        ...contentItem,
                        position: newPosition,
                      }
                    : contentItem
                ),
              }
            : item
        )
      );
    } else {
      const circlePosition = selectedPostion.value.includes("bottom")
        ? circleTypePosition[2]
        : circleTypePosition[0];

      setSelectedPostion(circlePosition);
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === idSection
            ? {
                ...item,
                shape: item.shape.map((contentItem) =>
                  String(contentItem.id) === String(selectedSectionToEdit.id)
                    ? {
                        ...contentItem,
                        position: circlePosition,
                      }
                    : contentItem
                ),
              }
            : item
        )
      );
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              shape: item.shape.map((contentItem) =>
                String(contentItem.id) === String(selectedSectionToEdit.id)
                  ? {
                      ...contentItem,
                      type: selectedOptionValue.value,
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleChangePosition = (selectedOptionValue) => {
    setSelectedPostion(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              shape: item.shape.map((contentItem) =>
                String(contentItem.id) === String(selectedSectionToEdit.id)
                  ? {
                      ...contentItem,
                      position: selectedOptionValue,
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleChangeShapeColor = (color) => {
    setSelectedShapeColor(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              shape: item.shape.map((contentItem) =>
                String(contentItem.id) === String(selectedSectionToEdit.id)
                  ? {
                      ...contentItem,
                      color,
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

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
              selectedType?.value === "circle"
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
            onChange={handleChangeShapeColor}
            top={"0"}
            right={"34px"}
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

          {selectedType?.value === "curve" && (
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

export default EditShape;
