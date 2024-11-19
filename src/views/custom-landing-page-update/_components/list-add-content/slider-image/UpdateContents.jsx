import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import slider1 from "../../../../../assets/slider-1.jpg";
import { createUniqueID } from "../../../../../lib/unique-id";

import { useDebounce } from "use-debounce";
import Input from "../../common/Input";
import TargetOptions from "../../common/TargetOptions";

const UpdateContents = ({
  setPreviewSection,
  currentSection,
  currentContent,
  isEditingContent,
}) => {
  const [imageUrl, setImageUrl] = useState(
    isEditingContent ? currentContent?.content?.image : slider1
  );

  const [alt, setAlt] = useState(
    isEditingContent ? currentContent?.content?.alt : ""
  );
  const [altValue] = useDebounce(alt, 300);

  const [setting, setSetting] = useState({});

  const handleChangeContent = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
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

  useEffect(() => {
    if (altValue !== currentContent?.content?.alt) {
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
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
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

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentContent?.content);
    let payload = {
      id: uniqueId,
      content: {
        image: imageUrl,
      },
      target: {},
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === currentSection?.id
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
    <div
      style={{ overflowY: "auto", height: "calc(100vh - 110px)" }}
      className="p-3"
    >
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
            src={imageUrl || slider1}
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

      <TargetOptions
        setPreviewSection={setPreviewSection}
        sectionId={currentSection?.id}
        currentContent={isEditingContent ? currentContent : setting}
        isEditingContent={isEditingContent}
      />
    </div>
  );
};

export default UpdateContents;
