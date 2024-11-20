import React, { useCallback, useEffect, useState } from "react";

import { formatPrice } from "../../../lib/format-price";

import { setSelectCourir } from "../../../modules/packages/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { CButton } from "@coreui/react";

export const Expeditions = ({ isCod, isNonCod, filterDataToShow }) => {
  const [isSelected, setIsSelected] = useState(undefined);
  const [isGroupSelected, setIsGroupSelected] = useState("");

  const [filterByGroup, setFilterByGroup] = useState([]);
  const packages = useSelector((state) => state.packages);
  const dispatch = useDispatch();

  const reset = useCallback(() => {
    setFilterByGroup([]);
    setIsSelected(undefined);
    setIsGroupSelected("");
    dispatch(setSelectCourir({}));
  }, [setFilterByGroup, setIsSelected, setIsGroupSelected, dispatch]);

  useEffect(() => {
    reset();
  }, [filterDataToShow, dispatch, reset]);

  useEffect(() => {
    reset();
  }, [packages.expeditions.data, reset]);

  const handleShipping = (group, id) => {
    setIsGroupSelected(id);

    dispatch(setSelectCourir({}));
    setIsSelected(undefined);

    const filteredShippingData = filterDataToShow.filter(
      (expedition) => expedition.group === group
    );

    setFilterByGroup(filteredShippingData);
  };

  const handleSelectCourir = (courir) => {
    setIsSelected(courir.id);
    dispatch(setSelectCourir(courir));
  };

  return (
    <div>
      {(isCod || isNonCod) &&
        packages.expeditions?.data.length > 0 &&
        filterDataToShow?.length > 0 && (
          <div>
            <div className="font-weight-bold mb-3">Ekspedisi</div>
            <div
              style={{ gap: 12, overflowX: "auto", whiteSpace: "nowrap" }}
              className="d-flex mb-3 p-2"
            >
              {[
                ...new Map(
                  filterDataToShow?.map((item) => [item["service_name"], item])
                ).values(),
              ].map((shipping, index) => {
                const btnSelected = isGroupSelected === shipping.id;

                return (
                  <CButton
                    key={index}
                    shape="pill"
                    variant="outline"
                    onClick={() => handleShipping(shipping.group, shipping.id)}
                    color="primary"
                    className={`${btnSelected && "bg-primary"}`}
                  >
                    {shipping.service_name}
                  </CButton>
                );
              })}
            </div>
          </div>
        )}

      <div style={{ maxHeight: 500, overflowY: "auto" }}>
        {(isCod || isNonCod) &&
        packages.expeditions?.data.length > 0 &&
        filterDataToShow?.length > 0 &&
        filterByGroup.length === 0
          ? filterDataToShow.map((courir) => {
              const selected = isSelected === courir.id;

              return (
                <div
                  style={{ cursor: "pointer" }}
                  key={courir.id}
                  className={`card p-3 shadow-sm ${
                    selected && "border border-primary"
                  } `}
                  onClick={() => handleSelectCourir(courir)}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="font-weight-bold mb-2">{courir.name}</div>

                      <div>
                        <div className="font-weight-bold mb-2 text-success">
                          <span> {formatPrice(courir.cost)}</span>
                        </div>
                        <div className="my-2">{courir?.etd}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted">{courir.service_name}</div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}

        {(isCod || isNonCod) &&
        packages.expeditions?.data.length > 0 &&
        filterByGroup?.length > 0
          ? filterByGroup.map((courir) => {
              const selected = isSelected === courir.id;

              return (
                <div
                  style={{ cursor: "pointer" }}
                  key={courir.id}
                  className={`card p-3 shadow-sm ${
                    selected && "border border-primary"
                  } `}
                  onClick={() => handleSelectCourir(courir)}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="font-weight-bold mb-2">{courir.name}</div>

                      <div>
                        <div className="font-weight-bold mb-2 text-success">
                          <span> {formatPrice(courir.cost)}</span>
                        </div>
                        <div className="my-2">{courir?.etd}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted">{courir.service_name}</div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
