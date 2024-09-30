import React, { useEffect, useState } from "react";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa6";
import { CFormGroup, CLabel } from "@coreui/react";
import { useDebounce } from "use-debounce";
import { CustomReactQuill } from "../../../../common/ReactQuill";
import Input from "../../../../common/Input";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";
import ColorPicker from "../../../../common/ColorPicker";
import SelectOptions from "../../../../common/SelectOptions";

const convertArrayToHtml = (lines) => {
  if (!Array.isArray(lines)) return ""; // Pastikan lines adalah array
  return lines.map((line) => `<p>${line}</p>`).join("");
};

const ContentTab = ({
  setPreviewSection,
  currentSection,
  sectionId,
  columnId,
}) => {
  const [selectedTextColor, setSelectedTextColor] = useState(
    currentSection?.content?.textColor || "#424242"
  );
  const [selectAlign, setSelectAlign] = useState(
    currentSection?.content?.textAlign || "tw-justify-center"
  );
  const [fontSize, setFontSize] = useState(
    currentSection?.content?.fontSize || 18
  );
  const [distance, setDistance] = useState(
    currentSection?.content?.distance || currentSection?.content?.distance === 0
      ? currentSection.content.distance
      : 20
  );
  const [editorHtml, setEditorHtml] = useState(
    convertArrayToHtml(currentSection.content?.text) ||
      convertArrayToHtml([
        "Mudah Digunakan",
        "Dijamin 100% Bahan Terbaik",
        "Menghilangkan Bau Badan",
        "Waterproof (Tahan Air)",
      ])
  );

  const [editorHtmlValue] = useDebounce(editorHtml, 300);

  useEffect(() => {
    if (editorHtmlValue !== convertArrayToHtml(currentSection.content?.text)) {
      handleEditorChange(editorHtmlValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorHtmlValue]);

  // const setContentValue = (newData) => {
  //   console.log("🚀 ~ setContentValue ~ newData:", newData);
  //   setPreviewSection((arr) =>
  //     arr.map((section) =>
  //       String(section.id) === sectionId
  //         ? {
  //             ...section,
  //             column: section.column.map((column) =>
  //               column.id === columnId
  //                 ? {
  //                     ...column,
  //                     content: column.content.map((content) =>
  //                       content.id === currentSection?.id
  //                         ? {
  //                             ...content,
  //                             content: {
  //                               ...content.content,
  //                               ...newData,
  //                             },
  //                           }
  //                         : content
  //                     ),
  //                   }
  //                 : column
  //             ),
  //           }
  //         : section
  //     )
  //   );
  // };

  const setContentValue = (newData) => {
    console.log("🚀 ~ setContentValue ~ newData:", newData);
    setPreviewSection((arr) =>
      arr.map((section) => {
        console.log("🚀 ~ mapping section ~ section.id:", section.id); // Log section.id
        if (String(section.id) === sectionId) {
          return {
            ...section,
            column: section.column.map((column) => {
              console.log("🚀 ~ mapping column ~ column.id:", column.id); // Log column.id
              if (column.id === columnId) {
                return {
                  ...column,
                  content: column.content.map((content) => {
                    console.log(
                      "🚀 ~ mapping content ~ content.id:",
                      content.id
                    ); // Log content.id
                    if (content.id === currentSection?.id) {
                      console.log("🚀 ~ Updating content for ID:", content.id); // Log update point
                      return {
                        ...content,
                        content: {
                          ...content.content,
                          ...newData,
                        },
                      };
                    }
                    return content;
                  }),
                };
              }
              return column;
            }),
          };
        }
        return section;
      })
    );
  };

  const handleEditorChange = (html) => {
    // Buat elemen DOM sementara untuk mengonversi HTML menjadi teks tanpa tag
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    // Menghapus tag HTML dan memisahkan berdasarkan <p> atau <br>
    const lines = tempElement.innerHTML
      .split(/<p>|<\/p>|<br\s*\/?>/i)
      .filter(Boolean);

    setEditorHtml(html);

    const newData = {
      text: lines,
    };
    setContentValue(newData);
  };

  const handleUpdateValue = (key, value) => {
    const newData = {
      [key]: value,
    };
    setContentValue(newData);
  };

  const handleSetValueWhenBlurValue = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "fontSize") {
      setFontSize(newValue);
    } else if (key === "distance") {
      setDistance(newValue);
    }
    handleUpdateValue(key, newValue);
  };

  const onChangeAlign = (value) => {
    setSelectAlign(value);

    const newData = {
      textAlign: value,
    };
    setContentValue(newData);
  };

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Jenis Font"
          options={[{ value: "default", label: "Default" }]}
          //   onChange={}
          value={{ value: "default", label: "Default" }}
          width="50"
        />

        <ColorPicker
          initialColor={selectedTextColor}
          onChange={(color) => {
            setSelectedTextColor(color);
            handleUpdateValue("textColor", color);
          }}
          width="w-0"
          bottom={"-10px"}
        />

        <div>
          <CFormGroup>
            <CLabel className="mb-2">Align</CLabel>
            <div className="d-flex justify-content-start">
              <div
                className={`d-flex align-items-center justify-content-center mr-1 rounded ${
                  selectAlign === "tw-justify-left"
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-dark"
                }`}
                style={{ cursor: "pointer", width: 35, height: 35 }}
                onClick={() => onChangeAlign("tw-justify-left")}
              >
                <FaAlignLeft style={{ fontSize: 15 }} />
              </div>
              <div
                className={`d-flex align-items-center justify-content-center mr-1 rounded ${
                  selectAlign === "tw-justify-center"
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-dark"
                }`}
                style={{ cursor: "pointer", width: 35, height: 35 }}
                onClick={() => onChangeAlign("tw-justify-center")}
              >
                <FaAlignCenter style={{ fontSize: 15 }} />
              </div>
              <div
                className={`d-flex align-items-center justify-content-center mr-1 rounded ${
                  selectAlign === "tw-justify-end"
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-dark"
                }`}
                style={{ cursor: "pointer", width: 35, height: 35 }}
                onClick={() => onChangeAlign("tw-justify-end")}
              >
                <FaAlignRight style={{ fontSize: 15 }} />
              </div>
            </div>
          </CFormGroup>
        </div>
      </div>

      <InputRangeWithNumber
        label="Ukuran Font"
        value={fontSize}
        onChange={(newValue) => {
          setFontSize(newValue);
          handleUpdateValue("fontSize", newValue);
        }}
        min={10}
        max={40}
        onBlur={() => handleSetValueWhenBlurValue(fontSize, 10, 40, "fontSize")}
      />

      <InputRangeWithNumber
        label="Jarak"
        value={distance}
        onChange={(newValue) => {
          setDistance(newValue);
          handleUpdateValue("distance", newValue);
        }}
        min={0}
        max={60}
        onBlur={() => handleSetValueWhenBlurValue(distance, 0, 60, "distance")}
      />

      <Input
        value="Fitur akan dipisah ketika ada baris kosong"
        type="text"
        readOnly={true}
      />

      <CustomReactQuill
        value={editorHtml}
        onChange={(html) => setEditorHtml(html)}
        version="basic"
        customStyle={true}
      />
    </div>
  );
};

export default ContentTab;
