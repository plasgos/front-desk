import { CButton, CCard, CTabContent } from "@coreui/react";
import React, { useState } from "react";
import { SearchForm } from "../../common/SearchForm";
import { dataListContent } from "../DataListContent";
import Text from "./sections/text";
import EmptySpace from "./sections/empty-space";
import ColumnTextAndImages from "./sections/colum-text-and-image";
import ScrollTarget from "./sections/scroll-target/index";
import ListImagesControl from "./sections/list-images";
import Line from "./sections/line";
import Quote from "./sections/quote";
import ListFeature from "./sections/list-feature";
import CallToAction from "./sections/call-to-action";
import Video from "./sections/video";
import VideoText from "./sections/video-text";
import Image from "./sections/image";
import ImageText from "./sections/image-text";
import CountDown from "./sections/countdown";
import FormActivity from "./sections/form-activity";
import Buttons from "./sections/button";
import FAQ from "./sections/faq";
import Testimony from "./sections/testimony";
import FormCheckout from "./sections/form-checkout";

const ListSections = ({
  sectionId,
  previewSection,
  setPreviewSection,
  isShowContent,
  handleSectionContentFocus,
}) => {
  const [addContent, setAddContent] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [filteredContents, setFilteredContents] = useState(dataListContent);
  const handleChangeContent = (value) => {
    setSearchContent(value);
    const filteredContents = dataListContent
      .map((group) => {
        // Filter sections berdasarkan title
        const filteredSections = group.sections.filter((section) =>
          section.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );

        // Periksa apakah grup.group cocok dengan pencarian
        const isGroupMatch = group.group
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());

        // Kembalikan grup dengan:
        // - Semua sections jika grup cocok dengan pencarian
        // - Hanya sections yang difilter jika grup tidak cocok
        return {
          ...group,
          sections: isGroupMatch ? group.sections : filteredSections,
        };
      })
      .filter((group) => group.sections.length > 0); // Hanya simpan grup yang memiliki section

    setFilteredContents(filteredContents);
  };

  const handleCancelAddContent = () => {
    isShowContent(false);
    setAddContent("");
  };

  const handleSelectSection = (action) => {
    action(setAddContent);
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      {!addContent && (
        <>
          <div className="d-flex justify-content-end align-items-center border-bottom p-2 mb-2">
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

          <SearchForm
            placeholder="Cari"
            value={searchContent}
            onChange={(e) => handleChangeContent(e.target.value)}
          />
        </>
      )}

      {addContent === "text" ? (
        <Text
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          sectionId={sectionId}
        />
      ) : null}

      {addContent === "column-text-and-image" && (
        <ColumnTextAndImages
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          handleSectionContentFocus={handleSectionContentFocus}
          sectionId={sectionId}
        />
      )}

      {addContent === "empty-space" && (
        <EmptySpace
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          sectionId={sectionId}
        />
      )}

      {addContent === "list-images" && (
        <ListImagesControl
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          sectionId={sectionId}
        />
      )}

      {addContent === "scroll-target" && (
        <ScrollTarget
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          sectionId={sectionId}
        />
      )}

      {addContent === "button" && (
        <Buttons
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          handleSectionContentFocus={handleSectionContentFocus}
          sectionId={sectionId}
        />
      )}

      {addContent === "testimony" && (
        <Testimony
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          handleSectionContentFocus={handleSectionContentFocus}
          sectionId={sectionId}
          s
        />
      )}

      {addContent === "line" && (
        <Line
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          sectionId={sectionId}
        />
      )}

      {addContent === "list-feature" && (
        <ListFeature
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          sectionId={sectionId}
        />
      )}

      {addContent === "quote" && (
        <Quote
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          sectionId={sectionId}
        />
      )}

      {addContent === "faq" && (
        <FAQ
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          handleSectionContentFocus={handleSectionContentFocus}
          sectionId={sectionId}
        />
      )}

      {addContent === "form-checkout" && (
        <FormCheckout
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          handleSectionContentFocus={handleSectionContentFocus}
          sectionId={sectionId}
        />
      )}

      {addContent === "image" && (
        <Image
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          sectionId={sectionId}
        />
      )}

      {addContent === "image-text" && (
        <ImageText
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          sectionId={sectionId}
        />
      )}

      {addContent === "video" && (
        <Video
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          sectionId={sectionId}
        />
      )}

      {addContent === "video-text" && (
        <VideoText
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          sectionId={sectionId}
        />
      )}

      {addContent === "call-to-action" && (
        <CallToAction
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          sectionId={sectionId}
        />
      )}

      {addContent === "form-activity" && (
        <FormActivity
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          sectionId={sectionId}
        />
      )}

      {addContent === "countdown" && (
        <CountDown
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          sectionId={sectionId}
        />
      )}
      {/* 
      {addContent === "frame" && (
        <Frame
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          handleSectionContentFocus={handleSectionContentFocus}
        />
      )}  */}

      <CTabContent
        style={{
          height: addContent ? 0 : 280,
          paddingRight: 5,
          overflowY: "auto",
        }}
      >
        {!addContent && filteredContents.length > 0 ? (
          <div>
            {filteredContents.map((group, groupIndex) => {
              return (
                <div key={groupIndex}>
                  <div className="mb-2 font-weight-bold">{group.group}</div>
                  {group.sections.map((section, index) => {
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
              );
            })}
          </div>
        ) : searchContent && filteredContents.length === 0 ? (
          <div className="text-center my-3">Kontent tidak ada !</div>
        ) : null}
      </CTabContent>
    </div>
  );
};

export default ListSections;
