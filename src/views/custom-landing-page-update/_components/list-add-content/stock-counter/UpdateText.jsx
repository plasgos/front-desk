import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import ColorPicker from "../../common/ColorPicker";
import { CustomReactQuill } from "../../common/ReactQuill";
import SelectOptions from "../../common/SelectOptions";
import TextAlignSelect from "../../common/TextAlignSelect";
import { fontSizeOptions } from "../../SelectOptions";

const textShadowOptions = [
  { value: undefined, label: "Tidak Ada" },
  { value: "1px 1px 2px rgba(0, 0, 0, 0.2)", label: "Ringan" },
  { value: "2px 2px 4px rgba(0, 0, 0, 0.5)", label: "Normal" },
  { value: "3px 3px 6px rgba(0, 0, 0, 0.7)", label: "Gelap" },
];

const UpdateText = ({
  setPreviewSection,
  currentSection,
  isEditingContent,
}) => {
  const {
    text,
    textAlign,
    textColor: textColorProps,
    textShadow: textShadowProps,
    fontSize: fontSizeProps,
  } = currentSection?.content?.text || {};

  const { currentStock } = currentSection?.content?.design || {};

  const [textShadow, setTextShadow] = useState(textShadowOptions[0]);
  const [fontSize, setFontSize] = useState(fontSizeOptions[3]);
  const [editorHtml, setEditorHtml] = useState(
    text || "<p>Jangan sampai kehabisan, stok <strong>TERBATAS</strong>!!!</p>"
  );
  const [selectAlign, setSelectAlign] = useState(textAlign || "tw-text-center");

  const [textColor, setTextColor] = useState(textColorProps || "#000000");

  const [editorHtmlValue] = useDebounce(editorHtml, 300);

  useEffect(() => {
    if (editorHtmlValue) {
      //   handleChangeTitle("text", editorHtmlValue);
      handleChangeText(editorHtmlValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorHtmlValue]);

  useEffect(() => {
    if (currentStock) {
      handleChangeText(editorHtmlValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStock]);

  useEffect(() => {
    const currentTextShadowOption = textShadowOptions.find(
      (opt) => opt.value === textShadowProps
    );

    if (currentTextShadowOption) {
      setTextShadow(currentTextShadowOption);
    }

    const currentFontSizeOption = fontSizeOptions.find(
      (opt) => opt.value === fontSizeProps
    );

    if (currentFontSizeOption) {
      setFontSize(currentFontSizeOption);
    }

    const currentSectionText = text;

    if (currentSectionText) {
      setEditorHtml(currentSectionText);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection]);

  const handleChangeText = (value) => {
    const replacedContent = value.replace(/{{stock}}/g, currentStock);

    setPreviewSection((arr) =>
      arr.map((item) => {
        return String(item.id) === currentSection.id
          ? {
              ...item,
              content: {
                ...item.content,
                text: {
                  ...item.content.text,
                  text: replacedContent,
                },
              },
            }
          : item;
      })
    );
  };

  const handleChangeTitle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) => {
        return String(item.id) === currentSection.id
          ? {
              ...item,
              content: {
                ...item.content,
                text: {
                  ...item.content.text,
                  [key]: value,
                },
              },
            }
          : item;
      })
    );
  };

  return (
    <div className="pb-5">
      <div
        style={{ gap: 10 }}
        className="d-flex align-items-center justify-content-between"
      >
        <ColorPicker
          initialColor={textColor}
          label="Warna Teks"
          onChange={(color) => {
            setTextColor(color);
            handleChangeTitle("textColor", color);
          }}
        />

        <TextAlignSelect
          initialValue={selectAlign}
          onChange={(key, value) => {
            setSelectAlign(value);
            handleChangeTitle(key, value);
          }}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <SelectOptions
          label="Bayangan Font"
          options={textShadowOptions}
          onChange={(selectedOption) => {
            setTextShadow(selectedOption);
            handleChangeTitle("textShadow", selectedOption.value);
          }}
          value={textShadow}
          width="50"
        />

        <SelectOptions
          label="Ukuran Font"
          options={fontSizeOptions}
          onChange={(selectedOption) => {
            setFontSize(selectedOption);
            handleChangeTitle("fontSize", selectedOption.value);
          }}
          value={fontSize}
          width="50"
        />
      </div>

      <div
        style={{ backgroundColor: "#EAECEC", width: "65%" }}
        className=" p-2  rounded mb-3"
      >
        <div style={{ fontStyle: "italic" }} className=" font-weight-bold mb-2">
          Variabel
        </div>
        <div>{`{{stock}} : Stock Produk`}</div>
      </div>

      <CustomReactQuill
        value={editorHtml}
        onChange={(html) => setEditorHtml(html)}
        version="full"
      />
    </div>
  );
};

export default UpdateText;
