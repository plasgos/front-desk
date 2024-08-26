import React from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "react-slideshow-image/dist/styles.css";

export const CustomReactQuill = ({ value, onChange, customStyle, version }) => {
  const versions = {
    basic: {
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          ["image"],
          ["link"],
          ["clean"],
        ],
        clipboard: {
          matchVisual: true,
        },
      },
      formats: [
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "image",
        "link",
        "clean",
      ],
    },
    full: {
      modules: {
        toolbar: [
          [{ header: "1" }, { header: "2" }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        clipboard: {
          matchVisual: true,
        },
      },
      formats: [
        "header",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "clean",
      ],
    },
  };

  // Get the module and format based on the version prop
  const { modules, formats } = versions[version] || versions.basic;

  return (
    <div>
      <ReactQuill
        modules={modules}
        formats={formats}
        theme="snow"
        value={value || ""}
        onChange={onChange}
        className={`${customStyle && "custom-quill"}  text-editor rounded`}
      />
    </div>
  );
};
