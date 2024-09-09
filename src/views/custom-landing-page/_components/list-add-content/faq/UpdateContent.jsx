import React, { useEffect, useState } from "react";
import Input from "../../common/Input";
import { createUniqueID } from "../../../../../lib/unique-id";
import { CustomReactQuill } from "../../common/ReactQuill";
import { useDebounce } from "use-debounce";

const UpdateContent = ({
  idSection,
  currentContent,
  setPreviewSection,
  isEditingContent,
}) => {
  const [title, setTitle] = useState(
    currentContent?.title || "How awesome are you?"
  );
  const [content, setContent] = useState(
    currentContent?.desc || "So awesome that you will not believe it"
  );

  const [titleValue] = useDebounce(title, 1000);
  const [contentValue] = useDebounce(content, 1000);

  useEffect(() => {
    if (titleValue !== currentContent?.title) {
      handleChangeContent("title", titleValue);
    }

    if (contentValue !== currentContent?.desc) {
      handleChangeContent("desc", contentValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleValue, contentValue]);

  const [setting, setSetting] = useState({});

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
                      [key]: value,
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
      title,
      desc: content,
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
    <div className="w-100">
      <Input
        label="Judul"
        value={title}
        onChange={(e) => {
          const { value } = e.target;
          setTitle(value);
        }}
        type="text"
      />

      <CustomReactQuill
        value={content}
        onChange={(value) => {
          setContent(value);
        }}
        version="basic"
      />
    </div>
  );
};

export default UpdateContent;
