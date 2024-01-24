import {
  CButton,
  CCard,
  CCardBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React, { useState } from "react";
import { FaListUl } from "react-icons/fa";
import { formatPrice } from "../../../../lib/format-price";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import {
  resetProductTotalWeight,
  setProducts,
} from "../../../../redux/modules/packages/actions/actions";
import { useDispatch } from "react-redux";
import { ListSelectedProducts } from "../ListSelectedProducts";
import { FaRegEdit } from "react-icons/fa";

export const CatalogProductsModal = ({
  products,
  setSelectedProduct,
  selectedProduct,
}) => {
  const [modal, setModal] = useState(false);
  const [isSelectedProduct, setIsSelectedProduct] = useState({});

  const [listProductToOrders, setListProductToOrders] = useState([]);

  const setItemShippingCost = () => {
    if (listProductToOrders && listProductToOrders.length > 0) {
      const productsToRedux = listProductToOrders.map((product) => {
        return {
          ...product,
          totalWeight: product.totalWeight,
          totalPrice: product.totalPrice,
        };
      });

      dispatch(setProducts(productsToRedux));
    } else {
      dispatch(setProducts([]));
    }
  };

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

  const dispatch = useDispatch();

  const toggle = () => {
    setModal(!modal);
  };

  const handleEditSelectedProduct = () => {
    setModal(!modal);
    dispatch(resetProductTotalWeight());
  };

  const onSubmit = (data) => {
    setSelectedProduct(data);
    setItemShippingCost();
    setModal((prevModalState) => !prevModalState);
  };

  return (
    <>
      {selectedProduct && selectedProduct.length > 0 ? (
        <CButton
          color="primary"
          onClick={handleEditSelectedProduct}
          className="mr-1 btn-block"
        >
          <FaRegEdit size={18} className="mr-2" />
          Edit Produk Terpilih
        </CButton>
      ) : (
        <CButton color="primary" onClick={toggle} className="mr-1 btn-block">
          <FaListUl size={18} className="mr-2" />
          Katalog Produk
        </CButton>
      )}

      <CModal size="xl" centered show={modal} onClose={toggle}>
        <CModalHeader closeButton>
          <h4 className="text-center ml-auto">Katalog Produk</h4>
        </CModalHeader>
        <CModalBody style={{ gap: 20 }} className="d-flex">
          <div style={{ flex: 1 }}>
            <div className="mb-2">List Produk</div>

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
                    <CCardBody
                      className={` p-2 ${selected && "modal-selected"}`}
                    >
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
                          <div className="text-right">
                            {product.weight} Gram
                          </div>
                          <div className="mt-3">
                            <CButton
                              size="sm"
                              shape="pill"
                              variant="outline"
                              color="primary"
                              onClick={() =>
                                handleSelectProductToOrder(product)
                              }
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
          </div>

          <ListSelectedProducts
            listProductToOrders={listProductToOrders}
            setListProductToOrders={setListProductToOrders}
          />
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
