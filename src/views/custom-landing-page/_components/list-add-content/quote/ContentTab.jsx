import React, { useEffect, useState } from "react";
import Input from "../../common/Input";
import SelectOptions from "../../common/SelectOptions";
import ColorPicker from "../../common/ColorPicker";
import { CustomReactQuill } from "../../common/ReactQuill";

const fontSizeQuoteOptions = [
  { value: "tw-text-base", label: "Normal" },
  { value: "tw-text-lg", label: "Besar" },
  { value: "tw-text-xl", label: "Lebih Besar" },
];

const ContentTab = ({ setPreviewSection, currentSection, isEditing }) => {
  const [quoteText, setQuoteText] = useState(
    currentSection?.content?.quoteText ||
      "Kamu tidak bisa membangunkan orang yang pura-pura tidur"
  );
  const [quoteTextColor, setQuoteTextColor] = useState(
    currentSection?.content?.quoteTextColor || "#000000"
  );

  const [quoteTagColor, setQuoteTagColor] = useState(
    currentSection?.content?.quoteTagColor || "#616161"
  );
  const [writerColor, setWriterColor] = useState(
    currentSection?.content?.writerColor || "#9E9E9E"
  );
  const [writer, setWriter] = useState(
    currentSection?.content?.writer || "Tere Liye"
  );

  const [fontSize, setFontSize] = useState(fontSizeQuoteOptions[0]);

  useEffect(() => {
    if (isEditing) {
      const currentFontSizeQuoteOption = fontSizeQuoteOptions.find(
        (opt) => opt.value === currentSection?.content?.fontSize
      );

      if (currentFontSizeQuoteOption) {
        setFontSize(currentFontSizeQuoteOption);
      }
    }
  }, [currentSection, isEditing]);

  const handleChangeContent = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(currentSection.id)
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

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center  ">
        <ColorPicker
          initialColor={quoteTextColor}
          label="Quote Teks"
          onChange={(color) => {
            setQuoteTextColor(color);
            handleChangeContent("quoteTextColor", color);
          }}
          bottom={"100px"}
        />

        <ColorPicker
          initialColor={quoteTagColor}
          label="Quote"
          onChange={(color) => {
            setQuoteTagColor(color);
            handleChangeContent("quoteTagColor", color);
          }}
          bottom={"100px"}
        />
      </div>

      <div className="my-2">
        <ColorPicker
          initialColor={writerColor}
          label="Teks Penulis"
          onChange={(color) => {
            setWriterColor(color);
            handleChangeContent("writerColor", color);
          }}
          bottom={"100px"}
        />
      </div>

      <SelectOptions
        label="Jenis Font"
        options={fontSizeQuoteOptions}
        onChange={(selectedOption) => {
          setFontSize(selectedOption);
          handleChangeContent("fontSize", selectedOption);
        }}
        value={fontSize}
        width="55px"
      />

      <Input
        label="Penulis"
        value={writer}
        onChange={(e) => {
          const { value } = e.target;
          setWriter(value);
          handleChangeContent("writer", value);
        }}
        type="text"
      />

      <CustomReactQuill
        value={quoteText}
        onChange={(value) => {
          setQuoteText(value);
          handleChangeContent("quoteText", value);
        }}
        version="basic"
      />
    </div>
  );
};

export default ContentTab;
