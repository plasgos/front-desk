import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentMethod } from "../../../redux/modules/packages/actions/actions";
import { Expeditions } from "./Expeditions";

export const PaymentMethod = ({ filteredData }) => {
  const packages = useSelector((state) => state.packages);
  const [isCod, setIsCod] = useState(false);
  const [isNonCod, setIsNonCod] = useState(false);
  const [cod, setCod] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    resetToggle();
  }, [filteredData]);

  const resetToggle = () => {
    setIsCod(false);
    setIsNonCod(false);
  };

  useEffect(() => {
    setCod([]);
    resetToggle();
  }, [packages.expeditions.data, filteredData]);

  const handleShipping = (type) => {
    const filteredShippingData = filteredData
      .map((expedition) => ({
        ...expedition,
        costs: expedition.costs.filter((cost) => cost.cod === type),
      }))
      .filter((expedition) => expedition.costs.length > 0)
      .flatMap((expedition) => {
        const { id, name, costs } = expedition;
        return costs.map((cost) => ({
          ...cost,
          name: name,
          expeditionId: id,
        }));
      });

    setCod(filteredShippingData);
  };

  const toggleCod = () => {
    setIsCod(true);
    handleShipping(true);
    dispatch(setPaymentMethod(true));
    setIsNonCod(false);
  };

  const toggleNonCod = () => {
    setIsNonCod(true);
    handleShipping(false);
    dispatch(setPaymentMethod(false));
    setIsCod(false);
  };

  return (
    <div>
      {packages.expeditions.loading === true && (
        <div className="my-3 text-center">
          <p>Loading....</p>
        </div>
      )}

      {packages.expeditions?.data.length > 0 &&
      packages.expeditions.loading === false ? (
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
                        disabled={filteredData.length === 0}
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
                        disabled={filteredData.length === 0}
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
      ) : null}

      <Expeditions isCod={isCod} isNonCod={isNonCod} filterDataToShow={cod} />
    </div>
  );
};
