import { CButton } from "@coreui/react";
import React from "react";

export const ButtonSection = ({ title }) => {
  return (
    <CButton
      style={{ whiteSpace: "nowrap" }}
      shape="pill"
      className="btn-outline-primary"
    >
      {title}
    </CButton>
  );
};
