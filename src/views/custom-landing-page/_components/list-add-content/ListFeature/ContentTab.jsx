import React, { useState } from "react";
import ReactQuill from "react-quill";
import Input from "../../common/Input";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa6";
import { CFormGroup, CLabel } from "@coreui/react";
import ColorPicker from "../../common/ColorPicker";
import SelectOptions from "../../common/SelectOptions";
import "react-quill/dist/quill.snow.css";
import "react-slideshow-image/dist/styles.css";

const ContentTab = ({ setPreviewSection, currentSection }) => {
  const [selectedTextColor, setSelectedTextColor] = useState(
    currentSection?.content?.textColor || "#424242"
  );
  const [selectAlign, setSelectAlign] = useState(
    currentSection?.content?.textAlign || "text-center"
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
    currentSection.content?.text || "Type your text here"
  );

  const handleEditorChange = (html) => {
    setEditorHtml(html);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(currentSection.id)
          ? {
              ...item,
              content: {
                ...item.content,
                text: html,
              },
            }
          : item
      )
    );
  };

  const handleUpdateValue = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
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

  const handleSetValueWhenBlurValue = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "fontSize") {
      setFontSize(newValue);
    } else if (key === "distance") {
      setDistance(newValue);
    }
    handleUpdateValue(key, newValue);
  };

  const handleChangeTextColor = (color) => {
    setSelectedTextColor(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              content: {
                ...item.content,
                textColor: color,
              },
            }
          : item
      )
    );
  };

  const onChangeAlign = (value) => {
    setSelectAlign(value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              content: {
                ...item.content,
                textAlign: value,
              },
            }
          : item
      )
    );
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
          onChange={handleChangeTextColor}
          width="w-0"
          bottom={"-10px"}
        />

        <div>
          <CFormGroup>
            <CLabel className="mb-2">Posisi Teks</CLabel>
            <div className="d-flex justify-content-start">
              <div
                className={`d-flex align-items-center justify-content-center mr-1 rounded ${
                  selectAlign === "text-left"
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-dark"
                }`}
                style={{ cursor: "pointer", width: 35, height: 35 }}
                onClick={() => onChangeAlign("text-left")}
              >
                <FaAlignLeft style={{ fontSize: 15 }} />
              </div>
              <div
                className={`d-flex align-items-center justify-content-center mr-1 rounded ${
                  selectAlign === "text-center"
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-dark"
                }`}
                style={{ cursor: "pointer", width: 35, height: 35 }}
                onClick={() => onChangeAlign("text-center")}
              >
                <FaAlignCenter style={{ fontSize: 15 }} />
              </div>
              <div
                className={`d-flex align-items-center justify-content-center mr-1 rounded ${
                  selectAlign === "text-right"
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-dark"
                }`}
                style={{ cursor: "pointer", width: 35, height: 35 }}
                onClick={() => onChangeAlign("text-right")}
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

      <ReactQuill
        modules={{
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }],
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
          "color",
          "clean",
        ]}
        theme="snow"
        value={editorHtml}
        onChange={handleEditorChange}
        className="text-editor rounded"
      />
    </div>
  );
};

export default ContentTab;
