import { CButton } from "@coreui/react";
import React from "react";

export const ButtonSection = ({ title, icon }) => {
  return (
    <CButton
      style={{ whiteSpace: "nowrap" }}
      shape="pill"
      className="btn-outline-primary mr-2 mb-2"
    >
      {icon}
      {title}
    </CButton>
  );
};
