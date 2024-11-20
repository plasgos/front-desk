import { CButton } from "@coreui/react";
import React from "react";

const Confirmation = ({ handleCancel, handleConfirm }) => {
  return (
    <div
      style={{
        position: "sticky", // Navbar tetap terlihat saat di-scroll
        top: 0, // Menempel di atas container ini
        backgroundColor: "#fff",
        color: "#fff",
        zIndex: 1, // Pastikan berada di atas konten list
      }}
    >
      <div className="d-flex justify-content-end align-items-center border-bottom p-3">
        <div>
          <CButton
            onClick={handleCancel}
            color="primary"
            variant="outline"
            className="mx-2"
          >
            Kembali
          </CButton>
          <CButton onClick={handleConfirm} color="primary">
            Selesai
          </CButton>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
