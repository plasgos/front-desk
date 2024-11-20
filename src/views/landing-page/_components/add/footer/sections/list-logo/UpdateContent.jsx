import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { createUniqueID } from "../../../../../../../lib/unique-id";

import image from "../../../../../../../assets/anteraja logo.png";
import TargetOptionNavbarFooter from "../../common/TargetOptionNavbarFooter";

const UpdateContent = ({
  currentSection,
  currentContent,
  selectedContent,
  setPreviewSection,
  isEditingContent,
}) => {
  const [imageUrl, setImageUrl] = useState(
    isEditingContent ? selectedContent?.image : image
  );
  const [setting, setSetting] = useState({});

  useEffect(() => {
    if (!isEditingContent) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingContent]);

  const contentIdToCheck = isEditingContent ? selectedContent.id : setting.id;

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentContent?.content);
    let payload = {
      id: uniqueId,
      image: imageUrl,
      target: {},
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
                              image: imageUrl,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

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

      <TargetOptionNavbarFooter
        setPreviewSection={setPreviewSection}
        sectionId={currentSection?.id}
        currentContent={currentContent}
        contentIdToCheck={contentIdToCheck}
        isEditingContent={isEditingContent}
        selectedContent={isEditingContent ? selectedContent : setting}
      />
    </div>
  );
};

export default UpdateContent;
