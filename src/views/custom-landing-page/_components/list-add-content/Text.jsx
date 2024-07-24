import React, { useEffect, useState } from "react";
import {
  CButton,
  CCol,
  CFormGroup,
  CLabel,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import ReactQuill from "react-quill";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
} from "react-icons/fa6";
import "react-quill/dist/quill.snow.css";
import "react-slideshow-image/dist/styles.css";
import { ChromePicker } from "react-color";
import { createUniqueID } from "../../../../lib/unique-id";
import { MdTextFields } from "react-icons/md";

const Text = ({
  previewSection,
  setPreviewSection,
  setSections,
  isShowContent,
  toggleAddContent,
}) => {
  const [editorHtml, setEditorHtml] = useState("Type your text here");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectAlign, setSelectAlign] = useState("text-center");
  const [selectedColor, setSelectedColor] = useState("#000000");

  const [settingText, setSettingText] = useState({});

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(settingText.id)
          ? {
              ...item,
              content: {
                ...item.content,
                style: {
                  ...item.content.style,
                  color,
                },
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
        String(item.id) === String(settingText.id)
          ? {
              ...item,
              content: {
                ...item.content,
                style: {
                  ...item.content.style,
                  textAlign: value,
                },
              },
            }
          : item
      )
    );
  };

  const handleEditorChange = (html) => {
    setEditorHtml(html);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(settingText.id)
          ? {
              ...item,
              content: {
                ...item.content,
                editorHtml: html,
              },
            }
          : item
      )
    );
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "text",
      icon: <MdTextFields size={24} />,
      content: {
        editorHtml,
        style: {
          textAlign: selectAlign,
        },
      },
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);
    setSettingText(payload);
  };

  useEffect(() => {
    handleAddContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const popover = {
    position: "absolute",
    zIndex: "2",
    right: 0,
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  const handelCancel = () => {
    toggleAddContent("");
    isShowContent(false);
    setPreviewSection((prevSections) =>
      prevSections.filter((section) => section.id !== settingText.id)
    );
  };

  const handelConfirm = () => {
    toggleAddContent("");
    isShowContent(false);
    setSections(previewSection);
  };

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center border-bottom p-2">
        <div>
          <CButton
            onClick={handelCancel}
            color="primary"
            variant="outline"
            className="mx-2"
          >
            Batal
          </CButton>

          <CButton onClick={handelConfirm} color="primary">
            Selesai
          </CButton>
        </div>
      </div>

      <CTabs activeTab="konten">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="konten">Konten</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent
          style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
          className="pt-3"
        >
          <CTabPane data-tab="konten">
            <div>
              <CRow className="p-2 mb-2">
                <CCol>
                  <CFormGroup>
                    <CLabel className="mb-0">Posisi Teks</CLabel>
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
                      <div
                        className={`d-flex align-items-center justify-content-center mr-1 rounded ${
                          selectAlign === "text-justify"
                            ? "bg-primary border-primary text-white"
                            : "bg-white border-dark"
                        }`}
                        style={{ cursor: "pointer", width: 35, height: 35 }}
                        onClick={() => onChangeAlign("text-justify")}
                      >
                        <FaAlignJustify style={{ fontSize: 15 }} />
                      </div>
                    </div>
                  </CFormGroup>
                </CCol>
                <CCol>
                  <CFormGroup>
                    <CLabel className="mb-0" style={{ fontFamily: "Arial" }}>
                      Warna Teks
                    </CLabel>
                    <div
                      onClick={() => setShowColorPicker(!showColorPicker)}
                      style={{
                        width: 35,
                        height: 35,
                        backgroundColor: selectedColor,
                        cursor: "pointer",
                      }}
                      className="rounded border"
                    />
                    {showColorPicker && (
                      <div style={popover}>
                        <div
                          style={cover}
                          onClick={() => setShowColorPicker(false)}
                        />
                        <ChromePicker
                          color={selectedColor}
                          onChange={(e) => handleColorChange(e.hex)}
                        />
                      </div>
                    )}
                  </CFormGroup>
                </CCol>
              </CRow>
              <ReactQuill
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image"],
                    ["clean"],
                  ],
                  clipboard: {
                    // toggle to add extra line breaks when pasting HTML:
                    matchVisual: true,
                  },
                }}
                formats={[
                  "header",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "indent",
                  "link",
                  "image",
                  "clean",
                ]}
                theme="snow"
                value={editorHtml}
                onChange={handleEditorChange}
                className="text-editor rounded"
              />
            </div>
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
};

export default Text;
