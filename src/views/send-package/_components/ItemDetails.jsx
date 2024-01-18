import React, { useEffect, useState } from "react";
import { CatalogProductsModal } from "./modal/CatalogProductsModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProducts } from "../../../redux/modules/products/actions/actions";
import { formatPrice } from "../../../lib/format-price";
import { setWeightAndPrice } from "../../../redux/modules/packages/actions/actions";

import { useDebounce } from "use-debounce";

export const ItemDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [newWeightProduct, setNewWeightProduct] = useState(0);
  const [qtyProduct, setQtyProduct] = useState(undefined);

  const { products } = useSelector((state) => state.products);
  const { data } = products;
  const { token } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const [debouncedWeight] = useDebounce(newWeightProduct, 1000);

  const getData = () => {
    dispatch(getProducts({ token }));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedProduct.weight !== undefined) {
      setNewWeightProduct(selectedProduct.weight || 0);
    }
  }, [selectedProduct.weight]);

  const setItemShippingCost = () => {
    dispatch(
      setWeightAndPrice({
        weight: +debouncedWeight,
        price: selectedProduct.price,
      })
    );
  };

  useEffect(() => {
    setItemShippingCost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct, debouncedWeight]);

  const handleWeightChange = (e) => {
    setNewWeightProduct(e.target.value);
  };

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
          <div>
            <div className="d-flex">
              {selectedProduct.ImageProducts ? (
                <div className="rounded shadow-sm border p-2">
                  <img
                    style={{ width: 80 }}
                    src={selectedProduct.ImageProducts[0].url}
                    alt="product"
                  />
                </div>
              ) : (
                <div className="form-group">
                  <label className="required-label">Isi Paket</label>
                  <input type="text" className="form-control" />
                </div>
              )}
              <div className="ml-3">
                <div className="font-weight-bold mb-2 ">
                  {selectedProduct.name || ""}
                </div>
                {selectedProduct.price && (
                  <div className="font-weight-bold mb-2">
                    {formatPrice(selectedProduct.price)}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <form>
              <div className="form-group">
                <label className="required-label">Berat</label>
                <div style={{ position: "relative" }}>
                  <input
                    onChange={handleWeightChange}
                    type="number"
                    value={newWeightProduct || ""}
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

              <div className="form-group">
                <label className="required-label mt-2">
                  Jumlah Item Dalam Paket
                </label>
                <input
                  onChange={(e) => setQtyProduct(e.target.value)}
                  value={qtyProduct}
                  type="text"
                  className="form-control"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
