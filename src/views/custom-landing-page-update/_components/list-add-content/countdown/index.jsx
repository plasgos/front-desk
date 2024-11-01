import {
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs
} from "@coreui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { createUniqueID } from "../../../../../lib/unique-id";
import BackgroundTab from "../../common/BackgroundTab";
import Confirmation from "../../common/Confirmation";
import SelectVariant from "../../common/SelectVariant";
import FinishControl from "./FinishedControl";
import UpdateContent from "./UpdateContent";

const optionVariant = [
  {
    group: "Full Text",
    options: [{ id: "1", value: "basic", label: "Basic" }],
  },
  {
    group: "Digital",
    options: [{ id: "2", value: "basic", label: "Basic" }],
  },
  {
    group: "Circle",
    options: [{ id: "3", value: "colorful", label: "Colorful" }],
  },
];

const flattenedOptions = optionVariant.flatMap((group) =>
  group.options.map((option) => ({
    ...option,
    group: group.group,
  }))
);

//styles template
const basicStyle = {
  daysColor: "#000000",
  hoursColor: "#000000",
  minutesColor: "#000000",
  secondsColor: "#000000",
  size: 18,
  dividerColor: "#000000",
};

const basicDigitalStyle = {
  daysColor: "#000000",
  hoursColor: "#000000",
  minutesColor: "#000000",
  secondsColor: "#D32F2F",
  size: 18,
  dividerColor: "#000000",
};

const circleStyle = {
  daysColor: "#7E2E84",
  hoursColor: "#D14081",
  minutesColor: "#EF798A",
  secondsColor: "#218380",
  size: 20,
};

const CountDown = ({
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
    ) || flattenedOptions[2]
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
    const today = moment();
    const futureDate = today.clone().add(7, "days"); // Duplikasi untuk menghindari mutasi

    const date = futureDate.date(); // Tanggal
    const month = futureDate.month() + 1; // Bulan (0-indexed, jadi tambahkan 1)
    const years = futureDate.year(); // Tahun

    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "countdown",
      title: "Countdown",
      content: {
        typeTarget: "date",
        datePicked: {
          date,
          month,
          years,
          hours: 8,
          minutes: 0,
          dateView: "",
        },
        duration: {
          hours: 2,
          minutes: 30,
        },
      },
      finish: {
        isFinished: false,
        text: "<p>Sudah Selesai</p>",
        textColor: "#000000",
        textAlign: "tw-justify-center",
        textShadow: undefined,
        fontSize: "tw-text-base",
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
        direction: "to right",
        fromColor: "",
        toColor: "",
        isRevert: false,
        pattern: "",
      },
      variant: {
        id: "3",
        group: "Circle",
        name: "colorful",
        style: {
          ...circleStyle,
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
    1: basicStyle,
    2: basicDigitalStyle,
    3: circleStyle,
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
                  ...item.variant,
                  group: currentVariant.group,
                  id: currentVariant.id,
                  name: currentVariant.value,
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
              <CNavLink data-tab="finish">Selesai</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="background">Background</CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent style={{ overflowY: "auto" }} className="p-3">
            <CTabPane
              style={{ overflowX: "hidden" }}
              className="p-1"
              data-tab="content"
            >
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
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
                setPreviewSection={setPreviewSection}
              />
            </CTabPane>

            <CTabPane className="p-1" data-tab="finish">
              <FinishControl
                setPreviewSection={setPreviewSection}
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
              />
            </CTabPane>

            <CTabPane
              style={{ overflowX: "hidden", height: "100%" }}
              className="p-1"
              data-tab="background"
            >
              <BackgroundTab
                currentSection={isEditingSection ? currentSection : setting}
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

export default CountDown;
