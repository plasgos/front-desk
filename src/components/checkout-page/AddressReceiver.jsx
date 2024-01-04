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

export const AddressReceiver = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <h1 className="heading">Beli Langsung</h1>
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
                    <CCard className="mb-0">
                      <CCardBody
                        style={{ cursor: "pointer" }}
                        className="select-modal"
                      >
                        <div>
                          <h6 className="sub-heading">Dyan Kastutara(Kos)</h6>
                          <div>085841410308</div>
                          <div>
                            Jalan Taman Ratu Indah Blok 09/17, Kebun jeruk, Kota
                            Jakarta Barat DKI Jakarta 11520
                          </div>
                        </div>
                      </CCardBody>
                    </CCard>
                  </CModalBody>
                  <CModalFooter>
                    <CButton color="primary">Pilih</CButton>{" "}
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
