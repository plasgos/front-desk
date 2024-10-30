import React from "react";

const Checkbox = ({ id, checked, onChange, label, disabled }) => (
  <div className="d-flex align-items-center my-1">
    <input
      disabled={disabled}
      id={id}
      checked={checked || false}
      onChange={onChange}
      style={{ cursor: "pointer" }}
      type="checkbox"
    />
    <label
      style={{ cursor: "pointer" }}
      htmlFor={id}
      className={`ml-1 mb-0 ${disabled && "tw-text-slate-400"}`}
    >
      {label}
    </label>
  </div>
);

export default Checkbox;
