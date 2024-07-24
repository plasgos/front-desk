import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import image from "../../../assets/action-figure.jpg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-slideshow-image/dist/styles.css";
import { createUniqueID } from "../../../lib/unique-id";

export const AddContent = ({
  idSection,
  sections,
  setSections,
  setPreviewSection,
}) => {
  const [imageUrl, setImageUrl] = useState(image);
  const [title, setTitle] = useState("How awesome are you?");
  const [description, setDescription] = useState(
    "So awesome that you will not believe it"
  );

  const [setting, setSetting] = useState({});
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
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
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

  const handleDescriptionChange = (value) => {
    setDescription(value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
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
                String(contentItem.id) === String(setting.id)
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

  const handleAddContent = () => {
    let uniqueId = createUniqueID(sections);
    let payload = {
      id: uniqueId,
      content: {
        title,
        description,
        image: imageUrl,
      },
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
    handleAddContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        <form>
          <div class="form-group">
            <label>Judul</label>
            <input
              value={title}
              onChange={(event) => handleTitleChange(event.target.value)}
              type="text"
              className="form-control"
            />
          </div>
        </form>

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
          onChange={handleDescriptionChange}
          className="text-editor rounded"
        />
      </div>
    </CCard>
  );
};
