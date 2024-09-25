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

const ListContentMultiColumn = ({
  previewSection,
  setPreviewSection,
  previewFloatingSection,
  setPreviewFloatingSection,
  sectionId,
  columnId,
}) => {
  const { multiColumnSection } = useSelector(
    (state) => state.customLandingPage
  );

  const dispatch = useDispatch();

  const [addContent, setAddContent] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [filteredContents, setFilteredContents] = useState(dataListContent);
  const handleChangeContent = (value) => {
    setSearchContent(value);
    const filteredContents = dataListContent.filter((content) =>
      content.title.toLowerCase().includes(value.toLowerCase())
    );

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
          <div style={{ marginBottom: 10 }}>Konten</div>
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

      {/* {addContent === "empty-space" && (
        <EmptySpace
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )} */}
      {/* 
      {addContent === "list-images" && (
      <ListImagesControl
        previewSection={previewSection}
        setPreviewSection={(value) => setPreviewSection(value)}
        isShowContent={isShowContent}
      />
    )} */}

      {/* {addContent === "scroll-target" && (
        <ScrollTarget
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )} */}
      {/* 
      {addContent === "button" && (
        <Buttons
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )} */}

      {/* {addContent === "testimony" && (
        <Testimony
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )} */}
      {/* 
      {addContent === "line" && (
        <Line
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )} */}

      {/* {addContent === "list-feature" && (
        <ListFeature
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )} */}

      {/* {addContent === "quote" && (
        <Quote
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )} */}
      {/* 
      {addContent === "faq" && (
        <FAQ
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )} */}
      {/* 
      {addContent === "form-checkout" && (
        <FormCheckout
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )} */}

      {/* {addContent === "floating-button" && (
        <FloatingButton
          previewFloatingSection={previewFloatingSection}
          setPreviewFloatingSection={setPreviewFloatingSection}
          isShowContent={isShowContent}
        />
      )} */}

      {/* {addContent === "image" && (
        <Image
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )} */}

      {/* {addContent === "image-text" && (
        <ImageText
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
        />
      )} */}

      {/* {addContent === "multi-column" && (
        <MultiColumn
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={isShowContent}
          previewFloatingSection={previewFloatingSection}
          setPreviewFloatingSection={setPreviewFloatingSection}
        />
      )} */}

      <CTabContent
        style={{
          height: addContent ? 0 : 280,
          paddingRight: 5,
          paddingBottom: 20,
          overflowY: "auto",
        }}
      >
        {!addContent && filteredContents.length > 0 ? (
          filteredContents.map((item, index) => (
            <CCard
              key={index}
              style={{ marginBottom: 10, cursor: "pointer" }}
              onClick={() => item.action(setAddContent)}
            >
              <div className="d-flex align-items-center py-1 px-2">
                <div>{item.icon}</div>
                <div>{item.title}</div>
              </div>
            </CCard>
          ))
        ) : searchContent && filteredContents.length === 0 ? (
          <div className="text-center my-3">Kontent tidak ada !</div>
        ) : null}
      </CTabContent>
    </div>
  );
};

export default ListContentMultiColumn;
