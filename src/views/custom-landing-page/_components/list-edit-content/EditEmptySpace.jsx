import { CButton, CCol, CRow } from "@coreui/react";
import React, { useState } from "react";

const EditEmptySpace = ({
  curentSection,
  setPreviewSection,
  isShowContent,
  sectionBeforeEdit,
}) => {
  const [height, setHeight] = useState(curentSection.content.height);
  const handleChange = (event) => {
    setHeight(+event.target.value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(curentSection.id)
          ? {
              ...item,
              content: {
                height: +event.target.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeHeight = (event) => {
    setHeight(+event.target.value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(curentSection.id)
          ? {
              ...item,
              content: {
                height: +event.target.value,
              },
            }
          : item
      )
    );
  };

  const handleSetHeightWhenBlur = () => {
    if (height > 1200) {
      setHeight(1200);
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === String(curentSection.id)
            ? {
                ...item,
                content: {
                  height: 1200,
                },
              }
            : item
        )
      );
    } else if (height < 10) {
      setHeight(10);
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === String(curentSection.id)
            ? {
                ...item,
                content: {
                  height: 10,
                },
              }
            : item
        )
      );
    }
  };

  const handleBlur = () => {
    handleSetHeightWhenBlur();
  };

  const handelCancel = () => {
    isShowContent("");
    setPreviewSection([...sectionBeforeEdit]);
  };

  const handelConfirm = () => {
    handleSetHeightWhenBlur();
    isShowContent("");
  };

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center border-bottom p-2 mb-3">
        <div>
          <CButton
            onClick={handelCancel}
            color="primary"
            variant="outline"
            className="mx-2"
          >
            Batal
          </CButton>

          <CButton onClick={handelConfirm} color="primary">
            Selesai
          </CButton>
        </div>
      </div>

      <CRow className="align-items-center">
        <CCol md={3}>
          <div className="input-group flex-nowrap">
            <input
              type="number"
              value={height !== 0 ? height : ""}
              className="form-control text-center"
              placeholder="0"
              onChange={handleChangeHeight}
              onBlur={handleBlur}
            />
          </div>
        </CCol>

        <CCol md={9} className="p-0">
          <div style={{ gap: 10 }} className="d-flex align-items-center">
            <div className="text-secondary">10</div>
            <input
              style={{ cursor: "pointer", flexGrow: 1 }}
              type="range"
              className="form-range"
              id="rangeInput"
              min="10"
              max="1200"
              value={height}
              onChange={handleChange}
            />

            <div className="text-secondary">1200</div>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default EditEmptySpace;
