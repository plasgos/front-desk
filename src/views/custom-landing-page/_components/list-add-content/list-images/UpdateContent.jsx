import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import image from "../../../../../assets/action-figure.jpg";
import "react-quill/dist/quill.snow.css";
import "react-slideshow-image/dist/styles.css";
import { createUniqueID } from "../../../../../lib/unique-id";

import FacebookPixel from "../../FacebookPixel";
import { useSelector } from "react-redux";
import SelectOptions from "../../common/SelectOptions";
import { useWhatAppsChange } from "../../../../../hooks/useWhatAppsChange";
import { useSCrollTargetChange } from "../../../../../hooks/useScrolltargetChange";
import { useUrlChange } from "../../../../../hooks/useUrlChange";
import UrlInput from "../../common/UrlInput";
import WhatsAppInput from "../../common/WhatAppsInput";
import ScrollTargetInput from "../../common/ScrollTargetSelect";
import Input from "../../common/Input";
import { useDebounce } from "use-debounce";

export const UpdateContent = ({
  idSection,
  currentContent,
  setPreviewSection,
  isEditingContent,
}) => {
  const { optionsScrollTarget, optionsTarget } = useSelector(
    (state) => state.customLandingPage
  );

  const [imageUrl, setImageUrl] = useState(
    currentContent?.content?.image || image
  );

  const [alt, setAlt] = useState(currentContent?.content?.alt || "");

  const [altValue] = useDebounce(alt, 300);

  const [setting, setSetting] = useState({});
  const [selectedOption, setSelectedOption] = useState(
    optionsTarget[0].options[0]
  );

  useEffect(() => {
    if (altValue !== currentContent?.content?.alt) {
      handleChangeContent("alt", altValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [altValue]);

  const { url, setUrl, handleUrlOpenNewTabChange } = useUrlChange(
    setPreviewSection,
    idSection,
    isEditingContent ? currentContent : setting
  );

  const { whatApps, setWhatApps, handleUrlOpenNewTabWaChange } =
    useWhatAppsChange(
      setPreviewSection,
      idSection,
      isEditingContent ? currentContent : setting
    );

  const {
    selectedOptionScrollTarget,
    setSelectedOptionScrollTarget,
    handleChangeScrollTarget,
  } = useSCrollTargetChange(
    setPreviewSection,
    idSection,
    isEditingContent ? currentContent : setting
  );

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
            String(item.id) === idSection
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
    if (isEditingContent) {
      const currentTargetOption = optionsTarget
        .flatMap((group) => group.options)
        .find((opt) => {
          const targetType = currentContent?.target;
          return (
            (targetType?.scrollTarget && opt.value === "scroll-target") ||
            (targetType?.url && opt.value === "url") ||
            (targetType?.whatApps && opt.value === "whatApps")
          );
        });

      if (currentTargetOption) {
        setSelectedOption(currentTargetOption);
      }
    }
  }, [isEditingContent, currentContent, optionsTarget]);

  const handleChangeOptions = (selectedOptionValue) => {
    setSelectedOption(selectedOptionValue);
    if (!selectedOptionValue.value) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === idSection
            ? {
                ...item,
                content: item.content.map((contentItem) => {
                  const contentIdToCheck = isEditingContent
                    ? currentContent.id
                    : setting.id;

                  return String(contentItem.id) === String(contentIdToCheck)
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
      setSelectedOptionScrollTarget(undefined);
    }

    setWhatApps({});
    setUrl({});
    setSelectedOptionScrollTarget(undefined);
  };

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
          String(item.id) === idSection
            ? {
                ...item,
                content: item.content.map((contentItem) => {
                  const contentIdToCheck = isEditingContent
                    ? currentContent.id
                    : setting.id;

                  return String(contentItem.id) === String(contentIdToCheck)
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
    }
  }, [
    currentContent,
    isEditingContent,
    optionsScrollTarget,
    setSelectedOptionScrollTarget,
  ]);

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImageUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    };
  };

  useEffect(() => {
    // Update tempSections setelah imageUrl berubah
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                const contentIdToCheck = isEditingContent
                  ? currentContent.id
                  : setting.id;

                return String(contentItem.id) === String(contentIdToCheck)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        image: imageUrl,
                      },
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleChangeContent = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                const contentIdToCheck = isEditingContent
                  ? currentContent.id
                  : setting.id;

                return String(contentItem.id) === String(contentIdToCheck)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        [key]: value,
                      },
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentContent);
    let payload = {
      id: uniqueId,
      content: {
        image: imageUrl,
      },
      target: {},
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === idSection
          ? { ...section, content: [...section.content, payload] }
          : section
      )
    );

    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingContent) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingContent]);

  return (
    <CCard
      style={{
        borderRadius: 0,
        border: 0,
      }}
    >
      <div style={{ zIndex: 1 }} className="w-100">
        <div className="mb-2">
          <div
            style={{
              backgroundColor: "#F5F5F5",
              width: "100%",
              overflow: "hidden",
            }}
            className="mx-auto mb-2"
          >
            <img
              style={{ objectFit: "contain", width: "100%", height: 100 }}
              src={imageUrl || image}
              alt="img"
            />
          </div>

          <CButton
            onClick={handleFileUpload}
            color="primary"
            variant="outline"
            className="btn-block"
          >
            Upload
          </CButton>
        </div>

        <Input
          label="Alt"
          value={alt}
          onChange={(event) => {
            const { value } = event.target;
            setAlt(value);
          }}
          type="text"
        />

        <form>
          <SelectOptions
            label="Target"
            options={optionsTarget}
            onChange={handleChangeOptions}
            value={selectedOption}
            width="100"
          />
          {selectedOption?.value === "url" && (
            <UrlInput
              id="urlOpenNewTabListImg"
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
              id="waOpenNewTabListImg"
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
      </div>
    </CCard>
  );
};
