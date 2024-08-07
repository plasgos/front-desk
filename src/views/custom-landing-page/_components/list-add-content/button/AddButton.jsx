import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { useSelector } from "react-redux";
import Select from "react-select";
import { createUniqueID } from "../../../../../lib/unique-id";
import { customStyles } from "./ListButtonControl";
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

const variantButton = [
  { value: "fill", label: "Fill" },
  { value: "ghost", label: "Ghost" },
];

const roundedButtonOptions = [
  { value: "rounded", label: "Kecil" },
  { value: "rounded-md", label: "Sedang" },
  { value: "rounded-lg", label: "Besar" },
  { value: "rounded-full", label: "Bulat" },
];

const ButtonSizeOptions = [
  { value: "sm", label: "Kecil" },
  { value: "md", label: "Sedang" },
  { value: "lg", label: "Besar" },
  { value: "xl", label: "Extra Besar" },
];

const ButtonShadowOptions = [
  { value: undefined, label: "Tidak Ada" },
  { value: "shadow", label: "Kecil" },
  { value: "shadow-md", label: "Sedang" },
  { value: "shadow-lg", label: "Besar" },
  { value: "shadow-xl", label: "Extra Besar" },
  { value: "shadow-2xl", label: "Blur" },
];

const AddButton = ({ idSection, sections, setPreviewSection }) => {
  const { optionsScrollTarget, optionsTarget } = useSelector(
    (state) => state.customLandingPage
  );
  const [selectedOption, setSelectedOption] = useState(
    optionsTarget[0].options[0]
  );

  const [setting, setSetting] = useState({});

  const [title, setTitle] = useState("Click Me");
  const [selectedVariantButton, setSelectedVariantButton] = useState(
    variantButton[0]
  );
  const [selectedColorButton, setSelectedColorButton] = useState("#2196F3");
  const [selectedColorText, setSelectedColorText] = useState("#FFFFFF");
  const [selectedRoundedButton, setSelectedRoundedButton] = useState(
    roundedButtonOptions[0]
  );
  const [selectedButtonSize, setSelectedButtonSize] = useState(
    ButtonSizeOptions[1]
  );
  const [selectedButtonShadow, setSelectedButtonShadow] = useState(
    ButtonShadowOptions[0]
  );

  const { url, handleUrlChange, handleUrlOpenNewTabChange } = useUrlChange(
    setPreviewSection,
    idSection,
    setting.id
  );

  const {
    whatApps,
    handlePhoneNumberChange,
    handleMessageChange,
    handleUrlOpenNewTabWaChange,
  } = useWhatAppsChange(setPreviewSection, idSection, setting.id);

  const {
    selectedOptionScrollTarget,
    setSelectedOptionScrollTarget,
    handleChangeScrollTarget,
  } = useSCrollTargetChange(setPreviewSection, idSection, setting.id);

  const handleChangeOptions = (selectedOptionValue) => {
    setSelectedOption(selectedOptionValue);
    if (!selectedOptionValue.value) {
      // const resetTarget = {
      //   url: {
      //     url: "",
      //     isOpenNewTab: false,
      //   },
      //   whatApps: {
      //     phoneNumber: "",
      //     message: "",
      //     isOpenNewTab: false,
      //   },
      //   scrollTarget: {
      //     id: "",
      //     value: "",
      //     label: "",
      //   },
      // };

      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === idSection
            ? {
                ...item,
                content: item.content.map((contentItem) =>
                  String(contentItem.id) === String(setting.id)
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
  };

  const handleChangeVariantButton = (selectedOption) => {
    setSelectedVariantButton(selectedOption);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        style: {
                          ...contentItem.content.style,
                          variant: selectedOption.value,
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
                String(contentItem.id) === String(setting.id)
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
                String(contentItem.id) === String(setting.id)
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

  const handleChangeRoundedButton = (selectedOption) => {
    setSelectedRoundedButton(selectedOption);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        style: {
                          ...contentItem.content.style,
                          rounded: selectedOption.value,
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

  const handleChangeButtonSize = (selectedOption) => {
    setSelectedButtonSize(selectedOption);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        style: {
                          ...contentItem.content.style,
                          buttonSize: selectedOption.value,
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

  const handleChangeButtonShadow = (selectedOption) => {
    setSelectedButtonShadow(selectedOption);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        style: {
                          ...contentItem.content.style,
                          shadow: selectedOption.value,
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
                String(contentItem.id) === String(setting.id)
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

  const handleAddContent = () => {
    let uniqueId = createUniqueID(sections);
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
    handleAddContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedOption && selectedOption.value === "scroll-target") {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === idSection
            ? {
                ...item,
                content: item.content.map((contentItem) =>
                  String(contentItem.id) === String(setting.id)
                    ? {
                        ...contentItem,
                        target: {
                          ...contentItem.target,
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
          options={ButtonShadowOptions}
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

export default AddButton;
