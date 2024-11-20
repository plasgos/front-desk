import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { localPageTargetOptions } from "../SelectOptions";

import { useSCrollTargetChange } from "../../../../hooks/useScrolltargetChange";
import { useUrlChange } from "../../../../hooks/useUrlChange";
import { useWhatAppsChange } from "../../../../hooks/useWhatAppsChange";
import { setIsOpenPopup } from "../../../../modules/custom-landing-page/reducer";
import FacebookPixel from "../FacebookPixel";
import ScrollTargetInput from "./ScrollTargetSelect";
import SelectOptions from "./SelectOptions";
import UrlInput from "./UrlInput";
import WhatsAppInput from "./WhatAppsInput";

const TargetOptions = ({
  setPreviewSection,
  sectionId,
  currentContent,
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
    if (isPopUpExist) {
      const filteredOptions = store.filter(
        (option) => option.label !== "Tidak ada link"
      );

      if (filteredOptions) {
        setOptionsTarget(filteredOptions);
        setLocalPageTarget(localPageTargetOptions[0].options[0]);
      }
    } else {
      const removePopupOption = store.filter(
        (option) => option.label !== "Kegiatan"
      );

      if (removePopupOption) {
        setOptionsTarget(removePopupOption);
        setSelectedOption(removePopupOption[0]?.options[0]);
      }
    }
  }, [isPopUpExist, store]);

  const { url, setUrl, handleUrlOpenNewTabChange } = useUrlChange(
    setPreviewSection,
    sectionId,
    currentContent
  );

  const { whatApps, setWhatApps, handleUrlOpenNewTabWaChange } =
    useWhatAppsChange(setPreviewSection, sectionId, currentContent);

  const {
    selectedOptionScrollTarget,
    setSelectedOptionScrollTarget,
    handleChangeScrollTarget,
  } = useSCrollTargetChange(setPreviewSection, sectionId, currentContent);

  const handleChangeOptions = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (!selectedOption.value) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === sectionId
            ? {
                ...item,
                content: item.content.map((contentItem) => {
                  return String(contentItem.id) === String(currentContent?.id)
                    ? {
                        ...contentItem,
                        target: {},
                      }
                    : contentItem;
                }),
              }
            : item
        )
      );
    }

    if (selectedOption.value === "local-page") {
      setLocalPageTarget(localPageTargetOptions[0].options[0]);

      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === sectionId
            ? {
                ...item,
                content: item.content.map((contentItem) => {
                  return String(contentItem.id) === String(currentContent?.id)
                    ? {
                        ...contentItem,
                        target: {
                          localPage: {
                            value: localPageTargetOptions[0].options[0].value,
                          },
                        },
                      }
                    : contentItem;
                }),
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
                  content: item.content.map((contentItem) =>
                    String(contentItem.id) === String(currentContent.id)
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
                      : contentItem
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
        const targetType = currentContent?.target;

        return (
          (targetType?.scrollTarget && opt.value === "scroll-target") ||
          (targetType?.url && opt.value === "url") ||
          (targetType?.whatApps && opt.value === "whatApps") ||
          (targetType?.localPage && opt.value === "local-page") ||
          (targetType?.popup && opt.value.includes("Pop Up"))
        );
      });

    if (currentTargetOption) {
      setSelectedOption(currentTargetOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingContent, currentContent, optionsTarget]);

  useEffect(() => {
    if (
      (!isEditingContent &&
        selectedOption &&
        selectedOption.value === "scroll-target") ||
      (isEditingContent &&
        selectedOption &&
        selectedOption.value === "scroll-target" &&
        !currentContent.target?.scrollTarget?.value)
    ) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === sectionId
            ? {
                ...item,
                content: item.content.map((contentItem) => {
                  return String(contentItem.id) === String(currentContent?.id)
                    ? {
                        ...contentItem,
                        target: {
                          scrollTarget: optionsScrollTarget[0],
                        },
                      }
                    : contentItem;
                }),
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
        (opt) => opt.id === currentContent.target?.scrollTarget?.id
      );

      if (currentScrollTarget) {
        setSelectedOptionScrollTarget(currentScrollTarget);
      }

      const currentlocalPageTarget = localPageTargetOptions
        .flatMap((group) => group.options)
        .find((opt) => opt.value === currentContent?.target?.localPage?.value);

      if (currentlocalPageTarget) {
        setLocalPageTarget(currentlocalPageTarget);
      }
    }
  }, [
    currentContent,
    isEditingContent,
    optionsScrollTarget,
    setSelectedOptionScrollTarget,
  ]);

  const handleChangeLocalPage = (value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === sectionId
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                return String(contentItem.id) === String(currentContent?.id)
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
          : item
      )
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      selectedOption &&
      selectedOption.value &&
      selectedOption?.value.includes("Pop Up")
    ) {
      const payload = {
        ...selectedOption,
        isShowPopup: false,
      };

      dispatch(setIsOpenPopup(payload));

      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === sectionId
            ? {
                ...item,
                content: item.content.map((contentItem) =>
                  String(contentItem.id) === currentContent?.id
                    ? {
                        ...contentItem,
                        target: {
                          popup: payload,
                        },
                      }
                    : contentItem
                ),
              }
            : item
        )
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

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

export default TargetOptions;
