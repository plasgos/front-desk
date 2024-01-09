import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { formatPrice } from "../../lib/format-price";
import costs from "../../dummy/costs.json";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/modules/costs/actions/actions";

export const Shipping = () => {
  const [courirs, setCourirs] = useState([]);
  const [initialData, setInitialData] = useState([]);

  const [valueShipping, setValueShipping] = useState("");
  const [valueCourir, setValueCourir] = useState("");

  const dispatch = useDispatch();

  const { costs } = useSelector((state) => state.costs);

  const groupSelectShipping = [
    { name: "Instant", group: "instant" },
    { name: "Same Day", group: "same_day" },
    { name: "Regular", group: "regular" },
    { name: "Kargo", group: "cargo" },
  ];

  const getCosts = () => {
    dispatch(actions.getCosts());
  };

  useEffect(() => {
    getCosts();

    // setInitialData(costs);
  }, []);

  console.log(costs);

  useEffect(() => {
    // Logika untuk mereset valueCourir ketika valueShipping berubah

    setValueCourir("");
  }, [valueShipping]);

  const handleShipping = (value, group) => {
    setValueShipping(value);

    const filteredShippingData = initialData
      .map((provider) => ({
        ...provider,
        costs: provider.costs.filter((cost) => cost.group === group),
      }))
      .filter((provider) => provider.costs.length > 0);

    console.log(filteredShippingData);
    setCourirs(filteredShippingData);
  };

  return (
    <div className="mb-4">
      <p className="sub-heading mb-2">Pengiriman</p>
      <div className="d-flex flex-wrap justify-content-between align-items-center">
        <div>
          <CDropdown className="mt-2">
            <CDropdownToggle style={{ width: 260 }} caret color="primary">
              {valueShipping === "" ? "Pilih pengiriman" : valueShipping}
            </CDropdownToggle>
            <CDropdownMenu style={{ width: 260 }}>
              {groupSelectShipping.map((shipping, index) => (
                <CDropdownItem
                  key={index}
                  onClick={() => handleShipping(shipping.name, shipping.group)}
                >
                  {shipping.name}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </CDropdown>
        </div>

        <div>
          <CDropdown className="mt-2">
            <CDropdownToggle
              style={{ width: 260 }}
              caret
              color="primary"
              disabled={courirs.length < 1}
            >
              {valueCourir === "" ? "Pilih Kurir" : valueCourir}
            </CDropdownToggle>
            <CDropdownMenu style={{ width: 260 }}>
              {courirs.map((courir, index) => {
                const cost = courir.costs.map((cost) => cost.cost);

                return (
                  <CDropdownItem
                    key={index}
                    onClick={() => setValueCourir(courir.name)}
                  >
                    {courir.name}
                    <span className="ml-2">({formatPrice(cost)})</span>
                  </CDropdownItem>
                );
              })}
            </CDropdownMenu>
          </CDropdown>
        </div>
      </div>
    </div>
  );
};
