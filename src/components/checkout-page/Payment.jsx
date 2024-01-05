import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";
import React, { useState } from "react";

import bca from "../../assets/bca.png";
import bri from "../../assets/bri.png";
import mandiri from "../../assets/mandiri.png";

import { IoIosRadioButtonOn } from "react-icons/io";
import { IoIosRadioButtonOff } from "react-icons/io";

const paymentMethod = [
  {
    id: 1,
    name: "Bank BCA",
    logo: bca,
  },
  {
    id: 2,
    name: "Bank BRI",
    logo: bri,
  },
  {
    id: 3,
    name: "Bank Mandiri",
    logo: mandiri,
  },
];

export const Payment = () => {
  const [modal, setModal] = useState(false);
  const [isSelected, setIsSelected] = useState("");

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <CContainer fluid>
      <CRow>
        <CCol>
          <CCard style={{ borderRadius: 8 }} className="mt-5 shadow-sm">
            <CCardBody>
              <div className="d-flex justify-content-between align-items-center">
                <p className="sub-heading">Pilih Pembayaran</p>

                <div>
                  <CButton
                    onClick={toggle}
                    className="mr-1 border bg-primary text-white"
                  >
                    Pilih
                  </CButton>
                  <CModal show={modal} onClose={toggle}>
                    <CModalHeader closeButton>
                      <h4 className="mb-2 ">Pilih Pembayaran</h4>
                    </CModalHeader>
                    <CModalBody>
                      <p className="mb-4">Transfer Bank (Verifikasi Manual)</p>

                      <div className="d-flex flex-column px-2">
                        {paymentMethod.map((payment) => {
                          const isActive = isSelected === payment.name;
                          return (
                            <div
                              key={payment.id}
                              className="d-flex  align-items-center mb-4"
                            >
                              <img
                                src={payment.logo}
                                alt={payment.name}
                                style={{ width: 70, height: 30 }}
                                className="mr-2"
                              />
                              <p className="">{payment.name}</p>

                              {isActive ? (
                                <IoIosRadioButtonOn
                                  size={24}
                                  style={{ cursor: "pointer" }}
                                  className={`ml-auto text-primary`}
                                />
                              ) : (
                                <IoIosRadioButtonOff
                                  onClick={() => setIsSelected(payment.name)}
                                  size={24}
                                  style={{ cursor: "pointer" }}
                                  className={`ml-auto`}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="primary">Pilih</CButton>{" "}
                      <CButton color="secondary" onClick={toggle}>
                        Batal
                      </CButton>
                    </CModalFooter>
                  </CModal>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};
