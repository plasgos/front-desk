import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import ColorPicker from "../../../../common/ColorPicker";
import SelectOptions from "../../../../common/SelectOptions";
import Input from "../../../../common/Input";
import { CustomReactQuill } from "../../../../common/ReactQuill";

const fontSizeQuoteOptions = [
  { value: "tw-text-base", label: "Normal" },
  { value: "tw-text-lg", label: "Besar" },
  { value: "tw-text-xl", label: "Lebih Besar" },
];

const ContentTab = ({
  setPreviewSection,
  currentSection,
  isEditing,
  sectionId,
  columnId,
}) => {
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

  const [quoteTextValue] = useDebounce(quoteText, 300);
  const [quoteTextColorValue] = useDebounce(quoteTextColor, 300);
  const [writerValue] = useDebounce(writer, 300);
  const [writerColorValue] = useDebounce(writerColor, 300);
  const [quoteTagColorValue] = useDebounce(quoteTagColor, 300);

  useEffect(() => {
    if (quoteTextValue !== currentSection?.content?.quoteText) {
      handleChangeContent("quoteText", quoteTextValue);
    }

    if (quoteTextColorValue !== currentSection?.content?.quoteTextColor) {
      handleChangeContent("quoteTextColor", quoteTextColorValue);
    }

    if (writerValue !== currentSection?.content?.writer) {
      handleChangeContent("writer", writerValue);
    }

    if (writerColorValue !== currentSection?.content?.writerColor) {
      handleChangeContent("writerColor", writerColorValue);
    }

    if (quoteTagColorValue !== currentSection?.content?.quoteTagColor) {
      handleChangeContent("quoteTagColor", quoteTagColorValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    quoteTextValue,
    quoteTextColorValue,
    writerValue,
    writerColorValue,
    quoteTagColorValue,
  ]);

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
      arr.map((section) => {
        return String(section.id) === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) => {
                        return content.id === currentSection.id
                          ? {
                              ...content,
                              content: {
                                ...content.content,
                                [key]: value,
                              },
                            }
                          : content;
                      }),
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
      <div style={{ gap: 10 }} className="d-flex align-items-center  ">
        <ColorPicker
          initialColor={quoteTextColor}
          label="Quote Teks"
          onChange={(color) => {
            setQuoteTextColor(color);
          }}
          bottom={"100px"}
        />

        <ColorPicker
          initialColor={quoteTagColor}
          label="Quote"
          onChange={(color) => {
            setQuoteTagColor(color);
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
          }}
          bottom={"100px"}
        />
      </div>

      <SelectOptions
        label="Jenis Font"
        options={fontSizeQuoteOptions}
        onChange={(selectedOption) => {
          setFontSize(selectedOption);
          handleChangeContent("fontSize", selectedOption.value);
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
        }}
        type="text"
      />

      <CustomReactQuill
        value={quoteText}
        onChange={(value) => {
          setQuoteText(value);
        }}
        version="basic"
      />
    </div>
  );
};

export default ContentTab;
