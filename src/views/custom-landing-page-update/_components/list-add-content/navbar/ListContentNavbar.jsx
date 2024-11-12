import { CButton, CCard, CTabContent } from "@coreui/react";
import React, { useState } from "react";
import { BsMenuDown } from "react-icons/bs";
import { FaLink } from "react-icons/fa6";
import { LuSpace } from "react-icons/lu";
import { RiMenuAddLine } from "react-icons/ri";
import { SlMagnifier } from "react-icons/sl";
import { TiThMenuOutline } from "react-icons/ti";
import Link from "./sections/Link";
import Divider from "./sections/Divider";
import Menu from "./sections/menu";

export const listContentsNavbarOption = [
  {
    name: "link",
    title: "Link",
    icon: <FaLink style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("link"),
  },
  {
    name: "menu",
    title: "Menu",
    icon: <RiMenuAddLine style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("menu"),
  },
  {
    name: "big-menu",
    title: "Menu Besar",
    icon: <TiThMenuOutline style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("big-menu"),
  },
  {
    name: "menu-content",
    title: "Menu Konten",
    icon: <BsMenuDown style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("menu-content"),
  },
  {
    name: "search-product",
    title: "Pencarian Produk",
    icon: <SlMagnifier style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("search-product"),
  },
  {
    name: "divider",
    title: "Pemisah",
    icon: <LuSpace style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("divider"),
  },
];

const ListContentNavbar = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  currentSection,
}) => {
  const [addContent, setAddContent] = useState("");

  const handleCancelAddContent = () => {
    isShowContent(false);
  };

  const handleSelectSection = (action) => {
    action(setAddContent);
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          position: "sticky", // Navbar tetap terlihat saat di-scroll
          top: 0, // Menempel di atas container ini
          backgroundColor: "#fff",
          color: "#fff",
          zIndex: 1, // Pastikan berada di atas konten list
        }}
      >
        {!addContent && (
          <>
            <div>
              <div className="d-flex justify-content-end align-items-center border-bottom p-3 ">
                <div>
                  <CButton
                    onClick={handleCancelAddContent}
                    color="primary"
                    variant="outline"
                  >
                    Batal
                  </CButton>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {addContent === "link" && (
          <Link
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={isShowContent}
            currentSection={currentSection}
          />
        )}

        {addContent === "divider" && (
          <Divider
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={isShowContent}
            currentSection={currentSection}
          />
        )}

        {addContent === "menu" && (
          <Menu
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={isShowContent}
            currentSection={currentSection}
          />
        )}

        <CTabContent
          className="p-3"
          style={{
            overflowY: "auto",
          }}
        >
          {!addContent ? (
            <div>
              {listContentsNavbarOption.map((section, index) => {
                return (
                  <CCard
                    key={index}
                    style={{
                      marginBottom: 10,
                      cursor: "pointer",
                    }}
                    onClick={() => handleSelectSection(section.action)}
                  >
                    <div className="d-flex align-items-center py-1 px-2">
                      <div>{section.icon}</div>
                      <div>{section.title}</div>
                    </div>
                  </CCard>
                );
              })}
            </div>
          ) : null}
        </CTabContent>
      </div>
    </div>
  );
};

export default ListContentNavbar;
