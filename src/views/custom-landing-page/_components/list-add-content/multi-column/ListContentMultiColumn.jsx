import React, { useState } from "react";
import { dataListContent } from "../DataListContent";
import { CButton, CCard, CTabContent } from "@coreui/react";
import { SearchForm } from "../../common/SearchForm";
import Text from "./sections/text";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAddColumnSection,
  setIsEditingColumnSection,
} from "../../../../../redux/modules/custom-landing-page/reducer";
import ColumnTextAndImages from "./sections/colum-text-and-image";
import EmptySpace from "./sections/empty-space";
import ListImages from "./sections/list-images";
import ScrollTarget from "./sections/scroll-target";
import Quote from "./sections/quote";
import Image from "./sections/image";
import ImageText from "./sections/image-text";
import Line from "./sections/line";
import ListFeature from "./sections/list-feature";
import Testimony from "./sections/testimony";
import Buttons from "./sections/button";
import FAQ from "./sections/faq";
import FormCheckout from "./sections/form-checkout";
import Video from "./sections/video";
import VideoText from "./sections/video-text";

const ListContentMultiColumn = ({
  previewSection,
  setPreviewSection,
  sectionId,
  columnId,
}) => {
  const dispatch = useDispatch();

  const [addContent, setAddContent] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [filteredContents, setFilteredContents] = useState(dataListContent);
  const handleChangeContent = (value) => {
    setSearchContent(value);
    const filteredContents = dataListContent
      .map((group) => ({
        ...group,
        sections: group.sections
          .filter(
            (item) =>
              !item.name.includes("floating") && item.name !== "multi-column"
          )
          .filter((section) =>
            section.title
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase())
          ),
      }))
      .filter((group) => group.sections.length > 0); // Hapus grup yang tidak punya section yang lolos filter

    setFilteredContents(filteredContents);
  };

  const handleCancelAddContent = () => {
    dispatch(setIsAddColumnSection(false));
    dispatch(setIsEditingColumnSection(false));
    setAddContent("");
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

      {addContent === "text" && (
        <Text
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      {addContent === "column-text-and-image" && (
        <ColumnTextAndImages
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      {addContent === "empty-space" && (
        <EmptySpace
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      {addContent === "list-images" && (
        <ListImages
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      {addContent === "scroll-target" && (
        <ScrollTarget
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      {addContent === "button" && (
        <Buttons
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      {addContent === "testimony" && (
        <Testimony
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      {addContent === "line" && (
        <Line
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      {addContent === "list-feature" && (
        <ListFeature
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      {addContent === "quote" && (
        <Quote
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      {addContent === "faq" && (
        <FAQ
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      {addContent === "form-checkout" && (
        <FormCheckout
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      {addContent === "image" && (
        <Image
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      {addContent === "image-text" && (
        <ImageText
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      {addContent === "video" && (
        <Video
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      {addContent === "video-text" && (
        <VideoText
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          sectionId={sectionId}
          columnId={columnId}
        />
      )}

      <CTabContent
        style={{
          height: addContent ? 0 : 280,
          paddingRight: 5,
          paddingBottom: 20,
          overflowY: "auto",
        }}
      >
        {!addContent && filteredContents.length > 0 ? (
          <div>
            {filteredContents.map((group, groupIndex) => {
              return (
                <div key={groupIndex}>
                  <div className="mb-2 font-weight-bold">{group.group}</div>
                  {group.sections
                    .filter(
                      (item) =>
                        !item.name.includes("floating") &&
                        item.name !== "multi-column"
                    )
                    .map((section, index) => (
                      <CCard
                        key={index}
                        style={{ marginBottom: 10, cursor: "pointer" }}
                        onClick={() => section.action(setAddContent)}
                      >
                        <div className="d-flex align-items-center py-1 px-2">
                          <div>{section.icon}</div>
                          <div>{section.title}</div>
                        </div>
                      </CCard>
                    ))}
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

export default ListContentMultiColumn;
