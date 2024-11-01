import { CButton, CCard, CTabContent } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { SearchForm } from "../common/SearchForm";
import ArrowMoved from "./arrow-moved";
import Buttons from "./button";
import CallToAction from "./call-to-action";
import ColumnTextAndImages from "./colum-text-and-image";
import CountDown from "./countdown";
import { dataListContent } from "./DataListContent";
import EmptySpace from "./empty-space/index";
import FAQ from "./faq";
import FbPixelEvent from "./fb-pixel-event";
import FloatingButton from "./floating-button";
import FloatingButtonCircle from "./floating-button-circle";
import FloatingContent from "./floating-content";
import FormActivity from "./form-activity";
import FormCheckout from "./form-checkout";
import Frames from "./frames";
import Image from "./image";
import ImageText from "./image-text";
import Line from "./line/index";
import ListFeature from "./list-feature";
import ListImagesControl from "./list-images/index";
import MultiColumnUpdate from "./multi-column-update";
import PopUp from "./popup";
import Quote from "./quote";
import SalesNotification from "./sales-notification";
import ScrollTarget from "./scroll-target/index";
import SliderImage from "./slider-image";
import StockCounter from "./stock-counter";
import Testimony from "./testimony";
import Text from "./text/index";
import Video from "./video";
import VideoText from "./video-text";
import Tabs from "./tabs";

const ListContent = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  previewFloatingSection,
  setPreviewFloatingSection,
  isMultiColumn,
  setIsAddColumnSectionMultiColumn,
  handleColumnFocus,
  handleSectionContentFocus,
  isPopUpSection,
  pageSetting,
}) => {
  const [addContent, setAddContent] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [filteredContents, setFilteredContents] = useState(dataListContent);
  useEffect(() => {
    if (isPopUpSection) {
      const sectionsPopUp = dataListContent.filter(
        (section) => section.group !== "Floating"
      );

      if (sectionsPopUp) {
        setFilteredContents(sectionsPopUp);
      }
    }
  }, [isPopUpSection]);

  const handleChangeContent = (value) => {
    setSearchContent(value);

    const sourceData = isPopUpSection
      ? dataListContent.filter((section) => section.group !== "Floating")
      : dataListContent;

    if (value.trim() === "") {
      setFilteredContents(sourceData);
      return;
    }

    const filteredData = sourceData
      .map((group) => {
        const filteredSections = group.sections.filter((section) =>
          section.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );

        const isGroupMatch = group.group
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());

        return {
          ...group,
          sections: isGroupMatch ? group.sections : filteredSections,
        };
      })
      .filter((group) => group.sections.length > 0);

    setFilteredContents(filteredData);
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

              <div
                style={{
                  boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.1)",
                }}
                className="px-3"
              >
                <SearchForm
                  placeholder="Cari"
                  value={searchContent}
                  onChange={(e) => handleChangeContent(e.target.value)}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div style={{ width: "100%", height: "100%" }}>
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
            hiddenFocused={isPopUpSection}
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
            hiddenFocused={isPopUpSection}
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
            hiddenFocused={isPopUpSection}
          />
        )}

        {addContent === "testimony" && (
          <Testimony
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={isShowContent}
            handleSectionContentFocus={handleSectionContentFocus}
            hiddenFocused={isPopUpSection}
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
            hiddenFocused={isPopUpSection}
          />
        )}

        {addContent === "form-checkout" && (
          <FormCheckout
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={isShowContent}
            handleSectionContentFocus={handleSectionContentFocus}
            hiddenFocused={isPopUpSection}
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

        {addContent === "sales-notification" && (
          <SalesNotification
            previewFloatingSection={previewFloatingSection}
            setPreviewFloatingSection={setPreviewFloatingSection}
            isShowContent={isShowContent}
          />
        )}

        {addContent === "floating-content" && (
          <FloatingContent
            previewFloatingSection={previewFloatingSection}
            setPreviewFloatingSection={setPreviewFloatingSection}
            isShowContent={isShowContent}
            handleSectionContentFocus={handleSectionContentFocus}
            handleColumnFocus={handleColumnFocus}
          />
        )}

        {addContent === "fb-pixel-event" && (
          <FbPixelEvent
            previewFloatingSection={previewFloatingSection}
            setPreviewFloatingSection={setPreviewFloatingSection}
            isShowContent={isShowContent}
          />
        )}

        {addContent === "popup" && (
          <PopUp
            previewFloatingSection={previewFloatingSection}
            setPreviewFloatingSection={setPreviewFloatingSection}
            isShowContent={isShowContent}
            handleSectionContentFocus={handleSectionContentFocus}
            handleColumnFocus={handleColumnFocus}
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

        {/* {addContent === "multi-column" && (
        <MultiColumn
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowMultiColumn={isShowContent}
          previewFloatingSection={previewFloatingSection}
          setPreviewFloatingSection={setPreviewFloatingSection}
          handleColumnFocus={handleColumnFocus}
        />
      )} */}

        {addContent === "multi-column" && (
          <MultiColumnUpdate
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={isShowContent}
            handleSectionContentFocus={handleSectionContentFocus}
            previewFloatingSection={previewFloatingSection}
            setPreviewFloatingSection={setPreviewFloatingSection}
            handleSectionFocus={handleColumnFocus}
            pageSetting={pageSetting}
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

        {addContent === "frames" && (
          <Frames
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={isShowContent}
            handleSectionContentFocus={handleSectionContentFocus}
            previewFloatingSection={previewFloatingSection}
            setPreviewFloatingSection={setPreviewFloatingSection}
            handleColumnFocus={handleColumnFocus}
          />
        )}

        {addContent === "stock-counter" && (
          <StockCounter
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={isShowContent}
          />
        )}

        {addContent === "arrow-moved" && (
          <ArrowMoved
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={isShowContent}
          />
        )}

        {addContent === "slider-image" && (
          <SliderImage
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={isShowContent}
          />
        )}

        {addContent === "tabs" && (
          <Tabs
            previewSection={previewSection}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={isShowContent}
            handleSectionFocus={handleColumnFocus}
          />
        )}

        <CTabContent
          style={{
            overflowY: "auto",
            paddingTop: 10,
            height: "calc(100vh - 139px)",
            paddingBottom: 50,
          }}
        >
          {!addContent && filteredContents.length > 0 ? (
            <div style={{ padding: "0px 20px" }}>
              {filteredContents.map((group, groupIndex) => {
                return (
                  <div key={groupIndex}>
                    <div className="mb-2 font-weight-bold">{group.group}</div>
                    {group.sections.map((section, index) => {
                      if (isPopUpSection) {
                      }

                      const existFloatingSectionSelected = isPopUpSection
                        ? null
                        : previewFloatingSection
                            .map((prevSection) => prevSection)
                            .some(
                              (prevSection) =>
                                (prevSection.name.includes("floating-button") ||
                                  prevSection.name.includes(
                                    "sales-notification"
                                  )) &&
                                prevSection.name === section.name
                            );

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
    </div>
  );
};

export default ListContent;
