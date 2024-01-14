import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";

import bca from "../../assets/bca.png";
import bri from "../../assets/bri.png";
import mandiri from "../../assets/mandiri.png";

import { PaymentModal } from "./modal/PaymentModal";
import { useDispatch } from "react-redux";
import { setCheckoutPayment } from "../../redux/modules/checkout/actions/actions";

const paymentMethod = [
  {
    id: 1,
    bank_name: "Bank BCA",
    account_number: 4710929832,
    logo: bca,
    is_default: true,
  },
  {
    id: 2,
    bank_name: "Bank BRI",
    account_number: 99848283,
    logo: bri,
    is_default: false,
  },
  {
    id: 3,
    bank_name: "Bank Mandiri",
    account_number: 1010101010,
    logo: mandiri,
    is_default: false,
  },
];

export const Payment = () => {
  const [selectedBank, setSelectedBank] = useState(
    paymentMethod.find((method) => method.is_default)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    defaultPaymentCheckout();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultPaymentCheckout = () => {
    dispatch(
      setCheckoutPayment({
        payment_method: "Bank Transfer",
        payment_method_details: {
          bank_name: selectedBank.bank_name,
          account_number: selectedBank.account_number,
        },
      })
    );
  };

  return (
    <CContainer fluid>
      <CRow>
        <CCol>
          <CCard style={{ borderRadius: 8 }} className="mt-5 shadow-sm">
            <CCardBody>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="sub-heading">Pembayaran</p>
                  <div>Transfer {selectedBank.bank_name}</div>
                </div>
                <PaymentModal
                  paymentMethod={paymentMethod}
                  setSelectedBank={setSelectedBank}
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};
