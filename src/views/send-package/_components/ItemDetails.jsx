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

// import { useDebounce } from "use-debounce";
import { IoClose } from "react-icons/io5";

export const ItemDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  console.log("🚀 ~ ItemDetails ~ selectedProduct:", selectedProduct);
  // const { orders } = useSelector((state) => state.packages);
  // const warehouseSender = orders?.map((order) => order.sender?.id);
  // const test =
  //   selectedProduct.Stocks &&
  //   selectedProduct.Stocks.map((stock) => stock.Warehouse.id);
  // const commonWarehouses =
  //   test && test.filter((warehouseId) => warehouseId === warehouseSender);
  // const [qtyProduct, setQtyProduct] = useState("");
  const { products } = useSelector((state) => state.products);
  const { data } = products;
  const { token } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  // const [debouncedQty] = useDebounce(qtyProduct, 1000);

  const getData = () => {
    dispatch(getProducts({ token }));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setItemShippingCost = (weights) => {
    // Memastikan bahwa selectedProduct adalah array dan memiliki elemen
    if (Array.isArray(selectedProduct) && selectedProduct.length > 0) {
      // Iterasi melalui setiap produk dalam array
      const temp = selectedProduct.map((product) => {
        return {
          product_id: product.id,
          quantity: 1,
          price: product.price,
          description: product.description,
          weight: weights[product.id],
        };
      });

      dispatch(setWeightAndPrice(temp));
    }
  };

  useEffect(() => {
    if (Array.isArray(selectedProduct) && selectedProduct.length > 0) {
      // Membuat objek baru dengan ID produk sebagai kunci dan berat sebagai nilai
      const initialWeights = {};
      selectedProduct.forEach((product) => {
        initialWeights[product.id] = product.weight || "";
      });
      setItemShippingCost(initialWeights);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct.length]);

  const handleWeightChange = (productId, event) => {
    // event.persist(); // Membuat objek synthetic event menjadi persisten

    const newWeightChange = [];

    const temp = selectedProduct.map((product) => {
      if (product.id === productId) {
        newWeightChange.push({
          product_id: product.id,
          quantity: product.quantity,
          price: product.price,
          description: product.description,
          weight: Number(event.target.value || ""),
        });
        return {
          ...product,
          weight: +event.target.value,
        };
      }

      newWeightChange.push({
        product_id: product.id,
        quantity: product.quantity,
        price: product.price,
        description: product.description,
        weight: product.weight,
      });
      return product;
    });

    setSelectedProduct(temp);
    dispatch(setWeightAndPrice(newWeightChange));
  };

  const handleDeleteListProduck = (id) => {
    const updatedListProducts = selectedProduct.filter(
      (product) => product.id !== id
    );

    setSelectedProduct(updatedListProducts);
    dispatch(reduceProductList(id));
  };

  const handleQuantityChange = (productId, event) => {
    const newQuantityChange = [];

    const temp = selectedProduct.map((product) => {
      if (product.id === productId) {
        newQuantityChange.push({
          product_id: product.id,
          quantity: Number(event.target.value || ""),
          price: product.price,
          description: product.description,
          weight: product.weight,
        });
        return {
          ...product,
          quantity: +event.target.value,
        };
      }

      newQuantityChange.push({
        product_id: product.id,
        quantity: product.quantity,
        price: product.price,
        description: product.description,
        weight: product.weight,
      });
      return product;
    });

    setSelectedProduct(temp);
    dispatch(setWeightAndPrice(newQuantityChange));
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
                              value={product.weight || ""}
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
                            onChange={(event) =>
                              handleQuantityChange(product.id, event)
                            }
                            value={product.quantity}
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
