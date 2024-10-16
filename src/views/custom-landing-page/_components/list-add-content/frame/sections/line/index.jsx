import { CButton, CCard, CTabContent } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import StripeLineControl from "./StripeLineControl";
import BasicLineControl from "./BasicLineControl";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import { addNewSection } from "../../helper/addNewSection";
import { cancelNewSection } from "../../helper/cancelNewSection";

const Line = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditing = false,
  sectionBeforeEdit,
  currentSection,
  sectionId,
}) => {
  const [variantLine, setVariantLine] = useState(
    isEditing ? currentSection.content?.variant : "Stripe - Barber"
  );
  const [isEditDesign, setIsEditDesign] = useState(false);
  const [designBeforeEdit, setDesignBeforeEdit] = useState("");
  const [setting, setSetting] = useState({});

  const contentIdToCheck = isEditing ? currentSection.id : setting.id;

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

    addNewSection(setPreviewSection, sectionId, payload);

    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditing) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  const handleCancel = () => {
    if (isEditing) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else if (isEditDesign) {
      setIsEditDesign(false);
      setVariantLine(designBeforeEdit);

      setPreviewSection((arr) =>
        arr.map((section) => {
          const currentVariant = section.content.variant;

          const prevContent = commonContent(
            currentVariant === "Basic",
            designBeforeEdit
          );

          return String(section.id) === sectionId
            ? {
                ...section,
                content: section.content.map((sectionFrame) =>
                  sectionFrame.id === contentIdToCheck
                    ? {
                        ...sectionFrame,
                        content: {
                          ...sectionFrame.content,
                          ...prevContent,
                        },
                      }
                    : sectionFrame
                ),
              }
            : section;
        })
      );
    } else {
      isShowContent(false);
      cancelNewSection(setPreviewSection, sectionId, setting.id);
    }
  };

  const handleConfirm = () => {
    if (isEditDesign) {
      setIsEditDesign(false);
    } else {
      isShowContent(false);
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

    const updatePreviewSection = (sectionFrameId) => {
      setPreviewSection((arr) =>
        arr.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                content: section.content.map((sectionFrame) =>
                  sectionFrame.id === sectionFrameId
                    ? updateContent(sectionFrame, value, value === "Basic")
                    : sectionFrame
                ),
              }
            : section
        )
      );
    };

    setVariantLine(value);

    if (isEditing) {
      updatePreviewSection(currentSection.id);
    } else {
      updatePreviewSection(setting.id);
    }
  };

  return (
    <div style={{ height: 400 }}>
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
              setPreviewSection={setPreviewSection}
              currentSection={isEditing ? currentSection : setting}
            />
          </div>
        ) : variantLine === "Basic" ? (
          <BasicLineControl
            sectionId={sectionId}
            setPreviewSection={setPreviewSection}
            currentSection={isEditing ? currentSection : setting}
          />
        ) : null}
      </CTabContent>
    </div>
  );
};

export default Line;
