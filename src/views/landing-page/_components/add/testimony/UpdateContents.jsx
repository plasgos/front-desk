import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import defaultImage from "../../../../../assets/profile.jpg";
import Input from "../../common/Input";
import { createUniqueID } from "../../../../../lib/unique-id";
import { CustomReactQuill } from "../../common/ReactQuill";
import { useDebounce } from "use-debounce";

export const UpdateContents = ({
  idSection,
  currentContent,
  setPreviewSection,
  isEditingContent,
}) => {
  const [imageUrl, setImageUrl] = useState(
    isEditingContent ? currentContent?.image : defaultImage
  );

  const [content, setContent] = useState(
    isEditingContent
      ? currentContent?.content
      : "Super bagus sekali barangnya. Paling mantab!"
  );

  const [name, setName] = useState(
    isEditingContent ? currentContent?.name : "John Doe"
  );

  const [nameValue] = useDebounce(name, 300);
  const [contentValue] = useDebounce(content, 300);
  useEffect(() => {
    if (nameValue !== currentContent?.name) {
      handleChangeContent("name", nameValue);
    }

    if (contentValue !== currentContent?.content) {
      handleChangeContent("content", contentValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameValue, contentValue]);

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

                      image: imageUrl,
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

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

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentContent?.content);
    let payload = {
      id: uniqueId,
      name,
      image: imageUrl,
      content: content,
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
        <Input
          label="Nama"
          type="text"
          value={name}
          onChange={(e) => {
            const { value } = e.target;
            setName(value);
          }}
        />

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
              src={imageUrl || defaultImage}
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

        <CustomReactQuill
          value={content}
          onChange={(value) => {
            setContent(value);
          }}
          version="basic"
        />
      </div>
    </CCard>
  );
};
