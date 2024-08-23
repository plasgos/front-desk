import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Input from "../../common/Input";
import SelectOptions from "../../common/SelectOptions";
import ColorPicker from "../../common/ColorPicker";
import "react-quill/dist/quill.snow.css";
import "react-slideshow-image/dist/styles.css";

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

  const [fontSize, setFontSize] = useState(
    undefined || fontSizeQuoteOptions[0]
  );

  useEffect(() => {
    if (isEditing) {
      const currentFontSizeQuoteOption = fontSizeQuoteOptions.find(
        (opt) => opt.value === currentSection?.content?.fontSize
      );

      if (currentFontSizeQuoteOption) {
        setFontSize(currentFontSizeQuoteOption);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection, isEditing]);

  const handleChangeFontSize = (selectedOption) => {
    setFontSize(selectedOption);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(currentSection.id)
          ? {
              ...item,
              content: {
                ...item.content,
                fontSize: selectedOption.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeQuoteTagColor = (color) => {
    setQuoteTagColor(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(currentSection.id)
          ? {
              ...item,
              content: {
                ...item.content,
                quoteTagColor: color,
              },
            }
          : item
      )
    );
  };

  const handleChangeWriterColor = (value) => {
    setWriterColor(value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(currentSection.id)
          ? {
              ...item,
              content: {
                ...item.content,
                writerColor: value,
              },
            }
          : item
      )
    );
  };

  const handleChangeWriter = (value) => {
    setWriter(value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(currentSection.id)
          ? {
              ...item,
              content: {
                ...item.content,
                writer: value,
              },
            }
          : item
      )
    );
  };

  const handleChangeQuoteText = (html) => {
    setQuoteText(html);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(currentSection.id)
          ? {
              ...item,
              content: {
                ...item.content,
                quoteText: html,
              },
            }
          : item
      )
    );
  };

  const handleChangeQuoteTextColor = (color) => {
    setQuoteTextColor(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(currentSection.id)
          ? {
              ...item,
              content: {
                ...item.content,
                quoteTextColor: color,
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
          onChange={handleChangeQuoteTextColor}
          bottom={"100px"}
        />

        <ColorPicker
          initialColor={quoteTagColor}
          label="Quote"
          onChange={handleChangeQuoteTagColor}
          bottom={"100px"}
        />
      </div>

      <div className="my-2">
        <ColorPicker
          initialColor={writerColor}
          label="Teks Penulis"
          onChange={handleChangeWriterColor}
          bottom={"100px"}
        />
      </div>

      <SelectOptions
        label="Jenis Font"
        options={fontSizeQuoteOptions}
        onChange={handleChangeFontSize}
        value={fontSize}
        width="55px"
      />

      <Input
        label="Penulis"
        value={writer}
        onChange={(e) => handleChangeWriter(e.target.value)}
        type="text"
      />

      <ReactQuill
        modules={{
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["link", "image"],
            ["clean"],
          ],
          clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: true,
          },
        }}
        formats={[
          "bold",
          "italic",
          "underline",
          "strike",
          "link",
          "image",
          "clean",
        ]}
        theme="snow"
        value={quoteText}
        onChange={handleChangeQuoteText}
        className="text-editor rounded"
      />
    </div>
  );
};

export default ContentTab;
