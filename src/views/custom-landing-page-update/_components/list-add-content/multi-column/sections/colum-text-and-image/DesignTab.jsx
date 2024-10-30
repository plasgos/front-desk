import React, { useEffect, useState } from "react";
import {
  aspectRatioOptions,
  distanceOptions,
  fontSizeOptions,
  maxColumnOptions,
} from "../../../../SelectOptions";
import ColorPicker from "../../../../common/ColorPicker";
import SelectOptions from "../../../../common/SelectOptions";

const DesignTab = ({
  currentSection,
  setPreviewSection,
  isEditingSection,
  sectionId,
  columnId,
}) => {
  const [selectedColorTitle, setSelectedColorTitle] = useState(
    currentSection?.wrapperStyle?.colorTitle || "#000000"
  );

  const [selectedColorDesc, setSelectedColorDesc] = useState(
    currentSection?.wrapperStyle?.colorDescription || "#000000"
  );

  const [selectedDistance, setSelectedDistance] = useState(distanceOptions[2]);
  const [selectedMaxColumn, setSelectedMaxColumn] = useState(
    maxColumnOptions[1]
  );
  const [selectedImageRatio, setSelectedImageRatio] = useState(
    aspectRatioOptions[0].options[0]
  );

  const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOptions[1]);

  useEffect(() => {
    if (isEditingSection) {
      const {
        wrapperStyle: { paddingX, maxColumn, fontSizeTitle, aspectRatio } = {},
      } = currentSection || {};

      const currentDistanceOption = distanceOptions.find(
        (opt) => opt.value === paddingX
      );
      if (currentDistanceOption) {
        setSelectedDistance(currentDistanceOption);
      }

      const currentMaxColumnOption = maxColumnOptions.find(
        (opt) => opt.value === maxColumn
      );

      if (currentMaxColumnOption) {
        setSelectedMaxColumn(currentMaxColumnOption);
      }

      const currentFontSizeOption = fontSizeOptions.find(
        (opt) => opt.value === fontSizeTitle
      );

      if (currentFontSizeOption) {
        setSelectedFontSize(currentFontSizeOption);
      }

      const currentAcpectRatioOption = aspectRatioOptions.flatMap((ratio) =>
        ratio.options.find((opt) => opt.value === aspectRatio)
      );

      if (currentAcpectRatioOption) {
        setSelectedImageRatio(currentAcpectRatioOption);
      }
    }
  }, [currentSection, isEditingSection]);

  const handleChangeWrapperStyle = (key, color) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        String(section.id) === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) =>
                        content.id === currentSection.id
                          ? {
                              ...content,
                              wrapperStyle: {
                                ...content.wrapperStyle,
                                [key]: color,
                              },
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

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={selectedColorTitle}
          label="Warna Judul"
          onChange={(color) => {
            setSelectedColorTitle(color);
            handleChangeWrapperStyle("colorTitle", color);
          }}
        />

        <ColorPicker
          initialColor={selectedColorDesc}
          label="Warna Deskripsi"
          onChange={(color) => {
            setSelectedColorDesc(color);
            handleChangeWrapperStyle("colorDescription", color);
          }}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Kolom Maksimal"
          options={maxColumnOptions}
          onChange={(selectedOption) => {
            setSelectedMaxColumn(selectedOption);
            handleChangeWrapperStyle("maxColumn", selectedOption.value);
          }}
          value={selectedMaxColumn}
          width="50"
        />

        <SelectOptions
          label="Jarak"
          options={distanceOptions}
          onChange={(selectedOption) => {
            setSelectedDistance(selectedOption);
            handleChangeWrapperStyle("paddingX", selectedOption.value);
          }}
          value={selectedDistance}
          width="50"
        />
      </div>

      <h4 className=" my-2">Gambar</h4>
      <div>
        <SelectOptions
          label="Rasio Gambar"
          options={aspectRatioOptions}
          onChange={(selectedOption) => {
            setSelectedImageRatio(selectedOption);
            handleChangeWrapperStyle("aspectRatio", selectedOption.value);
          }}
          value={selectedImageRatio}
          width="50"
        />
      </div>

      <h4 className=" my-2">Font</h4>
      <div>
        <SelectOptions
          label="Ukuran Judul"
          options={fontSizeOptions}
          onChange={(selectedOption) => {
            setSelectedFontSize(selectedOption);
            handleChangeWrapperStyle("fontSizeTitle", selectedOption.value);
          }}
          value={selectedFontSize}
          width="50"
          positionShown="top"
        />
      </div>
    </div>
  );
};

export default DesignTab;
