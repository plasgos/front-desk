import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { formatPrice } from "../../lib/format-price";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/modules/costs/actions/actions";

import { setCheckoutShipping } from "../../redux/modules/checkout/actions/actions";

export const Shipping = ({ storeId }) => {
  const [courirs, setCourirs] = useState([]);

  const [valueShipping, setValueShipping] = useState("");
  const [valueCourir, setValueCourir] = useState({});

  const [valueShippingToShown, setValueShippingToShown] = useState(0);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValueCourir({});
  }, [valueShipping]);

  const handleShipping = (value, group) => {
    setValueShipping(value);

    const filteredShippingData = costs.data
      .map((provider) => ({
        ...provider,
        costs: provider.costs.filter((cost) => cost.group === group),
      }))
      .filter((provider) => provider.costs.length > 0);

    setCourirs(filteredShippingData);
  };

  const onSubmit = (data) => {
    setValueCourir(data);

    const checkout = data.costs.map((cost) => cost);

    setValueShippingToShown(checkout[0].cost);

    dispatch(
      setCheckoutShipping({
        store_id: storeId,
        insurance: checkout[0].insurance,
        shipping_insurance_fee: checkout[0].price?.insurance_fee,
        shipping_service: checkout[0].service,
        shipping_service_type: checkout[0].service_type,
        shipping_cost: checkout[0].cost,
        service_type_id: checkout[0].id,
        drop: checkout[0].drop,
        cod: checkout[0].cod,
        cod_fee: 0,
        cod_setting: {
          cod_fee: checkout[0].setting?.cod_fee,
          minimum_cod_fee: checkout[0].setting?.minimum_cod_fee,
        },
        insurance_setting: {
          insurance_fee: checkout[0].setting?.insurance_fee,
          insurance_add_cost: checkout[0].setting?.insurance_add_cost,
        },
      })
    );
  };

  return (
    <div className="mb-4">
      <p className="sub-heading mb-2">Pengiriman</p>
      <div className="d-flex flex-wrap justify-content-lg-between justify-content-center align-items-center">
        <div>
          <CDropdown className="mt-2">
            <CDropdownToggle className="btn-dropdown" caret color="primary">
              {valueShipping === "" ? "Pilih pengiriman" : valueShipping}
            </CDropdownToggle>
            <CDropdownMenu style={{ width: 260 }}>
              {groupSelectShipping.map((shipping, index) => {
                const isSelected = shipping.name === valueShipping;

                return (
                  <CDropdownItem
                    className={` ${isSelected && "bg-primary text-white"} `}
                    key={index}
                    onClick={() =>
                      handleShipping(shipping.name, shipping.group)
                    }
                  >
                    {shipping.name}
                  </CDropdownItem>
                );
              })}
            </CDropdownMenu>
          </CDropdown>
        </div>

        <div>
          <CDropdown className="mt-2">
            <CDropdownToggle
              className="btn-dropdown"
              caret
              color="primary"
              disabled={courirs.length < 1}
            >
              {Object.keys(valueCourir).length === 0
                ? "Pilih Kurir"
                : `${valueCourir.name} (${formatPrice(valueShippingToShown)})`}
            </CDropdownToggle>
            <CDropdownMenu style={{ width: 260 }}>
              {courirs.map((courir, index) => {
                const cost = courir.costs.map((cost) => cost.cost);

                const isSelected = courir.name === valueCourir.name;

                return (
                  <CDropdownItem
                    className={`${isSelected && "bg-primary text-white"}`}
                    key={index}
                    onClick={() => onSubmit({ ...courir })}
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
