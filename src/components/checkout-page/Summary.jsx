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

  const { totalPrice } = useSelector((state) => state.totalPrice);

  const totalShippingCost = orders.reduce(
    (total, order) => total + order.shipping_cost,
    0
  );

  const totalPayment = totalPrice + totalShippingCost;

  const totalQtyItems = orders
    .map((order) => order.products.length)
    .reduce((total, item) => total + item, 0);

  const buyValidation = orders.map((order) => order.shipping_cost);

  const isAnyShippingCostUndefined = buyValidation.some((cost) => !cost);

  return (
    <CContainer fluid>
      <CRow>
        <CCol>
          <CCard style={{ borderRadius: 8 }} className="border-0 shadow-sm">
            <CCardHeader
              style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
            >
              <div className="sub-heading">Ringkasan Belanja</div>
            </CCardHeader>
            <CCardBody>
              <div className="d-flex justify-content-between">
                <div>Total Harga ({totalQtyItems} Produk)</div>
                <div className="sub-heading">{formatPrice(totalPrice)}</div>
              </div>

              <div className="d-flex justify-content-between my-2">
                <div>Total Ongkos Kirim</div>
                <div className="sub-heading">
                  {" "}
                  {totalShippingCost ? formatPrice(totalShippingCost) : 0}
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div>Total Pembayaran</div>
                <div className="sub-heading text-primary">
                  {totalPayment
                    ? formatPrice(totalPayment)
                    : formatPrice(totalPrice)}
                </div>
              </div>
            </CCardBody>
            <CCardFooter
              style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
            >
              <CButton
                disabled={isAnyShippingCostUndefined}
                color="primary"
                className="btn-block"
              >
                Beli
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};
