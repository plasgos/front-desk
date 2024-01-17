import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React, { useState } from "react";
import { LiaExchangeAltSolid } from "react-icons/lia";

export const PickUpAddressModal = ({
  address,
  setSelectedAddress,
  selectedAddress,
}) => {
  const [modal, setModal] = useState(false);
  const [isSelectedAddress, setIsSelectedAddress] = useState({});
  const toggle = () => {
    setModal(!modal);
  };

  const onSubmit = (data) => {
    setSelectedAddress(data);

    setModal(false);
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
        <CModalBody>
          <CModalBody>
            <div className="modal-overflow">
              {address.map((address) => {
                const selected =
                  isSelectedAddress && isSelectedAddress.id === address.id;

                const defaultSelected =
                  Object.keys(isSelectedAddress).length === 0 &&
                  selectedAddress.id === address.id;

                return (
                  <CCard
                    key={address.id}
                    onClick={() =>
                      setIsSelectedAddress({
                        ...address,
                      })
                    }
                    className="mb-2"
                  >
                    <CCardBody
                      style={{ cursor: "pointer" }}
                      className={` ${selected && " modal-selected"} ${
                        defaultSelected && " modal-selected"
                      }`}
                    >
                      <div className="d-flex align-items-center">
                        <h6 className="sub-heading mr-2 mt-2">
                          {address.name}
                        </h6>
                        {address.is_default && (
                          <CBadge color="success">Utama</CBadge>
                        )}
                      </div>
                      <div className="mb-2">{address.phone_number}</div>
                      <div>{address.address}</div>
                    </CCardBody>
                  </CCard>
                );
              })}
            </div>
          </CModalBody>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => onSubmit(isSelectedAddress)} color="primary">
            Pilih
          </CButton>{" "}
          <CButton color="secondary" onClick={toggle}>
            Batal
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
