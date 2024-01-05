import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";

import { IoStorefront } from "react-icons/io5";
import { Shipping } from "./Shipping";

export const SellerAddress = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <CContainer fluid>
      <CRow>
        <CCol sm="12">
          <CCard style={{ borderRadius: 8 }} className="border-0 shadow-sm">
            <CCardHeader
              style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <IoStorefront size={36} />
                  <div>
                    <div className="sub-heading ml-3">Admin</div>
                    <div className="">
                      <div className="ml-3">Di kirim dari :</div>
                      <div className="ml-3">
                        Kota Jakarta Timur, DKI Jakarta
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <CButton onClick={toggle} className="mr-1 border ml-auto">
                    Pilih alamat Pengiriman
                  </CButton>
                  <CModal show={modal} onClose={toggle}>
                    <CModalHeader closeButton>
                      <h4 className="text-center ml-auto">
                        Pilih Alamat Penerima
                      </h4>
                    </CModalHeader>
                    <CModalBody>
                      <CCard className="mb-2">
                        <CCardBody
                          style={{ cursor: "pointer" }}
                          className="select-modal"
                        >
                          <div>
                            <h6 className="sub-heading">Dyan Kastutara(Kos)</h6>
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
                </div>
              </div>
            </CCardHeader>
            <CCardBody className="py-4">
              <div className="d-flex align-items-center">
                <FaUser size={50} />
                <div className="ml-3">
                  <div>Test #1</div>
                  <div>1 barang (250gram)</div>
                  <div className="bold-orange">Rp 250.000</div>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  <div
                    className="my-2 bold-orange"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    Catatan Produk
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div className="mx-2">
                    <p className="sub-heading">subtotal</p>
                    <p className="bold-orange">Rp 250.000</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <CForm action="" method="post">
                      <CInput
                        className="text-center mx-2"
                        style={{ width: 60 }}
                        type="number"
                        id="qty"
                        name="qty"
                        value={1}
                        onChange={(e) => e.target.value}
                      />
                    </CForm>
                  </div>
                  <div className="mx-2">
                    <p>
                      Sisa <span style={{ fontWeight: "bold" }}>97</span>
                    </p>
                  </div>
                </div>
              </div>
            </CCardBody>
            <CCardFooter
              style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
            >
              <Shipping />
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};
