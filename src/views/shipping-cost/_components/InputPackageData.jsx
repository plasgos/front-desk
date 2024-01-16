import React from "react";
import { PiArrowUDownRightFill } from "react-icons/pi";

export const InputPackageData = () => {
  return (
    <div>
      <div className="font-weight-bold mb-3">Masukan Data Paket</div>
      <form>
        <div className="form-group">
          <label>Asal</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <div className="form-group">
            <label>Tujuan</label>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div style={{ width: "50%" }} className="form-group  ">
          <div className="form-group ">
            <label>Berat</label>
            <div style={{ position: "relative" }}>
              <input
                type="number"
                inputMode="numeric"
                className="form-control"
              />
              <div
                className="text-muted"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 5,
                  transform: "translateX(-36px)",
                }}
              >
                gram
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center mb-2">
          <hr style={{ width: "40%" }} className="bg-secondary" />
          <div className="mx-1 text-center">Open Dimensi</div>
          <hr style={{ width: "40%" }} className="bg-secondary" />
        </div>
        <div className="form-group">
          <label className="font-weight-bold">Opsi Dimensi</label>
          <div className="form-check">
            <input
              className="form-check-input "
              type="checkbox"
              value=""
              id="dimensionInput"
            />
            <label className="form-check-label mt-1" htmlFor="dimensionInput">
              Masukan Dimensi
            </label>
          </div>
        </div>
        <div className="d-flex align-items-center mb-2">
          <hr style={{ width: "40%" }} className="bg-secondary" />
          <div className="mx-1 text-center">Opsi COD</div>
          <hr style={{ width: "40%" }} className="bg-secondary" />
        </div>
        <div
          style={{ gap: 20 }}
          className="d-flex flex-wrap align-items-center"
        >
          <div className="form-group">
            <label className="font-weight-bold">Opsi COD</label>
            <div className="form-check">
              <input
                className="form-check-input "
                type="checkbox"
                value=""
                id="codCalculation"
              />
              <label className="form-check-label mt-1" htmlFor="codCalculation">
                Kalkulasi COD
              </label>
            </div>
          </div>

          <div className="form-group mb-0">
            <div className="form-group">
              <label className="font-weight-bold">Nilai Barang</label>
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
          </div>
          <div className="form-group">
            <label className="font-weight-bold">Opsi </label>
            <div className="form-check">
              <input
                className="form-check-input "
                type="checkbox"
                value=""
                id="asuransi"
              />
              <label className="form-check-label mt-1" htmlFor="asuransi">
                Asuransi
              </label>
            </div>
          </div>
        </div>

        <div className="text-right">
          <button type="submit" className="btn btn-primary">
            <PiArrowUDownRightFill size={18} className="mr-2" />
            Cek Tarif
          </button>
        </div>
      </form>

      <div className="p-3 border  border-primary rounded mt-5">
        <div className="mb-1">Note : </div>
        <div className="mb-1">
          - Cek tarif di halaman hanya untuk pengiriman reguler, tidak termasuk
          layanan <span className="text-danger">instant Delivery.</span>
        </div>
        <div>
          - Maksimum nilai COD{" "}
          <span className="text-danger"> Rp. 3.000.000,00</span>
          (Jika diatasnya tidak bisa berlaku)
        </div>
      </div>
    </div>
  );
};
