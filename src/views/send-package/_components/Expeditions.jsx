import React, { useCallback, useEffect, useState } from "react";

import { PiArrowsClockwiseBold } from "react-icons/pi";
import { formatPrice } from "../../../lib/format-price";

import {
  getShippingCost,
  setSelectCourir,
} from "../../../redux/modules/packages/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { CButton } from "@coreui/react";

export const Expeditions = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [isGroupSelected, setIsGroupSelected] = useState("");

  const [courirs, setCourirs] = useState([]);
  const userData = useSelector((state) => state.login);
  const packages = useSelector((state) => state.packages);
  const { expeditions } = packages;
  const dispatch = useDispatch();

  const getData = useCallback(() => {
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
  }, [
    dispatch,
    packages.insurance,
    packages.item_value,
    packages.origin.address,
    packages.origin.district_id,
    packages.origin.lat,
    packages.origin.long,
    packages.receiver.address,
    packages.receiver.lat,
    packages.receiver.long,
    packages.receiver.subdistrict_id,
    packages.totalWeight,
    userData.token,
    userData.user.store.id,
  ]);

  useEffect(() => {
    if (
      Object.keys(packages.origin).length > 0 &&
      Object.keys(packages.receiver).length > 0 &&
      packages.totalWeight &&
      packages.item_value
    ) {
      getData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packages, getData]);

  const groupSelectShipping = [
    // { name: "Instant", group: "instant" },
    { name: "One Day", group: "one_day" },
    { name: "Regular", group: "regular" },
    { name: "Kargo", group: "cargo" },
  ];

  const handleShipping = (group) => {
    setIsGroupSelected(group);

    const filteredShippingData = expeditions.data
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
        {courirs && courirs.length > 0 ? (
          courirs.map((courir) => {
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
                    {courir.costs.map((cost) => (
                      <div key={cost.id}>
                        <div className="font-weight-bold mb-2 text-success">
                          <span> {formatPrice(cost.cost)}</span>
                        </div>
                        <div className="my-2">{cost?.etd}</div>
                      </div>
                    ))}
                  </div>

                  {/* <div>
                    <img
                      style={{ width: 60 }}
                      src={expedition.logo}
                      alt="ncs-logo"
                    />
                  </div> */}
                </div>
                {/* {expedition.lowReturnPotencial && (
                  <div
                    style={{ backgroundColor: "#D7E3FF", gap: 15 }}
                    className="d-flex align-items-center rounded p-2"
                  >
                    <div style={{ color: "#2D61AC" }}>
                      <RiErrorWarningFill size={18} />
                    </div>
                    <span>Potensi retur rendah</span>
                  </div>
                )} */}
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
