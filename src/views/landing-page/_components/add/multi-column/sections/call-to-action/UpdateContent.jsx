import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { changeContentBySectionId } from "../../helper/changeContentBySectionId";
import { useSCrollTargetChangeMultiColumn } from "../../hooks/useScrolltargetChangeMultiColumn";
import { useUrlChangeMultiColumn } from "../../hooks/useUrlChangeMulitColumn";
import { useWhatsappsChangeMultiColumn } from "../../hooks/useWhatsappsChangeMultiColumn";
import { CustomReactQuill } from "../../../../common/ReactQuill";
import { alignOptions, fontSizeOptions } from "../../../../SelectOptions";
import SelectOptions from "../../../../common/SelectOptions";
import FacebookPixel from "../../../../FacebookPixel";
import ScrollTargetInput from "../../../../common/ScrollTargetSelect";
import WhatsAppInput from "../../../../common/WhatsAppInput";
import UrlInput from "../../../../common/UrlInput";
import Checkbox from "../../../../common/Checkbox";
import ColorPicker from "../../../../common/ColorPicker";
import Input from "../../../../common/Input";

const UpdateContent = ({
  setPreviewSection,
  currentSection,
  currentContent,
  isEditingContent,
  sectionId,
  columnId,
}) => {
  const { optionsScrollTarget, optionsTarget } = useSelector(
    (state) => state.customLandingPage
  );

  const [selectedOption, setSelectedOption] = useState(
    optionsTarget[0].options[0]
  );

  const [textColor, setTextColor] = useState(
    currentContent?.textColor || "#000000"
  );

  const [textColorButton, setTextColorButton] = useState(
    currentContent?.textColorButton || "#ffffff"
  );

  const [buttonColor, setButtonColor] = useState(
    currentContent?.textColorButton || "#2196F3"
  );

  const [isGhostVariant, setIsGhostVariant] = useState(
    currentContent?.isGhostVariant || false
  );

  const [align, setAlign] = useState(alignOptions[1]);
  const [fontSize, setFontSize] = useState(fontSizeOptions[2]);
  const [text, setText] = useState(
    currentContent?.text || "Signup for free trial now!"
  );

  const [textButton, setTextButton] = useState(
    currentContent?.textButton || "Start Free Trial"
  );

  const [textButtonValue] = useDebounce(textButton, 300);
  const [textValue] = useDebounce(text, 300);

  useEffect(() => {
    if (textButtonValue !== currentContent?.textButton) {
      handleChangeContent("textButton", textButtonValue);
    }

    if (textValue !== currentContent?.text) {
      handleChangeContent("text", textValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textButtonValue, textValue]);
  const { url, setUrl, handleUrlOpenNewTabChange } = useUrlChangeMultiColumn(
    sectionId,
    columnId,
    setPreviewSection,
    currentSection.id,
    currentContent
  );

  const { whatsapp, setWhatApps, handleUrlOpenNewTabWaChange } =
    useWhatsappsChangeMultiColumn(
      sectionId,
      columnId,
      setPreviewSection,
      currentSection.id,
      currentContent
    );

  const {
    selectedOptionScrollTarget,
    setSelectedOptionScrollTarget,
    handleChangeScrollTarget,
  } = useSCrollTargetChangeMultiColumn(
    sectionId,
    columnId,
    setPreviewSection,
    currentSection.id,
    currentContent
  );

  useEffect(() => {
    if (isEditingContent) {
      const currentAlign = alignOptions.find(
        (opt) => opt.value === currentContent?.align
      );

      if (currentAlign) {
        setAlign(currentAlign);
      }

      const currentFontSize = fontSizeOptions.find(
        (opt) => opt.value === currentContent?.fontSize
      );

      if (currentFontSize) {
        setFontSize(currentFontSize);
      }
    }
  }, [currentContent, isEditingContent]);

  const handleChangeOptions = (selectedOptionValue) => {
    setSelectedOption(selectedOptionValue);
    if (!selectedOptionValue.value) {
      const updateContent = {
        target: {},
      };

      changeContentBySectionId(
        setPreviewSection,
        sectionId,
        columnId,
        currentSection?.id,
        currentContent?.id,
        updateContent
      );

      setSelectedOptionScrollTarget(undefined);
    }

    setWhatApps({});
    setUrl({});
    setSelectedOptionScrollTarget(undefined);
  };

  useEffect(() => {
    if (isEditingContent) {
      const currentTargetOption = optionsTarget
        .flatMap((group) => group.options)
        .find((opt) => {
          const targetType = currentContent?.target;
          return (
            (targetType?.scrollTarget && opt.value === "scroll-target") ||
            (targetType?.url && opt.value === "url") ||
            (targetType?.whatsapp && opt.value === "whatsapp")
          );
        });

      if (currentTargetOption) {
        setSelectedOption(currentTargetOption);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingContent, optionsTarget]);

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
                            content.id === currentSection.id
                              ? {
                                  ...content,
                                  content: content.content.map(
                                    (contentItem) => {
                                      return contentItem.id ===
                                        currentContent.id
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
                          content.id === currentSection.id
                            ? {
                                ...content,
                                content: content.content.map((contentItem) => {
                                  return contentItem.id === currentContent.id
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

  const handleChangeContent = (key, value) => {
    const updateContent = {
      [key]: value,
    };
    changeContentBySectionId(
      setPreviewSection,
      sectionId,
      columnId,
      currentSection?.id,
      currentContent?.id,
      updateContent
    );
  };

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={textColor}
          label="Teks"
          onChange={(color) => {
            setTextColor(color);
            handleChangeContent("textColor", color);
          }}
        />

        <ColorPicker
          initialColor={buttonColor}
          label="Tombol"
          onChange={(color) => {
            setButtonColor(color);
            handleChangeContent("buttonColor", color);
          }}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={textColorButton}
          label="Teks Tombol"
          onChange={(color) => {
            setTextColorButton(color);
            handleChangeContent("textColorButton", color);
          }}
        />
        <Checkbox
          label="Ghost Button"
          id="isGhostButton"
          checked={isGhostVariant}
          onChange={(e) => {
            const { checked } = e.target;
            setIsGhostVariant(checked);
            handleChangeContent("isGhostVariant", checked);
          }}
        />
      </div>

      <Input
        label="Button Teks"
        value={textButton}
        onChange={(event) => setTextButton(event.target.value)}
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
            id="urlOpenNewTabBtn"
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

        {selectedOption?.value === "whatsapp" && (
          <WhatsAppInput
            id="waOpenNewTabBtn"
            whatsapp={whatsapp}
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

      <div style={{ gap: 10 }} className="d-flex  align-items-center mb-3">
        <SelectOptions
          label="Ukuran Judul"
          options={fontSizeOptions}
          onChange={(selectedOption) => {
            setFontSize(selectedOption);
            handleChangeContent("fontSize", selectedOption.value);
          }}
          value={fontSize}
          width="50"
          positionShown="top"
        />

        <SelectOptions
          label="Align"
          options={alignOptions}
          onChange={(selectedOption) => {
            setAlign(selectedOption);
            handleChangeContent("align", selectedOption.value);
          }}
          value={align}
          width="50"
          positionShown="top"
        />
      </div>

      <CustomReactQuill
        value={text}
        onChange={(html) => setText(html)}
        version="full"
      />
    </div>
  );
};

export default UpdateContent;
