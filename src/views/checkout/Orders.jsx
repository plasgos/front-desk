import React, { useEffect, useState } from "react";

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";

import { getOrders } from "../../modules/orders/actions/actions";

import { setCheckoutOrders } from "../../modules/checkout/actions/actions";

import { setTotalPrice } from "../../modules/total-price/actions/actions";

import { Shipping } from "./Shipping";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../lib/format-price";
import { SenderModal } from "./modal/SenderModal";

export const Orders = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState({});
  const [totalPriceToCheckout, setTotalPriceToCheckout] = useState(0);

  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);
  let totalPricesPerStore = {};

  useEffect(() => {
    getData();
    defaultCheckout();
    dispatch(setTotalPrice(totalPriceToCheckout));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPriceToCheckout]);

  useEffect(() => {
    const calculatedTotalPrice = Object.values(totalPricesPerStore).reduce(
      (acc, price) => acc + price,
      0
    );

    setTotalPriceToCheckout(calculatedTotalPrice);
  }, [totalPricesPerStore]);

  const getData = () => {
    dispatch(getOrders());
  };

  const defaultCheckout = () => {
    const checkoutData = orders.data.map((order) => {
      const products = order.products.map((product) => ({
        product_id: product.product_id,
        quantity: product.quantity,
        price: product.price,
        cashback: product.cashback,
        description: product.description,
        stock: product.stock ? product.stock.qty : 0,
      }));

      const defaultWarehouses = order.Warehouses.filter(
        (warehouse) => warehouse.is_default
      );

      const senders = defaultWarehouses.reduce((acc, defaultWarehouse) => {
        acc[defaultWarehouse.store_id] = {
          id: defaultWarehouse.id,
          store_id: defaultWarehouse.store_id,
          name: defaultWarehouse.name,
          phone_number: defaultWarehouse.phone_number,
          address: defaultWarehouse.address,
          subdistrict_id: defaultWarehouse.subdistrict_id,
          postal_code: defaultWarehouse.postal_code,
          latitude: defaultWarehouse.latitude,
          longitude: defaultWarehouse.longitude,
        };
        return acc;
      }, {});

      return {
        store_id: order.store_id,
        sender: senders[order.store_id] || null,
        products: products,
        warehouse_id: order.sender.id,
      };
    });

    dispatch(setCheckoutOrders(checkoutData));
  };

  return (
    <CContainer fluid>
      <CRow>
        <CCol sm="12">
          {orders.data.map((order) => {
            const defaultWarehouse = order.Warehouses.filter(
              (warehouse) => warehouse.is_default
            );

            return (
              <CCard
                key={order.store_id}
                style={{ borderRadius: 8 }}
                className="border-0 shadow-sm"
              >
                <div>
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
                        <SenderModal
                          order={order}
                          setSelectedWarehouse={setSelectedWarehouse}
                          selectedWarehouse={selectedWarehouse}
                        />
                      </div>
                    </div>
                  </CCardHeader>
                  <CCardBody className="py-4">
                    <div style={{ gap: 14 }} className="flex-column">
                      {order.products.map((product) => {
                        const totalPricePerItem =
                          product.price * product.quantity;

                        if (
                          totalPricesPerStore.hasOwnProperty(order.store_id)
                        ) {
                          totalPricesPerStore[order.store_id] +=
                            totalPricePerItem;
                        } else {
                          totalPricesPerStore[order.store_id] =
                            totalPricePerItem;
                        }

                        const totalWeightPerItem =
                          product.weight * product.quantity;

                        return (
                          <div
                            key={product.product_id}
                            className="d-flex justify-content-between align-items-center my-3"
                          >
                            <div className="d-flex">
                              <img
                                style={{ width: 80, height: 80 }}
                                src={product.product.ImageProducts[0].url}
                                alt="order"
                              />
                              <div className="ml-3">
                                <div>{product.product.name}</div>
                                <div className="bold-orange">
                                  {formatPrice(totalPricePerItem)}
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
                            <div className="d-flex flex-column ml-3">
                              <div className="d-flex justify-content-between">
                                <div className="ml-5">
                                  {product.quantity} Produk (
                                  {totalWeightPerItem} gram)
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="d-flex justify-content-end">
                        <div>
                          <div className="sub-heading">Total Pesanan</div>
                          <div className="bold-orange my-2 text-right">
                            {formatPrice(totalPricesPerStore[order.store_id])}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CCardBody>
                  <CCardFooter
                    style={{
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                    }}
                  >
                    <Shipping storeId={order.store_id} />
                  </CCardFooter>
                </div>
              </CCard>
            );
          })}
        </CCol>
      </CRow>
    </CContainer>
  );
};
