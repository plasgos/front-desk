import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    // <CFooter fixed={false}>
    // </CFooter>
    <div
      className="d-flex justify-content-between align-items-center p-3 bg-secondary"
      style={{ height: 200 }}
    >
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
        <span className="ml-1">&copy; 2020 creativeLabs.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          href="https://coreui.io/react"
          target="_blank"
          rel="noopener noreferrer"
        >
          CoreUI for React
        </a>
      </div>
    </div>
  );
};

export default React.memo(TheFooter);
