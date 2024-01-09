import React, { useEffect, useState } from "react";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";

import * as actions from "../../redux/modules/orders/actions/actions";

import { Shipping } from "./Shipping";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../lib/format-price";

export const SellerAddress = () => {
  const [modalStates, setModalStates] = useState({});
  const [selectedWarehouse, setSelectedWarehouse] = useState({});

  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    // let payload = {
    //   token: "xxxx",
    // };
    dispatch(actions.getOrders());
  };

  const toggleModal = (store_id) => {
    setModalStates((prevStates) => ({
      ...prevStates,
      [store_id]: !prevStates[store_id],
    }));
  };

  const onSubmit = (data) => {
    dispatch(actions.setAddressStore(data));

    // TODO Push to checkout Redux

    setModalStates((prevStates) => ({
      ...prevStates,
      [data.store_id]: !prevStates[data.store_id],
    }));
  };

  let totalPricesPerStore = {};

  return (
    <CContainer fluid>
      <CRow>
        <CCol sm="12">
          <CCard style={{ borderRadius: 8 }} className="border-0 shadow-sm">
            {orders.data.map((order) => {
              const defaultWarehouse = order.Warehouses.filter(
                (warehouse) => warehouse.is_default
              );

              return (
                <div key={order.store_id}>
                  <CCardHeader
                    style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <img
                          style={{ width: 60, height: 60 }}
                          src={order.avatar_store}
                          alt="order"
                        />

                        <div>
                          <div className="sub-heading ml-3">
                            {order.name_store}
                          </div>
                          <div className="">
                            <div className="ml-3">Di kirim dari :</div>
                            {Object.keys(selectedWarehouse).length === 0 ? (
                              defaultWarehouse.map((warehouse) => (
                                <div key={warehouse.id} className="ml-3">
                                  {warehouse.Subdistrict.City.type}{" "}
                                  {warehouse.Subdistrict.City.name},{" "}
                                  {warehouse.Subdistrict.City.Province.name}
                                </div>
                              ))
                            ) : (
                              <div className="ml-3">
                                {order.sender.Subdistrict.City.type}{" "}
                                {order.sender.Subdistrict.City.name},{" "}
                                {order.sender.Subdistrict.City.Province.name}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <CButton
                          onClick={() => toggleModal(order.store_id)}
                          className="mr-1 border ml-auto"
                        >
                          Pilih alamat Pengiriman
                        </CButton>
                        <CModal
                          show={modalStates[order.store_id]}
                          onClose={() => toggleModal(order.store_id)}
                        >
                          <CModalHeader closeButton>
                            <h4 className="text-center ml-auto">
                              Pilih Alamat Penerima
                            </h4>
                          </CModalHeader>
                          <CModalBody>
                            <div className="modal-overflow">
                              {order.Warehouses.map((warehouse) => {
                                const isSelected =
                                  selectedWarehouse.id === warehouse.id;

                                return (
                                  <CCard
                                    key={warehouse.id}
                                    className={`mb-2 `}
                                    onClick={() =>
                                      setSelectedWarehouse({ ...warehouse })
                                    }
                                  >
                                    <CCardBody
                                      style={{ cursor: "pointer" }}
                                      className={`select-modal ${
                                        isSelected && "modal-selected"
                                      }`}
                                    >
                                      <div>
                                        <h6 className="sub-heading">
                                          {warehouse.name}
                                        </h6>
                                        <div>
                                          {warehouse.Subdistrict.City.name},{" "}
                                          {
                                            warehouse.Subdistrict.City.Province
                                              .name
                                          }{" "}
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
                              onClick={() => onSubmit(selectedWarehouse)}
                              color="primary"
                            >
                              Pilih
                            </CButton>{" "}
                            <CButton
                              color="secondary"
                              onClick={() => toggleModal(order.store_id)}
                            >
                              Batal
                            </CButton>
                          </CModalFooter>
                        </CModal>
                      </div>
                    </div>
                  </CCardHeader>
                  <CCardBody className="py-4">
                    <div style={{ gap: 14 }} className="d-flex  flex-column">
                      {order.products.map((product) => {
                        const totalPricePerItem =
                          product.price * product.quantity;

                        // Memeriksa apakah storeId sudah ada dalam objek totalPricesPerStore
                        if (
                          totalPricesPerStore.hasOwnProperty(order.store_id)
                        ) {
                          // Jika sudah ada, tambahkan nilai totalPricePerItem ke totalPricesPerStore[storeId]
                          totalPricesPerStore[order.store_id] +=
                            totalPricePerItem;
                        } else {
                          // Jika belum ada, inisialisasi totalPricesPerStore[storeId] dengan nilai totalPricePerItem
                          totalPricesPerStore[order.store_id] =
                            totalPricePerItem;
                        }

                        const totalWeightPerItem =
                          product.weight * product.quantity;

                        return (
                          <div
                            key={product.product_id}
                            className="d-flex align-items-center "
                          >
                            <img
                              style={{ width: 80, height: 80 }}
                              src={product.product.ImageProducts[0].url}
                              alt="order"
                            />
                            <div className="d-flex flex-column ml-3">
                              <div>{product.product.name}</div>

                              <div className="d-flex justify-content-between">
                                <div className="bold-orange">
                                  {formatPrice(totalPricePerItem)}
                                </div>

                                <div className="ml-5">
                                  {product.quantity} Produk (
                                  {totalWeightPerItem} gram)
                                </div>
                              </div>

                              {product.description ? (
                                <div
                                  className="my-2 text-muted"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                >
                                  Catatan Produk <br />"{product.description}"
                                </div>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                      <div className="d-flex justify-content-between border-bottom ">
                        <div></div>

                        <div className="d-flex align-items-center py-3">
                          <div className="mx-2">
                            <p className="sub-heading">Total Pesanan</p>
                            <p className="bold-orange">
                              {formatPrice(totalPricesPerStore[order.store_id])}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CCardBody>
                </div>
              );
            })}
            <CCardFooter
              style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
            >
              <Shipping />
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};
