import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-slideshow-image/dist/styles.css";

import FacebookPixel from "../../FacebookPixel";
import { useSelector } from "react-redux";
import { useSCrollTargetChange } from "../../../../../hooks/useScrolltargetChange";
import { useWhatAppsChange } from "../../../../../hooks/useWhatAppsChange";
import { useUrlChange } from "../../../../../hooks/useUrlChange";
import ScrollTargetInput from "../../common/ScrollTargetSelect";
import WhatsAppInput from "../../common/WhatAppsInput";
import UrlInput from "../../common/UrlInput";
import SelectOptions from "../../common/SelectOptions";
import Input from "../../common/Input";

export const EditContent = ({
  idSection,
  selectedSectionToEdit,
  setPreviewSection,
}) => {
  const { optionsScrollTarget, optionsTarget } = useSelector(
    (state) => state.customLandingPage
  );

  const [imageUrl, setImageUrl] = useState(selectedSectionToEdit.content.image);
  const [title, setTitle] = useState(selectedSectionToEdit.content.title);
  const [description, setDescription] = useState(
    selectedSectionToEdit.content.description
  );

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

  const [selectedOption, setSelectedOption] = useState(
    optionsTarget[0].options[0]
  );

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

  // Efek ini akan dipanggil setiap kali imageUrl berubah
  useEffect(() => {
    // Update tempSections setelah imageUrl berubah
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
                        image: imageUrl,
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleEditorChange = (value) => {
    setDescription(value);
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
                        description: value,
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleTitleChange = (value) => {
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
              src={imageUrl || selectedSectionToEdit.content.image}
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

        <form>
          <SelectOptions
            label="Desain"
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

          <Input
            label="Judul"
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            type="text"
          />
        </form>

        {selectedOption.value !== undefined && <FacebookPixel />}

        <ReactQuill
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              ["image"],
              ["link"],
              ["clean"],
            ],
            clipboard: {
              // toggle to add extra line breaks when pasting HTML:
              matchVisual: true,
            },
          }}
          formats={[
            "bold",
            "italic",
            "underline",
            "strike",
            "color",
            "background",
            "image",
            "link",
            "clean",
          ]}
          theme="snow"
          value={description}
          onChange={handleEditorChange}
          className="text-editor rounded"
        />
      </div>
    </CCard>
  );
};
