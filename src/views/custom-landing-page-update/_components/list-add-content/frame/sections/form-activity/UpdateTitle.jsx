import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { CButton } from "@coreui/react";
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

const UpdateTitle = ({
  setPreviewSection,
  currentSection,
  isEditingContent,
  isCollectedTab,
  sectionId,
}) => {
  const initialIsCollected = isCollectedTab
    ? currentSection?.collected?.isCollected
    : currentSection?.titleHeader?.isCollected;

  const {
    text,
    textAlign,
    textColor: textColorProps,
    textShadow: textShadowProps,
    fontSize: fontSizeProps,
  } = isCollectedTab
    ? currentSection?.collected || {} // Pastikan collected ada
    : currentSection?.titleHeader || {};

  const [textShadow, setTextShadow] = useState(textShadowOptions[0]);
  const [fontSize, setFontSize] = useState(fontSizeOptions[2]);
  const [editorHtml, setEditorHtml] = useState(
    text || "<h2>Ayo Daftar Sekarang !</h2><p>Jangan Sampai Ketinggalan</p>"
  );
  const [selectAlign, setSelectAlign] = useState(textAlign || "tw-text-center");

  const [textColor, setTextColor] = useState(textColorProps || "#000000");

  const [editorHtmlValue] = useDebounce(editorHtml, 300);

  useEffect(() => {
    if (editorHtmlValue) {
      handleChangeTitle("text", editorHtmlValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorHtmlValue]);

  const [isCollected, setIsCollected] = useState(initialIsCollected);
  const [isDefault, setIsDefault] = useState(!initialIsCollected);

  useEffect(() => {
    if (isCollectedTab) {
      setIsCollected(initialIsCollected);
      setIsDefault(!initialIsCollected);
    }
  }, [initialIsCollected, isCollectedTab]);

  useEffect(() => {
    // if (isEditingContent) {
    // }
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
  }, [
    currentSection,
    fontSize,
    fontSizeProps,
    isEditingContent,
    text,
    textShadow,
    textShadowProps,
  ]);

  const handleChangeTitle = (key, value) => {
    if (isCollectedTab) {
      setPreviewSection((arr) =>
        arr.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                content: section.content.map((sectionFrame) =>
                  sectionFrame.id === currentSection.id
                    ? {
                        ...sectionFrame,
                        collected: {
                          ...sectionFrame.collected,
                          [key]: value,
                        },
                      }
                    : sectionFrame
                ),
              }
            : section
        )
      );
    } else {
      setPreviewSection((arr) =>
        arr.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                content: section.content.map((sectionFrame) =>
                  sectionFrame.id === currentSection.id
                    ? {
                        ...sectionFrame,
                        titleHeader: {
                          ...sectionFrame.titleHeader,
                          [key]: value,
                        },
                      }
                    : sectionFrame
                ),
              }
            : section
        )
      );
    }
  };

  return (
    <div className="pb-5">
      {isCollectedTab && (
        <div>
          <div className="mb-2">Tinjau dalam kondisi</div>
          <div style={{ gap: 5 }} className="d-flex mb-2">
            <CButton
              onClick={() => {
                setIsDefault(true);
                setIsCollected(false);
                handleChangeTitle("isCollected", false);
              }}
              color="primary"
              variant={isDefault ? "" : "outline"}
            >
              Default
            </CButton>
            <CButton
              onClick={() => {
                setIsCollected(true);
                setIsDefault(false);
                handleChangeTitle("isCollected", true);
              }}
              color="primary"
              variant={isCollected ? "" : "outline"}
            >
              Terkumpul
            </CButton>
          </div>
        </div>
      )}
      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <TextAlignSelect
          initialValue={selectAlign}
          onChange={(key, value) => {
            setSelectAlign(value);
            handleChangeTitle(key, value);
          }}
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

export default UpdateTitle;
