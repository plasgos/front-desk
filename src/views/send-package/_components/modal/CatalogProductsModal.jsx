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

export const CatalogProductsModal = ({
  products,
  setSelectedProduct,
  selectedProduct,
}) => {
  const [modal, setModal] = useState(false);
  const [isSelectedProduct, setIsSelectedProduct] = useState({});
  const toggle = () => {
    setModal(!modal);
  };

  const onSubmit = (data) => {
    const updatedSelectedProduct = [...selectedProduct];

    updatedSelectedProduct.push({ ...data, quantity: 1 });

    setSelectedProduct(updatedSelectedProduct);

    setModal(false);
  };

  return (
    <>
      <CButton color="primary" onClick={toggle} className="mr-1 btn-block">
        <FaListUl size={18} className="mr-2" />
        Katalog Produk
      </CButton>
      <CModal centered show={modal} onClose={toggle}>
        <CModalHeader closeButton>
          <h4 className="text-center ml-auto">Katalog Produk</h4>
        </CModalHeader>
        <CModalBody>
          <div className="modal-overflow">
            {products.map((product) => {
              const selected = isSelectedProduct.id === product.id;

              return (
                <CCard
                  key={product.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsSelectedProduct(product)}
                >
                  <CCardBody className={`${selected && "modal-selected"}`}>
                    <div style={{ gap: 20 }} className="d-flex ">
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
                        {product.weight} Gram
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              );
            })}
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => onSubmit(isSelectedProduct)} color="primary">
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
