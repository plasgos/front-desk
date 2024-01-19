import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { PickUpAddressModal } from "./modal/PickUpAddressModal";
import { useDispatch, useSelector } from "react-redux";
import { getWarehouses } from "../../../redux/modules/warehouses/actions/actions";
import { setOrigin } from "../../../redux/modules/packages/actions/actions";
import { CBadge, CButton } from "@coreui/react";

export const SenderDetails = () => {
  const [selectedAddress, setSelectedAddress] = useState({});
  const { warehouses } = useSelector((state) => state.warehouses);
  const { token } = useSelector((state) => state.login);
  const { data } = warehouses;

  const dispatch = useDispatch();

  const getData = () => {
    dispatch(getWarehouses({ token }));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const defaultAddress = data && data.find((addr) => addr.is_default);
    setSelectedAddress(defaultAddress || {});
  }, [data]);

  const defaultOrigin = () => {
    dispatch(
      setOrigin({
        origin: {
          district_id: selectedAddress.subdistrict_id,
          lat: selectedAddress.latitude,
          long: selectedAddress.longitude,
          address: selectedAddress.address,
        },
        sender: {
          id: selectedAddress.id,
          name: selectedAddress.name,
          phone_number: selectedAddress.phone_number,
          address: selectedAddress.address,
          subdistrict_id: selectedAddress.subdistrict_id,
          postal_code: selectedAddress.postal_code,
          latitude: selectedAddress.latitude,
          longitude: selectedAddress.longitude,
        },
        // warehouse_id :
      })
    );
  };

  useEffect(() => {
    defaultOrigin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedAddress]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="font-weight-bold font-lg">Detail Pengirim</div>
        <div>
          <PickUpAddressModal
            address={data}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        </div>
      </div>
      <div className="card p-3 shadow-sm rounded">
        <div>
          <div className="d-flex align-items-center">
            <div className="font-weight-bold font-lg mr-3">
              {selectedAddress.name}
            </div>
            <div>
              {selectedAddress.is_default && (
                <CBadge color="success">Utama</CBadge>
              )}
            </div>
            <div className="ml-auto">
              <CButton variant="outline" color="primary">
                <FaEdit size={18} className="mr-2" />
                <span>Edit Alamat</span>
              </CButton>
            </div>
          </div>

          <div className="my-2">{selectedAddress.phone_number}</div>
          <div>{selectedAddress.address}</div>
        </div>
      </div>
    </div>
  );
};
