import React, { useEffect, useState } from "react";
import SelectOptions from "../../common/SelectOptions";
import { fontSizeOptions } from "../../SelectOptions";
import { CustomReactQuill } from "../../common/ReactQuill";
import { useDebounce } from "use-debounce";
import TextAlignSelect from "../../common/TextAlignSelect";
import ColorPicker from "../../common/ColorPicker";

const textShadowOptions = [
  { value: undefined, label: "Tidak Ada" },
  { value: "1px 1px 2px rgba(0, 0, 0, 0.2)", label: "Ringan" },
  { value: "2px 2px 4px rgba(0, 0, 0, 0.5)", label: "Normal" },
  { value: "3px 3px 6px rgba(0, 0, 0, 0.7)", label: "Gelap" },
];

const UpdateContent = ({
  setPreviewSection,
  currentSection,
  currentContent,
  isEditingContent,
}) => {
  const [textShadow, setTextShadow] = useState(undefined);
  const [fontSize, setFontSize] = useState(undefined);
  const [editorHtml, setEditorHtml] = useState(currentContent?.content || "");
  const [selectAlign, setSelectAlign] = useState(
    currentContent?.textAlign || "tw-text-left"
  );

  const [textColor, setTextColor] = useState(
    currentContent?.textColor || "#151414"
  );

  const [editorHtmlValue] = useDebounce(editorHtml, 1000);

  useEffect(() => {
    if (editorHtmlValue) {
      handleChangeContent("content", editorHtmlValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorHtmlValue]);

  useEffect(() => {
    const currentTextShadowOption = textShadowOptions.find(
      (opt) => opt.value === currentContent?.textShadow
    );

    if (currentTextShadowOption) {
      setTextShadow(currentTextShadowOption);
    }

    const currentFontSizeOption = fontSizeOptions.find(
      (opt) => opt.value === currentContent?.fontSize
    );
    if (currentFontSizeOption) {
      setFontSize(currentFontSizeOption);
    }

    const currentContentText = currentContent?.content;

    if (currentContentText) {
      setEditorHtml(currentContentText);
    }
  }, [currentContent]);

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
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <TextAlignSelect
          initialValue={selectAlign}
          onChange={(key, value) => {
            setSelectAlign(value);
            handleChangeContent(key, value);
          }}
        />
        <ColorPicker
          initialColor={textColor}
          label="Warna Teks"
          onChange={(color) => {
            setTextColor(color);
            handleChangeContent("textColor", color);
          }}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <SelectOptions
          label="Bayangan Font"
          options={textShadowOptions}
          onChange={(selectedOption) => {
            setTextShadow(selectedOption);
            handleChangeContent("textShadow", selectedOption.value);
          }}
          value={textShadow}
          width="50"
        />

        <SelectOptions
          label="Ukuran Font"
          options={fontSizeOptions}
          onChange={(selectedOption) => {
            setFontSize(selectedOption);
            handleChangeContent("fontSize", selectedOption.value);
          }}
          value={fontSize}
          width="50"
        />
      </div>

      <CustomReactQuill
        value={editorHtml}
        onChange={(html) => setEditorHtml(html)}
        version="full"
      />
    </div>
  );
};

export default UpdateContent;
