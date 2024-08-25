import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { shadowOptions } from "../../SelectOptions";
import { useUrlChange } from "../../../../../hooks/useUrlChange";
import { useWhatAppsChange } from "../../../../../hooks/useWhatAppsChange";
import { useSCrollTargetChange } from "../../../../../hooks/useScrolltargetChange";
import { createUniqueID } from "../../../../../lib/unique-id";
import ColorPicker from "../../common/ColorPicker";
import SelectOptions from "../../common/SelectOptions";
import Input from "../../common/Input";
import UrlInput from "../../common/UrlInput";
import WhatsAppInput from "../../common/WhatAppsInput";
import ScrollTargetInput from "../../common/ScrollTargetSelect";
import FacebookPixel from "../../FacebookPixel";

export const variantButton = [
  { value: "fill", label: "Fill" },
  { value: "ghost", label: "Ghost" },
];

export const roundedButtonOptions = [
  { value: "tw-rounded", label: "Kecil" },
  { value: "tw-rounded-md", label: "Sedang" },
  { value: "tw-rounded-lg", label: "Besar" },
  { value: "tw-rounded-full", label: "Bulat" },
];

export const ButtonSizeOptions = [
  { value: "sm", label: "Kecil" },
  { value: "md", label: "Sedang" },
  { value: "lg", label: "Besar" },
  { value: "xl", label: "Extra Besar" },
];

const UpdateContent = ({
  idSection,
  currentContent,
  setPreviewSection,
  isEditingContent,
}) => {
  const { optionsScrollTarget, optionsTarget } = useSelector(
    (state) => state.customLandingPage
  );
  const [setting, setSetting] = useState({});

  const [title, setTitle] = useState(
    currentContent?.content?.title || "Click Me"
  );
  const [selectedColorButton, setSelectedColorButton] = useState(
    currentContent?.content?.style?.btnColor || "#2196F3"
  );
  const [selectedColorText, setSelectedColorText] = useState(
    currentContent?.content?.style?.textColor || "#FFFFFF"
  );
  const [selectedOption, setSelectedOption] = useState(
    optionsTarget[0].options[0]
  );
  const [selectedVariantButton, setSelectedVariantButton] = useState(
    variantButton[0]
  );
  const [selectedRoundedButton, setSelectedRoundedButton] = useState(
    roundedButtonOptions[0]
  );
  const [selectedButtonSize, setSelectedButtonSize] = useState(
    ButtonSizeOptions[1]
  );
  const [selectedButtonShadow, setSelectedButtonShadow] = useState(
    shadowOptions[0]
  );

  const { url, setUrl, handleUrlChange, handleUrlOpenNewTabChange } =
    useUrlChange(
      setPreviewSection,
      idSection,
      isEditingContent ? currentContent : setting
    );

  const {
    whatApps,
    setWhatApps,
    handlePhoneNumberChange,
    handleMessageChange,
    handleUrlOpenNewTabWaChange,
  } = useWhatAppsChange(
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
      const { style: { shadow, buttonSize, rounded, variant } = {} } =
        currentContent.content || {};

      const currentSelectedOptionShadow = shadowOptions.find(
        (opt) => opt.value === shadow
      );
      if (currentSelectedOptionShadow) {
        setSelectedButtonShadow(currentSelectedOptionShadow);
      }

      const currentSelectedOptionBtnSize = ButtonSizeOptions.find(
        (opt) => opt.value === buttonSize
      );
      if (currentSelectedOptionBtnSize) {
        setSelectedButtonSize(currentSelectedOptionBtnSize);
      }

      const currentSelectedOptionRoundedBtn = roundedButtonOptions.find(
        (opt) => opt.value === rounded
      );
      if (currentSelectedOptionRoundedBtn) {
        setSelectedRoundedButton(currentSelectedOptionRoundedBtn);
      }

      const currentSelectedOptionVariantBtn = variantButton.find(
        (opt) => opt.value === variant
      );
      if (currentSelectedOptionVariantBtn) {
        setSelectedVariantButton(currentSelectedOptionVariantBtn);
      }
    }
  }, [currentContent, isEditingContent]);

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

  const handleChangeButtonStyle = (key, selectedOptionValue) => {
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
                        style: {
                          ...contentItem.content.style,
                          [key]: selectedOptionValue,
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

  const handleTextChange = (value) => {
    setTitle(value);
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
                        title: value,
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
        title,
        style: {
          variant: selectedVariantButton.value,
          btnColor: selectedColorButton,
          textColor: selectedColorText,
          rounded: selectedRoundedButton.value,
          buttonSize: selectedButtonSize.value,
          shadow: selectedButtonShadow.value,
        },
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
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={selectedColorButton}
          label="Tombol"
          onChange={(color) => {
            setSelectedColorButton(color);
            handleChangeButtonStyle("btnColor", color);
          }}
          bottom={"10px"}
        />

        <ColorPicker
          initialColor={selectedColorText}
          label="Teks"
          onChange={(color) => {
            setSelectedColorText(color);
            handleChangeButtonStyle("textColor", color);
          }}
          bottom={"10px"}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Desain"
          options={variantButton}
          onChange={(selectedOption) => {
            setSelectedVariantButton(selectedOption);
            handleChangeButtonStyle("variant", selectedOption.value);
          }}
          value={selectedVariantButton}
          width="50"
        />

        <SelectOptions
          label="Melingkar"
          options={roundedButtonOptions}
          onChange={(selectedOption) => {
            setSelectedRoundedButton(selectedOption);
            handleChangeButtonStyle("rounded", selectedOption.value);
          }}
          value={selectedRoundedButton}
          width="50"
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Ukuran"
          options={ButtonSizeOptions}
          onChange={(selectedOption) => {
            setSelectedButtonSize(selectedOption);
            handleChangeButtonStyle("buttonSize", selectedOption.value);
          }}
          value={selectedButtonSize}
          width="50"
        />

        <SelectOptions
          label="Bayangan"
          options={shadowOptions}
          onChange={(selectedOption) => {
            setSelectedButtonShadow(selectedOption);
            handleChangeButtonStyle("shadow", selectedOption.value);
          }}
          value={selectedButtonShadow}
          width="50"
        />
      </div>

      <Input
        label="Teks"
        value={title}
        onChange={(event) => handleTextChange(event.target.value)}
        type="text"
      />

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
            id="urlOpenNewTabBtn"
            url={url}
            handleUrlChange={handleUrlChange}
            handleUrlOpenNewTabChange={handleUrlOpenNewTabChange}
          />
        )}

        {selectedOption?.value === "whatApps" && (
          <WhatsAppInput
            id="waOpenNewTabBtn"
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

export default UpdateContent;
