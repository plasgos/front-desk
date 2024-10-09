import { CButton, CCard, CTabContent } from "@coreui/react";
import React, { useState } from "react";
import { SearchForm } from "../common/SearchForm";
import Buttons from "./button";
import CallToAction from "./call-to-action";
import ColumnTextAndImages from "./colum-text-and-image";
import { dataListContent } from "./DataListContent";
import EmptySpace from "./empty-space/index";
import FAQ from "./faq";
import FloatingButton from "./floating-button";
import FloatingButtonCircle from "./floating-button-circle";
import FormCheckout from "./form-checkout";
import Image from "./image";
import ImageText from "./image-text";
import Line from "./line/index";
import ListFeature from "./list-feature";
import ListImagesControl from "./list-images/index";
import MultiColumn from "./multi-column";
import Quote from "./quote";
import ScrollTarget from "./scroll-target/index";
import Testimony from "./testimony";
import Text from "./text/index";
import Video from "./video";
import VideoText from "./video-text";
import FormActivity from "./form-activity";
import CountDown from "./countdown";

const ListContent = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  previewFloatingSection,
  setPreviewFloatingSection,
  isMultiColumn,
  isAddColumnSectionMultiColumn,
  setIsAddColumnSectionMultiColumn,
  columnId,
  handleColumnFocus,
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
    if (isMultiColumn) {
      setIsAddColumnSectionMultiColumn(false);
    } else {
      isShowContent(false);
      setAddContent("");
    }
  };

  const handleSelectSection = (existSection, action) => {
    if (existSection) {
      return;
    } else {
      action(setAddContent);
    }
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
        />
      ) : null}

      {addContent === "column-text-and-image" && (
        <ColumnTextAndImages
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          handleSectionContentFocus={handleSectionContentFocus}
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
          handleSectionContentFocus={handleSectionContentFocus}
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
        <Buttons
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          handleSectionContentFocus={handleSectionContentFocus}
        />
      )}

      {addContent === "testimony" && (
        <Testimony
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          handleSectionContentFocus={handleSectionContentFocus}
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

      {addContent === "quote" && (
        <Quote
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "faq" && (
        <FAQ
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          handleSectionContentFocus={handleSectionContentFocus}
        />
      )}

      {addContent === "form-checkout" && (
        <FormCheckout
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          handleSectionContentFocus={handleSectionContentFocus}
        />
      )}

      {addContent === "floating-button" && (
        <FloatingButton
          previewFloatingSection={previewFloatingSection}
          setPreviewFloatingSection={setPreviewFloatingSection}
          isShowContent={isShowContent}
          handleSectionContentFocus={handleSectionContentFocus}
        />
      )}

      {addContent === "image" && (
        <Image
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "image-text" && (
        <ImageText
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "multi-column" && (
        <MultiColumn
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowMultiColumn={isShowContent}
          previewFloatingSection={previewFloatingSection}
          setPreviewFloatingSection={setPreviewFloatingSection}
          handleColumnFocus={handleColumnFocus}
        />
      )}

      {addContent === "video" && (
        <Video
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "video-text" && (
        <VideoText
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "call-to-action" && (
        <CallToAction
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "floating-button-circle" && (
        <FloatingButtonCircle
          previewFloatingSection={previewFloatingSection}
          setPreviewFloatingSection={setPreviewFloatingSection}
          isShowContent={isShowContent}
          handleSectionContentFocus={handleSectionContentFocus}
        />
      )}

      {addContent === "form-activity" && (
        <FormActivity
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

      {addContent === "countdown" && (
        <CountDown
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )}

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
                    const existFloatingSectionSelected = previewFloatingSection
                      .map((prevSection) => prevSection)
                      .some((prevSection) => prevSection.name === section.name);

                    return (
                      <CCard
                        key={index}
                        style={{
                          marginBottom: 10,
                          cursor: existFloatingSectionSelected
                            ? "not-allowed"
                            : "pointer",
                        }}
                        onClick={() =>
                          handleSelectSection(
                            existFloatingSectionSelected,
                            section.action
                          )
                        }
                      >
                        <div className="d-flex align-items-center py-1 px-2">
                          <div
                            className={`${
                              existFloatingSectionSelected && "text-secondary"
                            }`}
                          >
                            {section.icon}
                          </div>
                          <div
                            className={`${
                              existFloatingSectionSelected && "text-secondary"
                            }`}
                          >
                            {section.title}
                          </div>
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

export default ListContent;
