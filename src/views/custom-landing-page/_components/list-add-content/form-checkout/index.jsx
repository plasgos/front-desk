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
import FormSection from "./form-section";
import DesignSection from "./design-section";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAddCouriers,
  setIsEditCouriers,
  setIsSelectVariantMultiSelect,
  setIsSelectVariantSelectOption,
  setSelectedVariant,
} from "../../../../../redux/modules/custom-landing-page/reducer";

const FormCheckout = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
}) => {
  const [activeTab, setActiveTab] = useState("form");
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

  const {
    isSelectVariantMultiSelect,
    isSelectVariantSelectOption,
    currentVariantMultiSelect,
    isAddCouriers,
    isEditingCouriers,
    selectedCourier,
    currentCourierBeforeEdit,
  } = useSelector((state) => state.customLandingPage);

  const dispatch = useDispatch();

  const [currentContentBeforeEdit, setCurrentContentBeforeEdit] = useState([]);
  const [setting, setSetting] = useState({});
  const [iconBeforeEdit, setIconBeforeEdit] = useState([]);
  const [isListIconVisible, setIsListIconVisible] = useState(false);
  const [previousIcon, setPreviousIcon] = useState("");
  const [icon, setIcon] = useState(currentSection?.form?.style?.icon || "");
  const [imageUrl, setImageUrl] = useState(
    currentSection?.form?.style?.image || ""
  );

  const handleCancel = () => {
    if (isAddCouriers) {
      dispatch(setIsAddCouriers(false));
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          return section.id === contentIdToCheck
            ? {
                ...section,
                couriers: section.couriers.slice(0, -1),
              }
            : section;
        })
      );
    } else if (isEditingCouriers) {
      setPreviewSection([...currentCourierBeforeEdit]);
      dispatch(setIsEditCouriers(false));
    } else if (isAddContent && !isSelectVariantMultiSelect) {
      setIsAddContent(false);
      setIsEditingContent(false);
      setPreviewSection((prevSections) =>
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
    } else if (isSelectVariantMultiSelect || isSelectVariantSelectOption) {
      const { contentId, ...restOfVariant } = currentVariantMultiSelect;

      dispatch(setSelectedVariant(restOfVariant));

      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          if (section.id === contentIdToCheck) {
            return {
              ...section,
              content: section.content.map((contentItem) => {
                if (
                  contentItem.type === "multiSelect" &&
                  contentItem.id === currentVariantMultiSelect.contentId
                ) {
                  return {
                    ...contentItem,
                    designId: currentVariantMultiSelect.id,
                  };
                }

                return contentItem;
              }),
            };
          }
          return section;
        })
      );

      dispatch(setIsSelectVariantMultiSelect(false));
      dispatch(setIsSelectVariantSelectOption(false));
    } else if (isListIconVisible) {
      setIsListIconVisible(false);
      if (imageUrl) {
        setIcon(null);
      } else {
        setIcon(previousIcon);
      }
      setPreviewSection([...iconBeforeEdit]);
    } else if (isEditingContent) {
      setPreviewSection([...currentContentBeforeEdit]);
      setIsAddContent(false);
      setIsEditingContent(false);
    } else if (isEditingSection) {
      setIsAddContent(false);
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      setIsAddContent(false);
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handleConfirm = () => {
    // Prioritaskan kondisi untuk couriers terlebih dahulu
    if (isAddCouriers) {
      dispatch(setIsEditCouriers(false));
      dispatch(setIsAddCouriers(false));
      setIsAddContent(false);
      setIsEditingContent(false);

      setPreviewSection((arr) =>
        arr.map((item) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          if (item.id === contentIdToCheck) {
            // const selectedCourier = !isAddCouriers ? selectedOption : null;

            const isExistingCourier = item.couriers.some(
              (courier) => courier.id === selectedCourier.id
            );

            if (!isExistingCourier) {
              return {
                ...item,
                couriers: [...item.couriers, selectedCourier],
                form: {
                  ...item.form,
                  shippingMethod: {
                    ...item.form.shippingMethod,
                    selectedCourier: selectedCourier.value,
                  },
                },
              };
            }
          }

          return item;
        })
      );
    } else if (isEditingCouriers) {
      dispatch(setIsEditCouriers(false));

      // setPreviewSection((arr) =>
      //   arr.map((item) => {

      //     const contentIdToCheck = isEditingSection
      //     ? currentSection.id
      //     : setting.id;

      //     if (item.id === contentIdToCheck) {
      //       const updatedCourier = item.couriers.find(
      //         (courier) => courier.id === currentCourier.id
      //       );

      //       if (updatedCourier) {
      //         return {
      //           ...item,
      //           couriers: item.couriers.map((courier) =>
      //             courier.id === currentCourier.id ? selectedOption : courier
      //           ),
      //         };
      //       }
      //     }

      //     return item;
      //   })
      // );
    }
    // Prioritaskan kondisi yang berkaitan dengan add/edit content
    else if (isAddContent || isEditingContent) {
      if (isSelectVariantMultiSelect) {
        dispatch(setIsSelectVariantMultiSelect(false));
      } else {
        setIsAddContent(false);
        setIsEditingContent(false);
      }
    }
    // Kondisi untuk menampilkan/menghilangkan ikon list
    else if (isListIconVisible) {
      setIsListIconVisible(false);
    }
    // Kondisi default jika tidak ada kondisi lain yang terpenuhi
    else {
      isShowContent(false);
    }
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "form-checkout",
      title: "Formulir Checkout",
      content: [],
      couriers: [],
      form: {
        information: {
          emailVisitor: "",
          subscribeNewsletter: false,
          phoneNumberVisitor: "",
          firstName: "",
          lastName: "",
          address: "",
          country: "",
          postcalCode: "",
          subdictrict: "",
          phoneNumber: "",
          dropshipping: false,
          dropshipperName: "",
          dropshipperPhoneNumber: "",
        },
        formSetting: {
          visitor: "phoneNumber",
          isSubscribeNewsletter: false,
          isShowAddress: true,
          isLastName: false,
          isCountry: false,
          isPostcalCode: false,
          subdistrictType: "search",
          amountLengthAddress: 80,
          isShowPhoneNumber: false,
          isDropshipping: false,
          phoneNumberDropshipper: false,
        },
        shippingMethod: {
          shippingMethodOption: "required",
          design: "open",
          isCustom: false,
          selectedCourier: "jne",
          isShowEstimate: true,
        },
        style: {
          labelColor: "#000000",
          textInputColor: "#000000",
          bgInputColor: "",
          outlineInputColor: "#D8DBE0",
          widthForm: 450,
          fontSizeLabel: 12,
          fontStyle: "tw-font-normal",
          fontSizeTextInputColor: 16,
          outlineInputColorSize: 1,
          borderRadius: 4,
          distance: 0,
          btnSubmitText: "Selesaikan Order",
          btnSubmitColor: "#fa541c",
          icon: "",
          iconColor: "",
          image: "",
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

            <CTabs activeTab={activeTab}>
              <CNav variant="tabs">
                <CNavItem onClick={() => setActiveTab("layout")}>
                  <CNavLink data-tab="layout">Layout</CNavLink>
                </CNavItem>
                <CNavItem onClick={() => setActiveTab("form")}>
                  <CNavLink data-tab="form">Formulir</CNavLink>
                </CNavItem>
                <CNavItem onClick={() => setActiveTab("desain")}>
                  <CNavLink data-tab="desain">Desain</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent
                style={{ height: 350, paddingRight: 5, overflowY: "auto" }}
              >
                <CTabPane
                  style={{ overflowX: "hidden" }}
                  className="p-1"
                  data-tab="layout"
                >
                  Layout
                </CTabPane>
                <CTabPane className="p-1" data-tab="form">
                  <FormSection
                    previewSection={previewSection}
                    setPreviewSection={setPreviewSection}
                    currentSection={isEditingSection ? currentSection : setting}
                    setCurrentContentBeforeEdit={setCurrentContentBeforeEdit}
                    isAddContent={isAddContent}
                    setIsAddContent={setIsAddContent}
                    isEditingContent={isEditingContent}
                    setIsEditingContent={setIsEditingContent}
                    isEditingSection={isEditingSection}
                  />
                </CTabPane>
                <CTabPane
                  style={{ overflowX: "hidden" }}
                  className="p-1"
                  data-tab="desain"
                >
                  <DesignSection
                    previewSection={previewSection}
                    setPreviewSection={setPreviewSection}
                    currentSection={isEditingSection ? currentSection : setting}
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    icon={icon}
                    setPreviousIcon={setPreviousIcon}
                    setIcon={setIcon}
                    setIconBeforeEdit={setIconBeforeEdit}
                    isListIconVisible={isListIconVisible}
                    setIsListIconVisible={setIsListIconVisible}
                  />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default FormCheckout;
