import React, { forwardRef } from "react";
import Barcode from "react-barcode";
import { CgDanger } from "react-icons/cg";
import kiriminaja from "../../assets/KiriminAja-Logo.svg";
import jne from "../../assets/jne-logo.png";
import { formatPrice } from "../../lib";

export const Invoice = forwardRef((props, ref) => {
  const {
    barcode,
    isCod,
    price,
    service,
    qty,
    weight,
    receiver,
    sender,
    products,
  } = props;

  return (
    <div
      style={{ width: "100%", height: "auto" }}
      ref={ref}
      className="border border-dark"
    >
      <div className="d-flex justify-content-between border-bottom  align-items-center p-3">
        <img
          style={{ width: 150, height: "100%" }}
          src={kiriminaja}
          alt="kirimin-aja"
        />

        <img
          style={{ width: 100, height: "100%" }}
          src={jne}
          alt="kirimin-aja"
        />
      </div>
      <div className="text-center p-2 border-bottom ">
        <div className="w-100">
          <Barcode
            value={barcode}
            textAlign="center"
            width={2.5}
            height={40}
            fontSize={14}
          />
        </div>
      </div>
      <div className="text-center p-2 border-bottom">
        <h6
          style={{ color: "black", fontSize: 18 }}
          className="font-weight-bold"
        >
          {isCod ? "COD" : "NON COD"} : {formatPrice(price)}
        </h6>
      </div>
      <div className="d-flex align-items-center justify-content-between  ">
        <div>
          <h6
            style={{ color: "black", fontSize: 18 }}
            className="font-weight-bold p-3"
          >
            Jenis Layanan : {service}
          </h6>
        </div>
        <div className="">
          <div className="flex-column p-3 mr-3">
            <div>Asuransi Rp 0,-</div>
            <div className="my-2">Berat {weight} gr</div>
            <div>Quantity : {qty}Pcs </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="border border-dark text-center p-3 rounded">
          <div style={{ fontStyle: "italic" }}>
            <CgDanger size={24} className="mr-2" />
            Penjual tidak perlu bayar apapun ke kurir, sudah di bayarkan
            otomatis
          </div>
        </div>
      </div>
      <div
        style={{ gap: 14, borderBottom: "2px dashed grey" }}
        className="d-flex p-3 justify-content-between  "
      >
        <div>
          <div className="font-weight-bold">Penerima</div>
          <div className="mb-2">{receiver.name}</div>
          {receiver.phoneNumber} | {receiver.address}
        </div>
        <div>
          <div className="font-weight-bold">Pengirim</div>
          <div className="mb-2">{sender.name}</div>
          {sender.phoneNumber} | {sender.address}
        </div>
      </div>
      <div className="d-flex justify-content-between p-3 border-bottom">
        <div>
          <div className="font-weight-bold">Produk</div>
          <div>1. {products.name}</div>
          <div>Keterangan : {products.description}</div>
        </div>
        <div>
          <div className="font-weight-bold">Jumlah</div>
          <div className="text-right">{products.qty} pcs</div>
        </div>
      </div>

      <div className="p-3 ">
        <div>Catatan :</div>
        <div style={{ fontStyle: "italic" }}>
          * Pengirim wajib meminta bukti serah terima paket ke kurir
        </div>
        <div style={{ fontStyle: "italic" }}>
          * Jika paket ini retur, pengirim tetap di kenakan biaya keberangkatan
          dan biaya retur sesuai ekspedisi
        </div>
      </div>
    </div>
  );
});
