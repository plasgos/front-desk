import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { fontSizeOptions } from "../../../../SelectOptions";
import TextAlignSelect from "../../../../common/TextAlignSelect";
import ColorPicker from "../../../../common/ColorPicker";
import SelectOptions from "../../../../common/SelectOptions";
import { CustomReactQuill } from "../../../../common/ReactQuill";
import { changeContentBySectionId } from "../../helper/changeContentBySectionId";
import { handleChaneStyleImageTextSection } from "./ImageControl";

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
  sectionId,
  columnId,
}) => {
  const [textShadow, setTextShadow] = useState(undefined);
  const [fontSize, setFontSize] = useState(undefined);
  const [editorHtml, setEditorHtml] = useState(currentContent?.content || "");
  const [selectAlign, setSelectAlign] = useState(
    currentSection?.variant?.style?.textAlign || "tw-text-left"
  );

  const [textColor, setTextColor] = useState(
    currentSection?.variant?.style?.textColor || "#151414"
  );

  const [editorHtmlValue] = useDebounce(editorHtml, 300);

  useEffect(() => {
    if (editorHtmlValue) {
      handleChangeContent("content", editorHtmlValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorHtmlValue]);

  useEffect(() => {
    const currentTextShadowOption = textShadowOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.textShadow
    );

    if (currentTextShadowOption) {
      setTextShadow(currentTextShadowOption);
    }

    const currentFontSizeOption = fontSizeOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.fontSize
    );
    if (currentFontSizeOption) {
      setFontSize(currentFontSizeOption);
    }

    const currentContentText = currentContent?.content;

    if (currentContentText) {
      setEditorHtml(currentContentText);
    }
  }, [currentContent, currentSection]);

  const handleChangeContent = (key, value) => {
    const updateContent = {
      [key]: value,
    };

    changeContentBySectionId(
      setPreviewSection,
      sectionId,
      columnId,
      currentSection.id,
      currentContent.id,
      updateContent
    );
  };

  const handleChangeStyle = (key, value) => {
    handleChaneStyleImageTextSection(
      setPreviewSection,
      sectionId,
      columnId,
      currentSection.id,
      key,
      value
    );
  };

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <TextAlignSelect
          initialValue={selectAlign}
          onChange={(key, value) => {
            setSelectAlign(value);
            handleChangeStyle(key, value);
          }}
        />
        <ColorPicker
          initialColor={textColor}
          label="Warna Teks"
          onChange={(color) => {
            setTextColor(color);
            handleChangeStyle("textColor", color);
          }}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <SelectOptions
          label="Bayangan Font"
          options={textShadowOptions}
          onChange={(selectedOption) => {
            setTextShadow(selectedOption);
            handleChangeStyle("textShadow", selectedOption.value);
          }}
          value={textShadow}
          width="50"
        />

        <SelectOptions
          label="Ukuran Font"
          options={fontSizeOptions}
          onChange={(selectedOption) => {
            setFontSize(selectedOption);
            handleChangeStyle("fontSize", selectedOption.value);
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
