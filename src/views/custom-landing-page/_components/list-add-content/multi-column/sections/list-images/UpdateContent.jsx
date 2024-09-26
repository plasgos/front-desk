import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";

import image from "../../../../../../../assets/action-figure.jpg";

import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { useSCrollTargetChangeMultiColumn } from "../../hooks/useScrolltargetChangeMultiColumn";
import { useUrlChangeMultiColumn } from "../../hooks/useUrlChangeMulitColumn";
import { useWhatAppsChangeMultiColumn } from "../../hooks/useWhatAppsChangeMultiColumn";
import Input from "../../../../common/Input";
import UrlInput from "../../../../common/UrlInput";
import WhatsAppInput from "../../../../common/WhatAppsInput";
import ScrollTargetInput from "../../../../common/ScrollTargetSelect";
import FacebookPixel from "../../../../FacebookPixel";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import SelectOptions from "../../../../common/SelectOptions";

export const UpdateContent = ({
  idSection,
  currentContent,
  setPreviewSection,
  isEditingContent,
  sectionId,
  columnId,
}) => {
  const { optionsScrollTarget, optionsTarget } = useSelector(
    (state) => state.customLandingPage
  );

  const [imageUrl, setImageUrl] = useState(
    currentContent?.content?.image || image
  );

  const [alt, setAlt] = useState(currentContent?.content?.alt || "");

  const [altValue] = useDebounce(alt, 1000);

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

  const { url, setUrl, handleUrlOpenNewTabChange } = useUrlChangeMultiColumn(
    sectionId,
    columnId,
    setPreviewSection,
    idSection,
    isEditingContent ? currentContent : setting
  );

  const { whatApps, setWhatApps, handleUrlOpenNewTabWaChange } =
    useWhatAppsChangeMultiColumn(
      sectionId,
      columnId,
      setPreviewSection,
      idSection,
      isEditingContent ? currentContent : setting
    );

  const {
    selectedOptionScrollTarget,
    setSelectedOptionScrollTarget,
    handleChangeScrollTarget,
  } = useSCrollTargetChangeMultiColumn(
    sectionId,
    columnId,
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
          arr.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  column: section.column.map((column) =>
                    column.id === columnId
                      ? {
                          ...column,
                          content: column.content.map((content) =>
                            content.id === idSection
                              ? {
                                  ...content,
                                  content: content.content.map(
                                    (contentItem) => {
                                      const contentIdToCheck = isEditingContent
                                        ? currentContent.id
                                        : setting.id;
                                      return contentItem.id === contentIdToCheck
                                        ? {
                                            ...contentItem,
                                            target: {
                                              scrollTarget: {
                                                ...contentItem.target
                                                  .scrollTarget,
                                                value: updatedOption.value,
                                                label: updatedOption.label,
                                              },
                                            },
                                          }
                                        : contentItem;
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
        arr.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        content: column.content.map((content) =>
                          content.id === idSection
                            ? {
                                ...content,
                                content: content.content.map((contentItem) => {
                                  const contentIdToCheck = isEditingContent
                                    ? currentContent.id
                                    : setting.id;
                                  return contentItem.id === contentIdToCheck
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
                    : column
                ),
              }
            : section
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
        arr.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        content: column.content.map((content) =>
                          content.id === idSection
                            ? {
                                ...content,
                                content: content.content.map((contentItem) => {
                                  const contentIdToCheck = isEditingContent
                                    ? currentContent.id
                                    : setting.id;
                                  return contentItem.id === contentIdToCheck
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
                    : column
                ),
              }
            : section
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
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) =>
                        content.id === idSection
                          ? {
                              ...content,
                              content: content.content.map((contentItem) => {
                                const contentIdToCheck = isEditingContent
                                  ? currentContent.id
                                  : setting.id;
                                return contentItem.id === contentIdToCheck
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
                          : content
                      ),
                    }
                  : column
              ),
            }
          : section
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleChangeContent = (key, value) => {
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
                        content.id === idSection
                          ? {
                              ...content,
                              content: content.content.map((contentItem) => {
                                const contentIdToCheck = isEditingContent
                                  ? currentContent.id
                                  : setting.id;
                                return contentItem.id === contentIdToCheck
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
                          : content
                      ),
                    }
                  : column
              ),
            }
          : section
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
      prevSections.map((section) => {
        if (section.id === sectionId) {
          const updateContent = section.column.map((column) => {
            if (column.id === columnId) {
              return {
                ...column,
                content: column.content.map((content) => {
                  return content.id === idSection
                    ? {
                        ...content,
                        content: [...content.content, payload],
                      }
                    : content;
                }),
              };
            }
            return column;
          });

          return {
            ...section,
            column: updateContent,
          };
        }

        return section;
      })
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
