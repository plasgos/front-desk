import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPaymentMethod } from "../../../redux/modules/packages/actions/actions";

export const PaymentMethod = () => {
  const [isCod, setIsCod] = useState(false);
  const [isNonCod, setIsNonCod] = useState(false);

  const dispatch = useDispatch();

  const toggleCod = () => {
    setIsCod(true);
    dispatch(setPaymentMethod(true));
    setIsNonCod(false);
  };

  const toggleNonCod = () => {
    setIsNonCod(true);
    dispatch(setPaymentMethod(false));
    setIsCod(false);
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
                    onChange={toggleCod}
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
                    onChange={toggleNonCod}
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
