import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UrlInput from "../../common/UrlInput";
import WhatsAppInput from "../../common/WhatAppsInput";
import ScrollTargetInput from "../../common/ScrollTargetSelect";
import { useUrlChange } from "../../../../../hooks/useUrlChange";
import { useWhatAppsChange } from "../../../../../hooks/useWhatAppsChange";
import { useSCrollTargetChange } from "../../../../../hooks/useScrolltargetChange";
import SelectOptions from "../../common/SelectOptions";
import Input from "../../common/Input";
import ColorPicker from "../../common/ColorPicker";
import FacebookPixel from "../../FacebookPixel";
import {
  ButtonSizeOptions,
  roundedButtonOptions,
  variantButton,
} from "./AddButton";
import { shadowOptions } from "../../SelectOptions";

const EditButton = ({
  idSection,
  selectedSectionToEdit,
  setPreviewSection,
}) => {
  const { optionsScrollTarget, optionsTarget } = useSelector(
    (state) => state.customLandingPage
  );
  const [selectedOption, setSelectedOption] = useState(
    optionsTarget[0].options[0]
  );
  const [title, setTitle] = useState(selectedSectionToEdit.content.title);
  const [selectedVariantButton, setSelectedVariantButton] = useState(undefined);
  const [selectedColorButton, setSelectedColorButton] = useState(
    selectedSectionToEdit.content.style.btnColor
  );
  const [selectedColorText, setSelectedColorText] = useState(
    selectedSectionToEdit.content.style.textColor
  );
  const [selectedRoundedButton, setSelectedRoundedButton] = useState(undefined);
  const [selectedButtonSize, setSelectedButtonSize] = useState(undefined);
  const [selectedButtonShadow, setSelectedButtonShadow] = useState(undefined);

  const { url, setUrl, handleUrlChange, handleUrlOpenNewTabChange } =
    useUrlChange(setPreviewSection, idSection, selectedSectionToEdit);

  const {
    whatApps,
    setWhatApps,
    handlePhoneNumberChange,
    handleMessageChange,
    handleUrlOpenNewTabWaChange,
  } = useWhatAppsChange(setPreviewSection, idSection, selectedSectionToEdit);

  const {
    selectedOptionScrollTarget,
    setSelectedOptionScrollTarget,
    handleChangeScrollTarget,
  } = useSCrollTargetChange(
    setPreviewSection,
    idSection,
    selectedSectionToEdit
  );
  useEffect(() => {
    const currentSelectedOptionShadow = shadowOptions.find(
      (opt) => opt.value === selectedSectionToEdit.content.style.shadow
    );
    if (currentSelectedOptionShadow) {
      setSelectedButtonShadow(currentSelectedOptionShadow);
    }

    const currentSelectedOptionBtnSize = ButtonSizeOptions.find(
      (opt) => opt.value === selectedSectionToEdit.content.style.buttonSize
    );
    if (currentSelectedOptionBtnSize) {
      setSelectedButtonSize(currentSelectedOptionBtnSize);
    }

    const currentSelectedOptionRoundedBtn = roundedButtonOptions.find(
      (opt) => opt.value === selectedSectionToEdit.content.style.rounded
    );
    if (currentSelectedOptionRoundedBtn) {
      setSelectedRoundedButton(currentSelectedOptionRoundedBtn);
    }

    const currentSelectedOptionVariantBtn = variantButton.find(
      (opt) => opt.value === selectedSectionToEdit.content.style.variant
    );
    if (currentSelectedOptionVariantBtn) {
      setSelectedVariantButton(currentSelectedOptionVariantBtn);
    }
  }, [
    selectedSectionToEdit.content.style.buttonSize,
    selectedSectionToEdit.content.style.rounded,
    selectedSectionToEdit.content.style.shadow,
    selectedSectionToEdit.content.style.variant,
  ]);

  useEffect(() => {
    if (url?.url) {
      setSelectedOption({ value: "url", label: "URL" });
    }
  }, [url]);

  useEffect(() => {
    if (whatApps?.phoneNumber) {
      setSelectedOption({ value: "whatApps", label: "Whatapps" });
    }
  }, [whatApps]);

  useEffect(() => {
    if (
      selectedSectionToEdit.target &&
      selectedSectionToEdit.target?.scrollTarget?.value
    ) {
      setSelectedOption({ value: "scroll-target", label: "Scroll Target" });
      setSelectedOptionScrollTarget(selectedSectionToEdit.target?.scrollTarget);
    }
  }, [selectedSectionToEdit.target, setSelectedOptionScrollTarget]);

  const handleChangeOptions = (selectedOptionValue) => {
    setSelectedOption(selectedOptionValue);
    if (!selectedOptionValue.value) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === idSection
            ? {
                ...item,
                content: item.content.map((contentItem) =>
                  String(contentItem.id) === String(selectedSectionToEdit.id)
                    ? {
                        ...contentItem,
                        target: {},
                      }
                    : contentItem
                ),
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

  const handleChangeVariantButton = (selectedOptionValue) => {
    setSelectedVariantButton(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(selectedSectionToEdit.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        style: {
                          ...contentItem.content.style,
                          variant: selectedOptionValue.value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleChangeColorButton = (color) => {
    setSelectedColorButton(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(selectedSectionToEdit.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        style: {
                          ...contentItem.content.style,
                          btnColor: color,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleChangeColorText = (color) => {
    setSelectedColorText(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(selectedSectionToEdit.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        style: {
                          ...contentItem.content.style,
                          textColor: color,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleChangeRoundedButton = (selectedOptionValue) => {
    setSelectedRoundedButton(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(selectedSectionToEdit.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        style: {
                          ...contentItem.content.style,
                          rounded: selectedOptionValue.value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleChangeButtonSize = (selectedOptionValue) => {
    setSelectedButtonSize(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(selectedSectionToEdit.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        style: {
                          ...contentItem.content.style,
                          buttonSize: selectedOptionValue.value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleChangeButtonShadow = (selectedOptionValue) => {
    setSelectedButtonShadow(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(selectedSectionToEdit.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        style: {
                          ...contentItem.content.style,
                          shadow: selectedOptionValue.value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleTextChange = (value) => {
    setTitle(value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(selectedSectionToEdit.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        title: value,
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  useEffect(() => {
    if (
      selectedOption &&
      selectedOption.value === "scroll-target" &&
      selectedOptionScrollTarget &&
      optionsScrollTarget
    ) {
      const updatedOption = optionsScrollTarget.find(
        (option) => option.id === selectedOptionScrollTarget.id
      );

      if (!updatedOption) {
        setPreviewSection((arr) =>
          arr.map((item) =>
            String(item.id) === idSection
              ? {
                  ...item,
                  content: item.content.map((contentItem) =>
                    String(contentItem.id) === String(selectedSectionToEdit.id)
                      ? {
                          ...contentItem,
                          target: {},
                        }
                      : contentItem
                  ),
                }
              : item
          )
        );
        setSelectedOptionScrollTarget({
          value: "deleted",
          label: "--Di Hapus--",
        });
      } else {
        setPreviewSection((arr) =>
          arr.map((item) =>
            String(item.id) === idSection
              ? {
                  ...item,
                  content: item.content.map((contentItem) =>
                    String(contentItem.id) === String(selectedSectionToEdit.id)
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
  }, [optionsScrollTarget, selectedOption]);

  useEffect(() => {
    if (
      selectedOption &&
      selectedOption.value === "scroll-target" &&
      !selectedSectionToEdit.target?.scrollTarget?.value
    ) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === idSection
            ? {
                ...item,
                content: item.content.map((contentItem) =>
                  String(contentItem.id) === String(selectedSectionToEdit.id)
                    ? {
                        ...contentItem,
                        target: {
                          scrollTarget: optionsScrollTarget[0],
                        },
                      }
                    : contentItem
                ),
              }
            : item
        )
      );
      setSelectedOptionScrollTarget(optionsScrollTarget[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={selectedColorButton}
          label="Tombol"
          onChange={handleChangeColorButton}
        />

        <ColorPicker
          initialColor={selectedColorText}
          label="Teks"
          onChange={handleChangeColorText}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Desain"
          options={variantButton}
          onChange={handleChangeVariantButton}
          value={selectedVariantButton}
          width="50"
        />

        <SelectOptions
          label="Melingkar"
          options={roundedButtonOptions}
          onChange={handleChangeRoundedButton}
          value={selectedRoundedButton}
          width="50"
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Ukuran"
          options={ButtonSizeOptions}
          onChange={handleChangeButtonSize}
          value={selectedButtonSize}
          width="50"
        />

        <SelectOptions
          label="Bayangan"
          options={shadowOptions}
          onChange={handleChangeButtonShadow}
          value={selectedButtonShadow}
          width="50"
        />
      </div>

      <div className="form-group mb-2">
        <Input
          label="Teks"
          value={title}
          onChange={(event) => handleTextChange(event.target.value)}
          type="text"
        />
      </div>

      <h5>Link</h5>

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
            id="urlOpenNewTab"
            url={url}
            handleUrlChange={handleUrlChange}
            handleUrlOpenNewTabChange={handleUrlOpenNewTabChange}
          />
        )}

        {selectedOption?.value === "whatApps" && (
          <WhatsAppInput
            id="waOpenNewTab"
            whatApps={whatApps}
            handlePhoneNumberChange={handlePhoneNumberChange}
            handleMessageChange={handleMessageChange}
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
  );
};

export default EditButton;
