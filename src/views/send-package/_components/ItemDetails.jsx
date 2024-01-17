import React, { useEffect, useState } from "react";
import { CatalogProductsModal } from "./modal/CatalogProductsModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProducts } from "../../../redux/modules/products/actions/actions";
import { formatPrice } from "../../../lib/format-price";

export const ItemDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [newWeightProduct, setNewWeightProduct] = useState(0);
  console.log("🚀 ~ ItemDetails ~ weightProduct:", newWeightProduct);

  const { products } = useSelector((state) => state.products);
  const { data } = products;
  const { token } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const getData = () => {
    dispatch(getProducts({ token }));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="font-weight-bold font-lg  my-4 ">Detail Barang</div>
      <div className=" card p-3 shadow-sm rounded">
        <div className="mb-3">
          <CatalogProductsModal
            products={data}
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
          />
        </div>

        <div className="d-flex justify-content-between">
          {Object.keys(selectedProduct).length > 0 && (
            <>
              <div>
                <label className="required-label">Isi Paket</label>
                <div className="d-flex">
                  <div className="rounded shadow-sm border p-2">
                    <img
                      style={{ width: 80 }}
                      src={selectedProduct.ImageProducts[0].url}
                      alt="product"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="font-weight-bold mb-2 ">
                      {selectedProduct.name}
                    </div>
                    <div className="font-weight-bold mb-2">
                      {formatPrice(selectedProduct.price)}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="required-label">Jenis Barang</label>
                <input
                  readOnly
                  value={selectedProduct.Category.name}
                  type="text"
                  className="form-control"
                />
                <label className="required-label mt-2">Weight</label>
                <input
                  onChange={(e) => setNewWeightProduct(e.target.value)}
                  value={newWeightProduct}
                  // defaultValue={selectedProduct.weight}
                  type="text"
                  className="form-control"
                />

                <label className="required-label mt-2">
                  Jumlah Item Dalam Paket
                </label>
                <input type="text" className="form-control" />
              </div>
            </>
          )}
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
