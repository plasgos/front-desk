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
import AnimationControl from "../../common/AnimationControl";
import BackgroundTab from "../../common/BackgroundTab";
import SelectVariant from "../../common/SelectVariant";
import ImageControl from "./ImageControl";
import UpdateContent from "./UpdateContent";
import image from "../../../../../assets/bg.jpg";
import BackgroundTabFullVariant from "../../common/BackroundTabFullVariant";

const initialContents = [
  {
    id: "content-1",
    content:
      "<div><strong>Pepatah Tua Mengatakan</strong></div><div>Kita tidak boleh selalu saja bergantung pada orang lain</div><div><br></div><div>Karena bayangan kita sendiri saja,</div><div><br></div><div>Akan meninggalkan kita saat kita berada di dalam kegelapan.</div>",
    animation: {
      type: undefined,
      duration: 1,
      isReplay: false,
    },
  },
];

const optionVariant = [
  {
    group: "Page",
    options: [
      { id: "1", value: "left", label: "Left" },
      { id: "2", value: "right", label: "Right" },
    ],
  },
  {
    group: "Frosty",
    options: [
      { id: "3", value: "light", label: "Light" },
      { id: "4", value: "dark", label: "Dark" },
      { id: "5", value: "warm", label: "Warm" },
    ],
  },
  {
    group: "Penuh",
    options: [
      { id: "6", value: "left", label: "Left" },
      { id: "7", value: "right", label: "Right" },
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

const pageLeft = {
  imagePosition: "left",
};

const pageRight = {
  imagePosition: "right",
};

const frostyLight = {
  backgroundColor: "#FFF5F5",
  borderColor: "#CBCACA",
  contentPosition: "tw-justify-start",
  paddingY: 40,
  blur: 0,
  widthContent: 380,
  roundedContent: 8,
  paddingContentY: 10,
  paddingContentX: 10,
  borderWidth: 1,
  rotationContent: "",
  textShadow: undefined,
  fontSize: "tw-text-sm",
  textColor: "#151414",
  textAlign: "tw-text-right",
};

const frostyDark = {
  ...frostyLight,
  textAlign: "tw-text-left",
  textColor: "#ffffff",
  backgroundColor: "#000000",
  contentPosition: "tw-justify-end",
};

const frostyWarm = {
  ...frostyLight,
  textAlign: "tw-text-center",
  textColor: "#000000",
  backgroundColor: "#FFCC80",
  contentPosition: "tw-justify-center",
};

const ImageText = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
}) => {
  const [isSelectVariant, setIsSelectVariant] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    flattenedOptions.find(
      (option) => option.id === currentSection?.variant?.id
    ) || flattenedOptions[0]
  );
  const [setting, setSetting] = useState({});
  const [currentVariant, setCurrentVariant] = useState({});
  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});

  useEffect(() => {
    const section = previewSection.find((section) => section.id === setting.id);

    if (section) {
      setSelectedCurrentSection(section);
    }
  }, [previewSection, setting.id]);

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "image-text",
      title: "Gambar + Teks",
      content: initialContents,
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
      variant: {
        id: "1",
        group: "Page",
        name: "left",
        style: {
          image: image,
          imagePosition: "left",
          shadow: "tw-shadow",
          width: 50,
          rounded: 0,
          distance: 0,
          rotation: 0,
          textShadow: undefined,
          fontSize: "tw-text-sm",
          textColor: "#151414",
          textAlign: "tw-text-left",
        },
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

  const openVariants = () => {
    setIsSelectVariant(true);
    setCurrentVariant(selectedVariant);
  };

  const styleMap = {
    1: pageLeft,
    2: pageRight,
    3: frostyLight,
    4: frostyDark,
    5: frostyWarm,
    6: pageLeft,
    7: pageRight,
  };

  const handleVariantChange = (group, option) => {
    const style = styleMap[option.id] || {};

    setSelectedVariant({ ...option, group });
    setPreviewSection((arr) =>
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
                name: option.value,
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
          name: option.value,
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
      setPreviewSection((arr) =>
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
    } else if (!isEditingSection) {
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          return section.id !== contentIdToCheck;
        })
      );
    } else if (isEditingSection) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
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
              <CTabs activeTab="image">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="image">Gambar</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="content">Konten</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="animation">Animasi</CNavLink>
                  </CNavItem>

                  {selectedVariant.group !== "Frosty" && (
                    <CNavItem>
                      <CNavLink data-tab="background">Background</CNavLink>
                    </CNavItem>
                  )}
                </CNav>
                <CTabContent
                  style={{ height: 300, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <CTabPane className="p-1" data-tab="image">
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

                    <ImageControl
                      currentSection={
                        isEditingSection
                          ? currentSection
                          : selectedCurrentSection
                      }
                      setPreviewSection={setPreviewSection}
                      selectedVariant={selectedVariant}
                    />
                  </CTabPane>

                  <CTabPane className="p-1" data-tab="content">
                    <UpdateContent
                      setPreviewSection={setPreviewSection}
                      currentSection={
                        isEditingSection
                          ? currentSection
                          : selectedCurrentSection
                      }
                      currentContent={
                        isEditingSection
                          ? currentSection?.content?.[0]
                          : selectedCurrentSection?.content?.[0]
                      }
                      isEditingContent={isEditingSection}
                    />
                  </CTabPane>

                  <CTabPane className="p-1" data-tab="animation">
                    {selectedVariant.group === "Frosty" ? (
                      <AnimationControl
                        label="Konten"
                        currentSection={
                          isEditingSection
                            ? currentSection
                            : selectedCurrentSection
                        }
                        currentContent={
                          isEditingSection
                            ? currentSection?.content?.[0]
                            : selectedCurrentSection?.content?.[0]
                        }
                        setPreviewSection={setPreviewSection}
                        isForContent={true}
                      />
                    ) : (
                      <div>
                        <AnimationControl
                          label="Gambar"
                          currentSection={
                            isEditingSection
                              ? currentSection
                              : selectedCurrentSection
                          }
                          setPreviewSection={setPreviewSection}
                        />

                        <AnimationControl
                          label="Konten"
                          currentSection={
                            isEditingSection
                              ? currentSection
                              : selectedCurrentSection
                          }
                          currentContent={
                            isEditingSection
                              ? currentSection?.content?.[0]
                              : selectedCurrentSection?.content?.[0]
                          }
                          setPreviewSection={setPreviewSection}
                          isForContent={true}
                        />
                      </div>
                    )}
                  </CTabPane>

                  {selectedVariant.group !== "Frosty" && (
                    <CTabPane
                      style={{ overflowX: "hidden", height: "100%" }}
                      className="p-1"
                      data-tab="background"
                    >
                      {selectedVariant.group === "Penuh" ? (
                        <BackgroundTabFullVariant
                          currentSection={
                            isEditingSection ? currentSection : setting
                          }
                          setPreviewSection={setPreviewSection}
                          type={isEditingSection ? "edit" : "add"}
                        />
                      ) : (
                        <BackgroundTab
                          currentSection={
                            isEditingSection ? currentSection : setting
                          }
                          setPreviewSection={setPreviewSection}
                          type={isEditingSection ? "edit" : "add"}
                        />
                      )}
                    </CTabPane>
                  )}
                </CTabContent>
              </CTabs>
            )}
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default ImageText;
