import { CButton, CCard, CTabContent } from "@coreui/react";
import React, { useState } from "react";
import { MdTextFields, MdViewColumn } from "react-icons/md";
import { PiArrowsDownUpLight, PiTargetDuotone } from "react-icons/pi";
import { FaGripLines, FaListCheck } from "react-icons/fa6";
import Text from "./Text";
import ColumnSection from "../list-add-content/colum-text-and-image/ColumnSection";
import EmptySpace from "./EmptySpace";
import { IoMdImages } from "react-icons/io";
import ListImagesControl from "./list-images/ListImagesControl";
import ScrollTarget from "./ScrollTarget";
import { RxSwitch } from "react-icons/rx";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import ListButtonControl from "./button/ListButtonControl";
import ListTestimonyControl from "./testimony/ListTestimonyControl";
import Line from "./Line";
import ListFeature from "./ListFeature/index";

const ListContent = ({ previewSection, setPreviewSection, isShowContent }) => {
  const [addContent, setAddContent] = useState("");

  const handelCancelAddContent = () => {
    isShowContent(false);
    setAddContent("");
  };

  const dataListContent = [
    {
      name: "text",
      title: "Teks",
      icon: <MdTextFields style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("text"),
    },
    {
      name: "column-text-and-image",
      title: "Kolom Teks + Gambar",
      icon: <MdViewColumn style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("column-text-and-image"),
    },
    {
      name: "empty-space",
      title: "Ruang Kosong",
      icon: <PiArrowsDownUpLight style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("empty-space"),
    },
    {
      name: "list-images",
      title: "Daftar Gambar",
      icon: <IoMdImages style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("list-images"),
    },
    {
      name: "scroll-target",
      title: "Scroll Target",
      icon: <PiTargetDuotone style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("scroll-target"),
    },
    {
      name: "button",
      title: "Tombol",
      icon: <RxSwitch style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("button"),
    },
    {
      name: "testimony",
      title: "Testimoni / Review",
      icon: <BsFillChatSquareQuoteFill style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("testimony"),
    },
    {
      name: "line",
      title: "Garis",
      icon: <FaGripLines style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("line"),
    },
    {
      name: "list-feature",
      title: "Daftar Fitur",
      icon: <FaListCheck style={{ marginRight: 5 }} size={24} />,
      action: () => setAddContent("list-feature"),
    },
  ];

  return (
    <div style={{ width: "100%", height: 400 }}>
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
          isShowContent={isShowContent}
        />
      ) : null}

      {addContent === "column-text-and-image" && (
        <ColumnSection
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "empty-space" && (
        <EmptySpace
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "list-images" && (
        <ListImagesControl
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "scroll-target" && (
        <ScrollTarget
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "button" && (
        <ListButtonControl
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "testimony" && (
        <ListTestimonyControl
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "line" && (
        <Line
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "list-feature" && (
        <ListFeature
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      <CTabContent
        style={{
          height: addContent ? 0 : 340,
          paddingRight: 5,
          overflowY: "auto",
        }}
      >
        {!addContent &&
          dataListContent.map((item, index) => (
            <CCard
              key={index}
              style={{ marginBottom: 10, cursor: "pointer" }}
              onClick={item.action}
            >
              <div className="d-flex align-items-center py-1 px-2">
                <div>{item.icon}</div>
                <div>{item.title}</div>
              </div>
            </CCard>
          ))}
      </CTabContent>
    </div>
  );
};

export default ListContent;
