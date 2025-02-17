import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createUniqueID } from "../../../../../lib/unique-id";
import {
  setIsAddCouriers,
  setIsEditCouriers,
  setIsSelectVariantMultiSelect,
  setIsSelectVariantSelectOption,
  setSelectCourier,
  setSelectedVariant,
} from "../../../../../modules/custom-landing-page/reducer";
import Confirmation from "../../common/Confirmation";
import DesignSection from "./design-section";
import FormSection from "./form-section";

const FormCheckout = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  handleSectionContentFocus,
  hiddenFocused,
  isMultiColumn,
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
    options,
  } = useSelector((state) => state.customLandingPage);
  console.log("🚀 ~ options:", options);

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
        setIcon({});
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
    if (isAddCouriers) {
      dispatch(setIsEditCouriers(false));
      dispatch(setIsAddCouriers(false));
      setIsAddContent(false);
      setIsEditingContent(false);

      if (Object.keys(selectedCourier).length > 0) {
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
      }

      dispatch(setSelectCourier({}));
    } else if (isEditingCouriers) {
      dispatch(setIsEditCouriers(false));
    } else if (isAddContent || isEditingContent) {
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
      if (icon.iconName) {
        setImageUrl("");
      }
    }
    // Kondisi default jika tidak ada kondisi lain yang terpenuhi
    else {
      isShowContent(false);
    }
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);

    const id = isMultiColumn
      ? `multi-column-${uniqueId}`
      : `parent-${uniqueId}`;

    let payload = {
      id,
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
          design: "close",
          isCustom: false,
          selectedCourier: "jne",
          isShowEstimate: true,
        },
        paymentMethod: {
          paymentMethodOption: "required",
          design: "open",
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
          icon: {},
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
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

      <CTabs activeTab={activeTab}>
        <CNav variant="tabs">
          <CNavItem onClick={() => setActiveTab("form")}>
            <CNavLink data-tab="form">Formulir</CNavLink>
          </CNavItem>
          <CNavItem onClick={() => setActiveTab("desain")}>
            <CNavLink data-tab="desain">Desain</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent
          style={{
            overflowY: "auto",

            height: "calc(100vh - 110px)",
          }}
        >
          <CTabPane className="p-1" data-tab="form">
            <FormSection
              hiddenFocused={hiddenFocused}
              previewSection={previewSection}
              setPreviewSection={setPreviewSection}
              currentSection={isEditingSection ? currentSection : setting}
              setCurrentContentBeforeEdit={setCurrentContentBeforeEdit}
              isAddContent={isAddContent}
              setIsAddContent={setIsAddContent}
              isEditingContent={isEditingContent}
              setIsEditingContent={setIsEditingContent}
              isEditingSection={isEditingSection}
              handleSectionContentFocus={handleSectionContentFocus}
            />
          </CTabPane>
          <CTabPane
            style={{ overflowX: "hidden" }}
            className="px-1"
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
  );
};

export default FormCheckout;
