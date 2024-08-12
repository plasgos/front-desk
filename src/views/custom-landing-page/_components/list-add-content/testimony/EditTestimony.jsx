import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-slideshow-image/dist/styles.css";
import image from "../../../../../assets/profile.jpg";
import Input from "../../common/Input";

const EditTestimony = ({
  idSection,
  selectedSectionToEdit,
  setPreviewSection,
}) => {
  console.log("🚀 ~ selectedSectionToEdit:", selectedSectionToEdit);
  const [imageUrl, setImageUrl] = useState(selectedSectionToEdit.image);

  const [content, setContent] = useState(selectedSectionToEdit.content);

  const [name, setName] = useState(selectedSectionToEdit.name);

  const handleChangeName = (value) => {
    setName(value);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(idSection)
                  ? {
                      ...contentItem,
                      name: value,
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleContentChange = (value) => {
    setContent(value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(idSection)
                  ? {
                      ...contentItem,
                      content: value,
                    }
                  : contentItem
              ),
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
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(idSection)
                  ? {
                      ...contentItem,

                      image: imageUrl,
                    }
                  : contentItem
              ),
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
          onChange={(event) => handleChangeName(event.target.value)}
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
          value={content}
          onChange={handleContentChange}
          className="text-editor rounded"
        />
      </div>
    </CCard>
  );
};

export default EditTestimony;
