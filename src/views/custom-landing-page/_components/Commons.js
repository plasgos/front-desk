import React from "react";
import { CCol, CRow } from "@coreui/react";

export const ViewTextAndImage = ({ sections, tempSections, isDragging }) => {
  return (
    <CRow className="justify-content-center">
      {tempSections.map((item, i) => (
        <CCol sm="6" md="4">
          <div key={i} className="text-center">
            <div style={{ lineHeight: 1.4, fontSize: 18 }}>
              {item.content.title}
            </div>
            <img
              src={item.content.image}
              alt="img"
              className="img-fluid"
              style={{ width: "100%", marginTop: 14, marginBottom: 14 }}
            />

            <div
              style={{ lineHeight: 1.4 }}
              dangerouslySetInnerHTML={{
                __html: item.content.description,
              }}
            />
          </div>
        </CCol>
      ))}
    </CRow>
  );
};
