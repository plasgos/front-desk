import React, { useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";

import { setPickUpOptions } from "../../../redux/modules/packages/actions/actions";
import { useDispatch, useSelector } from "react-redux";

export const PickUpOptions = () => {
  const packages = useSelector((state) => state.packages);
  const { expeditions } = packages;
  const [isPickup, setIsPickup] = useState(false);
  const [pickup, setPickup] = useState("");

  const [isDropOff, setIsDropOff] = useState(false);

  const dispatch = useDispatch();

  const handleShipping = () => {
    // setIsGroupSelected(group);

    const filteredShippingData = expeditions.data
      .map((expedition) => ({
        ...expedition,
        costs: expedition.costs.filter((cost) => cost.drop === false),
      }))
      .filter((expedition) => expedition.costs.length > 0);

    // setCourirs(filteredShippingData);
  };

  const togglePickup = () => {
    // pickup = drop : false
    setIsPickup(true);
    handleShipping();
    dispatch(setPickUpOptions(false));
    setIsDropOff(false);
  };

  const toggleDropOff = () => {
    setIsDropOff(true);
    dispatch(setPickUpOptions(true));
    setIsPickup(false);
  };
  return (
    <div>
      <div>
        <div className="font-weight-bold">Opsi Penjemputan</div>
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

        {isPickup && (
          <div className="card p-2 shadow-sm border-primary">
            <div className="d-flex align-items-center">
              <div style={{ color: "#2D61AC" }}>
                <RiErrorWarningFill size={24} />
              </div>

              <div className="ml-2">
                Paket ini akan <span className="font-weight-bold">DIAMBIL</span>{" "}
                oleh kurir ekspedisi yang di pilh
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
  );
};
