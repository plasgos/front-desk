import React from "react";

export const FooterInfo = () => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <div style={{ flexGrow: 1 }}>
          <div className="mb-2">Kurir :</div>
          <div className="font-weight-bold">Kurir Rekomedasi - Regular</div>
        </div>
        <div style={{ flexGrow: 1 }}>
          <div className="mb-2">Metode Pembayaran</div>
          <div className="font-weight-bold">GoPay</div>
        </div>
      </div>

      <div className="d-flex justify-content-between mt-5 align-items-end">
        <div style={{ flexGrow: 1 }}>
          <div className="mb-1">Invoice ini sah dan diproses oleh komputer</div>
          <div>
            Silahkan hubungi&nbsp;{" "}
            <span className="text-primary font-weight-bold">Plasgos Care</span>{" "}
            apabila kamu membutuhkan bantuan.
          </div>
        </div>
        <div>
          <div className="italic">
            Terakhir diupdate 15 januari 2024 19:45 WIB
          </div>
        </div>
      </div>
    </div>
  );
};
