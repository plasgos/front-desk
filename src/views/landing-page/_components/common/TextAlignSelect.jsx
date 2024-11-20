import { CFormGroup, CLabel } from "@coreui/react";
import React, { useEffect, useState } from "react";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
} from "react-icons/fa";

const TextAlignSelect = ({ initialValue, onChange }) => {
  const [selectAlign, setSelectAlign] = useState(initialValue);

  useEffect(() => {
    setSelectAlign(initialValue);
  }, [initialValue]);

  return (
    <div>
      <CFormGroup>
        <CLabel className="mb-2">Posisi Teks</CLabel>
        <div className="d-flex justify-content-start">
          <div
            className={`d-flex align-items-center justify-content-center mr-1 rounded ${
              selectAlign === "tw-text-left"
                ? "bg-primary border-primary text-white"
                : "bg-white border-dark"
            }`}
            style={{ cursor: "pointer", width: 35, height: 35 }}
            data-value="tw-text-left"
            onClick={({ currentTarget }) => {
              const value = currentTarget.dataset.value;
              setSelectAlign(value);
              onChange("textAlign", value);
            }}
          >
            <FaAlignLeft style={{ fontSize: 15 }} />
          </div>
          <div
            className={`d-flex align-items-center justify-content-center mr-1 rounded ${
              selectAlign === "tw-text-center"
                ? "bg-primary border-primary text-white"
                : "bg-white border-dark"
            }`}
            style={{ cursor: "pointer", width: 35, height: 35 }}
            data-value="tw-text-center"
            onClick={({ currentTarget }) => {
              const value = currentTarget.dataset.value;
              setSelectAlign(value);
              onChange("textAlign", value);
            }}
          >
            <FaAlignCenter style={{ fontSize: 15 }} />
          </div>
          <div
            className={`d-flex align-items-center justify-content-center mr-1 rounded ${
              selectAlign === "tw-text-right"
                ? "bg-primary border-primary text-white"
                : "bg-white border-dark"
            }`}
            style={{ cursor: "pointer", width: 35, height: 35 }}
            data-value="tw-text-right"
            onClick={({ currentTarget }) => {
              const value = currentTarget.dataset.value;
              setSelectAlign(value);
              onChange("textAlign", value);
            }}
          >
            <FaAlignRight style={{ fontSize: 15 }} />
          </div>
          <div
            className={`d-flex align-items-center justify-content-center mr-1 rounded ${
              selectAlign === "tw-text-justify"
                ? "bg-primary border-primary text-white"
                : "bg-white border-dark"
            }`}
            style={{ cursor: "pointer", width: 35, height: 35 }}
            data-value="tw-text-justify"
            onClick={({ currentTarget }) => {
              const value = currentTarget.dataset.value;
              setSelectAlign(value);
              onChange("textAlign", value);
            }}
          >
            <FaAlignJustify style={{ fontSize: 15 }} />
          </div>
        </div>
      </CFormGroup>
    </div>
  );
};

export default TextAlignSelect;
