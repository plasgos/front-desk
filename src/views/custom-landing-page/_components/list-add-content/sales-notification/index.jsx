import {
  CButton,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useEffect, useState } from "react";

import { createUniqueID } from "../../../../../lib/unique-id";
import SelectVariant from "../../common/SelectVariant";
import UpdateDesign from "./UpdateDesign";
import { waitingPopupOptions } from "../popup";
import SelectOptions from "../../common/SelectOptions";
import VariableUpdate from "./VariableUpdate";

const shownOnWhenOptions = [
  { value: "immediately", label: "Langsung" },
  { value: "waitAfter", label: "Tunggu Setelah" },
];

const waitingHiddenOptions = [
  { value: undefined, label: "Tidak Ada" },
  { value: 3, label: "3 detik" },
  { value: 5, label: "5 detik" },
  { value: 10, label: "10 detik" },
  { value: 15, label: "15 detik" },
  { value: 20, label: "20 detik" },
  { value: 30, label: "30 detik" },
];

const optionVariant = [
  {
    group: "Variant",
    options: [
      { id: "1", value: "simple", label: "Simple" },
      { id: "2", value: "mini", label: "Mini" },
    ],
  },
];

const flattenedOptions = optionVariant.flatMap((group) =>
  group.options.map((option) => ({
    ...option,
    group: group.group,
  }))
);

//styles template

const commonStyle = {
  bgColor: "#ffffff",
  titleColor: "#000000",
  position: "bottom-right",
  imageSize: "74px",
  rounded: "tw-rounded-md",
  shadow: "tw-shadow",
  linkTo: undefined,
  isProductNameShown: false,
  isProductPriceShown: false,
  isTimeShown: false,
};

const SalesNotification = ({
  previewFloatingSection,
  setPreviewFloatingSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
}) => {
  const [isSelectVariant, setIsSelectVariant] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    flattenedOptions.find(
      (option) => option.id === currentSection?.variant?.id
    ) || flattenedOptions[1]
  );
  const [setting, setSetting] = useState({});
  const [currentVariant, setCurrentVariant] = useState({});
  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});

  const [shownOnWhen, setShownOnWhen] = useState(shownOnWhenOptions[0]);

  const [waitingPopup, setWaitingPopup] = useState(waitingPopupOptions[0]);

  const [hiddenOption, setHiddenOption] = useState(waitingHiddenOptions[0]);

  const contentIdToCheck = isEditingSection ? currentSection.id : setting.id;

  useEffect(() => {
    const currentShownOnWhen = shownOnWhenOptions.find(
      (opt) => opt.value === currentSection?.shownOnWhen?.value
    );
    if (currentShownOnWhen) {
      setShownOnWhen(currentShownOnWhen);
    }
  }, [currentSection]);

  useEffect(() => {
    const section = previewFloatingSection.find(
      (section) => section.id === setting.id
    );

    if (section) {
      setSelectedCurrentSection(section);
    }
  }, [previewFloatingSection, setting.id]);

  const handleChangeValue = (key, value) => {
    setPreviewFloatingSection((arr) =>
      arr.map((section) =>
        section.id === contentIdToCheck
          ? {
              ...section,
              [key]: value,
            }
          : section
      )
    );
  };

  const handleChangeWaitingPopup = (value) => {
    setPreviewFloatingSection((arr) =>
      arr.map((section) =>
        section.id === contentIdToCheck
          ? {
              ...section,
              shownOnWhen: {
                ...section.shownOnWhen,
                waitTime: value,
              },
            }
          : section
      )
    );
  };

  const handleHiddenPopup = (value) => {
    setPreviewFloatingSection((arr) =>
      arr.map((section) =>
        section.id === contentIdToCheck
          ? {
              ...section,
              hidden: value,
            }
          : section
      )
    );
  };

  const handleChangeShownOnWhen = (value) => {
    if (value === "waitAfter") {
      setPreviewFloatingSection((arr) =>
        arr.map((section) =>
          section.id === contentIdToCheck
            ? {
                ...section,
                shownOnWhen: {
                  ...section.shownOnWhen,
                  value: value,
                  isShown: false,
                  waitTime: waitingPopup.value,
                },
              }
            : section
        )
      );
    }

    setPreviewFloatingSection((arr) =>
      arr.map((section) =>
        section.id === contentIdToCheck
          ? {
              ...section,
              shownOnWhen: {
                ...section.shownOnWhen,
                value: value,
                isShown: true,
              },
            }
          : section
      )
    );
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewFloatingSection);
    let payload = {
      id: uniqueId,
      name: "sales-notification",
      title: "Sales Notification",
      content: {
        title: "John di Jakarta , Indonesia baru saja membeli produk ini",
      },
      shownOnWhen: {
        value: "immediately",
        isShown: true,
      },
      isPopupShown: true,
      hidden: undefined,
      variant: {
        id: "2",
        group: "Variant",
        value: "mini",
        style: {
          ...commonStyle,
        },
      },
      typeVariable: "custom",
      isRandomList: false,
      variable: [
        {
          id: createUniqueID([]),
          name: "boy",
          location: "Jakarta , Indonesia",
          time: "14 : 00",
        },
      ],
    };

    setPreviewFloatingSection((prevSections) => [...prevSections, payload]);
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const openVariants = () => {
    setIsSelectVariant(true);
    setCurrentVariant(selectedVariant);
  };

  const styleMap = {
    1: commonStyle,
    2: commonStyle,
  };

  const handleVariantChange = (group, option) => {
    const style = styleMap[option.id] || {};

    setSelectedVariant({ ...option, group });
    setPreviewFloatingSection((arr) =>
      arr.map((item) => {
        const contentIdToCheck = isEditingSection
          ? currentSection.id
          : setting.id;
        return String(item.id) === contentIdToCheck
          ? {
              ...item,
              variant: {
                ...item.variant,
                group,
                id: option.id,
                value: option.value,
                style: {
                  ...item.variant.style,
                  ...style,
                },
              },
            }
          : item;
      })
    );

    if (!isEditingSection) {
      setSelectedCurrentSection((prev) => ({
        ...prev,
        variant: {
          ...prev.variant,
          group,
          id: option.id,
          value: option.value,
          style: {
            ...prev.variant.style,
            ...style,
          },
        },
      }));
    }
  };

  const handleCancel = () => {
    if (isSelectVariant) {
      setSelectedVariant(currentVariant);

      const style = styleMap[currentVariant.id] || {};

      setIsSelectVariant(false);
      setPreviewFloatingSection((arr) =>
        arr.map((item) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          return String(item.id) === contentIdToCheck
            ? {
                ...item,
                variant: {
                  ...currentVariant,
                  style: {
                    ...item.variant.style,
                    ...style,
                  },
                },
              }
            : item;
        })
      );
    } else if (isEditingSection) {
      isShowContent(false);
      setPreviewFloatingSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
      setPreviewFloatingSection((prevSections) =>
        prevSections.filter((section) => {
          return section.id !== setting.id;
        })
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
      <CRow>
        <CCol>
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

            {isSelectVariant ? (
              <SelectVariant
                optionVariant={optionVariant}
                selectedVariant={selectedVariant}
                onChangeVariant={handleVariantChange}
              />
            ) : (
              <CTabs activeTab="design">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="design">Desain</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="condition">Kondisi</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="variable">Variabel</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent
                  style={{ height: 320, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <CTabPane className="p-1" data-tab="design">
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

                    <UpdateDesign
                      setPreviewSection={setPreviewFloatingSection}
                      currentSection={
                        isEditingSection
                          ? currentSection
                          : selectedCurrentSection
                      }
                    />
                  </CTabPane>

                  <CTabPane className="p-1" data-tab="condition">
                    <div
                      style={{ gap: 10 }}
                      className="d-flex align-items-center"
                    >
                      <SelectOptions
                        label="Perlihatkan Ketika"
                        options={shownOnWhenOptions}
                        value={shownOnWhen}
                        onChange={(selectedOption) => {
                          setShownOnWhen(selectedOption);
                          handleChangeShownOnWhen(selectedOption.value);
                        }}
                      />

                      {shownOnWhen.value === "waitAfter" && (
                        <SelectOptions
                          label="Menunggu Selama"
                          options={waitingPopupOptions}
                          value={waitingPopup}
                          onChange={(selectedOption) => {
                            setWaitingPopup(selectedOption);
                            handleChangeWaitingPopup(selectedOption.value);
                          }}
                        />
                      )}
                    </div>

                    <SelectOptions
                      label="Sembunyikan Dalam"
                      options={waitingHiddenOptions}
                      value={hiddenOption}
                      onChange={(selectedOption) => {
                        setHiddenOption(selectedOption);
                        handleHiddenPopup(selectedOption.value);
                      }}
                    />

                    <CButton
                      onClick={() => handleChangeValue("isPopupShown", true)}
                      color="primary"
                      variant="outline"
                      size="md"
                    >
                      Perlihatkan
                    </CButton>
                  </CTabPane>

                  <CTabPane className="p-1" data-tab="variable">
                    <VariableUpdate
                      setPreviewSection={setPreviewFloatingSection}
                      currentSection={
                        isEditingSection
                          ? currentSection
                          : selectedCurrentSection
                      }
                    />
                  </CTabPane>
                </CTabContent>
              </CTabs>
            )}
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default SalesNotification;
