import React, { useState } from "react";

import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../redux/modules/addresses/actions/actions";

export const AddressReceiver = () => {
  const [modal, setModal] = useState(false);
  const [selectedAdress, setSelectedAdress] = useState({});
  const [isSelectedAdress, setIsSelectedAdress] = useState({});

  const dispatch = useDispatch();

  const { address } = useSelector((state) => state.addresses);

  const getData = () => {
    // let payload = {
    //   token: "xxxx",
    // };
    dispatch(actions.getAddress());
  };

  const toggle = () => {
    setModal(!modal);
    getData();
  };

  console.log(selectedAdress);

  const onSubmit = (data) => {
    setSelectedAdress(data);

    console.log(data);

    setModal(false);
  };

  const defaultAddresses = address.data.filter(
    (address) => address.is_default === true
  );

  return (
    <div>
      <h1 className="heading">Checkout</h1>
      <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CCard style={{ borderRadius: 8 }} className="border-0 shadow-sm">
              <CCardHeader
                style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                className="sub-heading"
              >
                Alamat Penerima
              </CCardHeader>
              <CCardBody className="py-4">
                {Object.keys(selectedAdress).length === 0 ? (
                  defaultAddresses.map((address) => (
                    <div key={address.id}>
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
                    </div>
                  ))
                ) : (
                  <div key={address.id}>
                    <div className="d-flex align-items-center">
                      <h6 className="sub-heading mr-2 mt-2">
                        {selectedAdress.receiver_name}
                      </h6>
                      {selectedAdress.is_default && (
                        <CBadge color="success">Utama</CBadge>
                      )}
                    </div>
                    <div>{selectedAdress.phone_number}</div>
                    <div>{selectedAdress.address}</div>
                  </div>
                )}
              </CCardBody>
              <CCardFooter
                style={{
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                <CButton onClick={toggle} className="mr-1 border">
                  Pilih alamat penerima
                </CButton>
                <CModal show={modal} onClose={toggle}>
                  <CModalHeader closeButton>
                    <h4 className="text-center ml-auto">
                      Pilih Alamat Penerima
                    </h4>
                  </CModalHeader>
                  <CModalBody>
                    <div className="modal-overflow">
                      {address.data.map((address) => {
                        const selected = isSelectedAdress.id === address.id;

                        return (
                          <CCard
                            key={address.id}
                            onClick={() =>
                              setIsSelectedAdress({
                                ...address,
                              })
                            }
                            className="mb-2"
                          >
                            <CCardBody
                              style={{ cursor: "pointer" }}
                              className={`select-modal ${
                                selected && "modal-selected"
                              }`}
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
                    <CButton
                      onClick={() => onSubmit(isSelectedAdress)}
                      color="primary"
                    >
                      Pilih
                    </CButton>{" "}
                    <CButton color="secondary" onClick={toggle}>
                      Batal
                    </CButton>
                  </CModalFooter>
                </CModal>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
