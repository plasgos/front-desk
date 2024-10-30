import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { fontSizeOptions } from "../../../../SelectOptions";
import TextAlignSelect from "../../../../common/TextAlignSelect";
import ColorPicker from "../../../../common/ColorPicker";
import SelectOptions from "../../../../common/SelectOptions";
import { CustomReactQuill } from "../../../../common/ReactQuill";

const textShadowOptions = [
  { value: undefined, label: "Tidak Ada" },
  { value: "1px 1px 2px rgba(0, 0, 0, 0.2)", label: "Ringan" },
  { value: "2px 2px 4px rgba(0, 0, 0, 0.5)", label: "Normal" },
  { value: "3px 3px 6px rgba(0, 0, 0, 0.7)", label: "Gelap" },
];

const UpdateContent = ({
  sectionId,
  columnId,
  setPreviewSection,
  currentSection,
  isEditingContent,
}) => {
  const [textShadow, setTextShadow] = useState(undefined);
  const [fontSize, setFontSize] = useState(undefined);
  const [editorHtml, setEditorHtml] = useState(
    currentSection?.content?.text || ""
  );
  const [selectAlign, setSelectAlign] = useState(
    currentSection?.content?.textAlign || "tw-text-left"
  );

  const [textColor, setTextColor] = useState(
    currentSection?.content?.textColor || "#151414"
  );

  const [editorHtmlValue] = useDebounce(editorHtml, 300);

  useEffect(() => {
    if (editorHtmlValue) {
      handleChangeContent("text", editorHtmlValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorHtmlValue]);

  useEffect(() => {
    const currentTextShadowOption = textShadowOptions.find(
      (opt) => opt.value === currentSection?.content?.textShadow
    );

    if (currentTextShadowOption) {
      setTextShadow(currentTextShadowOption);
    }

    const currentFontSizeOption = fontSizeOptions.find(
      (opt) => opt.value === currentSection?.content?.fontSize
    );
    if (currentFontSizeOption) {
      setFontSize(currentFontSizeOption);
    }

    const currentSectionText = currentSection?.content?.text;

    if (currentSectionText) {
      setEditorHtml(currentSectionText);
    }
  }, [currentSection]);

  const handleChangeContent = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) => {
        return String(section.id) === sectionId
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
                              content: {
                                ...content.content,
                                [key]: value,
                              },
                            }
                          : content
                      ),
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
