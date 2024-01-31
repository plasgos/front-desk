import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { PickUpAddressModal } from "./modal/PickUpAddressModal";
import { useDispatch, useSelector } from "react-redux";
import { getWarehouses } from "../../../../redux/modules/warehouse/reducer";
import {
  setSender,
  setWarehouseId,
} from "../../../../redux/modules/package/reducer";
import { CBadge, CButton } from "@coreui/react";

const Card = () => {
  const { sender } = useSelector((state) => state.package);
  if (!sender.id) {
    return null;
  }
  return (
    <div className="card p-3 shadow-sm rounded">
      <div className="d-flex align-items-center">
        <div className="font-weight-bold font-lg mr-3">{sender.name}</div>
        <div>{sender.is_default && <CBadge color="success">Utama</CBadge>}</div>
      </div>
      <div className="my-2">{sender.phone_number}</div>
      <div>
        {sender.address} {sender.Subdistrict.name}{" "}
        {sender.Subdistrict.City.type} {sender.Subdistrict.City.name}{" "}
        {sender.Subdistrict.City.Province.name}, {sender.postal_code}
      </div>
    </div>
  );
};

const SenderDetails = () => {
  const dispatch = useDispatch();
  const { token, logged_in, user } = useSelector((state) => state.login);

  const { data, isLoadingGet } = useSelector((state) => state.warehouse);
  const { sender } = useSelector((state) => state.package);

  const [selectedAddress, setSelectedAddress] = useState({});
  const [defaultAddressSelected, setDefaultAddressSelected] = useState({});

  const getData = () => {
    if (logged_in) {
      dispatch(getWarehouses({ token }));
    }
  };

  useEffect(() => {
    getData();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data && data.length > 0 && !sender.id) {
      const obj = data.find((addr) => addr.is_default);
      dispatch(
        setSender({
          ...obj,
          district_id: obj.subdistrict_id,
        })
      );
      dispatch(setWarehouseId(obj.id));
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, sender]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <div className="font-weight-bold font-lg">Detail Pengirim</div>
        <div>
          <PickUpAddressModal />
        </div>
      </div>
      {sender.id && (
        <div>
          <Card />
        </div>
      )}
    </div>
  );
};

export default SenderDetails;
