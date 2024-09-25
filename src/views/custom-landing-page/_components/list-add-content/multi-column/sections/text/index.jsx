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
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import {
  setIsAddColumnSection,
  setIsEditingColumnSection,
  setIsEditingSection,
} from "../../../../../../../redux/modules/custom-landing-page/reducer";
import ColorPicker from "../../../../common/ColorPicker";
import { CustomReactQuill } from "../../../../common/ReactQuill";
import AnimationControlMultiColumn from "../../common/AnimationControlMultiColumn";
import BackgroundTabMultiColumnContent from "../../common/BackgroundTabMultiColumnContent";

const Text = ({
  previewSection,
  setPreviewSection,
  sectionBeforeEdit,
  currentSection,
  sectionId,
  columnId,
}) => {
  const { isEditingSection, isAddColumnSection } = useSelector(
    (state) => state.customLandingPage.multiColumnSection
  );

  const dispatch = useDispatch();

  const [editorHtml, setEditorHtml] = useState(
    currentSection?.content?.editorHtml || "Type your text here"
  );
  const [selectedColor, setSelectedColor] = useState(
    currentSection?.content?.style?.color || "#000000"
  );

  const [editorHtmlValue] = useDebounce(editorHtml, 1000);
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
      arr.map((section) => {
        return String(section.id) === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) => {
                        const contentIdToCheck = isEditingSection
                          ? currentSection.id
                          : settingText.id;

                        return content.id === contentIdToCheck
                          ? {
                              ...content,
                              content: {
                                ...content.content,
                                style: {
                                  ...content.content.style,
                                  [key]: value,
                                },
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

  const handleEditorChange = () => {
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
                        const contentIdToCheck = isEditingSection
                          ? currentSection.id
                          : settingText.id;
                        return content.id === contentIdToCheck
                          ? {
                              ...content,
                              content: {
                                ...content.content,
                                editorHtml,
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

  const addContentMultiColumn = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "text",
      title: "Teks",
      content: {
        editorHtml,
        style: {
          textAlign: selectAlign,
          color: selectedColor,
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
      },
    };
    setPreviewSection((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          const updatedColumns = section.column.map((column) => {
            if (column.id === columnId) {
              return {
                ...column,
                content: [...column.content, payload],
              };
            }
            return column;
          });

          return {
            ...section,
            column: updatedColumns,
          };
        }

        return section;
      })
    );
    setSettingText(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      addContentMultiColumn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const handleCancel = () => {
    if (isEditingSection) {
      setPreviewSection([...sectionBeforeEdit]);
      dispatch(setIsEditingSection(false));
    } else {
      dispatch(setIsAddColumnSection(false));
      dispatch(setIsEditingColumnSection(false));
      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        content: column.content.filter(
                          (content) => content.id !== settingText.id
                        ),
                      }
                    : column
                ),
              }
            : section
        )
      );
    }
  };

  const handleConfirm = () => {
    if (isAddColumnSection) {
      dispatch(setIsAddColumnSection(false));
    } else if (isEditingSection) {
      dispatch(setIsEditingSection(false));
    } else {
      dispatch(setIsEditingColumnSection(false));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center border-bottom p-2">
        <div>
          <CButton
            onClick={handleCancel}
            color="primary"
            variant="outline"
            className="mx-2"
          >
            Batal
          </CButton>

          <CButton onClick={handleConfirm} color="primary">
            Selesai
          </CButton>
        </div>
      </div>

      <CTabs activeTab="konten">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="konten">Konten</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="animation">Animasi</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="background">Background</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent
          style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
        >
          <CTabPane className="my-2 pb-5" data-tab="konten">
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
                  bottom={"77px"}
                  left={"236px"}
                />
              </div>

              <CustomReactQuill
                value={editorHtml}
                onChange={(html) => setEditorHtml(html)}
                version="full"
              />
            </div>
          </CTabPane>

          <CTabPane className="p-1" data-tab="animation">
            <AnimationControlMultiColumn
              label="Teks"
              currentSection={isEditingSection ? currentSection : settingText}
              setPreviewSection={setPreviewSection}
              sectionId={sectionId}
              columnId={columnId}
            />
          </CTabPane>

          <CTabPane
            style={{ overflowX: "hidden", height: "100%" }}
            className="p-1"
            data-tab="background"
          >
            <BackgroundTabMultiColumnContent
              currentSection={isEditingSection ? currentSection : settingText}
              setPreviewSection={setPreviewSection}
              type={isEditingSection ? "edit" : "add"}
              sectionId={sectionId}
              columnId={columnId}
            />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
};

export default Text;
