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
import { createUniqueID } from "../../../../../lib/unique-id";
import BackgroundTab from "../../common/BackgroundTab";

import SelectVariant from "../../common/SelectVariant";
import UpdateContent from "./UpdateContent";
import UpdateTitle from "./UpdateTitle";
import Confirmation from "../../common/Confirmation";

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
    const section = previewSection.find((section) => section.id === setting.id);

    if (section) {
      setSelectedCurrentSection(section);
    }
  }, [previewSection, setting.id]);

  const handleVariantChange = (group, option) => {
    setSelectedVariant({ ...option, group });
    setPreviewSection((arr) =>
      arr.map((item) => {
        const contentIdToCheck = isEditingSection
          ? currentSection.id
          : setting.id;
        return String(item.id) === contentIdToCheck
          ? {
              ...item,
              variant: option.value,
            }
          : item;
      })
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

    setPreviewSection((prevSections) => [...prevSections, payload]);
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
        arr.map((item) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;
          return String(item.id) === contentIdToCheck
            ? {
                ...item,
                variant: currentVariant.value,
              }
            : item;
        })
      );
    } else if (isEditingSection) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
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
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

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
            style={{ overflowY: "auto", height: "calc(100vh - 139px)" }}
            className="p-3"
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
                setPreviewSection={setPreviewSection}
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
              />
            </CTabPane>

            <CTabPane className="p-1" data-tab="title">
              <UpdateTitle
                setPreviewSection={setPreviewSection}
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
                isEditingContent={isEditingSection}
              />
            </CTabPane>

            <CTabPane className="p-1" data-tab="collected">
              <UpdateTitle
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
              <BackgroundTab
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
