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

export const Summary = () => {
  return (
    <CContainer fluid>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <p className="sub-heading">Ringkasan Belanja</p>
            </CCardHeader>
            <CCardBody>
              <div className="d-flex justify-content-between">
                <p>Total Harga (1 Barang)</p>
                <p className="sub-heading">{formatPrice(250000)}</p>
              </div>

              <div className="d-flex justify-content-between my-2">
                <p>Total Ongkos Kirim</p>
                <p className="sub-heading">{formatPrice(0)}</p>
              </div>

              <div className="d-flex justify-content-between">
                <p>Total Harga (1 Barang)</p>
                <p className="sub-heading text-primary">
                  {formatPrice(250000)}
                </p>
              </div>
            </CCardBody>
            <CCardFooter>
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
