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

import { IoAdd } from "react-icons/io5";
import { createUniqueID } from "../../../../../lib/unique-id";

import { useDispatch, useSelector } from "react-redux";
import ListContent from "..";
import { useMoveSection } from "../../../../../hooks/useMoveSection";
import { useRemoveSection } from "../../../../../hooks/useRemoveSection";
import { setPopUpClickOption } from "../../../../../redux/modules/custom-landing-page/reducer";
import BackgroundTab from "../../common/BackgroundTab";
import Input from "../../common/Input";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import SelectOptions from "../../common/SelectOptions";
import { useRenderEditSection } from "../../hooks/useRenderEditSection";
import { ListSectionContent } from "../../ListSectionContent";
import { roundedButtonOptions } from "../floating-button/UpdateContent";

const shownOnWhenOptions = [
  { value: "clickButton", label: "Klik Tombol" },
  { value: "immediately", label: "Langsung" },
  { value: "waitAfter", label: "Tunggu Setelah" },
  { value: "afterInteraction", label: "Setelah Interaksi" },
];

const waitingPopupOptions = [
  { value: 1, label: "1 detik" },
  { value: 2, label: "2 detik" },
  { value: 3, label: "3 detik" },
  { value: 5, label: "5 detik" },
  { value: 10, label: "10 detik" },
  { value: 15, label: "15 detik" },
  { value: 20, label: "20 detik" },
  { value: 30, label: "30 detik" },
  { value: 45, label: "45 detik" },
  { value: 60, label: "60 detik" },
  { value: 90, label: "90 detik" },
];

const newId = () => Math.random().toString(36).substr(2, 9);

const background = {
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
};

const initialSection = {
  id: newId(),
  name: "text",
  title: "Teks",
  content: {
    editorHtml: "Text 1",
    style: {
      textAlign: "tw-text-center",
      color: "#face12",
    },
  },
  animation: {
    type: undefined,
    duration: 1,
    isReplay: false,
  },
  background,
};

const PopUp = ({
  currentSection,
  isShowContent,
  isEditingSection,
  sectionBeforeEdit,
  previewFloatingSection,
  setPreviewFloatingSection,
  handleSectionContentFocus,
  handleColumnFocus,
}) => {
  const [popUpSections, setPopUpSections] = useState(
    isEditingSection ? [...(currentSection?.content || [])] : [initialSection]
  );
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

  const [selectedSection, setSelectedSection] = useState({});

  const [currentSectionBeforeEdit, setCurrentSectionBeforeEdit] = useState([]);

  const [setting, setSetting] = useState({});

  const [popUpSectionBeforeEdit, setPopUpSectionBeforeEdit] = useState([]);

  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});

  const [popupName, setPopupName] = useState(currentSection?.popupName || "");

  const [shownOnWhen, setShownOnWhen] = useState(shownOnWhenOptions[1]);

  const [rounded, setRounded] = useState(roundedButtonOptions[2]);

  const [width, setWidth] = useState(currentSection?.width || 500);

  const [waitingPopup, setWaitingPopup] = useState(waitingPopupOptions[2]);

  const { optionsTarget } = useSelector((state) => state.customLandingPage);

  const kegiatanGroup = optionsTarget.find(
    (group) => group.label === "Kegiatan"
  );
  const popUpNumber = kegiatanGroup ? kegiatanGroup.options.length + 1 : 1;

  useEffect(() => {
    const currentShownOnWhen = shownOnWhenOptions.find(
      (opt) => opt.value === currentSection?.shownOnWhen?.value
    );

    if (currentShownOnWhen) {
      setShownOnWhen(currentShownOnWhen);
    }

    const currentRounded = roundedButtonOptions.find(
      (opt) => opt.value === currentSection?.rounded
    );

    if (currentRounded) {
      setRounded(currentRounded);
    }
  }, [currentSection]);

  const dispatch = useDispatch();

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

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "width") {
      setWidth(newValue);
    }
    handleChangeValue(key, newValue);
  };

  useEffect(() => {
    const section = previewFloatingSection.find(
      (section) => section.id === setting.id
    );

    if (section) {
      setSelectedCurrentSection(section);
    }
  }, [previewFloatingSection, setting.id]);

  const contentIdToCheck = isEditingSection ? currentSection.id : setting.id;

  const handleCancel = () => {
    if (isEditingContent) {
      setPreviewFloatingSection([...currentSectionBeforeEdit]);
      setIsAddContent(false);
      setIsEditingContent(false);
    } else if (isEditingSection) {
      setIsAddContent(false);
      isShowContent(false);
      setPreviewFloatingSection([...sectionBeforeEdit]);
    } else {
      setIsAddContent(false);
      isShowContent(false);
      setPreviewFloatingSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handleConfirm = () => {
    if (isAddContent || isEditingContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
    } else {
      if (shownOnWhen.value === "clickButton") {
        const labelValue = popupName || `Pop Up ${popUpNumber}`;

        const payload = {
          label: "Kegiatan",
          options: [
            {
              id: contentIdToCheck,
              value: `Pop Up (${labelValue})`,
              label: `Pop Up (${labelValue})`,
            },
          ],
        };

        dispatch(setPopUpClickOption(payload));
      }

      isShowContent(false);
    }
  };

  useEffect(() => {
    setPreviewFloatingSection((prevSections) =>
      prevSections.map((section) =>
        section.id === contentIdToCheck
          ? { ...section, content: [...popUpSections] } // Update konten jika ada perubahan
          : section
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popUpSections]);

  const onAddContent = () => {
    let uniqueId = createUniqueID(previewFloatingSection);

    let payload = {
      id: uniqueId,
      name: "popup",
      title: "Pop Up",
      content: popUpSections,
      wrapperStyle: {},
      popupName: "",
      shownOnWhen: {
        value: "immediately",
        isShown: true,
      },
      rounded: "tw-rounded-lg",
      isPopupShown: true,
      width: 500,
      background,
    };

    setPreviewFloatingSection((prevSections) => [...prevSections, payload]);
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      onAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const editSection = useCallback(
    (section) => {
      setCurrentSectionBeforeEdit([...previewFloatingSection]);
      setPopUpSectionBeforeEdit([...popUpSections]);
      setSelectedSection(section);
      setIsEditingContent(true);
    },
    [popUpSections, previewFloatingSection]
  );

  const removeSection = useRemoveSection(setPreviewFloatingSection);

  const removePopUpSection = useCallback(
    (sectionId) => {
      setPopUpSections((prevSections) =>
        prevSections.filter((section) => section.id !== sectionId)
      );
    },
    [setPopUpSections]
  );

  const moveSection = useMoveSection(setPreviewFloatingSection);

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.content.map((contentItem, contentIndex) => (
            <ListSectionContent
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              section={contentItem}
              moveSection={(dragIndex, hoverIndex) =>
                moveSection(section.id, dragIndex, hoverIndex)
              }
              editSection={() => editSection(contentItem)}
              removeSection={() => {
                removeSection(section.id, contentIndex);
                removePopUpSection(contentItem.id);
              }}
              focusContent={() => handleSectionContentFocus(contentItem.id)}
            />
          ))}
        </div>
      );
    },
    [
      moveSection,
      editSection,
      removeSection,
      removePopUpSection,
      handleSectionContentFocus,
    ]
  );

  const popUpsection = true;

  const { renderEditSection } = useRenderEditSection({
    previewSection: popUpSections,
    setPreviewSection: setPopUpSections,
    editing: selectedSection,
    setEditing: setIsEditingContent,
    sectionBeforeEdit: popUpSectionBeforeEdit,
    handleSectionContentFocus,
    isPopUpSection: popUpsection,
    handleColumnFocus,
  });

  return (
    <div>
      <CRow>
        <CCol>
          <div style={{ height: 400 }}>
            {!isAddContent && !isEditingContent && (
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
            )}

            {isAddContent ? (
              <CTabs>
                <CTabContent
                  style={{
                    height: !isAddContent && !isEditingContent && 380,
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <ListContent
                    previewSection={popUpSections}
                    setPreviewSection={(value) => setPopUpSections(value)}
                    isShowContent={(value) => setIsAddContent(value)}
                    previewFloatingSection={previewFloatingSection}
                    setPreviewFloatingSection={(value) =>
                      setPreviewFloatingSection(value)
                    }
                    handleSectionContentFocus={handleSectionContentFocus}
                    handleColumnFocus={handleColumnFocus}
                    isPopUpSection={true}
                  />
                </CTabContent>
              </CTabs>
            ) : isEditingContent ? (
              <CTabs>
                <CTabContent
                  style={{
                    height: !isAddContent && !isEditingContent && 380,
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <div>
                    {previewFloatingSection
                      .filter((section) =>
                        isEditingSection
                          ? section.id === currentSection.id
                          : section.id === setting.id
                      )
                      .map((section) =>
                        section.content.map((content) =>
                          renderEditSection(content)
                        )
                      )}
                  </div>
                </CTabContent>
              </CTabs>
            ) : (
              <CTabs activeTab="content">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="content">Konten</CNavLink>
                  </CNavItem>

                  <CNavItem>
                    <CNavLink data-tab="background">Background</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent
                  style={{
                    height: "340px",
                    paddingRight: 5,
                    overflowY: "auto",
                  }}
                  className="pt-3"
                >
                  <CTabPane
                    style={{ overflowX: "hidden" }}
                    className="p-1"
                    data-tab="content"
                  >
                    {!isAddContent && !isEditingContent && (
                      <>
                        <div>
                          <div className="mb-2">
                            <Input
                              label="Nama Popup"
                              placeholder="Newsletter Popup"
                              value={popupName}
                              onChange={(e) => {
                                const { value } = e.target;
                                setPopupName(value);
                                handleChangeValue("popupName", value);
                              }}
                            />
                          </div>

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
                                  handleChangeWaitingPopup(
                                    selectedOption.value
                                  );
                                }}
                              />
                            )}
                          </div>

                          <h5>Desain</h5>

                          <div
                            style={{ gap: 10 }}
                            className="d-flex align-items-center"
                          >
                            <SelectOptions
                              label="Melingkar"
                              options={roundedButtonOptions}
                              value={rounded}
                              onChange={(selectedOption) => {
                                setRounded(selectedOption);
                                handleChangeValue(
                                  "rounded",
                                  selectedOption.value
                                );
                              }}
                            />

                            <CButton
                              onClick={() =>
                                handleChangeValue("isPopupShown", true)
                              }
                              color="primary"
                              variant="outline"
                              size="md"
                            >
                              Perlihatkan
                            </CButton>
                          </div>

                          <InputRangeWithNumber
                            label="Lebar"
                            value={width}
                            onChange={(newValue) => {
                              setWidth(newValue);
                              handleChangeValue("width", newValue);
                            }}
                            min={120}
                            max={1024}
                            onBlur={() =>
                              handleSetValueWhenBlur(width, 120, 10204, "width")
                            }
                          />
                        </div>

                        <div>
                          {previewFloatingSection
                            .filter((section) =>
                              isEditingSection
                                ? section.id === currentSection.id
                                : section.id === selectedCurrentSection.id
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

                              <div>Tambah Konten</div>
                            </div>
                          </CCardBody>
                        </CCard>
                      </>
                    )}
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
                      setPreviewSection={setPreviewFloatingSection}
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

export default PopUp;
