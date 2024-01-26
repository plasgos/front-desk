import React, { useState } from "react";
import { TbReportMoney } from "react-icons/tb";
import { Summary } from "./Summary";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";
import { CAlert } from "@coreui/react";
import { Delivery } from "./Delivery";

export const DeliveryAndPayment = () => {
  const packages = useSelector((state) => state.packages);
  const [customCod, setCustomCod] = useState(null);

  const [debouncedCustomCod] = useDebounce(customCod, 1000);
  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-5 ">
        <div className="font-weight-bold font-lg ">Pengiriman & Pembayaran</div>
      </div>

      <div className="card p-3 shadow-sm">
        <Delivery />
      </div>

      {packages.item_value &&
      Object.keys(packages.selectedExpedtion).length > 0 ? (
        <div>
          <div className="font-weight-bold mb-3">Kustom COD</div>
          {customCod < packages.billedByReceiverBeforeCustomCod ? (
            <CAlert closeButton color="danger" className="text-center">
              Silahkan Masukan Nilai Yang Melebihi Angka Yang Di Tagih Ke
              Penerima
            </CAlert>
          ) : null}
          <div className="card p-3 shadow-sm">
            <form>
              <div className="form-group mb-0">
                <label>
                  Ubah Nilai COD Anda (kosongi jika tidak ada perubahan)
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    disabled={
                      !packages.item_value ||
                      Object.keys(packages.selectedExpedtion).length === 0
                    }
                    value={customCod || ""}
                    onChange={(e) => setCustomCod(e.target.value)}
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

          <Summary customCod={debouncedCustomCod} setCustomCod={setCustomCod} />
        </div>
      ) : null}
    </div>
  );
};
