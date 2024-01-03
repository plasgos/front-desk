import {
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
import React, { useState } from "react";

const CheckoutPage = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-8">
          <h1 className="heading">Beli Langsung</h1>
          <CContainer fluid>
            <CRow>
              <CCol sm="12">
                <CCard
                  style={{ borderRadius: 8 }}
                  className="border-0 shadow-sm"
                >
                  <CCardHeader className="sub-heading">
                    Alamat Penerima
                  </CCardHeader>
                  <CCardBody className="py-4">
                    <h6 className="sub-heading">Dyan Kastutara(Kos)</h6>
                    <div>085841410308</div>
                    <div>
                      Jalan Taman Ratu Indah Blok 09/17, Kebun jeruk, Kota
                      Jakarta Barat DKI Jakarta 11520
                    </div>
                  </CCardBody>
                  <CCardFooter>
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
                              <h6 className="sub-heading">
                                Dyan Kastutara(Kos)
                              </h6>
                              <div>085841410308</div>
                              <div>
                                Jalan Taman Ratu Indah Blok 09/17, Kebun jeruk,
                                Kota Jakarta Barat DKI Jakarta 11520
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
        <div className="col-6 col-md-4">tes</div>
      </div>
    </div>
  );
};

export default CheckoutPage;
