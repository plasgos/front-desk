import React, { useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { PaymentMethod } from "./PaymentMethod";

export const DeliveryAndPayment = () => {
  const [isPickup, setIsPickup] = useState(false);
  const [isDropOff, setIsDropOff] = useState(false);

  const togglePickup = () => {
    if (!isDropOff) {
      setIsPickup((prev) => !prev);
    } else if (isDropOff && !isPickup) {
      setIsPickup(true);
      setIsDropOff(false);
    }
  };

  const toggleDropOff = () => {
    if (!isPickup) {
      setIsDropOff((prev) => !prev);
    } else if (isPickup && !isDropOff) {
      setIsDropOff(true);
      setIsPickup(false);
    }
  };

  return (
    <div style={{ flexGrow: 1 }} className="mt-3">
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="font-weight-bold font-lg ">Pengiriman & Pembayaran</div>
      </div>

      <div className="card p-3 shadow-sm">
        <div>
          <div>Opsi Penjemputan</div>
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
                        onClick={togglePickup}
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
                        onClick={toggleDropOff}
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
                  Paket ini akan{" "}
                  <span className="font-weight-bold">DIAMBIL</span> oleh kurir
                  ekspedisi yang di pilh
                </div>
              </div>
            </div>
          )}
        </div>
        <PaymentMethod />
      </div>
    </div>
  );
};
