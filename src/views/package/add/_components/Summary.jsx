import React, { useEffect, useState } from "react";
import {
  CButton,
  CSwitch,
  CCard,
  CCardBody,
  CTooltip,
  CAlert,
  CLink,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { RiErrorWarningFill } from "react-icons/ri";
import { GoQuestion } from "react-icons/go";
import { IoInformationCircle } from "react-icons/io5";

import { formatPrice } from "../../../../lib/format-price";
import { setShipping, setInsurance } from "../../../../modules/package/reducer";

function roundUpToNearestHundred(number) {
  return Math.ceil(number / 100) * 100;
}

const Insurance = () => {
  const dispatch = useDispatch();
  const { items, insurance, shipping } = useSelector((state) => state.package);

  const services_instant_ids = [2, 3];
  const services_express_ids = Array.from(
    { length: 12 },
    (_, index) => index + 4
  );

  const subTotal = () => {
    let subTotal = 0;
    for (let i = 0; i < items.length; i++) {
      subTotal += Number(items[i].quantity) * Number(items[i].product.price);
    }
    return subTotal;
  };
  // const insurance_instant = () => {
  //   if(services_instant_ids.includes(courier.id) && courier.costs){
  //     return {
  //       shipping_insurance_fee: Number(shipping.courier.costs[0].price.insurance_fee),
  //       insurance_setting: {
  //         insurance_fee: 0,
  //         insurance_add_cost: Number(shipping.courier.costs[0].price.insurance_fee)
  //       }
  //     }
  //   }
  // }
  const insurance_express = () => {
    if (
      shipping.courier &&
      services_express_ids.includes(shipping.courier.id) &&
      shipping.courier.costs
    ) {
      let total = subTotal();
      let insurance_fee =
        Number(shipping.courier.costs[0].setting.insurance_fee) * total;
      if (shipping.courier.costs[0].setting.insurance_add_cost) {
        insurance_fee =
          insurance_fee +
          Number(shipping.courier.costs[0].setting.insurance_add_cost);
      }
      return {
        insurance_fee,
        insurance_setting: {
          insurance_fee: Number(
            shipping.courier.costs[0].setting.insurance_fee
          ),
          insurance_add_cost: Number(
            shipping.courier.costs[0].setting.insurance_add_cost
          ),
        },
      };
    }
  };
  const onCheckedInsurance = async (checked) => {
    let payload = {
      checked,
      insurance_fee: 0,
      insurance_setting: {
        insurance_fee: 0,
        insurance_add_cost: 0,
      },
    };
    try {
      if (checked && shipping.courier) {
        // if(services_instant_ids.includes(courier.id)){
        //   payload.insurance_fee = await insurance_instant().insurance_fee
        // }
        if (services_express_ids.includes(shipping.courier.id)) {
          payload.insurance_fee = roundUpToNearestHundred(
            insurance_express().insurance_fee
          );
        }
      }
      if (!checked) {
        payload.insurance_fee = 0;
      }
      await dispatch(setInsurance(payload));
    } catch (e) {}
  };

  useEffect(() => {
    if (shipping.courier && shipping.courier.id) {
      onCheckedInsurance(true);
    } else {
      dispatch(
        setInsurance({
          checked: false,
          insurance_fee: 0,
          insurance_setting: {
            insurance_fee: 0,
            insurance_add_cost: 0,
          },
        })
      );
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipping.courier]);
  if (shipping.courier && !shipping.courier.id) {
    return <div />;
  }
  return (
    <>
      <CCard style={{ borderRadius: 8 }}>
        <CCardBody className="py-2 d-flex justify-content-between align-items-center">
          <div>
            <div className="d-flex justify-content-start align-items-center">
              <div>
                <b>
                  {(shipping.courier &&
                    services_instant_ids.includes(shipping.courier.id)) ||
                  subTotal() >= 500000
                    ? "Wajib Asuransi"
                    : "Asuransi Pengiriman"}
                </b>
              </div>
              <div className="text-dark ml-2">
                <CTooltip
                  content="Pesanan kamu mendapat perlindungan asuransi pengiriman. Harga asuransi yang berlaku sesuai dengan ketentuan dari masing-masing ekspedisi yang kamu pilih."
                  placement="bottom"
                >
                  <IoInformationCircle
                    style={{ fontSize: 16, cursor: "pointer" }}
                  />
                </CTooltip>
              </div>
            </div>
            {shipping.courier &&
              services_express_ids.includes(shipping.courier.id) &&
              shipping.courier.costs && (
                <div className="text-dark" style={{ fontSize: 12 }}>
                  Biaya asuransi{" "}
                  <b>
                    {formatPrice(
                      roundUpToNearestHundred(insurance_express().insurance_fee)
                    )}
                  </b>
                </div>
              )}
          </div>
          <CSwitch
            color="primary"
            shape="pill"
            disabled={
              (shipping.courier &&
                services_instant_ids.includes(shipping.courier.id)) ||
              subTotal() >= 500000
            }
            checked={shipping.insurance}
            onClick={() => onCheckedInsurance(!shipping.insurance)}
            style={{ fontSize: 24 }}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default ({ history }) => {
  const dispatch = useDispatch();
  const { token, logged_in } = useSelector((state) => state.login);
  const {
    warehouse_id,
    shipping_cost,
    insurance_fee,
    cod_fee,
    item_value,
    shipping,
    items,
    detail,
    receiver,
    sender,
  } = useSelector((state) => state.package);
  // const { selectedExpedtion } = packages;
  const [isChecked, setIsChecked] = useState(false);
  const [insuranceFee, setInsuranceFee] = useState(0);
  const [codFee, setCodFee] = useState(0);
  const [countInsuranceFee, setCountInsuranceFee] = useState(0);

  const billToRecipient = () => {
    if (shipping.cod) {
      if (shipping.cod_value > 0) {
        let total_cost = shipping_cost + insurance_fee + cod_fee;
        if (shipping.cod_value < total_cost) {
          return total_cost;
        } else {
          return shipping.cod_value;
        }
      }
      if (shipping.cod_value === 0) {
        return shipping_cost + insurance_fee + cod_fee + item_value;
      }
    } else {
      return 0;
    }
    // if (shipping.cod && shipping.cod_value === 0){
    //   return shipping_cost + insurance_fee + cod_fee + item_value
    // }else if (shipping.cod && shipping.cod_value > 0){
    //   let total_cost = shipping_cost + insurance_fee + cod_fee
    //   if(shipping.cod_value < total_cost){
    //     return total_cost
    //   }else{
    //     return shipping.cod_value
    //   }
    // } else {
    //   return shipping_cost + insurance_fee + cod_fee
    // }
  };
  const estPayout = () => {
    let total_cost = shipping_cost + insurance_fee + cod_fee;
    if (shipping.cod) {
      if (shipping.cod_value > 0) {
        return shipping.cod_value - total_cost;
      } else {
        return item_value;
      }
    } else {
      return 0;
    }
  };

  const onSubmitProcess = () => {
    if (logged_in) {
      let payload = {
        data: {
          receiver: {
            name: receiver.name,
            phone_number: receiver.phone_number,
            address: receiver.address,
            district_id: receiver.district_id,
            postal_code: receiver.postal_code,
            latitude: receiver.latitude,
            longitude: receiver.longitude,
          },
          sender: {
            name: sender.name,
            phone_number: sender.phone_number,
            address: sender.address,
            district_id: sender.district_id,
            postal_code: sender.postal_code,
            latitude: sender.latitude,
            longitude: sender.longitude,
          },
          detail: {
            weight: detail.weight,
            width: detail.width,
            height: detail.height,
            length: detail.length,
            note: detail.note,
            qty: detail.qty,
          },
          items: items.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
          })),
          shipping: {
            schedule: "",
            service: shipping.service,
            service_type: shipping.service_type,
            drop: shipping.drop,
            cod: shipping.cod,
            insurance: shipping.insurance,
            cod_value: shipping.cod_value,
            service_type_id: shipping.service_type_id,
          },
          shipping_cost,
          insurance_fee,
          cod_fee,
          item_value,
          warehouse_id,
        },
        token,
      };
      console.log(payload);
      console.log(JSON.stringify(payload));
    }
  };
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <div className="font-weight-bold font-lg ">Estimasi Biaya</div>
        <div style={{ height: 35 }} />
      </div>
      <div className="pt-3 card p-3 shadow-sm">
        <Insurance />
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">Layanan</div>
            <div className="font-weight-bold">
              {shipping.name && shipping.name.length > 0 ? shipping.name : "-"}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">Ongkir</div>
            <div className="font-weight-bold">
              <span>{shipping_cost ? formatPrice(shipping_cost) : "-"}</span>
            </div>
          </div>
          {insurance_fee ? (
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted">Biaya Asuransi</div>
              <div className="font-weight-bold">
                {insurance_fee ? formatPrice(insurance_fee) : "-"}
              </div>
            </div>
          ) : null}
          {cod_fee ? (
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted">COD Fee</div>
              <div className="font-weight-bold">
                {cod_fee ? formatPrice(cod_fee) : "-"}
              </div>
            </div>
          ) : null}
          {billToRecipient() ? (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-muted">Nilai Barang</div>
                <div className="font-weight-bold">
                  {item_value ? formatPrice(item_value) : "-"}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className=" font-weight-bold text-primary">
                  Ditagih ke Penerima
                </div>
                <div className="font-weight-bold text-primary">
                  {billToRecipient() ? formatPrice(billToRecipient()) : "-"}
                </div>
              </div>
            </>
          ) : null}
          {estPayout() ? (
            <div className="d-flex justify-content-between align-items-center">
              <div className="font-weight-bold text-success">
                Estimasi Pencairan
              </div>
              <div className="d-flex align-items-center">
                <div className="font-weight-bold text-success">
                  {estPayout() ? formatPrice(estPayout()) : "0"}
                </div>
                <GoQuestion className="ml-2 text-success" />
              </div>
            </div>
          ) : null}

          <div className="mt-3">
            <CAlert color="info">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex  align-items-center">
                  <RiErrorWarningFill size={18} />
                  <span className="ml-2">Syarat & Ketentuan</span>
                </div>
                <div>
                  <CLink href="#">Details</CLink>
                </div>
              </div>
            </CAlert>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-end">
        <CButton
          className="btn-outline-primary mr-2"
          style={{ width: 100 }}
          onClick={() => history.goBack()}
        >
          <span className="ont-weight-bold">Batal</span>
        </CButton>
        <CButton color="primary" onClick={onSubmitProcess}>
          <span className="font-weight-bold">Proses Paket</span>
        </CButton>
      </div>
    </div>
  );
};
