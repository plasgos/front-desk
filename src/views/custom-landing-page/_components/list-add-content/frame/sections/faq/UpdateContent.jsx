import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import { CustomReactQuill } from "../../../../common/ReactQuill";
import { addSectionContent } from "../../helper/addSectionContent";
import Input from "../../../../common/Input";

const UpdateContent = ({
  idSection,
  currentContent,
  setPreviewSection,
  isEditingContent,
  sectionId,
}) => {
  const [title, setTitle] = useState(
    isEditingContent ? currentContent?.title : "How awesome are you?"
  );
  const [content, setContent] = useState(
    isEditingContent
      ? currentContent?.desc
      : "So awesome that you will not believe it"
  );

  const [titleValue] = useDebounce(title, 300);
  const [contentValue] = useDebounce(content, 300);

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
  const contentIdToCheck = isEditingContent ? currentContent.id : setting.id;

  const setValueContent = (newValue) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((content) =>
                content.id === idSection
                  ? {
                      ...content,
                      content: content.content.map((contentItem) =>
                        contentItem.id === contentIdToCheck
                          ? {
                              ...contentItem,
                              ...newValue,
                            }
                          : contentItem
                      ),
                    }
                  : content
              ),
            }
          : section
      )
    );
  };

  const handleChangeContent = (key, value) => {
    const newValue = {
      [key]: value,
    };
    setValueContent(newValue);
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentContent?.content);
    let payload = {
      id: uniqueId,
      title,
      desc: content,
    };

    addSectionContent(setPreviewSection, sectionId, idSection, payload);

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
