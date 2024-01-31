import React from "react";
import { formatPrice } from "../../../lib/format-price";
import { TextSummaryFormated } from "./TextSummaryFormated";

export const Summary = () => {
  return (
    <div>
      <div
        style={{ gap: 12, borderTop: "2px solid #D8DBE0" }}
        className="p-3 d-flex flex-column"
      >
        <div className="d-flex justify-content-end mb-2 ">
          <div className="d-flex justify-content-between w-50">
            <div className="font-weight-bold font-lg">
              TOTAL HARGA (1 BARANG)
            </div>
            <div className="font-weight-bold font-lg">{formatPrice(60000)}</div>
          </div>
        </div>
        <div className="d-flex justify-content-end ">
          <div className="d-flex justify-content-between w-50">
            <div>Total Ongkos Kirim (250 gr)</div>
            <div className="font-weight-bold">{formatPrice(10000)}</div>
          </div>
        </div>
        <div className="d-flex justify-content-end ">
          <div className="d-flex justify-content-between w-50">
            <div>Diskon Ongkos Kirim </div>
            <div className="font-weight-bold"> - {formatPrice(10000)}</div>
          </div>
        </div>

        <TextSummaryFormated
          title="Total Diskon Barang"
          isDiscount
          price={18000}
        />
        <TextSummaryFormated title="TOTAL BELANJA" isFontWeight price={42000} />
        <TextSummaryFormated title="Biaya Jasa Aplikasi" price={1000} />
        <TextSummaryFormated title="TOTAL TAGIHAN" isFontWeight price={43000} />
        <TextSummaryFormated
          badgePromo
          title="Diskon hingga Rp.30.000"
          price={18216}
        />
        <TextSummaryFormated
          badgePromo
          title="Bebas Ongkir Hingga Rp.20.000"
          price={17500}
        />

        <div className="border-bottom">
          <p className="d-flex justify-content-end font-italic mt-3">
            * Promo yang didapat bisa berubah, Cek&nbsp;
            <span className="text-primary"> S&K</span>
          </p>
        </div>
      </div>
    </div>
  );
};
