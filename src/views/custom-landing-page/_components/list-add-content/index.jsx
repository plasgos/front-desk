import { CButton, CCard } from "@coreui/react";
import React, { useState } from "react";
import { MdImage, MdTitle, MdViewColumn } from "react-icons/md";
import Text from "./Text";
import ColumTextAndImage from "./ColumTextAndImage";
import ColumnSection from "../ColumnSection";

const ListContent = ({
  previewSection,
  setPreviewSection,
  sections,
  setSections,
  isShowContent,
}) => {
  const [addContent, setAddContent] = useState("");
  console.log("🚀 ~ addContent:", addContent);

  const onAddTitle = () => {
    setAddContent("text");
  };

  const onAddColumnTextAndImage = () => {
    setAddContent("column-text-and-image");
  };

  const handelCancelAddContent = () => {
    isShowContent(false);
    setAddContent("");
  };

  const dataListContent = [
    {
      name: "text",
      icon: <MdTitle style={{ marginRight: 5 }} size={24} />,
      action: onAddTitle,
    },
    {
      name: "column-text-and-image",
      icon: <MdViewColumn style={{ marginRight: 5 }} size={24} />,
      action: onAddColumnTextAndImage,
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      {!addContent && (
        <>
          <div className="d-flex justify-content-end align-items-center border-bottom p-2 mb-2">
            <div>
              <CButton
                onClick={handelCancelAddContent}
                color="primary"
                variant="outline"
                className="mx-2"
              >
                Batal
              </CButton>
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>Konten</div>
        </>
      )}

      {addContent === "text" ? (
        <Text
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sections={sections}
          setSections={(value) => setSections(value)}
          isShowContent={isShowContent}
          toggleAddContent={(value) => setAddContent(value)}
        />
      ) : null}

      {addContent === "column-text-and-image" && (
        <ColumnSection
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sections={sections}
          setSections={(value) => setSections(value)}
          isShowContent={isShowContent}
          toggleAddContent={(value) => setAddContent(value)}
        />
      )}

      {!addContent &&
        dataListContent.map((item, index) => (
          <CCard
            key={index}
            style={{ marginBottom: 10, cursor: "pointer" }}
            onClick={item.action}
          >
            <div className="d-flex align-items-center p-1">
              <div>{item.icon}</div>

              <div>{item.name}</div>
            </div>
          </CCard>
        ))}
    </div>
  );
};

export default ListContent;
