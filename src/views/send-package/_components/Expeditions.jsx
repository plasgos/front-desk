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
  console.log("🚀 ~ Expeditions ~ courirs:", courirs);
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

  const handleShipping = (group, id) => {
    setIsGroupSelected(id);

    // const filteredShippingData = filterDataToShow
    //   .map((expedition) => ({
    //     ...expedition,
    //     costs: expedition.costs.filter((cost) => cost.group === group),
    //   }))
    //   .filter((expedition) => expedition.costs.length > 0);

    const filteredShippingData = filterDataToShow.filter(
      (expedition) => expedition.group === group
    );

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

      <div style={{ maxHeight: 500, overflowY: "auto" }}>
        {filterDataToShow && filterDataToShow.length > 0 && courirs.length === 0
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

        {courirs && courirs.length > 0
          ? courirs.map((courir) => {
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
