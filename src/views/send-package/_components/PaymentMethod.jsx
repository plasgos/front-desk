import React, { useState } from "react";

export const PaymentMethod = () => {
  const [isCod, setIsCod] = useState(false);
  const [isNonCod, setIsNonCod] = useState(false);

  const togglePickup = () => {
    if (!isNonCod) {
      setIsCod((prev) => !prev);
    } else if (isNonCod && !isCod) {
      setIsCod(true);
      setIsNonCod(false);
    }
  };

  const toggleDropOff = () => {
    if (!isCod) {
      setIsNonCod((prev) => !prev);
    } else if (isCod && !isNonCod) {
      setIsNonCod(true);
      setIsCod(false);
    }
  };

  return (
    <div>
      <div className="font-weight-bold">Metode Pembayaran</div>
      <form>
        <div className="form-row ">
          <div className="form-group col-md-6 mb-0">
            <div
              className={`card my-3 p-3 shadow-sm ${
                isCod && "border border-primary"
              } `}
            >
              <div className="form-group mb-0">
                <div className="form-check">
                  <input
                    onChange={togglePickup}
                    style={{ cursor: "pointer", transform: "scale(1.5)" }}
                    className="form-check-input "
                    type="checkbox"
                    id="cod"
                    checked={isCod}
                  />
                  <label
                    style={{ cursor: "pointer" }}
                    className="form-check-label mt-1 font-lg ml-2"
                    htmlFor="cod"
                  >
                    COD (Cash On Delivery)
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group col-md-6 mb-0 ">
            <div
              className={`card my-3 p-3 shadow-sm ${
                isNonCod && "border border-primary"
              } `}
            >
              <div className="form-group mb-0">
                <div className="form-check">
                  <input
                    onChange={toggleDropOff}
                    style={{ cursor: "pointer", transform: "scale(1.5)" }}
                    className="form-check-input "
                    type="checkbox"
                    id="non-cod"
                    checked={isNonCod}
                  />
                  <label
                    style={{ cursor: "pointer" }}
                    className="form-check-label mt-1 font-lg ml-2"
                    htmlFor="non-cod"
                  >
                    NON COD
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
