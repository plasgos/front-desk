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

import { IoStorefront } from "react-icons/io5";
import { Shipping } from "./Shipping";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../lib/format-price";

export const SellerAddress = () => {
  const [modal, setModal] = useState(false);
  const [selectWarehouse, setSelectedWarehouse] = useState([]);

  console.log(selectWarehouse);

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
    dispatch(actions.getAddressStore());
  };

  const toggle = () => {
    setModal(!modal);
    // getData();
  };

  const defaultWarehouses = orders.data
    .flatMap((order) => order.Warehouses)
    .filter((warehouse) => warehouse.is_default === true);

  console.log("defaultWarehouse", defaultWarehouses);

  const onSubmit = ({ data }) => {
    setSelectedWarehouse([data]);

    setTimeout(() => {
      setModal(false);
    }, 300);
  };

  return (
    <CContainer fluid>
      <CRow>
        <CCol sm="12">
          <CCard style={{ borderRadius: 8 }} className="border-0 shadow-sm">
            <CCardHeader
              style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <IoStorefront size={36} />

                  {selectWarehouse.length < 1
                    ? defaultWarehouses.map((warehouse) => (
                        <div key={warehouse.id} className="mb-1 ml-3">
                          <div>
                            <div>
                              <h6 className="sub-heading">{warehouse.name}</h6>
                              <div>
                                {warehouse.Subdistrict.City.name},{" "}
                                {warehouse.Subdistrict.City.Province.name}{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : selectWarehouse.map((warehouse) => (
                        <div key={warehouse.id} className="mb-1 ml-3">
                          <div>
                            <div>
                              <h6 className="sub-heading">{warehouse.name}</h6>
                              <div>
                                {warehouse.Subdistrict.City.name},{" "}
                                {warehouse.Subdistrict.City.Province.name}{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>

                <div>
                  <CButton onClick={toggle} className="mr-1 border ml-auto">
                    Pilih alamat Pengiriman
                  </CButton>
                  <CModal show={modal} onClose={toggle}>
                    <CModalHeader closeButton>
                      <h4 className="text-center ml-auto">
                        Pilih Alamat Pengiriman
                      </h4>
                    </CModalHeader>
                    <CModalBody>
                      {orders.data.map((order) => {
                        return (
                          <div key={order.store_id}>
                            {order.Warehouses.map((warehouse) => (
                              <CCard
                                onClick={() =>
                                  onSubmit({
                                    data: {
                                      ...warehouse,
                                    },
                                  })
                                }
                                key={warehouse.id}
                                className="mb-2"
                              >
                                <CCardBody
                                  style={{ cursor: "pointer" }}
                                  className="select-modal"
                                >
                                  <div>
                                    <h6 className="sub-heading">
                                      {warehouse.name}
                                    </h6>
                                    <div>
                                      {warehouse.Subdistrict.City.name},{" "}
                                      {warehouse.Subdistrict.City.Province.name}{" "}
                                    </div>
                                  </div>
                                </CCardBody>
                              </CCard>
                            ))}
                          </div>
                        );
                      })}
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="primary">Pilih</CButton>{" "}
                      <CButton color="secondary" onClick={toggle}>
                        Batal
                      </CButton>
                    </CModalFooter>
                  </CModal>
                </div>
              </div>
            </CCardHeader>
            <CCardBody className="py-4">
              {orders.data.map((order) => {
                const product = order.products.map((product) => product);
                const subtotal = product[0].price * product[0].quantity;

                // console.log("product", product);

                return (
                  <div key={order.store_id} className="border-bottom my-3">
                    <div className="d-flex align-items-center">
                      <img
                        style={{ width: 80, height: 80 }}
                        src={order.avatar_store}
                        alt="order"
                      />
                      <div className="ml-3">
                        <div>{order.name_store}</div>
                        <div>
                          {product[0].quantity} Product ({product[0].weigth}{" "}
                          gram)
                        </div>
                        <div className="bold-orange">
                          {formatPrice(product[0].price)}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <div style={{ marginLeft: 90 }}>
                        <div
                          className="my-2 bold-orange"
                          style={{
                            cursor: "pointer",
                            fontSize: 14,
                          }}
                        >
                          Catatan Produk <br />
                          <span className="text-muted">
                            " {product[0].description} "
                          </span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center">
                        <div className="mx-2">
                          <p className="sub-heading">subtotal</p>
                          <p className="bold-orange">{formatPrice(subtotal)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CCardBody>
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
