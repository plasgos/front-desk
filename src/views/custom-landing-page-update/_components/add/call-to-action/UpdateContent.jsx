import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { alignOptions, fontSizeOptions } from "../../SelectOptions";
import Checkbox from "../../common/Checkbox";
import ColorPicker from "../../common/ColorPicker";
import Input from "../../common/Input";
import { CustomReactQuill } from "../../common/ReactQuill";
import SelectOptions from "../../common/SelectOptions";
import TargetOptions from "../../common/TargetOptions";

const UpdateContent = ({
  setPreviewSection,
  currentSection,
  currentContent,
  isEditingContent,
}) => {
  const [textColor, setTextColor] = useState(
    currentContent?.textColor || "#000000"
  );

  const [textColorButton, setTextColorButton] = useState(
    currentContent?.textColorButton || "#ffffff"
  );

  const [buttonColor, setButtonColor] = useState(
    currentContent?.textColorButton || "#2196F3"
  );

  const [isGhostVariant, setIsGhostVariant] = useState(
    currentContent?.isGhostVariant || false
  );

  const [align, setAlign] = useState(alignOptions[1]);
  const [fontSize, setFontSize] = useState(fontSizeOptions[2]);
  const [text, setText] = useState(
    currentContent?.text || "Signup for free trial now!"
  );

  const [textButton, setTextButton] = useState(
    currentContent?.textButton || "Start Free Trial"
  );

  const [textButtonValue] = useDebounce(textButton, 300);
  const [textValue] = useDebounce(text, 300);

  useEffect(() => {
    if (textButtonValue !== currentContent?.textButton) {
      handleChangeContent("textButton", textButtonValue);
    }

    if (textValue !== currentContent?.text) {
      handleChangeContent("text", textValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textButtonValue, textValue]);

  useEffect(() => {
    if (isEditingContent) {
      const currentAlign = alignOptions.find(
        (opt) => opt.value === currentContent?.align
      );

      if (currentAlign) {
        setAlign(currentAlign);
      }

      const currentFontSize = fontSizeOptions.find(
        (opt) => opt.value === currentContent?.fontSize
      );

      if (currentFontSize) {
        setFontSize(currentFontSize);
      }
    }
  }, [currentContent, isEditingContent]);

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

  return (
    <div style={{ paddingBottom: 30 }}>
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={textColor}
          label="Teks"
          onChange={(color) => {
            setTextColor(color);
            handleChangeContent("textColor", color);
          }}
        />

        <ColorPicker
          initialColor={buttonColor}
          label="Tombol"
          onChange={(color) => {
            setButtonColor(color);
            handleChangeContent("buttonColor", color);
          }}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={textColorButton}
          label="Teks Tombol"
          onChange={(color) => {
            setTextColorButton(color);
            handleChangeContent("textColorButton", color);
          }}
        />
        <Checkbox
          label="Ghost Button"
          id="isGhostButton"
          checked={isGhostVariant}
          onChange={(e) => {
            const { checked } = e.target;
            setIsGhostVariant(checked);
            handleChangeContent("isGhostVariant", checked);
          }}
        />
      </div>

      <Input
        label="Button Teks"
        value={textButton}
        onChange={(event) => setTextButton(event.target.value)}
        type="text"
      />

      <TargetOptions
        setPreviewSection={setPreviewSection}
        sectionId={currentSection?.id}
        currentContent={currentContent}
        isEditingContent={isEditingContent}
      />

      <div style={{ gap: 10 }} className="d-flex  align-items-center mb-3">
        <SelectOptions
          label="Ukuran Judul"
          options={fontSizeOptions}
          onChange={(selectedOption) => {
            setFontSize(selectedOption);
            handleChangeContent("fontSize", selectedOption.value);
          }}
          value={fontSize}
          width="50"
        />

        <SelectOptions
          label="Align"
          options={alignOptions}
          onChange={(selectedOption) => {
            setAlign(selectedOption);
            handleChangeContent("align", selectedOption.value);
          }}
          value={align}
          width="50"
        />
      </div>

      <CustomReactQuill
        value={text}
        onChange={(html) => setText(html)}
        version="full"
      />
    </div>
  );
};

export default UpdateContent;
