import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-slideshow-image/dist/styles.css";

export const EditContent = ({
  id,
  titleValue,
  descriptionValue,
  image,
  setTempSections,
}) => {
  const [imageUrl, setImageUrl] = useState(image);
  const [title, setTitle] = useState(titleValue);
  const [description, setDescription] = useState(descriptionValue);

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

  // Efek ini akan dipanggil setiap kali imageUrl berubah
  useEffect(() => {
    // Update tempSections setelah imageUrl berubah
    setTempSections((arr) =>
      arr.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              content: {
                ...item.content,
                image: imageUrl,
              },
            }
          : item
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleEditorChange = (value) => {
    setDescription(value);
    setTempSections((arr) =>
      arr.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              content: {
                ...item.content,
                description: value,
              },
            }
          : item
      )
    );
  };

  const handleTitleChange = (value) => {
    setTitle(value);
    setTempSections((arr) =>
      arr.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              content: {
                ...item.content,
                title: value,
              },
            }
          : item
      )
    );
  };

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
          onChange={handleEditorChange}
          className="text-editor rounded"
        />
      </div>
    </CCard>
  );
};
