import React from "react";

const Checkbox = ({ id, checked, onChange, label }) => (
  <div className="d-flex align-items-center my-1">
    <input
      id={id}
      checked={checked || false}
      onChange={onChange}
      style={{ cursor: "pointer" }}
      type="checkbox"
    />
    <label style={{ cursor: "pointer" }} htmlFor={id} className="ml-1 mb-0">
      {label}
    </label>
  </div>
);

export default Checkbox;
