import React, { useState } from "react";
import { formatPrice } from "../../../lib/format-price";
import { CCard, CCardBody } from "@coreui/react";
import { IoClose } from "react-icons/io5";

export const ListSelectedProducts = ({
  listProductToOrders,
  setListProductToOrders,
  setIsSubmitDisabled,
}) => {
  const [isSelectedProduct, setIsSelectedProduct] = useState({});

  const handleQuantityChange = (productId, event) => {
    const updatedProducts = listProductToOrders.map((product) => {
      if (product.id === productId) {
        const newQty = Number(event.target.value);
        const totalWeightPerProduct = product.weight * newQty;
        const totalPricePerProduct = product.price * newQty;

        const isQtyValid = newQty === undefined || newQty >= product.min_order; // Validasi qty

        setIsSubmitDisabled(!isQtyValid);

        return {
          ...product,
          qty: newQty,
          totalWeight: totalWeightPerProduct,
          totalPrice: totalPricePerProduct,
        };
      }

      return product;
    });

    setListProductToOrders(updatedProducts);
  };

  const handleDeleteListProduck = (productid) => {
    const updatedListProducts = listProductToOrders.filter(
      (product) => product.id !== productid
    );

    setListProductToOrders(updatedListProducts);
  };

  return (
    <div style={{ flex: 1 }}>
      <div className="mb-2">Produk Terpilih</div>

      <div className="modal-overflow">
        {listProductToOrders
          .map((product) => {
            const selected = isSelectedProduct.id === product.id;

            return (
              <CCard
                className="my-2"
                key={product.id}
                style={{ cursor: "pointer" }}
                onClick={() => setIsSelectedProduct(product)}
              >
                <CCardBody className={` p-3 ${selected && "modal-selected"}`}>
                  <div className="d-flex justify-content-end mb-2">
                    <button
                      style={{
                        border: "none",
                        background: "none",
                        padding: 0,
                        margin: 0,
                        cursor: "pointer",
                      }}
                      type="button"
                    >
                      <IoClose
                        onClick={() => handleDeleteListProduck(product.id)}
                        style={{
                          cursor: "pointer",
                        }}
                        size={24}
                      />
                    </button>
                  </div>

                  <div style={{ gap: 20 }} className="d-flex mb-3 ">
                    <div className="rounded shadow-sm border p-2">
                      <img
                        style={{ width: 80 }}
                        src={product.ImageProducts[0].url}
                        alt="display-product"
                      />
                    </div>
                    <div>
                      <div className="font-weight-bold mb-2">
                        {product.name}
                      </div>
                      <div className="font-weight-bold mb-2">
                        {formatPrice(product.price)}
                      </div>
                    </div>

                    <div className="ml-auto text-muted">
                      <div className="text-right">{product.weight} Gram</div>
                      <div className="form-group mt-3 mb-0">
                        <label className="required-label ml-auto">
                          Jumlah Item
                        </label>
                        {product.qty < product.min_order ? (
                          <p className="text-danger">
                            Mnimum Order {product.min_order}
                          </p>
                        ) : null}
                        <div style={{ position: "relative", width: 100 }}>
                          <input
                            onChange={(event) =>
                              handleQuantityChange(product.id, event)
                            }
                            value={
                              product.qty !== undefined
                                ? product.qty || ""
                                : product.min_order || ""
                            }
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
                  </div>
                </CCardBody>
              </CCard>
            );
          })
          .reverse()}
      </div>
    </div>
  );
};
