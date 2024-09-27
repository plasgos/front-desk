import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";

import image from "../../../../../../../assets/action-figure.jpg";
import Checkbox from "../../../../common/Checkbox";
import ColorPicker from "../../../../common/ColorPicker";
import Input from "../../../../common/Input";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";
import ScrollTargetInput from "../../../../common/ScrollTargetSelect";
import SelectOptions from "../../../../common/SelectOptions";
import UrlInput from "../../../../common/UrlInput";
import WhatsAppInput from "../../../../common/WhatAppsInput";
import FacebookPixel from "../../../../FacebookPixel";
import { shadowOptions } from "../../../../SelectOptions";
import { useSCrollTargetChangeMultiColumn } from "../../hooks/useScrolltargetChangeMultiColumn";
import { useUrlChangeMultiColumn } from "../../hooks/useUrlChangeMulitColumn";
import { useWhatAppsChangeMultiColumn } from "../../hooks/useWhatAppsChangeMultiColumn";
import { changeContentBySectionId } from "../../helper/changeContentBySectionId";
import { changeWrapperStyleMultiColumn } from "../../helper/changeWrapperStyleMultiColumn";

const ImageContent = ({
  sectionId,
  columnId,
  setPreviewSection,
  currentSection,
  currentContent,
  isEditingContent,
  selectedVariant,
}) => {
  console.log("🚀 ~ currentSection:", currentSection);
  const { optionsScrollTarget, optionsTarget } = useSelector(
    (state) => state.customLandingPage
  );

  const [imageUrl, setImageUrl] = useState(currentContent?.image || image);

  const [isDownloadImage, setIsDownloadImage] = useState(
    currentContent?.isDownloadImage || false
  );

  const [alt, setAlt] = useState(currentContent?.alt || "");

  const [shadow, setShadow] = useState(undefined);
  const [borderColor, setBorderColor] = useState(
    currentSection?.wrapperStyle?.borderColor || ""
  );

  const [width, setWidth] = useState(
    currentSection?.wrapperStyle?.width || 600
  );

  const [rotation, setRotation] = useState(
    currentSection?.wrapperStyle?.rotation || 0
  );

  const [altValue] = useDebounce(alt, 300);

  const [selectedOption, setSelectedOption] = useState(
    optionsTarget[0].options[0]
  );

  const { url, setUrl, handleUrlOpenNewTabChange } = useUrlChangeMultiColumn(
    sectionId,
    columnId,
    setPreviewSection,
    currentSection.id,
    currentContent
  );

  const { whatApps, setWhatApps, handleUrlOpenNewTabWaChange } =
    useWhatAppsChangeMultiColumn(
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
    const currentShadowOption = shadowOptions.find(
      (opt) => opt.value === currentSection?.wrapperStyle?.shadow
    );

    if (currentShadowOption) {
      setShadow(currentShadowOption);
    }
  }, [currentSection]);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingContent, optionsTarget]);

  const handleChangeContent = (key, value) => {
    const updateContent = {
      [key]: value,
    };

    changeContentBySectionId(
      setPreviewSection,
      sectionId,
      columnId,
      currentSection.id,
      currentContent.id,
      updateContent
    );
  };

  const handleChangeWrapperStyle = (key, value) => {
    const updateContent = {
      [key]: value,
    };

    changeWrapperStyleMultiColumn(
      setPreviewSection,
      sectionId,
      columnId,
      currentSection.id,
      updateContent
    );
  };

  useEffect(() => {
    if (
      currentContent &&
      Object.keys(currentContent).length > 0 &&
      altValue !== currentContent.alt
    ) {
      handleChangeContent("alt", altValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [altValue]);

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

    const updateContent = {
      image: imageUrl,
    };

    changeContentBySectionId(
      setPreviewSection,
      sectionId,
      columnId,
      currentSection?.id,
      currentContent?.id,
      updateContent
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleSetValueWhenBlurWrapperStyle = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "width") {
      setWidth(newValue);
    } else if (key === "rotation") {
      setRotation(newValue);
    }
    handleChangeWrapperStyle(key, newValue);
  };

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

  return (
    <div style={{ overflowX: "hidden" }}>
      {selectedVariant.value === "center" && (
        <div className="mb-2">
          <ColorPicker
            initialColor={borderColor}
            label="Garis Luar"
            onChange={(color) => {
              setBorderColor(color);
              handleChangeWrapperStyle("borderColor", color);
            }}
            bottom={"10px"}
          />
        </div>
      )}

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
            src={imageUrl}
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

      <Checkbox
        checked={isDownloadImage}
        id="isDownloadImage"
        label="Gambar Tidak Bisa Di Simpan"
        onChange={(e) => {
          const { checked } = e.target;
          setIsDownloadImage(checked);
          handleChangeContent("isDownloadImage", checked);
        }}
      />

      <SelectOptions
        label="Bayangan"
        options={shadowOptions}
        onChange={(selectedOption) => {
          setShadow(selectedOption);
          handleChangeWrapperStyle("shadow", selectedOption.value);
        }}
        value={shadow}
        width="50"
      />

      {selectedVariant.value === "center" && (
        <>
          <InputRangeWithNumber
            label="Lebar"
            value={width}
            onChange={(newValue) => {
              setWidth(newValue);
              handleChangeWrapperStyle("width", newValue);
            }}
            min={100}
            max={1200}
            onBlur={() =>
              handleSetValueWhenBlurWrapperStyle(width, 100, 1200, "width")
            }
          />
          <InputRangeWithNumber
            label="Rotasi"
            value={rotation}
            onChange={(newValue) => {
              setRotation(newValue);
              handleChangeWrapperStyle("rotation", newValue);
            }}
            min={-90}
            max={90}
            onBlur={() =>
              handleSetValueWhenBlurWrapperStyle(rotation, -90, 90, "rotation")
            }
          />
        </>
      )}

      <form>
        <SelectOptions
          label="Target"
          options={optionsTarget}
          onChange={handleChangeOptions}
          value={selectedOption}
          width="100"
          positionShown="top"
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
  );
};

export default ImageContent;
