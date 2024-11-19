import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useUrlChange } from "../hooks/useUrlChange";
import { useWhatAppsChange } from "../hooks/useWhatAppsChange";
import { localPageTargetOptions } from "../../../SelectOptions";
import { useScrollTargetChange } from "../hooks/useScrollTargetChange";
import WhatsAppInput from "../../../common/WhatAppsInput";
import UrlInput from "../../../common/UrlInput";
import ScrollTargetInput from "../../../common/ScrollTargetSelect";
import SelectOptions from "../../../common/SelectOptions";
import { setIsOpenPopup } from "../../../../../../redux/modules/custom-landing-page/reducer";
import FacebookPixel from "../../../FacebookPixel";

const TargetOptionNavbarFooter = ({
  setPreviewSection,
  sectionId,
  currentContentId,
  selectedContent,
  isEditingContent,
  isPopUpExist,
}) => {
  const { optionsScrollTarget, optionsTarget: store } = useSelector(
    (state) => state.customLandingPage
  );

  const [optionsTarget, setOptionsTarget] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [localPageTarget, setLocalPageTarget] = useState({});

  useEffect(() => {
    const filteredData = store.filter(
      (option) =>
        option.label !== "Kegiatan" && option.label !== "Tidak ada link"
    );

    if (filteredData) {
      setOptionsTarget(filteredData);
      setSelectedOption(filteredData[0]?.options[0]);
      setLocalPageTarget(localPageTargetOptions[0].options[0]);
    }
  }, [store]);

  const { url, setUrl, handleUrlOpenNewTabChange } = useUrlChange(
    setPreviewSection,
    sectionId,
    currentContentId,
    selectedContent
  );

  const { whatApps, setWhatApps, handleUrlOpenNewTabWaChange } =
    useWhatAppsChange(
      setPreviewSection,
      sectionId,
      currentContentId,
      selectedContent
    );

  const {
    selectedOptionScrollTarget,
    setSelectedOptionScrollTarget,
    handleChangeScrollTarget,
  } = useScrollTargetChange(
    setPreviewSection,
    sectionId,
    currentContentId,
    selectedContent
  );

  const handleChangeOptions = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (!selectedOption.value) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === sectionId
            ? {
                ...item,
                content: item.content.map((content) =>
                  content.id === currentContentId
                    ? {
                        ...content,
                        content: content.content.map((contentItem) => {
                          return String(contentItem.id) ===
                            String(selectedContent?.id)
                            ? {
                                ...contentItem,
                                target: {},
                              }
                            : contentItem;
                        }),
                      }
                    : content
                ),
              }
            : item
        )
      );
      setSelectedOptionScrollTarget(undefined);
    }

    if (selectedOption.value === "local-page") {
      setLocalPageTarget(localPageTargetOptions[0].options[0]);

      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === sectionId
            ? {
                ...item,
                content: item.content.map((content) =>
                  content.id === currentContentId
                    ? {
                        ...content,
                        content: content.content.map((contentItem) => {
                          return String(contentItem.id) ===
                            String(selectedContent?.id)
                            ? {
                                ...contentItem,
                                target: {
                                  localPage: {
                                    value:
                                      localPageTargetOptions[0].options[0]
                                        .value,
                                  },
                                },
                              }
                            : contentItem;
                        }),
                      }
                    : content
                ),
              }
            : item
        )
      );
    }

    setWhatApps({});
    setUrl({});
    setSelectedOptionScrollTarget(undefined);
  };

  useEffect(() => {
    if (isEditingContent) {
      if (
        selectedOption &&
        selectedOption.value === "scroll-target" &&
        selectedOptionScrollTarget &&
        optionsScrollTarget
      ) {
        const updatedOption = optionsScrollTarget.find(
          (option) => option.id === selectedOptionScrollTarget.id
        );
        setPreviewSection((arr) =>
          arr.map((item) =>
            String(item.id) === sectionId
              ? {
                  ...item,
                  content: item.content.map((content) =>
                    content.id === currentContentId
                      ? {
                          ...content,
                          content: content.content.map((contentItem) => {
                            return String(contentItem.id) ===
                              String(selectedContent?.id)
                              ? {
                                  ...contentItem,
                                  target: {
                                    scrollTarget: {
                                      ...contentItem.target.scrollTarget,
                                      value: updatedOption.value,
                                      label: updatedOption.label,
                                    },
                                  },
                                }
                              : contentItem;
                          }),
                        }
                      : content
                  ),
                }
              : item
          )
        );
        setSelectedOptionScrollTarget(updatedOption);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingContent, optionsScrollTarget, selectedOption]);

  useEffect(() => {
    const currentTargetOption = optionsTarget
      .flatMap((group) => group.options)
      .find((opt) => {
        const targetType = selectedContent?.target;

        return (
          (targetType?.scrollTarget && opt.value === "scroll-target") ||
          (targetType?.url && opt.value === "url") ||
          (targetType?.whatApps && opt.value === "whatApps") ||
          (targetType?.localPage && opt.value === "local-page")
        );
      });

    if (currentTargetOption) {
      setSelectedOption(currentTargetOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingContent, selectedContent, optionsTarget]);

  useEffect(() => {
    if (
      (!isEditingContent &&
        selectedOption &&
        selectedOption.value === "scroll-target") ||
      (isEditingContent &&
        selectedOption &&
        selectedOption.value === "scroll-target" &&
        !selectedContent.target?.scrollTarget?.value)
    ) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === sectionId
            ? {
                ...item,
                content: item.content.map((content) =>
                  content.id === currentContentId
                    ? {
                        ...content,
                        content: content.content.map((contentItem) => {
                          return String(contentItem.id) ===
                            String(selectedContent?.id)
                            ? {
                                ...contentItem,
                                target: {
                                  scrollTarget: optionsScrollTarget[0],
                                },
                              }
                            : contentItem;
                        }),
                      }
                    : content
                ),
              }
            : item
        )
      );
      setSelectedOptionScrollTarget(optionsScrollTarget[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  useEffect(() => {
    if (isEditingContent) {
      const currentScrollTarget = optionsScrollTarget.find(
        (opt) => opt.id === selectedContent?.target?.scrollTarget?.id
      );
      if (currentScrollTarget) {
        setSelectedOptionScrollTarget(currentScrollTarget);
      }

      const currentlocalPageTarget = localPageTargetOptions
        .flatMap((group) => group.options)
        .find((opt) => opt.value === selectedContent?.target?.localPage?.value);

      if (currentlocalPageTarget) {
        setLocalPageTarget(currentlocalPageTarget);
      }
    }
  }, [
    isEditingContent,
    optionsScrollTarget,
    selectedContent,
    setSelectedOptionScrollTarget,
  ]);

  const handleChangeLocalPage = (value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === sectionId
          ? {
              ...item,
              content: item.content.map((content) =>
                content.id === currentContentId
                  ? {
                      ...content,
                      content: content.content.map((contentItem) => {
                        return String(contentItem.id) ===
                          String(selectedContent?.id)
                          ? {
                              ...contentItem,
                              target: {
                                localPage: {
                                  value,
                                },
                              },
                            }
                          : contentItem;
                      }),
                    }
                  : content
              ),
            }
          : item
      )
    );
  };

  return (
    <>
      <form>
        <div style={{ gap: 10 }} className="d-flex align-items-center">
          <SelectOptions
            label="Target"
            options={optionsTarget}
            onChange={handleChangeOptions}
            value={selectedOption}
            width="50"
          />

          {selectedOption?.value === "local-page" && (
            <SelectOptions
              label="Link Ke"
              options={localPageTargetOptions}
              onChange={(selectedOption) => {
                setLocalPageTarget(selectedOption);
                handleChangeLocalPage(selectedOption.value);
              }}
              value={localPageTarget}
              width="50"
            />
          )}
        </div>

        {selectedOption?.value === "url" && (
          <UrlInput
            id="urlOpenNewTabText&Img"
            url={url}
            handleUrlChange={(newValue) => {
              setUrl((prevValue) => ({
                ...prevValue,
                url: newValue,
              }));
            }}
            handleUrlOpenNewTabChange={handleUrlOpenNewTabChange}
          />
        )}

        {selectedOption?.value === "whatApps" && (
          <WhatsAppInput
            id="waOpenNewTabText&Img"
            whatApps={whatApps}
            handlePhoneNumberChange={(newValue) => {
              setWhatApps((prevValue) => ({
                ...prevValue,
                phoneNumber: newValue,
              }));
            }}
            handleMessageChange={(newValue) => {
              setWhatApps((prevValue) => ({
                ...prevValue,
                message: newValue,
              }));
            }}
            handleUrlOpenNewTabWaChange={handleUrlOpenNewTabWaChange}
          />
        )}

        {selectedOption?.value === "scroll-target" && (
          <ScrollTargetInput
            optionsScrollTarget={optionsScrollTarget}
            handleChangeScrollTarget={handleChangeScrollTarget}
            selectedOptionScrollTarget={selectedOptionScrollTarget}
          />
        )}
      </form>

      {selectedOption.value !== undefined && <FacebookPixel />}
    </>
  );
};

export default TargetOptionNavbarFooter;
