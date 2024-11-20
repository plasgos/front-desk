import React from "react";
import Select from "react-select";
import { CTooltip } from "@coreui/react";
import { FaCircleInfo } from "react-icons/fa6";

const ScrollTargetInput = ({
  optionsScrollTarget,
  handleChangeScrollTarget,
  selectedOptionScrollTarget,
}) => (
  <div className="form-group">
    <div className="d-flex align-items-center mb-2">
      <label className="p-0 m-0">Target</label>
      <CTooltip
        content={`Untuk menggunakan tipe link ini, mohon tambahkan seksi "Scroll Target di halaman ini"`}
      >
        <FaCircleInfo style={{ marginLeft: 4 }} size={12} />
      </CTooltip>
    </div>
    <Select
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#FED4C6",
        },
      })}
      classNames={{
        control: (state) =>
          state.isFocused ? "rounded  border-primary" : "rounded",
      }}
      options={optionsScrollTarget}
      styles={{
        groupHeading: (provided) => ({
          ...provided,
          fontWeight: "bold",
        }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          cursor: "text",
        }),
      }}
      onChange={(options) => handleChangeScrollTarget(options)}
      isSearchable={false}
      value={selectedOptionScrollTarget}
    />
  </div>
);

export default ScrollTargetInput;
