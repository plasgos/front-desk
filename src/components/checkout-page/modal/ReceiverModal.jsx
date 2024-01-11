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
import { useDispatch } from "react-redux";
import { setCheckoutReceiver } from "../../../redux/modules/checkout/actions/actions";

export const ReceiverModal = ({ address, setSelectedAddress }) => {
  const [modal, setModal] = useState(false);
  const [isSelectedAddress, setIsSelectedAddress] = useState({});

  const dispatch = useDispatch();

  const toggle = () => {
    setModal(!modal);
  };

  const onSubmit = (data) => {
    setSelectedAddress(data);

    dispatch(
      setCheckoutReceiver({
        id: data.id,
        name: data.receiver_name,
        phone_number: data.phone_number,
        address: data.address,
        subdistrict_id: data.subdistrict_id,
        postal_code: data.postal_code,
        latitude: data.latitude,
        longitude: data.longitude,
      })
    );

    setModal(false);
  };

  return (
    <div>
      <CButton onClick={toggle} className="mr-1 border">
        Pilih alamat penerima
      </CButton>
      <CModal show={modal} onClose={toggle}>
        <CModalHeader closeButton>
          <h4 className="text-center ml-auto">Pilih Alamat Penerima</h4>
        </CModalHeader>
        <CModalBody>
          <div className="modal-overflow">
            {address.data.map((address) => {
              const selected = isSelectedAddress.id === address.id;

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
                    className={`select-modal ${selected && "modal-selected"}`}
                  >
                    <div className="d-flex align-items-center">
                      <h6 className="sub-heading mr-2 mt-2">
                        {address.receiver_name}
                      </h6>
                      {address.is_default && (
                        <CBadge color="success">Utama</CBadge>
                      )}
                    </div>
                    <div>{address.phone_number}</div>
                    <div>{address.address}</div>
                  </CCardBody>
                </CCard>
              );
            })}
          </div>
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
    </div>
  );
};
