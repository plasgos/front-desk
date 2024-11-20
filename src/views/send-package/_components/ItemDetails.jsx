import React, { useEffect, useState } from "react";
import { CatalogProductsModal } from "./modal/CatalogProductsModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProducts } from "../../../modules/products/actions/actions";
import { formatPrice } from "../../../lib/format-price";

import { Dimension } from "./Dimension";

export const ItemDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);
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

        <div className={`p-3 modal-overflow`}>
          {selectedProduct && selectedProduct.length > 0 ? (
            selectedProduct
              .map((product) => {
                return (
                  <div key={product.id} className="card shadow-sm p-3">
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <div className="d-flex">
                          {product.ImageProducts && (
                            <div className="rounded shadow-sm border p-2">
                              <img
                                style={{ width: 80 }}
                                src={product.ImageProducts[0].url}
                                alt="product"
                              />
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
                      <div className="d-flex flex-column justify-content-between">
                        <div className="ml-auto text-right">
                          <div className="mb-2">Berat</div>
                          <div className="font-weight-bold">
                            {product.weight || ""} Gram
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="mb-2">Jumlah Item Dalam Paket</div>
                          <div className="font-weight-bold">
                            {product.qty !== undefined
                              ? product.qty || ""
                              : product.min_order || ""}{" "}
                            Item
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
              .reverse()
          ) : (
            <div className="text-center">
              Silahlak Pilih Produk Pada Katalog Produk
            </div>
          )}
        </div>

        {selectedProduct && selectedProduct.length > 0 ? (
          <Dimension selectedProduct={selectedProduct} />
        ) : null}
      </div>
    </div>
  );
};
