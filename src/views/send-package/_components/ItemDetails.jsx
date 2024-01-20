import React, { useEffect, useState } from "react";
import { CatalogProductsModal } from "./modal/CatalogProductsModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProducts } from "../../../redux/modules/products/actions/actions";
import { formatPrice } from "../../../lib/format-price";
import {
  reduceProductList,
  setWeightAndPrice,
} from "../../../redux/modules/packages/actions/actions";

import { useDebounce } from "use-debounce";
import { IoClose } from "react-icons/io5";

export const ItemDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  // const { orders } = useSelector((state) => state.packages);
  // const warehouseSender = orders?.map((order) => order.sender?.id);
  // const test =
  //   selectedProduct.Stocks &&
  //   selectedProduct.Stocks.map((stock) => stock.Warehouse.id);
  // const commonWarehouses =
  //   test && test.filter((warehouseId) => warehouseId === warehouseSender);
  const [newWeightProducts, setNewWeightProducts] = useState({});
  const [qtyProduct, setQtyProduct] = useState("");
  console.log("🚀 ~ ItemDetails ~ qtyProduct:", qtyProduct);

  const { products } = useSelector((state) => state.products);
  const { data } = products;
  const { token } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  // const [debouncedWeight] = useDebounce(newWeightProducts, 1000);
  const [debouncedQty] = useDebounce(qtyProduct, 1000);

  const getData = () => {
    dispatch(getProducts({ token }));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setItemShippingCost = () => {
    // Memastikan bahwa selectedProduct adalah array dan memiliki elemen
    if (Array.isArray(selectedProduct) && selectedProduct.length > 0) {
      // Iterasi melalui setiap produk dalam array
      selectedProduct.forEach((product) => {
        dispatch(
          setWeightAndPrice({
            weight: +newWeightProducts[product.id],

            products: {
              product_id: product.id,
              quantity: +qtyProduct,
              price: product.price,
              description: product.description,
              weight: newWeightProducts[product.id],
            },
          })
        );
      });
    }
  };

  useEffect(() => {
    setItemShippingCost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct, newWeightProducts, qtyProduct]);

  useEffect(() => {
    if (Array.isArray(selectedProduct) && selectedProduct.length > 0) {
      // Membuat objek baru dengan ID produk sebagai kunci dan berat sebagai nilai
      const initialWeights = {};
      selectedProduct.forEach((product) => {
        initialWeights[product.id] = product.weight || "";
      });
      // Menetapkan nilai awal ke dalam newWeightProducts
      setNewWeightProducts(initialWeights);
    } else {
      // Jika tidak ada produk yang dipilih, set newWeightProducts ke objek kosong
      setNewWeightProducts({});
    }
  }, [selectedProduct]);

  const handleWeightChange = (productId, event) => {
    event.persist(); // Membuat objek synthetic event menjadi persisten

    setNewWeightProducts((prevWeights) => ({
      ...prevWeights,
      [productId]: event.target.value,
    }));
  };

  const handleDeleteListProduck = (id) => {
    const updatedListProducts = selectedProduct.filter(
      (product) => product.id !== id
    );

    setSelectedProduct(updatedListProducts);
    dispatch(reduceProductList(id));
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

        <div style={{ maxHeight: 500, overflowY: "auto" }} className="p-3">
          {selectedProduct && selectedProduct.length > 0 ? (
            selectedProduct.map((product) => {
              return (
                <div key={product.id} className="card shadow-sm p-3">
                  <div
                    onClick={() => handleDeleteListProduck(product.id)}
                    className="d-flex justify-content-end mb-2"
                  >
                    <IoClose size={24} />
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <div className="d-flex">
                        {product.ImageProducts ? (
                          <div className="rounded shadow-sm border p-2">
                            <img
                              style={{ width: 80 }}
                              src={product.ImageProducts[0].url}
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
                            {product.name || ""}
                          </div>
                          {product.price && (
                            <div className="font-weight-bold mb-2">
                              {formatPrice(product.price)}
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
                              onChange={(event) =>
                                handleWeightChange(product.id, event)
                              }
                              type="number"
                              value={newWeightProducts[product.id] || ""}
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
              );
            })
          ) : (
            <div className="text-center">
              Silahlak Pilih Produk Pada Katalog Produk
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
