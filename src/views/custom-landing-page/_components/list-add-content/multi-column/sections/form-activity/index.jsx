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
import BackgroundTabMultiColumnContent from "../../common/BackgroundTabMultiColumnContent";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAddColumnSection,
  setIsEditingColumnSection,
  setIsEditingSection,
} from "../../../../../../../redux/modules/custom-landing-page/reducer";
import { cancelSectionMultiColumn } from "../../helper/cancelSectionMultiColumn";
import { addSectionMultiColumn } from "../../helper/addSectionMultiColumn";

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
  sectionBeforeEdit,
  currentSection,
  sectionId,
  columnId,
}) => {
  const { isEditingSection, isAddColumnSection } = useSelector(
    (state) => state.customLandingPage.multiColumnSection
  );
  const dispatch = useDispatch();

  const [selectedVariant, setSelectedVariant] = useState(
    flattenedOptions.find(
      (option) => option.id === currentSection?.variant?.id
    ) || flattenedOptions[0]
  );

  const [currentVariant, setCurrentVariant] = useState({});
  const [isSelectVariant, setIsSelectVariant] = useState(false);
  const [setting, setSetting] = useState({});
  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});

  useEffect(() => {
    if (!isEditingSection) {
      let section = previewSection.find((section) => section.id === sectionId);
      if (section) {
        let column = section.column.find((col) => col.id === columnId);
        if (column) {
          let content = column.content.find((cnt) => cnt.id === setting?.id);
          if (content) {
            setSelectedCurrentSection(content);
          }
        }
      }
    }
  }, [previewSection, isEditingSection, sectionId, columnId, setting.id]);

  const handleVariantChange = (group, option) => {
    setSelectedVariant({ ...option, group });

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
                        content.id === contentIdToCheck
                          ? {
                              ...content,
                              variant: option.value,
                            }
                          : content
                      ),
                    }
                  : column
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

  const contentIdToCheck = isEditingSection ? currentSection.id : setting.id;

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
    if (isSelectVariant) {
      setSelectedVariant(currentVariant);
      setIsSelectVariant(false);

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
                          content.id === contentIdToCheck
                            ? {
                                ...content,
                                variant: currentVariant.value,
                              }
                            : content
                        ),
                      }
                    : column
                ),
              }
            : section
        )
      );
    } else if (isEditingSection) {
      dispatch(setIsEditingSection(false));
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      dispatch(setIsAddColumnSection(false));
      dispatch(setIsEditingColumnSection(false));
      cancelSectionMultiColumn(setPreviewSection, sectionId, columnId, setting);
    }
  };

  const handleConfirm = () => {
    if (isSelectVariant) {
      setIsSelectVariant(false);
    } else if (isAddColumnSection) {
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
                columnId={columnId}
                setPreviewSection={setPreviewSection}
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
              />
            </CTabPane>

            <CTabPane className="p-1" data-tab="title">
              <UpdateTitle
                sectionId={sectionId}
                columnId={columnId}
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
                columnId={columnId}
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
              <BackgroundTabMultiColumnContent
                sectionId={sectionId}
                columnId={columnId}
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
