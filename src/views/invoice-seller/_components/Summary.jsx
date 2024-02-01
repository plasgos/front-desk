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
        <TextSummaryFormated
          title="TOTAL HARGA (1 BARANG)"
          price={60000}
          isFontWeight
        />

        <TextSummaryFormated
          title="Total Ongkos Kirim (250 gr)"
          price={10000}
        />

        <TextSummaryFormated
          title="Diskon Ongkos Kirim"
          price={10000}
          isDiscount
        />

        <TextSummaryFormated
          withBorder
          title="Total Diskon Barang"
          isDiscount
          price={18000}
        />
        <TextSummaryFormated
          withBorder
          title="TOTAL BELANJA"
          isFontWeight
          price={42000}
        />
        <TextSummaryFormated
          withBorder
          title="Biaya Jasa Aplikasi"
          price={1000}
        />
        <TextSummaryFormated
          withBorder
          title="TOTAL TAGIHAN"
          isFontWeight
          price={43000}
        />
        <TextSummaryFormated
          withBorder
          badgePromo
          title="Diskon hingga Rp.30.000"
          price={18216}
        />
        <TextSummaryFormated
          withBorder
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
