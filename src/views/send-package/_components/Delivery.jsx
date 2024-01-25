import React, { useEffect, useState } from "react";
import { PaymentMethod } from "./PaymentMethod";
import { useDispatch, useSelector } from "react-redux";
import {
  getShippingCost,
  setPickUpOptions,
} from "../../../redux/modules/packages/actions/actions";
import { RiErrorWarningFill } from "react-icons/ri";
import { LuLoader } from "react-icons/lu";

export const Delivery = () => {
  const userData = useSelector((state) => state.login);
  const packages = useSelector((state) => state.packages);
  const [isDropOff, setIsDropOff] = useState(false);
  const [isPickup, setIsPickup] = useState(false);
  const [pickup, setPickup] = useState(undefined);
  const dispatch = useDispatch();

  const getData = () => {
    dispatch(
      getShippingCost({
        data: {
          origin: {
            district_id: packages.origin.district_id,
            lat: packages.origin.lat,
            long: packages.origin.long,
            address: packages.origin.address,
          },
          destination: {
            district_id: packages.receiver.subdistrict_id,
            lat: packages.receiver.lat,
            long: packages.receiver.long,
            address: packages.receiver.address,
          },
          weight: packages.totalWeight,
          insurance: packages.insurance,
          item_value: packages.item_value,
          store_id: userData.user.store.id,
        },
        token: userData.token,
      })
    );
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // pickup = drop : false
    setIsPickup(true);
    handleShipping(false);
    dispatch(setPickUpOptions(false));
    setIsDropOff(false);
  };

  const toggleDropOff = () => {
    setIsDropOff(true);
    handleShipping(true);
    dispatch(setPickUpOptions(true));
    setIsPickup(false);
  };

  return (
    <div>
      <div>
        <div>
          <div className="font-weight-bold">Opsi Penjemputan</div>

          {packages.expeditions.loading === true ? (
            <div className="my-3 text-center">
              <p>Loading....</p>
            </div>
          ) : (
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
          )}

          {isPickup && (
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

          {isDropOff && (
            <div className="card p-2 shadow-sm border-primary">
              <div className="d-flex align-items-center">
                <div style={{ color: "#2D61AC" }}>
                  <RiErrorWarningFill size={24} />
                </div>

                <div className="ml-2">
                  Paket ini akan{" "}
                  <span className="font-weight-bold">DIANTAR SENDIRI</span> oleh
                  seler ke ekspedisi yang di pilh
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
