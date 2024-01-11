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

import { setCheckoutPayment } from "././../../redux/modules/checkout/actions/actions";
import { useDispatch } from "react-redux";

const paymentMethod = [
  {
    id: 1,
    bank_name: "Bank BCA",
    account_number: 4710929832,
    logo: bca,
  },
  {
    id: 2,
    bank_name: "Bank BRI",
    account_number: 99848283,
    logo: bri,
  },
  {
    id: 3,
    bank_name: "Bank Mandiri",
    account_number: 1010101010,
    logo: mandiri,
  },
];

export const Payment = () => {
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState({});
  const dispatch = useDispatch();

  const toggle = () => {
    setModal(!modal);
  };

  const onSubmit = (data) => {
    dispatch(
      setCheckoutPayment({
        payment_method: "Bank Transfer",
        payment_method_details: {
          bank_name: data.bank_name,
          account_number: data.account_number,
        },
      })
    );

    setModal(false);
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
                          const isActive =
                            selected.bank_name === payment.bank_name;
                          return (
                            <div
                              key={payment.id}
                              className="d-flex  align-items-center mb-4"
                            >
                              <img
                                src={payment.logo}
                                alt={payment.bank_name}
                                style={{ width: 70, height: 30 }}
                                className="mr-2"
                              />
                              <p className="">{payment.bank_name}</p>

                              {isActive ? (
                                <IoIosRadioButtonOn
                                  size={24}
                                  style={{ cursor: "pointer" }}
                                  className={`ml-auto text-primary`}
                                />
                              ) : (
                                <IoIosRadioButtonOff
                                  onClick={() => setSelected(payment)}
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
                      <CButton
                        onClick={() => onSubmit(selected)}
                        color="primary"
                      >
                        Pilih
                      </CButton>{" "}
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
