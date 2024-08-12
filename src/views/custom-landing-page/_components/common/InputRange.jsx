import React from "react";
import { CRow, CCol } from "@coreui/react";

const InputRange = ({
  label,
  value,
  handleChangeNumberInput,
  handleBlur,
  handleChangeRangeInput,
  min = 10,
  max = 1200,
}) => {
  return (
    <CRow className="align-items-center mb-3">
      {/* Label */}
      <CCol md={12}>
        <label className="mb-1">{label}</label>
      </CCol>

      {/* Input Number */}
      <CCol md={3}>
        <div className="input-group flex-nowrap">
          <input
            type="number"
            value={value !== 0 ? value : ""}
            className="form-control text-center"
            placeholder="0"
            onChange={handleChangeNumberInput}
            onBlur={handleBlur}
          />
        </div>
      </CCol>

      {/* Input Range */}
      <CCol md={8} className="p-0">
        <div style={{ gap: 10 }} className="d-flex align-items-center">
          <div className="text-secondary">{min}</div>
          <input
            style={{ cursor: "pointer", flexGrow: 1 }}
            type="range"
            className="form-range"
            id="rangeInput"
            min={min}
            max={max}
            value={value}
            onChange={handleChangeRangeInput}
          />
          <div className="text-secondary">{max}</div>
        </div>
      </CCol>
    </CRow>
  );
};

export default InputRange;
