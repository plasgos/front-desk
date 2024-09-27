import React, { useEffect, useState } from "react";
import { backgroundType, PaddingYOptions } from "../../../SelectOptions";
import SelectOptions from "../../../common/SelectOptions";
import ColorPicker from "../../../common/ColorPicker";

const BackgroundTabFullVariantMultiColumn = ({
  currentSection: currentContent,
  setPreviewSection,
  type,
  sectionId,
  columnId,
}) => {
  const [selectedBackgroundType, setSelectedBackgroundType] = useState(
    type === "edit" ? undefined : backgroundType[0]
  );

  const [selectedBgColor, setSelectedBgColor] = useState(
    currentContent.background?.bgColor || "#EEEEEE"
  );

  useEffect(() => {
    if (type === "edit") {
      const currentBgTypeOption = backgroundType.find(
        (opt) => opt.value === currentContent.background?.bgType
      );
      if (currentBgTypeOption) {
        setSelectedBackgroundType(currentBgTypeOption);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, backgroundType, PaddingYOptions, currentContent.background]);

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
  };

  const handleChangeValueOptions = (key, value) => {
    if (!value) {
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
                          return content.id === currentContent.id
                            ? {
                                ...content,
                                background: defaultBgValues,
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
    } else if (value !== "image") {
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
                          return content.id === currentContent.id
                            ? {
                                ...content,
                                background: {
                                  ...content.background,
                                  bgImage: "",
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
    }

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
                        return content.id === currentContent.id
                          ? {
                              ...content,
                              background: {
                                ...content.background,
                                [key]: value,
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

  const handleChangeBgColor = (color) => {
    setSelectedBgColor(color);
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
                        return content.id === currentContent.id
                          ? {
                              ...content,
                              background: {
                                ...content.background,
                                bgColor: color,
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
            onChange={handleChangeBgColor}
            top={"0"}
            right={"34px"}
            type="rgba"
          />
        </div>
      )}
    </div>
  );
};

export default BackgroundTabFullVariantMultiColumn;
