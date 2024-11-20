import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { alignOptions, fontSizeOptions } from "../../../../SelectOptions";
import SelectOptions from "../../../../common/SelectOptions";
import ColorPicker from "../../../../common/ColorPicker";
import { CustomReactQuill } from "../../../../common/ReactQuill";

const textShadowOptions = [
  { value: undefined, label: "Tidak Ada" },
  { value: "1px 1px 2px rgba(0, 0, 0, 0.2)", label: "Ringan" },
  { value: "2px 2px 4px rgba(0, 0, 0, 0.5)", label: "Normal" },
  { value: "3px 3px 6px rgba(0, 0, 0, 0.7)", label: "Gelap" },
];

const FinishControl = ({
  sectionId,
  columnId,
  setPreviewSection,
  currentSection,
}) => {
  const initialIsFinished = currentSection?.finish?.isFinished;

  const {
    text,
    textAlign,
    textColor: textColorProps,
    textShadow: textShadowProps,
    fontSize: fontSizeProps,
  } = currentSection?.finish || {};

  const [textShadow, setTextShadow] = useState(textShadowOptions[0]);
  const [fontSize, setFontSize] = useState(fontSizeOptions[2]);
  const [editorHtml, setEditorHtml] = useState(text || "<p>Sudah Selesai</p>");
  const [selectAlign, setSelectAlign] = useState(alignOptions[1]);

  const [textColor, setTextColor] = useState(textColorProps || "#000000");

  const [editorHtmlValue] = useDebounce(editorHtml, 300);

  useEffect(() => {
    if (editorHtmlValue) {
      handleChangeTitle("text", editorHtmlValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorHtmlValue]);

  const [isFinished, setIsFinished] = useState(initialIsFinished);

  const [isCountDown, setIsCountDown] = useState(!initialIsFinished);

  useEffect(() => {
    setIsFinished(initialIsFinished);
    setIsCountDown(!initialIsFinished);
  }, [initialIsFinished]);

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

    const currentTextAlign = alignOptions.find(
      (opt) => opt.value === textAlign
    );

    if (currentTextAlign) {
      setSelectAlign(currentTextAlign);
    }

    const currentTextColor = textColorProps;

    if (currentTextColor) {
      setTextColor(currentTextColor);
    }
  }, [
    currentSection,
    fontSize,
    fontSizeProps,
    text,
    textAlign,
    textColorProps,
    textShadow,
    textShadowProps,
  ]);

  const handleChangeTitle = (key, value) => {
    setPreviewSection((prevSection) =>
      prevSection.map((section) =>
        section.id === sectionId
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
                              finish: {
                                ...content.finish,
                                [key]: value,
                              },
                            }
                          : content
                      ),
                    }
                  : column
              ),
            }
          : section
      )
    );
  };

  return (
    <div className="pb-5">
      <div>
        <div className="mb-2">Tinjau dalam kondisi</div>
        <div style={{ gap: 5 }} className="d-flex mb-2">
          <CButton
            onClick={() => {
              setIsCountDown(true);
              setIsFinished(false);
              handleChangeTitle("isFinished", false);
            }}
            color="primary"
            variant={isCountDown ? "" : "outline"}
          >
            Countdown
          </CButton>
          <CButton
            onClick={() => {
              setIsFinished(true);
              setIsCountDown(false);
              handleChangeTitle("isFinished", true);
            }}
            color="primary"
            variant={isFinished ? "" : "outline"}
          >
            Sudah Selesai
          </CButton>
        </div>
      </div>
      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <SelectOptions
          label="Align"
          options={alignOptions}
          onChange={(selectedOption) => {
            setSelectAlign(selectedOption);
            handleChangeTitle("textAlign", selectedOption.value);
          }}
          value={selectAlign}
          width="50"
        />

        <ColorPicker
          initialColor={textColor}
          label="Warna Teks"
          onChange={(color) => {
            setTextColor(color);
            handleChangeTitle("textColor", color);
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

      <CustomReactQuill
        value={editorHtml}
        onChange={(html) => setEditorHtml(html)}
        version="full"
      />
    </div>
  );
};

export default FinishControl;
