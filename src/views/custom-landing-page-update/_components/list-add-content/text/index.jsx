import {
  CButton,
  CFormGroup,
  CLabel,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
} from "react-icons/fa6";
import { useDebounce } from "use-debounce";
import { createUniqueID } from "../../../../../lib/unique-id";
import AnimationControl from "../../common/AnimationControl";
import BackgroundTab from "../../common/BackgroundTab";
import ColorPicker from "../../common/ColorPicker";
import { CustomReactQuill } from "../../common/ReactQuill";
import Confirmation from "../../common/Confirmation";
import NavTabsCustom from "../../common/NavTabsCustom";

const Text = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
}) => {
  const [editorHtml, setEditorHtml] = useState(
    currentSection?.content?.editorHtml || "Type your text here"
  );
  const [selectedColor, setSelectedColor] = useState(
    currentSection?.content?.style?.color || "#000000"
  );

  const [editorHtmlValue] = useDebounce(editorHtml, 300);
  const [selectedColorValue] = useDebounce(selectedColor, 500);

  const [selectAlign, setSelectAlign] = useState(
    currentSection?.content?.style?.textAlign || "tw-text-center"
  );

  const [settingText, setSettingText] = useState({});

  useEffect(() => {
    if (editorHtmlValue) {
      handleEditorChange(editorHtmlValue);
    }

    if (selectedColorValue) {
      handleChangeContentStyle("color", selectedColorValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorHtmlValue, selectedColorValue]);

  const handleChangeContentStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) => {
        const contentIdToCheck = isEditingSection
          ? currentSection.id
          : settingText.id;

        return String(item.id) === contentIdToCheck
          ? {
              ...item,
              content: {
                ...item.content,
                style: {
                  ...item.content.style,
                  [key]: value,
                },
              },
            }
          : item;
      })
    );
  };

  const handleEditorChange = (html) => {
    setPreviewSection((arr) =>
      arr.map((item) => {
        const contentIdToCheck = isEditingSection
          ? currentSection.id
          : settingText.id;

        return String(item.id) === contentIdToCheck
          ? {
              ...item,
              content: {
                ...item.content,
                editorHtml: html,
              },
            }
          : item;
      })
    );
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "text",
      title: "Teks",
      content: {
        editorHtml: "Type your text here",
        style: {
          textAlign: "tw-text-center",
          color: "#000000",
        },
      },
      animation: {
        type: undefined,
        duration: 1,
        isReplay: false,
      },
      background: {
        bgType: undefined,
        bgColor: "",
        bgImage: "",
        blur: 0,
        opacity: 0,
        paddingY: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingType: "equal",
        direction: "to right",
        fromColor: "",
        toColor: "",
        isRevert: false,
        pattern: "",
      },
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);
    setSettingText(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const handleCancel = () => {
    if (isEditingSection) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== settingText.id)
      );
    }
  };

  const handleConfirm = () => {
    isShowContent(false);
  };

  const tabsData = [
    { value: "konten", label: "Konten" },
    { value: "animation", label: "Animasi" },
    { value: "background", label: "Background" },
  ];

  return (
    <div>
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

      <CTabs activeTab="konten">
        <NavTabsCustom tabs={tabsData} />
        <CTabContent style={{ overflowY: "auto" }} className="p-3">
          <CTabPane data-tab="konten">
            <div>
              <div className="d-flex align-items-center justify-content-between">
                <CFormGroup>
                  <CLabel className="mb-2">Posisi Teks</CLabel>
                  <div className="d-flex justify-content-start">
                    <div
                      className={`d-flex align-items-center justify-content-center mr-1 rounded ${
                        selectAlign === "tw-text-left"
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-dark"
                      }`}
                      style={{ cursor: "pointer", width: 35, height: 35 }}
                      data-value="tw-text-left"
                      onClick={({ currentTarget }) => {
                        const value = currentTarget.dataset.value;
                        setSelectAlign(value);
                        handleChangeContentStyle("textAlign", value);
                      }}
                    >
                      <FaAlignLeft style={{ fontSize: 15 }} />
                    </div>
                    <div
                      className={`d-flex align-items-center justify-content-center mr-1 rounded ${
                        selectAlign === "tw-text-center"
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-dark"
                      }`}
                      style={{ cursor: "pointer", width: 35, height: 35 }}
                      data-value="tw-text-center"
                      onClick={({ currentTarget }) => {
                        const value = currentTarget.dataset.value;
                        setSelectAlign(value);
                        handleChangeContentStyle("textAlign", value);
                      }}
                    >
                      <FaAlignCenter style={{ fontSize: 15 }} />
                    </div>
                    <div
                      className={`d-flex align-items-center justify-content-center mr-1 rounded ${
                        selectAlign === "tw-text-right"
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-dark"
                      }`}
                      style={{ cursor: "pointer", width: 35, height: 35 }}
                      data-value="tw-text-right"
                      onClick={({ currentTarget }) => {
                        const value = currentTarget.dataset.value;
                        setSelectAlign(value);
                        handleChangeContentStyle("textAlign", value);
                      }}
                    >
                      <FaAlignRight style={{ fontSize: 15 }} />
                    </div>
                    <div
                      className={`d-flex align-items-center justify-content-center mr-1 rounded ${
                        selectAlign === "tw-text-justify"
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-dark"
                      }`}
                      style={{ cursor: "pointer", width: 35, height: 35 }}
                      data-value="tw-text-justify"
                      onClick={({ currentTarget }) => {
                        const value = currentTarget.dataset.value;
                        setSelectAlign(value);
                        handleChangeContentStyle("textAlign", value);
                      }}
                    >
                      <FaAlignJustify style={{ fontSize: 15 }} />
                    </div>
                  </div>
                </CFormGroup>
                <ColorPicker
                  initialColor={selectedColor}
                  label="Warna Teks"
                  onChange={(color) => {
                    setSelectedColor(color);
                  }}
                  flexEnd="justify-content-end"
                />
              </div>

              <CustomReactQuill
                value={editorHtml}
                onChange={(html) => setEditorHtml(html)}
                version="full"
              />
            </div>
          </CTabPane>

          <CTabPane
            style={{ height: "80vh" }}
            className="p-1"
            data-tab="animation"
          >
            <AnimationControl
              label="Teks"
              currentSection={isEditingSection ? currentSection : settingText}
              setPreviewSection={setPreviewSection}
            />
          </CTabPane>

          <CTabPane
            style={{ overflowX: "hidden", height: "100%" }}
            className="p-1"
            data-tab="background"
          >
            <BackgroundTab
              currentSection={isEditingSection ? currentSection : settingText}
              setPreviewSection={setPreviewSection}
              type={isEditingSection ? "edit" : "add"}
            />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
};

export default Text;
