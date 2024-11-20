import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CSwitch,
  CTooltip,
  CButton,
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";

import { IoInformationCircle } from "react-icons/io5";
import { formatPrice, checkObjectFilled } from "../../../../lib";
import {
  checkCosts,
  resetCheckCosts,
} from "../../../../modules/shipping/reducer";
import { setShipping, setCOD } from "../../../../modules/package/reducer";

function codFee(value, fee, min_fee) {
  let total = value * fee;
  return total > min_fee ? total : min_fee;
}

const Costs = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.login);
  const { sender, receiver, detail, items, shipping, item_value } = useSelector(
    (state) => state.package
  );
  const { cost } = useSelector((state) => state.shipping);

  const [group, setGroup] = useState({});

  const groupNames = [
    // {name: "Instant", group:"instant"},
    // {name: "Same Day", group:"same_day"},
    { name: "Next Day", group: "next_day" },
    { name: "Reguler", group: "regular" },
    { name: "One Day", group: "one_day" },
    { name: "Kargo", group: "cargo" },
  ];
  const subTotal = () => {
    let subTotal = 0;
    for (let i = 0; i < items.length; i++) {
      subTotal += items[i].quantity * items[i].product.price;
    }
    return subTotal;
  };

  const filterCostByGroup = (arr, groupArray) => {
    return groupArray
      .map((groupObj) => {
        const filteredGroup = arr.filter((item) => {
          // Mengecek apakah ada elemen pada costs yang memiliki group sesuai dengan groupObj
          return (
            item.costs &&
            item.costs.some((child) => child.group === groupObj.group)
          );
        });
        return {
          service: groupObj.name,
          courier: filteredGroup.map((item) => ({
            ...item,
            costs: item.costs.filter((child) => child.group === groupObj.group),
          })),
        };
      })
      .filter((result) => result.courier.length > 0);
  };

  const getData = () => {
    let payload = {
      data: {
        origin: {
          district_id: sender.subdistrict_id,
          lat: sender.latitude,
          long: sender.longitude,
          address: sender.address,
        },
        destination: {
          district_id: receiver.subdistrict_id,
          lat: receiver.latitude,
          long: receiver.longitude,
          address: receiver.address,
        },
        weight: detail.weight,
        store_id: user.store.id,
        insurance: 1,
        item_value: subTotal(),
      },
      token,
    };
    dispatch(checkCosts(payload));
  };
  const isValid = () => {
    let obj = {
      sender_sid: sender.subdistrict_id,
      receiver_sid: receiver.subdistrict_id,
      weight: detail.weight,
      length: detail.length,
      width: detail.width,
      height: detail.height,
      cod: shipping.cod,
      drop: shipping.drop,
    };
    return (
      checkObjectFilled(obj) &&
      detail.weight > 0 &&
      detail.length > 0 &&
      detail.width > 0 &&
      detail.height > 0
    );
  };
  const onShowGroupShipping = () => {
    if (cost.data.length === 0) {
      getData();
    }
  };
  const etdCourier = (costs) => {
    let obj = costs ? costs[0] : null;
    if (obj) {
      if (obj.eta) {
        const [min, max] = obj.eta.match(/\d+/g).map(Number);
        if (max > min) {
          return `Estimasi tiba dalam ${min} - ${max} jam`;
        }
        return `Estimasi tiba dalam ${min} jam`;
      }
      if (!obj.eta && obj.etd) {
        const [min, max] = obj.etd.match(/\d+/g).map(Number);
        if (min === 0) {
          return `Estimasi tiba dalam ${max} hari`;
        }
        if (max > min) {
          return `Estimasi tiba dalam ${min} - ${max} hari`;
        }
        return `Estimasi tiba dalam ${min} hari`;
      }
    }
    return null;
  };

  const onSetCod = (value) => {
    let payload = {
      checked: value,
      cod_setting: {
        cod_fee: 0,
        minimum_cod_fee: 0,
      },
      cod_fee: 0,
    };
    console.log(shipping.courier);
    if (shipping.courier && shipping.courier.costs && value) {
      payload.cod_setting = {
        cod_fee: Number(shipping.courier.costs[0].setting.cod_fee),
        minimum_cod_fee: Number(
          shipping.courier.costs[0].setting.minimum_cod_fee
        ),
      };
      payload.cod_fee = codFee(
        item_value,
        Number(shipping.courier.costs[0].setting.cod_fee),
        Number(shipping.courier.costs[0].setting.minimum_cod_fee)
      );
    } else {
      payload.cod_fee = 0;
    }
    dispatch(setCOD(payload));
  };

  const onSetCourier = (item) => {
    let payload = {
      name: item.name,
      service: item.code,
      service_type: item.costs[0].service_type,
      cost: Number(item.costs[0].cost),
      service_type_id: item.costs[0].id,
      courier: item,
    };
    onSetCod(shipping.cod);
    dispatch(
      setShipping({
        ...shipping,
        ...payload,
      })
    );
  };

  useEffect(() => {
    if (cost.data) {
      const costs = cost.data.filter((item) =>
        item.costs.some(
          (val) => val.cod === shipping.cod && val.drop === shipping.drop
        )
      );
      const arr =
        filterCostByGroup(costs, groupNames).length > 0
          ? filterCostByGroup(costs, groupNames)[0]
          : [];
      setGroup(arr);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cost]);

  useEffect(() => {
    if (isValid() && cost.data.length === 0) {
      getData();
    }
    return () => {};
  }, [detail, sender.subdistrict_id, receiver.subdistrict_id, shipping]);

  if (!isValid()) {
    return (
      <div>
        <div className="font-weight-bold mb-3">Ekspedisi</div>
        <CCard className="shadow-sm border-0">
          <CCardBody className="py-3">
            <div className="d-flex align-items-center justify-content-center">
              <div>Mohon isi Detail Penerima, Barang & Metode Pembayaran</div>
            </div>
          </CCardBody>
        </CCard>
      </div>
    );
  }
  if (cost && cost.loading) {
    return (
      <div>
        <div className="font-weight-bold mb-3">Ekspedisi</div>
        <div>loading</div>
      </div>
    );
  }
  return (
    <div>
      <div className="font-weight-bold">Ekspedisi</div>
      {filterCostByGroup(
        cost.data.filter((item) =>
          item.costs.some(
            (val) => val.cod === shipping.cod && val.drop === shipping.drop
          )
        ),
        groupNames
      ).length > 0 ? (
        <>
          <div className="mb-2 d-flex align-items-center">
            {filterCostByGroup(
              cost.data.filter((item) =>
                item.costs.some(
                  (val) =>
                    val.cod === shipping.cod && val.drop === shipping.drop
                )
              ),
              groupNames
            ).map((item, i) => (
              <CButton
                key={i}
                size="sm"
                shape="pill"
                variant="outline"
                color="primary"
                className={`mr-2 ${
                  item.service === group.service ? "bg-primary text-white" : ""
                }`}
                onClick={() => setGroup(item)}
              >
                <div>
                  <b>{item.service}</b>
                </div>
              </CButton>
            ))}
          </div>
          {group.courier && group.courier.length > 0 && (
            <div>
              {group.courier
                ? group.courier.map((item, i) => (
                    <div
                      style={{ cursor: "pointer" }}
                      key={item.id}
                      className={`card px-3 py-2 shadow-sm ${
                        item.costs[0].id === shipping.service_type_id
                          ? "border border-primary"
                          : ""
                      } `}
                      onClick={() => onSetCourier(item)}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="font-weight-bold mb-2">
                            {item.name}{" "}
                            <span className="text-muted">
                              {item.costs[0].service_name}
                            </span>
                          </div>
                          <div>
                            <div className="font-weight-bold mb-2 text-success">
                              <span>
                                {formatPrice(Number(item.costs[0].cost))}
                              </span>
                            </div>
                            <div className="my-2">{etdCourier(item.costs)}</div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          )}
        </>
      ) : (
        <div>Kosong</div>
      )}
    </div>
  );
};

export default Costs;
