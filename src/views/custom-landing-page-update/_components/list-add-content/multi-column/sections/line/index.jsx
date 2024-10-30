import { CButton, CCard, CTabContent } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import StripeLineControl from "./StripeLineControl";
import BasicLineControl from "./BasicLineControl";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import { addSectionMultiColumn } from "../../helper/addSectionMultiColumn";
import { useDispatch, useSelector } from "react-redux";
import { cancelSectionMultiColumn } from "../../helper/cancelSectionMultiColumn";
import {
  setIsAddColumnSection,
  setIsEditingColumnSection,
  setIsEditingSection,
} from "../../../../../../../redux/modules/custom-landing-page/reducer";

const Line = ({
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

  const [variantLine, setVariantLine] = useState(
    isEditingSection ? currentSection.content?.variant : "Stripe - Barber"
  );
  const [isEditDesign, setIsEditDesign] = useState(false);
  const [designBeforeEdit, setDesignBeforeEdit] = useState("");
  const [setting, setSetting] = useState({});

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "line",
      title: "Garis",
      content: {
        height: 10,
        width1: 40,
        width2: 20,
        distance: 10,
        isFlip: false,
        isFloating: false,
        color1: "#F44336",
        color2: "#2196F3",
        variant: variantLine,
        heightBasicLine: 20,
        colorBasicLine: "#FFCC80",
      },
    };

    addSectionMultiColumn(setPreviewSection, sectionId, columnId, payload);
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const handleCancel = () => {
    if (isEditingSection) {
      dispatch(setIsEditingSection(false));
      setPreviewSection([...sectionBeforeEdit]);
    } else if (isEditDesign) {
      setIsEditDesign(false);
      setVariantLine(designBeforeEdit);

      const contentIdToCheck = isEditingSection
        ? currentSection.id
        : setting.id;

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
                          const currentVariant = content.content.variant;

                          const prevContent = commonContent(
                            currentVariant === "Basic",
                            designBeforeEdit
                          );

                          return content.id === contentIdToCheck
                            ? {
                                ...content,
                                content: {
                                  ...content.content,
                                  ...prevContent,
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
    } else {
      dispatch(setIsAddColumnSection(false));
      dispatch(setIsEditingColumnSection(false));

      cancelSectionMultiColumn(setPreviewSection, sectionId, columnId, setting);
    }
  };

  const handleConfirm = () => {
    if (isEditDesign) {
      setIsEditDesign(false);
    } else if (isAddColumnSection) {
      dispatch(setIsAddColumnSection(false));
    } else if (isEditingSection) {
      dispatch(setIsEditingSection(false));
    } else {
      dispatch(setIsEditingColumnSection(false));
    }
  };

  const handleEditDesign = () => {
    setIsEditDesign(true);
    setDesignBeforeEdit(variantLine);
  };

  const commonContent = (isBasic, value) => {
    if (isBasic) {
      return {
        variant: value,
        heightBasicLine: 20,
        colorBasicLine: "#FFCC80",
      };
    } else {
      return {
        variant: value,
        height: 10,
        width1: 40,
        width2: 20,
        distance: 10,
        isFlip: false,
        isFloating: false,
        color1: "#F44336",
        color2: "#2196F3",
      };
    }
  };

  const handleChangeDesign = (value) => {
    const updateContent = (item, value, isBasic) => {
      const newContent = commonContent(isBasic, value);

      return {
        ...item,
        content: {
          ...item.content,
          ...newContent,
        },
      };
    };

    const updatePreviewSection = (contentId) => {
      setPreviewSection((arr) =>
        arr.map((section) =>
          String(section.id) === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        content: column.content.map((content) =>
                          content.id === contentId
                            ? updateContent(content, value, value === "Basic")
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

    setVariantLine(value);

    if (isEditingSection) {
      updatePreviewSection(currentSection.id);
    } else {
      updatePreviewSection(setting.id);
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

      <CTabContent
        style={{
          height: 370,
          paddingRight: 5,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {!isEditDesign && (
          <div className="mb-3">
            <div style={{ fontSize: 12 }} className="mt-3">
              Desain
            </div>
            <div className="d-flex align-items-center">
              <div className="mr-2">{variantLine}</div>

              <CButton onClick={handleEditDesign} color="primary">
                Ubah
              </CButton>
            </div>
          </div>
        )}

        {isEditDesign ? (
          <CCard className="my-3 p-2">
            <div style={{ fontSize: 12 }} className="mb-2 italic">
              Variant
            </div>
            <div style={{ gap: 10 }} className="d-flex align-items-center ">
              <CButton
                onClick={() => handleChangeDesign("Basic")}
                color="primary"
                variant={variantLine === "Basic" ? "outline" : "ghost"}
              >
                <div className="d-flex align-items-center">
                  <div>Basic</div>

                  {variantLine === "Basic" && (
                    <FaCheck
                      size={16}
                      color="#13CC48"
                      style={{ marginLeft: 10 }}
                    />
                  )}
                </div>
              </CButton>

              <CButton
                onClick={() => handleChangeDesign("Stripe - Barber")}
                color="primary"
                variant={
                  variantLine === "Stripe - Barber" ? "outline" : "ghost"
                }
              >
                <div className="d-flex align-items-center">
                  <div>Stripe - Barber</div>

                  {variantLine === "Stripe - Barber" && (
                    <FaCheck
                      size={16}
                      color="#13CC48"
                      style={{ marginLeft: 10 }}
                    />
                  )}
                </div>
              </CButton>
            </div>
          </CCard>
        ) : variantLine === "Stripe - Barber" ? (
          <div>
            <StripeLineControl
              sectionId={sectionId}
              columnId={columnId}
              setPreviewSection={setPreviewSection}
              currentSection={isEditingSection ? currentSection : setting}
            />
          </div>
        ) : variantLine === "Basic" ? (
          <BasicLineControl
            sectionId={sectionId}
            columnId={columnId}
            setPreviewSection={setPreviewSection}
            currentSection={isEditingSection ? currentSection : setting}
          />
        ) : null}
      </CTabContent>
    </div>
  );
};

export default Line;
