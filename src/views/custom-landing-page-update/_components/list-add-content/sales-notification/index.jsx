import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";

import { createUniqueID } from "../../../../../lib/unique-id";
import SelectVariant from "../../common/SelectVariant";
import UpdateDesign from "./UpdateDesign";
import { waitingPopupOptions } from "../popup";
import SelectOptions from "../../common/SelectOptions";
import VariableUpdate from "./VariableUpdate";
import { DraggableList } from "../../common/DraggableList";
import { useRemoveSection } from "../../../../../hooks/useRemoveSection";
import { useMoveSection } from "../../../../../hooks/useMoveSection";
import { IoAdd } from "react-icons/io5";
import image from "../../../../../assets/profile.jpg";
import { UpdateContent } from "./UpdateContent";

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

const nextAfterOptions = [
  { value: undefined, label: "Tidak Ada" },
  { value: 3, label: "3 detik" },
  { value: 5, label: "5 detik" },
  { value: 10, label: "10 detik" },
  { value: 15, label: "15 detik" },
  { value: 20, label: "20 detik" },
  { value: 30, label: "30 detik" },
  { value: 45, label: "45 detik" },
  { value: 60, label: "60 detik" },
  { value: 90, label: "90 detik" },
  { value: 120, label: "120 detik" },
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
  productColor: "#000000",
  priceColor: "#FF8510",
  timeColor: "#C1C1C1",
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
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [currentContentBeforeEdit, setCurrentContentBeforeEdit] = useState([]);
  const [selectedContent, setSelectedContent] = useState({});

  const [setting, setSetting] = useState({});
  const [currentVariant, setCurrentVariant] = useState({});
  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});
  const [activeTab, setActiveTab] = useState("design");

  const [shownOnWhen, setShownOnWhen] = useState(shownOnWhenOptions[0]);

  const [waitingPopup, setWaitingPopup] = useState(waitingPopupOptions[2]);

  const [hiddenOption, setHiddenOption] = useState(waitingHiddenOptions[0]);

  const [nextAfter, setNextAfter] = useState(nextAfterOptions[0]);

  const contentIdToCheck = isEditingSection ? currentSection.id : setting.id;

  useEffect(() => {
    const currentShownOnWhen = shownOnWhenOptions.find(
      (opt) => opt.value === currentSection?.shownOnWhen?.value
    );
    if (currentShownOnWhen) {
      setShownOnWhen(currentShownOnWhen);
    }

    const currentHidden = waitingHiddenOptions.find(
      (opt) => opt.value === currentSection?.hidden
    );
    if (currentHidden) {
      setHiddenOption(currentHidden);
    }

    const currentNextAfter = nextAfterOptions.find(
      (opt) => opt.value === currentSection?.nextAfter
    );
    if (currentNextAfter) {
      setNextAfter(currentNextAfter);
    }

    const currentWaitingPopup = waitingPopupOptions.find(
      (opt) => opt.value === currentSection?.shownOnWhen?.waitTime
    );
    if (currentWaitingPopup) {
      setWaitingPopup(currentWaitingPopup);
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

  const handleCondition = (key, value) => {
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
    } else {
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
    }
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewFloatingSection);
    let payload = {
      id: uniqueId,
      name: "sales-notification",
      title: "Sales Notification",
      content: [
        {
          id: createUniqueID([]),
          name: "boy",
          location: "Jakarta , Indonesia",
          time: "14:00",
          image: image,
          productName: "Baju",
          price: 100000,
        },
        {
          id: createUniqueID([]),
          name: "john",
          location: "Jakarta , Indonesia",
          time: "14:10",
          image: image,
          productName: "Celana",
          price: 100000,
        },
      ],
      shownOnWhen: {
        value: "immediately",
        isShown: true,
      },
      isPopupShown: true,
      hidden: undefined,
      nextAfter: undefined,
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
    } else if (isAddContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
      setPreviewFloatingSection((prevSections) =>
        prevSections.map((section) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          return section.id === contentIdToCheck
            ? {
                ...section,
                content: section.content.slice(0, -1),
              }
            : section;
        })
      );
      setActiveTab("variable");
    } else if (isEditingContent) {
      setPreviewFloatingSection([...currentContentBeforeEdit]);
      setIsAddContent(false);
      setIsEditingContent(false);
      setActiveTab("variable");
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
      setActiveTab("design");
    } else if (isAddContent || isEditingContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
      setActiveTab("variable");
    } else {
      isShowContent(false);
    }
  };

  const editSection = useCallback(
    (section) => {
      setCurrentContentBeforeEdit([...previewFloatingSection]);
      setSelectedContent(section);
      setIsEditingContent(true);
    },
    [previewFloatingSection]
  );

  const removeSection = useRemoveSection(setPreviewFloatingSection);
  const moveSection = useMoveSection(setPreviewFloatingSection);

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.content.map((contentItem, contentIndex) => (
            <DraggableList
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              showInfoText={`${contentItem?.name} - ${contentItem?.location}`}
              showThumbnail={contentItem.image}
              moveSection={(dragIndex, hoverIndex) =>
                moveSection(section.id, dragIndex, hoverIndex)
              }
              editSection={() => editSection(contentItem)}
              removeSection={() => removeSection(section.id, contentIndex)}
              hiddenFocus={true}
            />
          ))}
        </div>
      );
    },
    [moveSection, editSection, removeSection]
  );

  return (
    <div>
      <CRow>
        <CCol>
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
            ) : isAddContent ? (
              <CTabs>
                <CTabContent style={{ overflowY: "auto" }} className="pt-3">
                  <UpdateContent
                    idSection={
                      isEditingSection ? currentSection.id : setting.id
                    }
                    currentContent={isEditingSection ? currentSection : setting}
                    setPreviewSection={setPreviewFloatingSection}
                  />
                </CTabContent>
              </CTabs>
            ) : isEditingContent ? (
              <CTabs>
                <CTabContent style={{ overflowY: "auto" }} className="pt-3">
                  <UpdateContent
                    idSection={
                      isEditingSection ? currentSection.id : setting.id
                    }
                    currentContent={selectedContent}
                    setPreviewSection={setPreviewFloatingSection}
                    isEditingContent={true}
                  />
                </CTabContent>
              </CTabs>
            ) : (
              <CTabs activeTab={activeTab}>
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
                <CTabContent style={{ overflowY: "auto" }} className="pt-3">
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

                    <div
                      style={{ gap: 10 }}
                      className="d-flex align-items-center"
                    >
                      <SelectOptions
                        label="Sembunyikan Dalam"
                        options={waitingHiddenOptions}
                        value={hiddenOption}
                        onChange={(selectedOption) => {
                          setHiddenOption(selectedOption);
                          handleCondition("hidden", selectedOption.value);
                        }}
                      />

                      <SelectOptions
                        label="Berikutnya Setelah"
                        options={nextAfterOptions}
                        value={nextAfter}
                        onChange={(selectedOption) => {
                          setNextAfter(selectedOption);
                          handleCondition("nextAfter", selectedOption.value);
                        }}
                      />
                    </div>

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

                    {!isAddContent && !isEditingContent && (
                      <>
                        <div>
                          {previewFloatingSection
                            .filter((section) =>
                              isEditingSection
                                ? section.id === currentSection.id
                                : section.id === setting.id
                            )
                            .map((section, i) => renderSection(section, i))}
                        </div>

                        <CCard
                          style={{ cursor: "pointer" }}
                          onClick={() => setIsAddContent(true)}
                        >
                          <CCardBody className="p-1">
                            <div className="d-flex align-items-center ">
                              <IoAdd
                                style={{
                                  cursor: "pointer",
                                  margin: "0px 10px 0px 6px",
                                }}
                                size={18}
                              />

                              <div>Tambah</div>
                            </div>
                          </CCardBody>
                        </CCard>
                      </>
                    )}
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
