import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RiErrorWarningFill } from "react-icons/ri";
import { CButton, CAlert } from "@coreui/react";
import { FaShippingFast } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";

import { Checkbox } from "../../../../components";

import { setShipping, setCOD } from "../../../../modules/package/reducer";
import { resetCheckCosts } from "../../../../modules/shipping/reducer";
import Costs from "./Costs";

function codFee(value, fee, min_fee) {
  let total = value * fee;
  return total > min_fee ? total : min_fee;
}

export default () => {
  const dispatch = useDispatch();
  const { logged_in, token } = useSelector((state) => state.login);
  const { shipping, item_value } = useSelector((state) => state.package);

  const [cod, setCod] = useState(shipping.cod);

  const onSetCod = async (value) => {
    let payload = {
      checked: value,
      cod_setting: {
        cod_fee: 0,
        minimum_cod_fee: 0,
      },
      cod_fee: 0,
    };
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
    await setCod(value);
    await dispatch(resetCheckCosts());
    await dispatch(setCOD(payload));
  };

  return (
    <div>
      <div className="mb-3">
        <div className="font-weight-bold mb-2">Metode Pembayaran</div>
        <form>
          <div className="form-row">
            <div className="form-group col-md-6 mb-0">
              <div
                className={`card my-2 px-3 py-2 shadow-sm ${
                  cod && "border border-primary"
                }`}
                style={{ minHeight: 45 }}
              >
                <Checkbox
                  checked={cod}
                  onClick={() => onSetCod(true)}
                  size={18}
                  style={{ cursor: "pointer", transform: "scale(1.2)" }}
                  label="COD (Cash On Delivery)"
                  labelStyle={{ fontSize: 14 }}
                />
              </div>
            </div>
            <div className="form-group col-md-6 mb-0 ">
              <div
                className={`card my-2 px-3 py-2 shadow-sm ${
                  cod === false && "border border-primary"
                }`}
                style={{ minHeight: 45 }}
              >
                <Checkbox
                  checked={cod === false}
                  onClick={() => onSetCod(false)}
                  size={18}
                  style={{ cursor: "pointer", transform: "scale(1.2)" }}
                  label="Non COD"
                  labelStyle={{ fontSize: 18 }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
