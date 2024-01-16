import React from "react";
import { FaListUl } from "react-icons/fa";

export const ItemDetails = () => {
  return (
    <div>
      <div className="font-weight-bold font-lg  my-4 ">Detail Barang</div>
      <div className=" card p-3 shadow-sm rounded">
        <div className="mb-3">
          <button type="button" className="btn btn-primary  btn-block">
            <FaListUl size={18} className="mr-2" />
            Katalog Produk
          </button>
        </div>

        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="required-label">Isi Paket</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group col-md-6">
              <label className="required-label">jenis Barang</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="required-label">Nilai Barang</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group col-md-6">
              <label className="required-label">Jumlah Item Dalam Paket</label>
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
                    transform: "translateX(-10px)",
                  }}
                >
                  Item
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "30%" }} className="form-group  ">
            <div className="form-group ">
              <label className="required-label">Berat</label>
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
                    transform: "translateX(-10px)",
                  }}
                >
                  gram
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Catatan</label>
            <textarea type="text" className="form-control" />
          </div>
          <div className="card my-3 p-3 shadow-sm">
            <div className="form-group mb-0">
              <div className="form-check">
                <input
                  style={{ cursor: "pointer", transform: "scale(1.5)" }}
                  className="form-check-input "
                  type="checkbox"
                  id="katalog"
                />
                <label
                  style={{ cursor: "pointer" }}
                  className="form-check-label mt-1 font-lg ml-2"
                  htmlFor="katalog"
                >
                  Tambahkan Ke katalog
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
