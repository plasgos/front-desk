import React, { useCallback, useEffect, useState } from "react";
import { PaymentMethod } from "./PaymentMethod";
import { useDispatch, useSelector } from "react-redux";
import {
  getShippingCost,
  setPickUpOptions,
  setSelectCourir,
} from "../../../redux/modules/packages/actions/actions";
import { RiErrorWarningFill } from "react-icons/ri";
import { CButton } from "@coreui/react";
import { FaShippingFast } from "react-icons/fa";

export const Delivery = () => {
  const userData = useSelector((state) => state.login);
  const packages = useSelector((state) => state.packages);
  console.log("🚀 ~ Delivery ~ packages:", packages);
  const [isDropOff, setIsDropOff] = useState(false);
  const [isPickup, setIsPickup] = useState(false);
  const [pickup, setPickup] = useState([]);
  const dispatch = useDispatch();

  const handleGetShippingCost = useCallback(() => {
    const { origin, receiver, totalWeight, item_value } = packages;
    if (
      origin.district_id &&
      receiver.subdistrict_id &&
      totalWeight &&
      item_value
    ) {
      dispatch(
        getShippingCost({
          data: {
            origin: {
              district_id: origin.district_id,
              lat: origin.lat,
              long: origin.long,
              address: origin.address,
            },
            destination: {
              district_id: receiver.subdistrict_id,
              lat: receiver.lat,
              long: receiver.long,
              address: receiver.address,
            },
            weight: totalWeight,
            insurance: packages.insurance,
            item_value,
            store_id: userData.user.store.id,
          },
          token: userData.token,
        })
      );
    }
  }, [dispatch, packages, userData.token, userData.user.store.id]);

  const handleShipping = (type) => {
    const filteredShippingData = packages.expeditions.data
      .map((expedition) => ({
        ...expedition,
        costs: expedition.costs.filter((cost) => cost.drop === type),
      }))
      .filter((expedition) => expedition.costs.length > 0);

    setPickup(filteredShippingData);
  };

  const togglePickup = () => {
    setIsPickup(true);
    handleShipping(false);
    dispatch(setPickUpOptions(false));
    setIsDropOff(false);
    dispatch(setSelectCourir({}));
  };

  const toggleDropOff = () => {
    setIsDropOff(true);
    handleShipping(true);
    dispatch(setPickUpOptions(true));
    setIsPickup(false);
    dispatch(setSelectCourir({}));
  };

  const resetToggle = () => {
    setIsPickup(false);
    setIsDropOff(false);
  };

  useEffect(() => {
    setPickup([]);
    resetToggle();
  }, [packages.expeditions.data]);

  return (
    <div>
      <div>
        <div>
          <div className="font-weight-bold mb-3">Opsi Penjemputan</div>

          <div>
            <CButton
              disabled={
                !packages.origin.district_id ||
                !packages.receiver.subdistrict_id ||
                !packages.totalWeight ||
                !packages.item_value
              }
              color="primary"
              onClick={handleGetShippingCost}
              className="mr-1 btn-block"
            >
              <FaShippingFast size={18} className="mr-2" />
              Tampilkan Pengiriman
            </CButton>
          </div>

          {packages.expeditions.loading === true && (
            <div className="my-3 text-center">
              <p>Loading....</p>
            </div>
          )}

          {packages.expeditions?.data.length > 0 &&
          packages.expeditions.loading === false ? (
            <form>
              <div className="form-row ">
                <div className="form-group col-md-6 mb-0">
                  <div
                    className={`card my-3 p-3 shadow-sm ${
                      isPickup && "border border-primary"
                    } `}
                  >
                    <div className="form-group mb-0">
                      <div className="form-check">
                        <input
                          onChange={togglePickup}
                          style={{ cursor: "pointer", transform: "scale(1.5)" }}
                          className="form-check-input "
                          type="checkbox"
                          id="pickup"
                          checked={isPickup}
                        />
                        <label
                          style={{ cursor: "pointer" }}
                          className="form-check-label mt-1 font-lg ml-2"
                          htmlFor="pickup"
                        >
                          Pick Up
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-6 mb-0 ">
                  <div
                    className={`card my-3 p-3 shadow-sm ${
                      isDropOff && "border border-primary"
                    } `}
                  >
                    <div className="form-group mb-0">
                      <div className="form-check">
                        <input
                          onChange={toggleDropOff}
                          style={{ cursor: "pointer", transform: "scale(1.5)" }}
                          className="form-check-input "
                          type="checkbox"
                          id="drop-off"
                          checked={isDropOff}
                        />
                        <label
                          style={{ cursor: "pointer" }}
                          className="form-check-label mt-1 font-lg ml-2"
                          htmlFor="drop-off"
                        >
                          Drop Off
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : null}

          {isPickup &&
            packages.expeditions?.data.length > 0 &&
            packages.expeditions.loading === false && (
              <div className="card p-2 shadow-sm border-primary">
                <div className="d-flex align-items-center">
                  <div style={{ color: "#2D61AC" }}>
                    <RiErrorWarningFill size={24} />
                  </div>

                  <div className="ml-2">
                    Paket ini akan{" "}
                    <span className="font-weight-bold">DIAMBIL</span> oleh kurir
                    ekspedisi yang di pilh
                  </div>
                </div>
              </div>
            )}

          {isDropOff &&
            packages.expeditions?.data.length > 0 &&
            packages.expeditions.loading === false && (
              <div className="card p-2 shadow-sm border-primary">
                <div className="d-flex align-items-center">
                  <div style={{ color: "#2D61AC" }}>
                    <RiErrorWarningFill size={24} />
                  </div>

                  <div className="ml-2">
                    Paket ini akan{" "}
                    <span className="font-weight-bold">DIANTAR SENDIRI</span>{" "}
                    oleh seler ke ekspedisi yang di pilh
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
      <PaymentMethod filteredData={pickup} />
    </div>
  );
};
