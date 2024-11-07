import React, { useEffect, useRef, useState } from "react";
import { createUniqueID } from "../../../../../../../lib/unique-id";

import { useDebounce } from "use-debounce";
import Input from "../../../../common/Input";
import { IoLocationSharp, IoLogoWhatsapp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import SelectOptions from "../../../../common/SelectOptions";

const typeOptions = [
  { value: "address", label: "Alamat", icon: <IoLocationSharp /> },
  { value: "phone", label: "Telepon", icon: <FaPhone /> },
  { value: "email", label: "Email", icon: <MdEmail /> },
  { value: "whatapps", label: "WhatApps", icon: <IoLogoWhatsapp /> },
];

const UpdateContent = ({
  currentSection,
  currentContent,
  selectedContent,
  setPreviewSection,
  isEditingContent,
}) => {
  const [text, setText] = useState(
    isEditingContent ? selectedContent?.type?.text : ""
  );

  const [textValue] = useDebounce(text, 300);

  useEffect(() => {
    if (textValue) {
      handleChangeContent("text", textValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textValue]);

  const [selectedType, setSelectedType] = useState(typeOptions[1]);

  const [setting, setSetting] = useState({});

  useEffect(() => {
    if (!isEditingContent) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingContent]);

  const contentIdToCheck = isEditingContent ? selectedContent.id : setting.id;

  useEffect(() => {
    const currentType = typeOptions.find(
      (opt) => opt.value === selectedContent?.type?.value
    );

    if (currentType) {
      setSelectedType(currentType);
    }
  }, [selectedContent]);

  const handleChangeContent = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        String(section.id) === currentSection?.id
          ? {
              ...section,
              content: section.content.map((content) =>
                content.id === currentContent?.id
                  ? {
                      ...content,
                      content: content.content.map((contentItem) => {
                        return String(contentItem.id) ===
                          String(contentIdToCheck)
                          ? {
                              ...contentItem,
                              type: {
                                ...contentItem.type,
                                [key]: value,
                              },
                            }
                          : contentItem;
                      }),
                    }
                  : content
              ),
            }
          : section
      )
    );
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentContent?.content);
    let payload = {
      id: uniqueId,
      type: {
        value: "phone",
        label: "Telepon",
        icon: <FaPhone />,
        text: "",
      },
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              content: section.content.map((content) =>
                content.id === currentContent?.id
                  ? {
                      ...content,
                      content: [...content.content, payload],
                    }
                  : content
              ),
            }
          : section
      )
    );

    setSetting(payload);
  };

  const handleChangeType = (selectedOption) => {
    const payload = {
      ...selectedOption,
      text: "",
    };

    setText("");

    setSelectedType(selectedOption);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((content) =>
                content.id === currentContent?.id
                  ? {
                      ...content,
                      content: content.content.map((contentItem) => {
                        return String(contentItem.id) ===
                          String(contentIdToCheck)
                          ? {
                              ...contentItem,
                              type: {
                                ...payload,
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

  const textareaRef = useRef(null);

  const autoResize = (el) => {
    if (el) {
      el.style.height = "40px"; // Reset height
      el.style.height = `${el.scrollHeight}px`; // Sesuaikan dengan konten
    }
  };

  useEffect(() => {
    // Gunakan requestAnimationFrame agar eksekusi terjadi setelah rendering selesai
    requestAnimationFrame(() => autoResize(textareaRef.current));
  }, [currentSection.content]);

  const placeholder =
    selectedType.value === "address"
      ? "Jl Layur 31 Jakarta Timur"
      : selectedType.value === "phone" || selectedType.value === "whatapps"
      ? "+629898123212"
      : "john@email.com";

  return (
    <>
      <div className="p-3">
        <form>
          <SelectOptions
            label="Type"
            options={typeOptions}
            onChange={handleChangeType}
            value={selectedType}
            width="100"
          />
        </form>

        {selectedType.value === "address" ? (
          <div>
            <label htmlFor="textAreaSales">{selectedType.label}</label>
            <textarea
              ref={textareaRef}
              id="address-footer"
              className="form-control"
              placeholder={placeholder}
              rows="1"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                overflow: "hidden",
                resize: "none",
                padding: 10,
                boxSizing: "border-box",
                minHeight: "50px",
              }}
            ></textarea>
          </div>
        ) : (
          <Input
            label={selectedType.label}
            placeholder={placeholder}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        )}
      </div>
    </>
  );
};

export default UpdateContent;
