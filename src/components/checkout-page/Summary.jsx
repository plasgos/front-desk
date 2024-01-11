import React from "react";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import { formatPrice } from "../../lib/format-price";
import { useSelector } from "react-redux";

export const Summary = () => {
  const { orders } = useSelector((state) => state.checkout);

  const checkout = useSelector((state) => state.checkout);

  console.log(checkout);

  const { totalPrice } = useSelector((state) => state.totalPrice);

  const totalShippingCost = orders.reduce(
    (total, order) => total + order.shipping_cost,
    0
  );

  const totalPayment = totalPrice + totalShippingCost;

  const totalQtyItems = orders
    .map((order) => order.products.length)
    .reduce((total, item) => total + item, 0);

  return (
    <CContainer fluid>
      <CRow>
        <CCol>
          <CCard style={{ borderRadius: 8 }} className="border-0 shadow-sm">
            <CCardHeader
              style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
            >
              <p className="sub-heading">Ringkasan Belanja</p>
            </CCardHeader>
            <CCardBody>
              <div className="d-flex justify-content-between">
                <p>Total Harga ({totalQtyItems} Produk)</p>
                <p className="sub-heading">{formatPrice(totalPrice)}</p>
              </div>

              <div className="d-flex justify-content-between my-2">
                <p>Total Ongkos Kirim</p>
                <p className="sub-heading">
                  {" "}
                  {totalShippingCost ? formatPrice(totalShippingCost) : 0}
                </p>
              </div>

              <div className="d-flex justify-content-between">
                <p>Total Pembayaran</p>
                <p className="sub-heading text-primary">
                  {totalPayment
                    ? formatPrice(totalPayment)
                    : formatPrice(totalPrice)}
                </p>
              </div>
            </CCardBody>
            <CCardFooter
              style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
            >
              <CButton color="primary" className="btn-block">
                Beli
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};
