import React from "react";
import { CButton, CModal, CModalBody, CModalFooter } from "@coreui/react";
import { PiWarningDiamondFill } from "react-icons/pi";

const ModalConfirmation = ({ show, toggleModal, setPreviewSection }) => {
  const handleConfirmCancel = () => {
    setPreviewSection([]);
    toggleModal();
  };

  return (
    <>
      <CModal show={show} onClose={toggleModal}>
        <CModalBody>
          <div className="d-flex align-items-center">
            <PiWarningDiamondFill
              size={80}
              style={{ marginRight: 10, color: "#FFCC00" }}
            />

            <div>
              <div className="font-weight-bold font-lg mb-2">
                {" "}
                Apakah Anda Yakin ?
              </div>

              <div style={{ lineHeight: 1.3 }} className="font-sm">
                Semua Perubahan Tidak Akan Tersimpan, Apakah Anda yakin ingin
                membatalkan?
              </div>
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={toggleModal}>
            Tidak
          </CButton>
          <CButton color="primary" onClick={handleConfirmCancel}>
            Ya, Batalkan
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ModalConfirmation;
