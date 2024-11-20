import React from "react";

import { FaMagnifyingGlass } from "react-icons/fa6";

export const SearchForm = ({ value, placeholder, onChange }) => {
  return (
    <div className="d-flex align-items-center  py-3">
      <input
        className="form-control"
        style={{ borderRadius: "0.5rem 0 0 0.5rem", height: 30 }}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div
        className="p-2 bg-secondary"
        style={{ borderRadius: "0px 0.5rem 0.5rem 0px", height: 30 }}
      >
        <span>
          <FaMagnifyingGlass size={14} />
        </span>
      </div>
    </div>
  );
};
