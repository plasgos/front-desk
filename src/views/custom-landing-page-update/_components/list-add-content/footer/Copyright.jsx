import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { fontSizeOptions } from "../../SelectOptions";
import Checkbox from "../../common/Checkbox";
import TextAlignSelect from "../../common/TextAlignSelect";
import ColorPicker from "../../common/ColorPicker";
import SelectOptions from "../../common/SelectOptions";
import { CustomReactQuill } from "../../common/ReactQuill";

const Copyright = ({ setPreviewSection, currentSection }) => {
  const [isCustom, setIsCustom] = useState(false);

  const [editorHtml, setEditorHtml] = useState(
    currentSection?.copyright?.customText || ""
  );
  const [color, setColor] = useState(
    currentSection?.copyright?.color || "#757575"
  );

  const [textAlign, setTextAlign] = useState(
    currentSection?.copyright?.textAlign || "tw-text-center"
  );
  const [fontSize, setFontSize] = useState(fontSizeOptions[0]);

  const [editorHtmlValue] = useDebounce(editorHtml, 300);

  const handleChangeCopyright = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              copyright: {
                ...section.copyright,
                [key]: value,
              },
            }
          : section
      )
    );
  };

  useEffect(() => {
    if (editorHtmlValue) {
      handleChangeCopyright("customText", editorHtmlValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorHtmlValue]);

  useEffect(() => {
    setIsCustom(currentSection.copyright?.isCustom || false);
    setEditorHtml(currentSection.copyright?.customText || "");
    setColor(currentSection.copyright?.color || "#757575");
    setTextAlign(currentSection.copyright?.textAlign || "tw-text-center");

    const currentFontSizeOption = fontSizeOptions.find(
      (opt) => opt.value === currentSection?.copyright?.fontSize
    );
    if (currentFontSizeOption) {
      setFontSize(currentFontSizeOption);
    }
  }, [currentSection]);

  return (
    <div>
      <div className="p-3">
        <Checkbox
          id="custom-copyright"
          label="Custom Copyright"
          checked={isCustom}
          onChange={(e) => {
            const { checked } = e.target;
            setIsCustom(checked);
            handleChangeCopyright("isCustom", checked);
          }}
        />
      </div>

      <div
        className="p-3"
        style={{
          ...(!isCustom
            ? {
                cursor: "not-allowed",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(3px)",
                pointerEvents: "none",
                opacity: 0.4,
                zIndex: 9999,
                position: "relative",
              }
            : {}),
        }}
      >
        <div style={{ gap: 10 }} className="d-flex align-items-center">
          <TextAlignSelect
            initialValue={textAlign}
            onChange={(key, value) => {
              setTextAlign(value);
              handleChangeCopyright(key, value);
            }}
          />
        </div>

        <div className="mb-3">
          <ColorPicker
            initialColor={color}
            label="Warna Teks"
            onChange={(color) => {
              setColor(color);
              handleChangeCopyright("color", color);
            }}
          />
        </div>

        <SelectOptions
          label="Ukuran Font"
          options={fontSizeOptions}
          onChange={(selectedOption) => {
            setFontSize(selectedOption);
            handleChangeCopyright("fontSize", selectedOption.value);
          }}
          value={fontSize}
          width="50"
        />

        <CustomReactQuill
          value={editorHtml}
          onChange={(html) => setEditorHtml(html)}
          version="full"
        />
      </div>
    </div>
  );
};

export default Copyright;
