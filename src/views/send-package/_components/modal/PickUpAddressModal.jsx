import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React, { useState } from "react";
import { LiaExchangeAltSolid } from "react-icons/lia";

export const PickUpAddressModal = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <CButton
        variant="outline"
        color="primary"
        onClick={toggle}
        className="mr-1"
      >
        <LiaExchangeAltSolid size={18} className="mr-2" />
        <span>Ganti Pengirim</span>
      </CButton>
      <CModal centered show={modal} onClose={toggle}>
        <CModalHeader closeButton>
          <h4 className="text-center ml-auto">Alamat Pick Up</h4>
        </CModalHeader>
        <CModalBody>Lorem ipsum dolor...</CModalBody>
        <CModalFooter>
          <CButton color="primary">Do Something</CButton>{" "}
          <CButton color="secondary" onClick={toggle}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
