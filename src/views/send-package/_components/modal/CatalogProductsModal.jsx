import {
  CButton,
  CCard,
  CCardBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { FaListUl } from "react-icons/fa";
import { formatPrice } from "../../../../lib/format-price";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import {
  reduceProductList,
  setProducts,
} from "../../../../redux/modules/packages/actions/actions";
import { useDispatch } from "react-redux";

export const CatalogProductsModal = ({ products, setSelectedProduct }) => {
  const [modal, setModal] = useState(false);
  const [isSelectedProduct, setIsSelectedProduct] = useState({});

  const [listProductToOrders, setListProductToOrders] = useState([]);
  console.log(
    "🚀 ~ CatalogProductsModal ~ listProductToOrders:",
    listProductToOrders
  );

  const setItemShippingCost = () => {
    // Memastikan bahwa selectedProduct adalah array dan memiliki elemen
    if (Array.isArray(listProductToOrders) && listProductToOrders.length > 0) {
      // Iterasi melalui setiap produk dalam array
      const productsToRedux = listProductToOrders.map((product) => {
        return {
          product_id: product.id,
          min_order: product.min_order,
          price: product.price,
          description: product.description,
          weight: product.weight,
          totalWeight: product.totalWeight,
          totalPrice: product.totalPrice,
        };
      });

      dispatch(setProducts(productsToRedux));
    } else {
      dispatch(setProducts([]));
    }
  };

  useEffect(() => {
    setItemShippingCost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listProductToOrders]);

  const handleSelectProductToOrder = (data) => {
    const existingProduct = listProductToOrders.find(
      (product) => product.id === data.id
    );
    if (existingProduct) {
      // Jika produk dengan ID yang sama sudah ada
      existingProduct.min_order += 1;
      existingProduct.totalWeight += data.weight;
      existingProduct.totalPrice += data.price;
    } else {
      // Jika produk dengan ID yang sama belum ada
      const totalWeightPerProduct = data.weight * data.min_order;
      const totalPricePerProduct = data.price * data.min_order;

      listProductToOrders.push({
        ...data,
        totalWeight: totalWeightPerProduct,
        totalPrice: totalPricePerProduct,
      });
    }

    setListProductToOrders([...listProductToOrders]);
  };

  const handleDeleteListProduck = (productid) => {
    const updatedListProducts = listProductToOrders.filter(
      (product) => product.id !== productid
    );

    setListProductToOrders(updatedListProducts);
    setSelectedProduct(updatedListProducts);
    dispatch(reduceProductList(productid));
  };

  const dispatch = useDispatch();

  const handleQuantityChange = (productId, event) => {
    const newQuantityChange = [];

    const updatedProducts = listProductToOrders.map((product) => {
      if (product.id === productId) {
        const totalWeightPerProduct =
          product.weight * Number(event.target.value || "");

        const totalPricePerProduct =
          product.price * Number(event.target.value || "");

        newQuantityChange.push({
          product_id: product.id,
          min_order: Number(event.target.value || ""),
          price: product.price,
          description: product.description,
          weight: product.weight,
          totalWeight: totalWeightPerProduct,
          totalPrice: totalPricePerProduct,
        });
        return {
          ...product,
          min_order: Number(event.target.value),
          totalWeight: totalWeightPerProduct,
          totalPrice: totalPricePerProduct,
        };
      }

      newQuantityChange.push({
        product_id: product.id,
        min_order: product.min_order,
        price: product.price,
        description: product.description,
        weight: product.weight,
        totalWeight: product.totalWeight,
        totalPrice: product.totalPrice,
      });
      return product;
    });

    setListProductToOrders(updatedProducts);
    dispatch(setProducts(newQuantityChange));
  };

  const toggle = () => {
    setModal(!modal);
  };

  const onSubmit = (data) => {
    setSelectedProduct(data);

    setModal(false);
  };

  return (
    <>
      <CButton color="primary" onClick={toggle} className="mr-1 btn-block">
        <FaListUl size={18} className="mr-2" />
        Katalog Produk
      </CButton>
      <CModal size="xl" centered show={modal} onClose={toggle}>
        <CModalHeader closeButton>
          <h4 className="text-center ml-auto">Katalog Produk</h4>
        </CModalHeader>
        <CModalBody style={{ gap: 12 }} className="d-flex">
          <div className="modal-overflow">
            {products.map((product) => {
              const selected = isSelectedProduct.id === product.id;

              return (
                <CCard
                  className="my-2"
                  key={product.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsSelectedProduct(product)}
                >
                  <CCardBody className={` p-2 ${selected && "modal-selected"}`}>
                    <div style={{ gap: 20 }} className="d-flex ">
                      <div className="rounded shadow-sm border p-2">
                        <img
                          style={{ width: 40 }}
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
                        <div className="mt-3">
                          <CButton
                            size="sm"
                            shape="pill"
                            variant="outline"
                            color="primary"
                            onClick={() => handleSelectProductToOrder(product)}
                            className="mr-1 btn-block"
                          >
                            Pilih Produk
                            <MdOutlineShoppingCartCheckout
                              size={18}
                              className="ml-2"
                            />
                          </CButton>
                        </div>
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              );
            })}
          </div>

          <div className="modal-overflow">
            {listProductToOrders.map((product) => {
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
                          style={{ width: 50 }}
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
                          <div style={{ position: "relative", width: 100 }}>
                            <input
                              onChange={(event) =>
                                handleQuantityChange(product.id, event)
                              }
                              value={product.min_order || ""}
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
            })}
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            onClick={() => onSubmit(listProductToOrders)}
            color="primary"
          >
            Pilih
          </CButton>{" "}
          <CButton color="secondary" onClick={toggle}>
            Batal
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
