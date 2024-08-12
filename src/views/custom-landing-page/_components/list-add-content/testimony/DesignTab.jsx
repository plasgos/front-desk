import React, { useState } from "react";
import ColorPicker from "../../common/ColorPicker";
import SelectOptions from "../../common/SelectOptions";
import {
  alignOptions,
  columnTestimonyOptions,
  shadowOptions,
} from "../../SelectOptions";
import InputRange from "../../common/InputRange";

const layoutOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
];

const DesignTab = ({ currentSection, setPreviewSection }) => {
  console.log("🚀 ~ DesignTab ~ currentSection:", currentSection);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
    currentSection?.cardStyle?.bgColor || ""
  );

  const [selectedBorderCardColor, setSelectedBorderCardColor] = useState(
    currentSection?.cardStyle?.borderColor || ""
  );

  const [selectedStarColor, setSelectedStarColor] = useState(
    currentSection?.cardStyle?.starColor || ""
  );

  const [selectedAlign, setSelectedAlign] = useState(alignOptions[1]);

  const [selectedLayout, setSelectedLayout] = useState(layoutOptions[7]);

  const [selectedColum, setSelectedColum] = useState(columnTestimonyOptions[2]);

  const [selectedShadow, setSelectedShadow] = useState(shadowOptions[1]);

  const [distance, setDistance] = useState(8);

  const handleChangeRangeInputDistance = (value) => {
    setDistance(+value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                paddingX: +value,
              },
            }
          : item
      )
    );
  };

  const handleChangeInputDistance = (value) => {
    setDistance(+value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                paddingX: +value,
              },
            }
          : item
      )
    );
  };

  const handleSetDistanceWhenBlur = () => {
    if (distance > 40) {
      setDistance(40);
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                wrapperStyle: {
                  ...item.wrapperStyle,
                  paddingX: 40,
                },
              }
            : item
        )
      );
    } else if (distance < 0) {
      setDistance(0);
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                wrapperStyle: {
                  ...item.wrapperStyle,
                  paddingX: 0,
                },
              }
            : item
        )
      );
    }
  };

  const handleChangeBackgroundColor = (color) => {
    setSelectedBackgroundColor(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              cardStyle: {
                ...item.cardStyle,
                bgColor: color,
              },
            }
          : item
      )
    );
  };

  const handleChangeBorderCardColor = (color) => {
    setSelectedBorderCardColor(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              cardStyle: {
                ...item.cardStyle,
                borderColor: color,
              },
            }
          : item
      )
    );
  };

  const handleChangeStarColor = (color) => {
    setSelectedStarColor(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              cardStyle: {
                ...item.cardStyle,
                starColor: color,
              },
            }
          : item
      )
    );
  };

  const handleChangeAlign = (selectedOptionValue) => {
    setSelectedAlign(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                jusctifyContent: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeLayout = (selectedOptionValue) => {
    setSelectedLayout(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                layout: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeColumn = (selectedOptionValue) => {
    setSelectedColum(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                column: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeShadow = (selectedOptionValue) => {
    setSelectedShadow(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              cardStyle: {
                ...item.cardStyle,
                shadowCard: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={selectedBackgroundColor}
          label="Background"
          onChange={handleChangeBackgroundColor}
        />

        <ColorPicker
          initialColor={selectedBorderCardColor}
          label="Garis Luar"
          onChange={handleChangeBorderCardColor}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={selectedStarColor}
          label="Bintang"
          onChange={handleChangeStarColor}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Align"
          options={alignOptions}
          onChange={handleChangeAlign}
          value={selectedAlign}
          width="50"
        />

        <SelectOptions
          label="Layout"
          options={layoutOptions}
          onChange={handleChangeLayout}
          value={selectedLayout}
          width="50"
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Kolom"
          options={columnTestimonyOptions}
          onChange={handleChangeColumn}
          value={selectedColum}
          width="50"
        />

        <SelectOptions
          label="Bayangan"
          options={shadowOptions}
          onChange={handleChangeShadow}
          value={selectedShadow}
          width="50"
        />
      </div>

      <InputRange
        label="Jarak"
        min={0}
        max={40}
        value={distance}
        handleChangeRangeInput={(event) =>
          handleChangeRangeInputDistance(event.target.value)
        }
        handleChangeNumberInput={(event) =>
          handleChangeInputDistance(event.target.value)
        }
        handleBlur={handleSetDistanceWhenBlur}
      />
    </div>
  );
};

export default DesignTab;
