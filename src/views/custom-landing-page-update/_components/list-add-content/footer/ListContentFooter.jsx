import { CButton, CCard, CTabContent } from "@coreui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaLink, FaMapLocationDot } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdTextFields } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import Newsletter from "./sections/NewsLetter";
import Text from "./sections/Text";
import ListLogo from "./sections/list-logo";

const listContentsFooterOption = [
  {
    name: "text",
    title: "Teks",
    icon: <MdTextFields style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("text"),
  },
  {
    name: "group-link",
    title: "Grup Link",
    icon: <FaLink style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("group-link"),
  },
  {
    name: "newsletter",
    title: "Berlangganan Newsletter",
    icon: <SlEnvolopeLetter style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("newsletter"),
  },
  {
    name: "social-link",
    title: "Link Sosial",
    icon: <IoShareSocialOutline style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("social-link"),
  },
  {
    name: "address",
    title: "Alamat",
    icon: <FaMapLocationDot style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("address"),
  },
  {
    name: "list-logo",
    title: "Daftar Logo",
    icon: <BsThreeDots style={{ marginRight: 5 }} size={24} />,
    action: (setAddContent) => setAddContent("list-logo"),
  },
];

const ListContentFooter = ({
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
        {addContent === "text" && (
          <Text
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={isShowContent}
            currentSection={currentSection}
          />
        )}

        {addContent === "newsletter" && (
          <Newsletter
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={isShowContent}
            currentSection={currentSection}
          />
        )}

        {addContent === "list-logo" && (
          <ListLogo
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={isShowContent}
            // currentSection={currentSection}
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
              {listContentsFooterOption.map((section, index) => {
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

export default ListContentFooter;
