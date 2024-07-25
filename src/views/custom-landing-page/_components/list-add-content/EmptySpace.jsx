import { CButton, CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { createUniqueID } from "../../../../lib/unique-id";
import { PiArrowsDownUpLight } from "react-icons/pi";

const EmptySpace = ({
  previewSection,
  setPreviewSection,
  setSections,
  isShowContent,
  toggleAddContent,
}) => {
  const [height, setHeight] = useState(120);
  const [setting, setSetting] = useState({});

  const handleChange = (event) => {
    setHeight(+event.target.value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(setting.id)
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

  const handleBlur = (event) => {
    if (event.target.value > 1200) {
      setHeight(1200);
    } else if (event.target.value < 10) {
      setHeight(10);
    }
  };

  const handelCancel = () => {
    toggleAddContent("");
    isShowContent(false);
    setPreviewSection((prevSections) =>
      prevSections.filter((section) => section.id !== setting.id)
    );
  };

  const handelConfirm = () => {
    toggleAddContent("");
    isShowContent(false);
    setSections(previewSection);
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "empty-space",
      icon: <PiArrowsDownUpLight size={24} />,
      content: {
        height,
      },
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);
    setSetting(payload);
  };

  useEffect(() => {
    handleAddContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              onChange={(e) => setHeight(Number(e.target.value))}
              onBlur={handleBlur}
            />
          </div>
        </CCol>

        <CCol md={9} className="p-0">
          <div style={{ gap: 10 }} className="flex align-items-center">
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

export default EmptySpace;
