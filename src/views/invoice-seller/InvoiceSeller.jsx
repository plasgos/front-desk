import React from "react";
import plasgosLogo from "../../assets/plasgos-logo.png";
import { CButton } from "@coreui/react";
import { ProductInfo } from "./_components/ProductInfo";

import { usePDF } from "react-to-pdf";
import { Summary } from "./_components/Summary";
import { FooterInfo } from "./_components/FooterInfo";

const InvoiceSeller = () => {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  return (
    <div>
      <div className="container px-3 pb-3 d-flex justify-content-end border-bottom ">
        <CButton onClick={() => toPDF()} color="primary">
          Download
        </CButton>
      </div>
      <div ref={targetRef} className="p-5 border">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <img style={{ width: 200 }} src={plasgosLogo} alt="plasgos-logo" />
          </div>
          <div>
            <div className="font-weight-bold text-right font-2xl mb-2">
              INVOICE
            </div>
            <div className="text-primary font-weight-bold">
              INV/20240113/MPL/3678513574
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between  mb-3">
          <div>
            <div className="font-weight-bold mb-3">DITERBITKAN ATAS NAMA</div>
            <div>
              <span className="mr-5">Penjual</span>
              <span className="mr-2">:</span>
              <span className="font-weight-bold">Azarine Cosmetic</span>
            </div>
          </div>
          <div style={{ maxWidth: 400 }}>
            <div className="font-weight-bold font-font-2xl mb-3">UNTUK</div>

            <div>
              <span style={{ marginRight: 76 }}>Pembeli</span>
              <span className="mr-2">:</span>
              <span className="font-weight-bold">Dyan Kastutara</span>
            </div>

            <div className="my-3">
              <span className="mr-2">Tanggal Pembelian</span>
              <span className="mr-2">:</span>
              <span className="font-weight-bold">13 Januari 2024</span>
            </div>

            <div className="my-3">
              <div className="d-flex">
                <div>
                  <span style={{ whiteSpace: "nowrap" }} className="mr-2">
                    Alamat Pengiriman
                  </span>
                  <span className="mr-2">:</span>
                </div>
                <div>
                  <div className="font-weight-bold mb-2">
                    Dyan Kastutara <span>(98642393882)</span>
                  </div>
                  <span style={{ lineHeight: 1.5 }}>
                    Graha Mas Pemuda Jl. Pemuda RT 20/RW 6 Jati Kec. Pulo gadung
                    Kota Jakarta Timur Daerah Khusus Ibukota Jakarta 13220
                    Indonesia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductInfo />
        <Summary />
        <FooterInfo />
      </div>
    </div>
  );
};

export default InvoiceSeller;
