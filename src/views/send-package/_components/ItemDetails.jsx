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
  // console.log("🚀 ~ ItemDetails ~ selectedProduct:", selectedProduct);

  // const { orders } = useSelector((state) => state.packages);
  // console.log("🚀 ~ SenderDetails ~ orders:", orders);

  // const warehouseSender = orders?.map((order) => order.sender?.id);
  // console.log("🚀 ~ ItemDetails ~ warehouseSender:", warehouseSender);

  // const test =
  //   selectedProduct.Stocks &&
  //   selectedProduct.Stocks.map((stock) => stock.Warehouse.id);
  // console.log("🚀 ~ ItemDetails ~ test:", test);

  // const commonWarehouses =
  //   test && test.filter((warehouseId) => warehouseId === warehouseSender);
  // console.log("🚀 ~ ItemDetails ~ commonWarehouses:", commonWarehouses);

  const [newWeightProduct, setNewWeightProduct] = useState(0);
  const [qtyProduct, setQtyProduct] = useState("");

  const { products } = useSelector((state) => state.products);
  console.log("🚀 ~ ItemDetails ~ products:", JSON.stringify(products));
  const { data } = products;
  const { token } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const [debouncedWeight] = useDebounce(newWeightProduct, 1000);
  const [debouncedQty] = useDebounce(qtyProduct, 1000);

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
        product: {
          product_id: selectedProduct.id,
          quantity: +debouncedQty,
          price: selectedProduct.price,
          description: selectedProduct.description,
        },
      })
    );
  };

  useEffect(() => {
    setItemShippingCost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct, debouncedWeight, debouncedQty]);

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
