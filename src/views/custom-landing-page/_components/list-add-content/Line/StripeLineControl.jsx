import React, { useState } from "react";
import ColorPicker from "../../common/ColorPicker";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import Checkbox from "../../common/Checkbox";

const StripeLineControl = ({ setPreviewSection, currentSection }) => {
  const [height, setHeight] = useState(currentSection?.content?.height || 10);
  const [width1, setWidth1] = useState(currentSection?.content?.width1 || 40);
  const [width2, setWidth2] = useState(currentSection?.content?.width2 || 20);
  const [distance, setDistance] = useState(
    currentSection?.content?.distance || 10
  );
  const [isFlip, setIsFlip] = useState(
    currentSection?.content?.isFlip || false
  );
  const [isFloating, setIsFloating] = useState(
    currentSection?.content?.isFloating || false
  );
  const [color1, setColor1] = useState(
    currentSection?.content?.color1 || "#F44336"
  );
  const [color2, setColor2] = useState(
    currentSection?.content?.color2 || "#2196F3"
  );

  const handleChangeColor1 = (color) => {
    setColor1(color);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              content: {
                ...item.content,
                color1: color,
              },
            }
          : item
      )
    );
  };

  const handleChangeColor2 = (color) => {
    setColor2(color);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              content: {
                ...item.content,
                color2: color,
              },
            }
          : item
      )
    );
  };

  const handleChangeFlip = (value) => {
    setIsFlip(value);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              content: {
                ...item.content,
                isFlip: value,
              },
            }
          : item
      )
    );
  };

  const handleChangeFloating = (value) => {
    setIsFloating(value);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              content: {
                ...item.content,
                isFloating: value,
              },
            }
          : item
      )
    );
  };

  const handleUpdateValue = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              content: {
                ...item.content,
                [key]: value,
              },
            }
          : item
      )
    );
  };

  const handleSetValueWhenBlurValue = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "height") {
      setHeight(newValue);
    } else if (key === "width1") {
      setWidth1(newValue);
    } else if (key === "width2") {
      setWidth2(newValue);
    } else if (key === "distance") {
      setDistance(newValue);
    }
    handleUpdateValue(key, newValue);
  };

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center my-3">
        <ColorPicker
          initialColor={color1}
          label="Garis"
          onChange={handleChangeColor1}
          bottom={"80px"}
          type="rgba"
        />

        <ColorPicker
          initialColor={color2}
          label="Garis B"
          onChange={handleChangeColor2}
          bottom={"80px"}
          type="rgba"
        />
      </div>

      <InputRangeWithNumber
        label="Tinggi"
        value={height}
        onChange={(newValue) => {
          setHeight(newValue);
          handleUpdateValue("height", newValue);
        }}
        min={1}
        max={100}
        onBlur={() => handleSetValueWhenBlurValue(height, 1, 100, "height")}
      />

      <InputRangeWithNumber
        label="Lebar 1"
        value={width1}
        onChange={(newValue) => {
          setWidth1(newValue);
          handleUpdateValue("width1", newValue);
        }}
        min={1}
        max={100}
        onBlur={() => handleSetValueWhenBlurValue(width1, 1, 100, "width1")}
      />

      <InputRangeWithNumber
        label="Lebar 2"
        value={width2}
        onChange={(newValue) => {
          setWidth2(newValue);
          handleUpdateValue("width2", newValue);
        }}
        min={1}
        max={100}
        onBlur={() => handleSetValueWhenBlurValue(width2, 1, 100, "width2")}
      />

      <InputRangeWithNumber
        label="Jarak"
        value={distance}
        onChange={(newValue) => {
          setDistance(newValue);
          handleUpdateValue("distance", newValue);
        }}
        min={0}
        max={100}
        onBlur={() => handleSetValueWhenBlurValue(distance, 0, 100, "distance")}
      />

      <div style={{ gap: 10 }} className="d-flex align-items-center my-3">
        <Checkbox
          label="Terbalik"
          id="isFlip"
          checked={isFlip}
          onChange={(e) => handleChangeFlip(e.target.checked)}
        />

        <Checkbox
          label="Floating"
          id="isFloating"
          checked={isFloating}
          onChange={(e) => handleChangeFloating(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default StripeLineControl;
