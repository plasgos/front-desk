import React, { useEffect, useState } from "react";
import { createUniqueID } from "../../../../../../../lib/unique-id";

import { FaFacebookSquare } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import Input from "../../../../common/Input";
import SelectOptions from "../../../../common/SelectOptions";

const typeOptions = [
  {
    value: "facebook",
    label: "Facebook",
    link: "https://www.facebook.com/",
    icon: {
      iconName: "square-facebook",
      prefix: "fab",
    },
  },
  {
    value: "twitter-X",
    label: "Twitter X",
    link: "https://twitter.com/",
    icon: {
      iconName: "square-x-twitter",
      prefix: "fab",
    },
  },
  {
    value: "instagram",
    label: "Instagram",
    link: "https://www.instagram.com/",
    icon: {
      iconName: "square-instagram",
      prefix: "fab",
    },
  },
  {
    value: "youtube",
    label: "Youtube",
    link: "https://www.youtube.com/channel/",
    icon: {
      iconName: "youtube",
      prefix: "fab",
    },
  },
  {
    value: "telegram",
    label: "Telegram",
    link: "https://t.me/",
    icon: {
      iconName: "telegram",
      prefix: "fab",
    },
  },
];

const UpdateContent = ({
  currentSection,
  currentContent,
  selectedContent,
  setPreviewSection,
  isEditingContent,
}) => {
  const [path, setPath] = useState(
    isEditingContent ? selectedContent?.type?.path : ""
  );

  const [pathValue] = useDebounce(path, 300);

  useEffect(() => {
    if (pathValue) {
      handleChangeContent("path", pathValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathValue]);

  const [selectedType, setSelectedType] = useState(typeOptions[0]);

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
        value: "facebook",
        label: "Facebook",
        link: "https://www.facebook.com/",
        icon: <FaFacebookSquare />,
        path: "",
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
      path: "",
    };

    setPath("");

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

        <Input
          label={selectedType.label}
          placeholder="@plasgos"
          value={path}
          onChange={(e) => {
            setPath(e.target.value);
          }}
        />

        {path && (
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${selectedType.link}${path}`}
            >
              {selectedType.link}
              {path}
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateContent;
