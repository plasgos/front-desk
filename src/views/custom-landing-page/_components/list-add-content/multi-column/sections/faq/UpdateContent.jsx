import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import Input from "../../../../common/Input";
import { CustomReactQuill } from "../../../../common/ReactQuill";
import { addContentBySectionId } from "../../helper/addContentBySectionId";
import { changeContentBySectionId } from "../../helper/changeContentBySectionId";

const UpdateContent = ({
  idSection: contentId,
  currentContent,
  setPreviewSection,
  isEditingContent,
  sectionId,
  columnId,
}) => {
  const [title, setTitle] = useState(
    currentContent?.title || "How awesome are you?"
  );
  const [content, setContent] = useState(
    currentContent?.desc || "So awesome that you will not believe it"
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

  const handleChangeContent = (key, value) => {
    const updateContent = {
      [key]: value,
    };

    changeContentBySectionId(
      setPreviewSection,
      sectionId,
      columnId,
      contentId,
      contentIdToCheck,
      updateContent
    );
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentContent);
    let payload = {
      id: uniqueId,
      title,
      desc: content,
    };

    addContentBySectionId(
      setPreviewSection,
      sectionId,
      columnId,
      contentId,
      payload
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
