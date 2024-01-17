import React from "react";
import { PaymentMethod } from "./PaymentMethod";
import { Expeditions } from "./Expeditions";
import { PickUpOptions } from "./PickUpOptions";
import { TbReportMoney } from "react-icons/tb";
import { Summary } from "./Summary";

export const DeliveryAndPayment = () => {
  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-5 ">
        <div className="font-weight-bold font-lg ">Pengiriman & Pembayaran</div>
      </div>

      <div className="card p-3 shadow-sm">
        <PickUpOptions />
        <PaymentMethod />
        <Expeditions />
      </div>

      <div className="font-weight-bold mb-3">Kustom COD</div>
      <div className="card p-3 shadow-sm">
        <form>
          <div className="form-group mb-0">
            <label>
              Ubah Nilai COD Anda (kosongi jika tidak ada perubahan)
            </label>
            <div style={{ position: "relative" }}>
              <input
                style={{ paddingLeft: 30 }}
                type="number"
                className="form-control "
              />
              <div
                style={{ position: "absolute", top: 6, left: 8 }}
                className="text-muted"
              >
                Rp.
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="font-weight-bold mb-3">Estimasi Biaya</div>
      <div className="mb-3">
        <button type="button" className="btn btn-primary  btn-block">
          <TbReportMoney size={18} className="mr-2" />
          Gunakan Voucher
        </button>
      </div>

      <Summary />
    </div>
  );
};
