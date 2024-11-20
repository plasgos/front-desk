import React, { useEffect, useState } from "react";
import LayoutPackageHistory from "../LayoutPackageHistory";
import { TablePackageHistory } from "../_components/TablePackageHistory";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getHistoryWaitingPickup } from "../../../modules/package/reducer";
import { FilterSection } from "../_components/FilterSection";

import moment from "moment";

const PendingPackagePage = () => {
  const { history } = useSelector((state) => state.package);
  console.log("🚀 ~ PendingPackagePage ~ history:", history.data);
  const { token, logged_in } = useSelector((state) => state.login);

  const [filterInvoice, setFilterInvoice] = useState("");
  const [filterPackageType, setFilterPackageType] = useState("");
  const [startDate, setStartDate] = useState(
    moment().subtract(90, "days").format("DD-MM-YYYY")
  );
  const [endDate, setEndDate] = useState(moment().format("DD-MM-YYYY"));
  const dispacth = useDispatch();

  const getData = () => {
    if (logged_in) {
      dispacth(
        getHistoryWaitingPickup({
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
      <div>
        <FilterSection
          setFilterInvoice={setFilterInvoice}
          setFilterPackageType={setFilterPackageType}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <TablePackageHistory history={history.data} />
      </div>
    </LayoutPackageHistory>
  );
};

export default PendingPackagePage;
