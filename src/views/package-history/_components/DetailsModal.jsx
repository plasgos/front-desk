import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React, { useState } from "react";

import { IoIosInformationCircleOutline } from "react-icons/io";

export const DetailsModal = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <CButton onClick={toggle} className="mr-1">
        <IoIosInformationCircleOutline size={24} />
      </CButton>
      <CModal show={modal} onClose={toggle}>
        <CModalHeader closeButton>Modal title</CModalHeader>
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
