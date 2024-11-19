import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Input from "../../common/Input";

import image from "../../../../../assets/action-figure.jpg";
import Checkbox from "../../common/Checkbox";
import ColorPicker from "../../common/ColorPicker";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import SelectOptions from "../../common/SelectOptions";
import TargetOptions from "../../common/TargetOptions";
import { shadowOptions } from "../../SelectOptions";

const ImageContent = ({
  setPreviewSection,
  currentSection,
  currentContent,
  isEditingContent,
  selectedVariant,
}) => {
  const [imageUrl, setImageUrl] = useState(currentContent?.image || image);

  const [isDownloadImage, setIsDownloadImage] = useState(
    currentContent?.isDownloadImage || false
  );

  const [alt, setAlt] = useState(currentContent?.alt || "");

  const [shadow, setShadow] = useState(undefined);
  const [borderColor, setBorderColor] = useState(
    currentSection?.wrapperStyle?.borderColor || ""
  );

  const [width, setWidth] = useState(
    currentSection?.wrapperStyle?.width || 600
  );

  const [rotation, setRotation] = useState(
    currentSection?.wrapperStyle?.rotation || 0
  );

  const [altValue] = useDebounce(alt, 300);

  useEffect(() => {
    const currentShadowOption = shadowOptions.find(
      (opt) => opt.value === currentSection?.wrapperStyle?.shadow
    );

    if (currentShadowOption) {
      setShadow(currentShadowOption);
    }
  }, [currentSection]);

  const handleChangeContent = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) => {
        return String(item.id) === currentSection.id
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                contentItem.id === currentContent.id
                  ? {
                      ...contentItem,
                      [key]: value,
                    }
                  : contentItem
              ),
            }
          : item;
      })
    );
  };

  const handleChangeWrapperStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                [key]: value,
              },
            }
          : item
      )
    );
  };

  useEffect(() => {
    if (
      currentContent &&
      Object.keys(currentContent).length > 0 &&
      altValue !== currentContent.alt
    ) {
      handleChangeContent("alt", altValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [altValue]);

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImageUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    };
  };

  useEffect(() => {
    // Update tempSections setelah imageUrl berubah
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                contentItem.id === currentContent.id
                  ? {
                      ...contentItem,
                      image: imageUrl,
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleSetValueWhenBlurWrapperStyle = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "width") {
      setWidth(newValue);
    } else if (key === "rotation") {
      setRotation(newValue);
    }
    handleChangeWrapperStyle(key, newValue);
  };

  return (
    <div style={{ paddingBottom: 30 }}>
      {selectedVariant.value === "center" && (
        <div className="mb-2">
          <ColorPicker
            initialColor={borderColor}
            label="Garis Luar"
            onChange={(color) => {
              setBorderColor(color);
              handleChangeWrapperStyle("borderColor", color);
            }}
          />
        </div>
      )}

      <div className="mb-2">
        <div
          style={{
            backgroundColor: "#F5F5F5",
            width: "100%",
            overflow: "hidden",
          }}
          className="mx-auto mb-2"
        >
          <img
            style={{ objectFit: "contain", width: "100%", height: 100 }}
            src={imageUrl}
            alt="img"
          />
        </div>

        <CButton
          onClick={handleFileUpload}
          color="primary"
          variant="outline"
          className="btn-block"
        >
          Upload
        </CButton>
      </div>

      <Input
        label="Alt"
        value={alt}
        onChange={(event) => {
          const { value } = event.target;
          setAlt(value);
        }}
        type="text"
      />

      <Checkbox
        checked={isDownloadImage}
        id="isDownloadImage"
        label="Gambar Tidak Bisa Di Simpan"
        onChange={(e) => {
          const { checked } = e.target;
          setIsDownloadImage(checked);
          handleChangeContent("isDownloadImage", checked);
        }}
      />

      <SelectOptions
        label="Bayangan"
        options={shadowOptions}
        onChange={(selectedOption) => {
          setShadow(selectedOption);
          handleChangeWrapperStyle("shadow", selectedOption.value);
        }}
        value={shadow}
        width="50"
      />

      {selectedVariant.value === "center" && (
        <>
          <InputRangeWithNumber
            label="Lebar"
            value={width}
            onChange={(newValue) => {
              setWidth(newValue);
              handleChangeWrapperStyle("width", newValue);
            }}
            min={100}
            max={1200}
            onBlur={() =>
              handleSetValueWhenBlurWrapperStyle(width, 100, 1200, "width")
            }
          />
          <InputRangeWithNumber
            label="Rotasi"
            value={rotation}
            onChange={(newValue) => {
              setRotation(newValue);
              handleChangeWrapperStyle("rotation", newValue);
            }}
            min={-90}
            max={90}
            onBlur={() =>
              handleSetValueWhenBlurWrapperStyle(rotation, -90, 90, "rotation")
            }
          />
        </>
      )}

      <TargetOptions
        setPreviewSection={setPreviewSection}
        sectionId={currentSection?.id}
        currentContent={currentContent}
        isEditingContent={isEditingContent}
      />
    </div>
  );
};

export default ImageContent;
