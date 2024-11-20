import React, { useEffect, useState } from "react";
import LayoutPackageHistory from "../LayoutPackageHistory";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryShipped } from "../../../modules/package/reducer";
import { TablePackageHistory } from "../_components/TablePackageHistory";
import { FilterSection } from "../_components/FilterSection";

const ShippingPackagePage = () => {
  const { history } = useSelector((state) => state.package);
  console.log("🚀 ~ ShippingPackagePage ~ history:", history);
  const { token, logged_in } = useSelector((state) => state.login);
  const dispacth = useDispatch();

  const [filterInvoice, setFilterInvoice] = useState("");
  const [filterPackageType, setFilterPackageType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getData = () => {
    if (logged_in) {
      dispacth(
        getHistoryShipped({
          token,
          filter: filterPackageType,
          start: startDate,
          end: endDate,
          limit: 10,
          page: 1,
          invoice: filterInvoice,
        })
      );
    }
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterInvoice, filterPackageType, startDate, endDate]);

  return (
    <LayoutPackageHistory>
      <div>Shipping</div>
      <FilterSection
        setFilterInvoice={setFilterInvoice}
        setFilterPackageType={setFilterPackageType}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <TablePackageHistory history={history.data} />
    </LayoutPackageHistory>
  );
};
export default ShippingPackagePage;
