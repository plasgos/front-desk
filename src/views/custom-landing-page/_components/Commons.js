import React from "react";
import image from "../../../assets/action-figure.jpg";
import { CCol, CRow } from "@coreui/react";

export const ViewTextAndImage = () => {
  return (
    <CRow className="justify-content-center">
      {Array(3)
        .fill()
        .map((_, i) => (
          <CCol sm="6" md="4">
            <div key={i} className="text-center">
              <div style={{ lineHeight: 1.4, fontSize: 18 }}>
                Rahasia untuk maju adalah memulai
              </div>
              <img
                src={image}
                alt="img"
                className="img-fluid"
                style={{ width: "100%", marginTop: 14, marginBottom: 14 }}
              />
              <div style={{ lineHeight: 1.4 }}>
                Kamu tidak akan pernah sukses jika kamu hanya duduk dan
                berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan
                mulailah lakukan sesuatu!
              </div>
            </div>
          </CCol>
        ))}
    </CRow>
  );
};
