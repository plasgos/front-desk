import React from "react";

import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";

import { IoStorefront } from "react-icons/io5";

export const SellerAddress = () => {
  return (
    <CContainer fluid>
      <CRow>
        <CCol sm="12">
          <CCard style={{ borderRadius: 8 }} className="border-0 shadow-sm">
            <CCardHeader>
              <div className="d-flex align-items-center">
                <IoStorefront size={36} />
                <div>
                  <div className="sub-heading ml-3">Admin</div>
                  <div className="ml-3">Kota Jakarta Timur, DKI Jakarta</div>
                </div>
              </div>
            </CCardHeader>
            <CCardBody className="py-4">
              <div className="d-flex align-items-center">
                <h6 className="sub-heading mr-2 mt-2">Dyan Kastutara(Kos)</h6>
                <CBadge color="success">Utama</CBadge>
              </div>
              <div>085841410308</div>
              <div>
                Jalan Taman Ratu Indah Blok 09/17, Kebun jeruk, Kota Jakarta
                Barat DKI Jakarta 11520
              </div>
            </CCardBody>
            <CCardFooter></CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};
