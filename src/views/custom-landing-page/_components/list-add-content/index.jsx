import { CButton, CCard } from "@coreui/react";
import React, { useState } from "react";
import { MdTextFields, MdViewColumn } from "react-icons/md";
import { PiArrowsDownUpLight, PiTargetDuotone } from "react-icons/pi";
import Text from "./Text";
import ColumnSection from "../list-add-content/colum-text-and-image/ColumnSection";
import EmptySpace from "./EmptySpace";
import { IoMdImages } from "react-icons/io";
import ListImagesControl from "./list-images/ListImagesContro;";
import ScrollTarget from "./ScrollTarget";

const ListContent = ({
  previewSection,
  setPreviewSection,
  sections,
  setSections,
  isShowContent,
}) => {
  const [addContent, setAddContent] = useState("");

  const handelCancelAddContent = () => {
    isShowContent(false);
    setAddContent("");
  };

  const dataListContent = [
    {
      name: "text",
      icon: <MdTextFields style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("text"),
    },
    {
      name: "column-text-and-image",
      icon: <MdViewColumn style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("column-text-and-image"),
    },
    {
      name: "empty-space",
      icon: <PiArrowsDownUpLight style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("empty-space"),
    },
    {
      name: "list-images",
      icon: <IoMdImages style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("list-images"),
    },
    {
      name: "scroll-target",
      icon: <PiTargetDuotone style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("scroll-target"),
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
          setSections={(value) => setSections(value)}
          isShowContent={isShowContent}
          toggleAddContent={(value) => setAddContent(value)}
        />
      ) : null}

      {addContent === "column-text-and-image" && (
        <ColumnSection
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          setSections={(value) => setSections(value)}
          isShowContent={isShowContent}
          toggleAddContent={(value) => setAddContent(value)}
        />
      )}

      {addContent === "empty-space" && (
        <EmptySpace
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          setSections={(value) => setSections(value)}
          isShowContent={isShowContent}
          toggleAddContent={(value) => setAddContent(value)}
        />
      )}

      {addContent === "list-images" && (
        <ListImagesControl
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sections={sections}
          setSections={(value) => setSections(value)}
          isShowContent={isShowContent}
          toggleAddContent={(value) => setAddContent(value)}
        />
      )}

      {addContent === "scroll-target" && (
        <ScrollTarget
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
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
