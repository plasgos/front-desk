import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import image from "../../../../../assets/action-figure.jpg";
import { createUniqueID } from "../../../../../lib/unique-id";

import { useDebounce } from "use-debounce";
import Input from "../../common/Input";
import { CustomReactQuill } from "../../common/ReactQuill";
import TargetOptions from "../../common/TargetOptions";

export const UpdateContent = ({
  idSection,
  currentContent,
  setPreviewSection,
  isEditingContent,
}) => {
  const [imageUrl, setImageUrl] = useState(
    isEditingContent ? currentContent?.content?.image : image
  );
  const [title, setTitle] = useState(
    isEditingContent ? currentContent?.content?.title : "How awesome are you?"
  );
  const [description, setDescription] = useState(
    isEditingContent
      ? currentContent?.content?.description
      : "So awesome that you will not believe it"
  );

  const [titleValue] = useDebounce(title, 1000);
  const [descriptionValue] = useDebounce(description, 1000);
  const [setting, setSetting] = useState({});

  useEffect(() => {
    if (titleValue !== currentContent?.content?.title) {
      handleChangeContent("title", titleValue);
    }

    if (descriptionValue !== currentContent?.content?.description) {
      handleChangeContent("description", descriptionValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleValue, descriptionValue]);

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
                        image: imageUrl,
                      },
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

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
                      content: {
                        ...contentItem.content,
                        [key]: value,
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
    let uniqueId = createUniqueID(currentContent?.content);
    let payload = {
      id: uniqueId,
      content: {
        title,
        description,
        image: imageUrl,
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
              src={imageUrl || image}
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
          label="Judul"
          value={title}
          onChange={(e) => {
            const { value } = e.target;
            setTitle(value);
          }}
          type="text"
        />

        <TargetOptions
          setPreviewSection={setPreviewSection}
          sectionId={idSection}
          currentContent={isEditingContent ? currentContent : setting}
          isEditingContent={isEditingContent}
        />

        <CustomReactQuill
          value={description}
          onChange={(value) => {
            setDescription(value);
          }}
          version="basic"
        />
      </div>
    </CCard>
  );
};
