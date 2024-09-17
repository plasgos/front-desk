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

const initialContents = [
  {
    id: "content-1",
    content:
      "<div><strong>Pepatah Tua Mengatakan</strong></div><div>Kita tidak boleh selalu saja bergantung pada orang lain</div><div><br></div><div>Karena bayangan kita sendiri saja,</div><div><br></div><div>Akan meninggalkan kita saat kita berada di dalam kegelapan.</div>",
    textShadow: undefined,
    fontSize: "tw-text-sm",
    textColor: "#151414",
    textAlign: "tw-text-left",
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

const accordionThick = {
  colorTitle: "#424242",
  colorContent: "#424242",
  bgColor: "#F5F5F5",
  borderColor: "#757575",
  iconColor: "#424242",
  dividerColor: "#9E9E9E",
  bgContent: "#F5F5F5",
  shadow: "tw-shadow-md",
  fontSize: 18,
  distance: 18,
  borderWidth: 2,
  icon: "plus",
  isIconOnRight: true,
  iconSize: 18,
};

const accordionClean = {
  colorTitle: "#424242",
  colorContent: "#424242",
  bgColor: "#F5F5F5",
  borderColor: "#757575",
  iconColor: "#424242",
  dividerColor: "#9E9E9E",
  bgContent: "#F5F5F5",
  shadow: "tw-shadow",
  fontSize: 18,
  distance: 18,
  borderWidth: 1,
  icon: "plus",
  isIconOnRight: true,
  iconSize: 16,
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

  const handleVariantChange = (group, option) => {
    const style =
      option.id === "1"
        ? pageLeft
        : option.id === "2"
        ? pageRight
        : option.id === "3"
        ? accordionThick
        : option.id === "4"
        ? accordionClean
        : {};
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

      const style =
        currentVariant.id === "1"
          ? pageLeft
          : currentVariant.id === "2"
          ? pageRight
          : currentVariant.id === "3"
          ? accordionThick
          : currentVariant.id === "4"
          ? accordionClean
          : {};

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
                  <CNavItem>
                    <CNavLink data-tab="background">Background</CNavLink>
                  </CNavItem>
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
                      setSetting={setSetting}
                      selectedVariant={selectedVariant}
                      isEditingSection={isEditingSection}
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
                    <AnimationControl />
                  </CTabPane>

                  <CTabPane
                    style={{ overflowX: "hidden", height: "100%" }}
                    className="p-1"
                    data-tab="background"
                  >
                    <BackgroundTab
                      currentSection={
                        isEditingSection ? currentSection : setting
                      }
                      setPreviewSection={setPreviewSection}
                      type={isEditingSection ? "edit" : "add"}
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

export default ImageText;
