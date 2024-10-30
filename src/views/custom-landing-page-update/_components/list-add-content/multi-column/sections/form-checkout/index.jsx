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

import FormSection from "./form-section";
import DesignSection from "./design-section";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAddColumnSection,
  setIsAddCouriers,
  setIsEditCouriers,
  setIsEditingColumnSection,
  setIsEditingSection,
  setIsSelectVariantMultiSelect,
  setIsSelectVariantSelectOption,
  setSelectCourier,
  setSelectedVariant,
} from "../../../../../../../redux/modules/custom-landing-page/reducer";
import { cancelSectionContentLastIndex } from "../../helper/cancelSectionContentLastIndex";
import { cancelSectionMultiColumn } from "../../helper/cancelSectionMultiColumn";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import { addSectionMultiColumn } from "../../helper/addSectionMultiColumn";

const FormCheckout = ({
  previewSection,
  setPreviewSection,
  sectionBeforeEdit,
  currentSection,
  sectionId,
  columnId,
}) => {
  const { isEditingSection } = useSelector(
    (state) => state.customLandingPage.multiColumnSection
  );

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

  const contentIdToCheck = isEditingSection ? currentSection.id : setting.id;

  const handleCancel = () => {
    if (isAddCouriers) {
      dispatch(setIsAddCouriers(false));

      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        content: column.content.map((content) => {
                          if (content.id === contentIdToCheck) {
                            return {
                              ...content,
                              couriers: content.couriers.filter(
                                (_, index) =>
                                  index !== content.couriers.length - 1
                              ), // Menghapus elemen terakhir
                            };
                          }
                          return content;
                        }),
                      }
                    : column
                ),
              }
            : section
        )
      );
    } else if (isEditingCouriers) {
      setPreviewSection([...currentCourierBeforeEdit]);
      dispatch(setIsEditCouriers(false));
    } else if (isAddContent && !isSelectVariantMultiSelect) {
      setIsAddContent(false);
      setIsEditingContent(false);

      cancelSectionContentLastIndex(
        setPreviewSection,
        sectionId,
        columnId,
        contentIdToCheck
      );
    } else if (isSelectVariantMultiSelect || isSelectVariantSelectOption) {
      const { contentId, ...restOfVariant } = currentVariantMultiSelect;

      dispatch(setSelectedVariant(restOfVariant));

      setPreviewSection((arr) =>
        arr.map((section) =>
          section.id === sectionId
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
                                content: content.content.map((contentItem) => {
                                  if (
                                    contentItem.type === "multiSelect" &&
                                    contentItem.id ===
                                      currentVariantMultiSelect.contentId
                                  ) {
                                    return {
                                      ...contentItem,
                                      designId: currentVariantMultiSelect.id,
                                    };
                                  }

                                  return contentItem;
                                }),
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
      dispatch(setIsEditingSection(false));
      setIsAddContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      dispatch(setIsAddColumnSection(false));
      dispatch(setIsEditingColumnSection(false));
      cancelSectionMultiColumn(setPreviewSection, sectionId, columnId, setting);
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
          arr.map((section) =>
            section.id === sectionId
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
                                  content: content.content.map(
                                    (contentItem) => {
                                      const isExistingCourier =
                                        contentItem.couriers.some(
                                          (courier) =>
                                            courier.id === selectedCourier.id
                                        );

                                      if (!isExistingCourier) {
                                        return {
                                          ...contentItem,
                                          couriers: [
                                            ...contentItem.couriers,
                                            selectedCourier,
                                          ],
                                          form: {
                                            ...contentItem.form,
                                            shippingMethod: {
                                              ...contentItem.form
                                                .shippingMethod,
                                              selectedCourier:
                                                selectedCourier.value,
                                            },
                                          },
                                        };
                                      }
                                      return contentItem;
                                    }
                                  ),
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
      dispatch(setIsEditingColumnSection(false));
      dispatch(setIsAddColumnSection(false));
      dispatch(setIsEditingSection(false));
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
          widthForm: 200,
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

    addSectionMultiColumn(setPreviewSection, sectionId, columnId, payload);
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

            <CTabs activeTab={activeTab}>
              <CNav variant="tabs">
                <CNavItem onClick={() => setActiveTab("form")}>
                  <CNavLink data-tab="form">Formulir</CNavLink>
                </CNavItem>
                <CNavItem onClick={() => setActiveTab("desain")}>
                  <CNavLink data-tab="desain">Desain</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent style={{ overflowY: "auto" }}>
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
                    sectionId={sectionId}
                    columnId={columnId}
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
                    sectionId={sectionId}
                    columnId={columnId}
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
