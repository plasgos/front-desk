import React, { useState } from "react";

import { PiArrowsClockwiseBold } from "react-icons/pi";
import { formatPrice } from "../../../lib/format-price";

import { setSelectCourir } from "../../../redux/modules/packages/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { CButton } from "@coreui/react";

export const Expeditions = ({ filterDataToShow }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isGroupSelected, setIsGroupSelected] = useState("");

  const [courirs, setCourirs] = useState([]);
  const packages = useSelector((state) => state.packages);
  const { expeditions } = packages;
  const dispatch = useDispatch();

  const groupSelectShipping = [
    { name: "Instant", group: "instant" },
    { name: "Same Day", group: "same_day" },
    { name: "One Day", group: "one_day" },
    { name: "Regular", group: "regular" },
    { name: "Kargo", group: "cargo" },
  ];

  const handleShipping = (group) => {
    setIsGroupSelected(group);

    const filteredShippingData = filterDataToShow
      .map((expedition) => ({
        ...expedition,
        costs: expedition.costs.filter((cost) => cost.group === group),
      }))
      .filter((expedition) => expedition.costs.length > 0);

    setCourirs(filteredShippingData);
  };

  const handleSelectCourir = (courir) => {
    setIsSelected(courir.id);
    dispatch(setSelectCourir(courir));
  };

  const handleRefreshCourir = () => {
    // dispatch(setSelectCourir({}));
  };

  return (
    <div>
      <div className="font-weight-bold mb-3">
        Ekspedisi
        <PiArrowsClockwiseBold onClick={handleRefreshCourir} className="ml-2" />
      </div>
      <div>
        <div
          style={{ gap: 12, overflowX: "auto", whiteSpace: "nowrap" }}
          className="d-flex mb-3 p-2"
        >
          {groupSelectShipping.map((shipping, index) => {
            const btnSelected = isGroupSelected === shipping.group;

            return (
              <CButton
                key={index}
                shape="pill"
                variant="outline"
                onClick={() => handleShipping(shipping.group)}
                color="primary"
                className={`${btnSelected && "bg-primary"}`}
              >
                {shipping.name}
              </CButton>
            );
          })}
        </div>
      </div>

      <div style={{ maxHeight: 500, overflowY: "auto" }}>
        {filterDataToShow && filterDataToShow.length > 0 ? (
          filterDataToShow.map((courir) => {
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
                    {/* {courir.costs.map((cost) => (
                    ))} */}
                    <div>
                      <div className="font-weight-bold mb-2 text-success">
                        <span> {formatPrice(courir.cost)}</span>
                      </div>
                      <div className="my-2">{courir?.etd}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center p-3">Not available</div>
        )}
      </div>
    </div>
  );
};
