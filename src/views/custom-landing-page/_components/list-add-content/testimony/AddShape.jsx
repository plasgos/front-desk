import React, { useEffect, useState } from "react";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import { CCard } from "@coreui/react";
import SelectOptions from "../../common/SelectOptions";
import ColorPicker from "../../common/ColorPicker";
import { createUniqueID } from "../../../../../lib/unique-id";

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

const AddShape = ({ idSection, exitingShape, setPreviewSection }) => {
  const [selectedType, setSelectedType] = useState(typeOptions[0]);
  const [selectedPostion, setSelectedPostion] = useState(positionOptions[0]);
  const [selectedShapeColor, setSelectedShapeColor] = useState("#FDC97D");
  const [height1, setHeight1] = useState(10);
  const [height2, setHeight2] = useState(80);
  const [circle1, setCircle1] = useState(0);

  const [setting, setSetting] = useState({});

  const handleUpdateSectionWrapperStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              shape: item.shape.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
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

  // const handleChangeType = (selectedOptionValue) => {
  //   setSelectedType(selectedOptionValue);
  //   setPreviewSection((arr) =>
  //     arr.map((item) =>
  //       String(item.id) === idSection
  //         ? {
  //             ...item,
  //             shape: item.shape.map((contentItem) =>
  //               String(contentItem.id) === String(setting.id)
  //                 ? {
  //                     ...contentItem,
  //                     type: selectedOptionValue.value,
  //                   }
  //                 : contentItem
  //             ),
  //           }
  //         : item
  //     )
  //   );
  // };

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
                  String(contentItem.id) === String(setting.id)
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
                  String(contentItem.id) === String(setting.id)
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
                String(contentItem.id) === String(setting.id)
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
                String(contentItem.id) === String(setting.id)
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
                String(contentItem.id) === String(setting.id)
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

  const handleAddShape = () => {
    let uniqueId = createUniqueID(exitingShape);
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
      prevSections.map((section) =>
        section.id === idSection
          ? { ...section, shape: [...section.shape, payload] }
          : section
      )
    );

    setSetting(payload);
  };

  useEffect(() => {
    handleAddShape();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedType.value === "circle") {
      setHeight1(40);
      setHeight2(40);
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === idSection
            ? {
                ...item,
                shape: item.shape.map((contentItem) =>
                  String(contentItem.id) === String(setting.id)
                    ? {
                        ...contentItem,
                        height1: 40,
                        height2: 40,
                      }
                    : contentItem
                ),
              }
            : item
        )
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType.value]);

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

export default AddShape;
