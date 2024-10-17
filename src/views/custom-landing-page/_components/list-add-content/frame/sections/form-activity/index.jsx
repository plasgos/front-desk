import {
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useEffect, useState } from "react";

import UpdateContent from "./UpdateContent";
import UpdateTitle from "./UpdateTitle";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import SelectVariant from "../../../../common/SelectVariant";
import BackgroundTabFrame from "../../common/BackgroundTabFrame";
import { addNewSection } from "../../helper/addNewSection";
import { cancelNewSection } from "../../helper/cancelNewSection";

const optionVariant = [
  {
    group: "Variant",
    options: [
      { id: "1", value: "basic", label: "Basic" },
      { id: "2", value: "oval", label: "Oval" },
      { id: "3", value: "frame", label: "Frame" },
    ],
  },
];

const flattenedOptions = optionVariant.flatMap((group) =>
  group.options.map((option) => ({
    ...option,
    group: group.group,
  }))
);

const FormActivity = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  sectionId,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(
    flattenedOptions.find(
      (option) => option.id === currentSection?.variant?.id
    ) || flattenedOptions[0]
  );
  const [currentVariant, setCurrentVariant] = useState({});
  console.log("🚀 ~ currentVariant:", currentVariant);
  const [isSelectVariant, setIsSelectVariant] = useState(false);
  const [setting, setSetting] = useState({});
  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});

  useEffect(() => {
    if (!isEditingSection) {
      let section = previewSection.find((section) => section.id === sectionId);

      if (section) {
        let sectionFrame = section.content.find(
          (sectionItem) => sectionItem.id === setting.id
        );

        if (sectionFrame) {
          setSelectedCurrentSection(sectionFrame);
        }
      }
    }
  }, [previewSection, setting.id, isEditingSection, sectionId]);

  const contentIdToCheck = isEditingSection ? currentSection.id : setting.id;

  const handleVariantChange = (group, option) => {
    setSelectedVariant({ ...option, group });

    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((sectionFrame) =>
                sectionFrame.id === contentIdToCheck
                  ? {
                      ...sectionFrame,
                      variant: option.value,
                    }
                  : sectionFrame
              ),
            }
          : section
      )
    );

    if (!isEditingSection) {
      setSelectedCurrentSection((prev) => ({
        ...prev,
        variant: option.value,
      }));
    }
  };

  const openVariants = () => {
    setIsSelectVariant(true);
    setCurrentVariant(selectedVariant);
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "form-activity",
      title: "Formulir Kegiatan",
      content: {
        typeForm: "subcribe-newsletter",
        textBtn: "Daftar",
        placeholder: "Masukan alamat email kamu di sini",
        btnColor: "#2196F3",
      },
      titleHeader: {
        textColor: "#000000",
        textAlign: "tw-text-center",
        textShadow: undefined,
        fontSize: "tw-text-base",
        text: "<h2>Ayo Daftar Sekarang !</h2><p>Jangan Sampai Ketinggalan</p>",
      },
      collected: {
        textColor: "#000000",
        textAlign: "tw-text-center",
        textShadow: undefined,
        fontSize: "tw-text-base",
        text: "<p>Terima kasih telah mengisi formulir kami</p>",
        isCollected: false,
      },
      variant: "basic",
      background: {
        bgType: undefined,
        bgColor: "",
        bgImage: "",
        blur: 0,
        opacity: 0,
        paddingY: 60,
        paddingTop: 0,
        paddingBottom: 0,
        paddingType: "equal",
      },
    };

    addNewSection(setPreviewSection, sectionId, payload);

    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const handleCancel = () => {
    if (isSelectVariant) {
      setSelectedVariant(currentVariant);
      setIsSelectVariant(false);

      setPreviewSection((arr) =>
        arr.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                content: section.content.map((sectionFrame) =>
                  sectionFrame.id === contentIdToCheck
                    ? {
                        ...sectionFrame,
                        variant: currentVariant.value,
                      }
                    : sectionFrame
                ),
              }
            : section
        )
      );
    } else if (isEditingSection) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
      cancelNewSection(setPreviewSection, sectionId, setting.id);
    }
  };

  const handleConfirm = () => {
    if (isSelectVariant) {
      setIsSelectVariant(false);
    } else {
      isShowContent(false);
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

      {isSelectVariant ? (
        <SelectVariant
          optionVariant={optionVariant}
          selectedVariant={selectedVariant}
          onChangeVariant={handleVariantChange}
        />
      ) : (
        <CTabs activeTab="content">
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink data-tab="content">Konten</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="title">Judul</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="collected">Terkumpul</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="background">Background</CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent
            style={{
              height: 340,
              paddingRight: 5,
              overflowY: "auto",
              overflowX: "hidden",
            }}
            className="pt-3"
          >
            <CTabPane className="p-1" data-tab="content">
              <div
                style={{
                  boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.1)",
                }}
                className="mb-3 border-bottom pb-3"
              >
                <div style={{ fontSize: 12 }} className="mb-2">
                  Desain
                </div>
                <div className="d-flex align-items-center">
                  <div className="mr-3">
                    {selectedVariant.group} - {selectedVariant.label}
                  </div>
                  <CButton onClick={openVariants} color="primary">
                    Ubah
                  </CButton>
                </div>
              </div>

              <UpdateContent
                sectionId={sectionId}
                setPreviewSection={setPreviewSection}
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
              />
            </CTabPane>

            <CTabPane className="p-1" data-tab="title">
              <UpdateTitle
                sectionId={sectionId}
                setPreviewSection={setPreviewSection}
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
                isEditingContent={isEditingSection}
              />
            </CTabPane>

            <CTabPane className="p-1" data-tab="collected">
              <UpdateTitle
                sectionId={sectionId}
                setPreviewSection={setPreviewSection}
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
                isEditingContent={isEditingSection}
                isCollectedTab={true}
              />
            </CTabPane>

            <CTabPane
              style={{ overflowX: "hidden", height: "100%" }}
              className="p-1"
              data-tab="background"
            >
              <BackgroundTabFrame
                sectionId={sectionId}
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
                setPreviewSection={setPreviewSection}
                type={isEditingSection ? "edit" : "add"}
              />
            </CTabPane>
          </CTabContent>
        </CTabs>
      )}
    </div>
  );
};

export default FormActivity;
