import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCheckoutPayment } from "../../../redux/modules/checkout/actions/actions";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from "react-icons/io";

export const PaymentModal = ({ paymentMethod, setSelectedBank }) => {
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(
    paymentMethod.find((method) => method.is_default)
  );

  const handlePaymentClick = (payment) => {
    setSelected(payment);
  };

  const dispatch = useDispatch();

  const toggle = () => {
    setModal(!modal);
  };

  const onSubmit = (data) => {
    setSelectedBank(data);

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
    <div>
      <CButton onClick={toggle} className="mr-1 border bg-primary text-white">
        Pilih
      </CButton>
      <CModal centered show={modal} onClose={toggle}>
        <CModalHeader closeButton>
          <h4 className="mb-2 ">Pilih Pembayaran</h4>
        </CModalHeader>
        <CModalBody>
          <p className="mb-4">Transfer Bank (Verifikasi Manual)</p>

          <div className="d-flex flex-column px-2">
            {paymentMethod.map((payment) => {
              const isSelected = selected && selected.id === payment.id;
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

                  {isSelected ? (
                    <IoIosRadioButtonOn
                      size={24}
                      style={{ cursor: "pointer" }}
                      className={`ml-auto text-primary`}
                    />
                  ) : (
                    <IoIosRadioButtonOff
                      onClick={() => handlePaymentClick(payment)}
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
          <CButton onClick={() => onSubmit(selected)} color="primary">
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
