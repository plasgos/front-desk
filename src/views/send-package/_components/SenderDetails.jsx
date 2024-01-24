import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { PickUpAddressModal } from "./modal/PickUpAddressModal";
import { useDispatch, useSelector } from "react-redux";
import { getWarehouses } from "../../../redux/modules/warehouses/actions/actions";
import { setOrigin } from "../../../redux/modules/packages/actions/actions";
import { CBadge, CButton } from "@coreui/react";

export const SenderDetails = () => {
  const { user } = useSelector((state) => state.login);

  const [selectedAddress, setSelectedAddress] = useState({});
  const [defaultAddressSelected, setDefaultAddressSelected] = useState({});

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
    setDefaultAddressSelected(defaultAddress || {});
  }, [data]);

  const defaultOrigin = () => {
    dispatch(
      setOrigin({
        origin: {
          district_id: defaultAddressSelected.subdistrict_id,
          lat: defaultAddressSelected.latitude,
          long: defaultAddressSelected.longitude,
          address: defaultAddressSelected.address,
        },
        store_id: user.store.id,
        sender: {
          id: defaultAddressSelected.id,
          store_id: user.store.id,
          name: defaultAddressSelected.name,
          phone_number: defaultAddressSelected.phone_number,
          address: defaultAddressSelected.address,
          subdistrict_id: defaultAddressSelected.subdistrict_id,
          postal_code: defaultAddressSelected.postal_code,
          latitude: defaultAddressSelected.latitude,
          longitude: defaultAddressSelected.longitude,
        },
        warehouse_id: defaultAddressSelected.id,
      })
    );
  };

  useEffect(() => {
    defaultOrigin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultAddressSelected]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="font-weight-bold font-lg">Detail Pengirim</div>
        <div>
          <PickUpAddressModal
            address={data}
            defaultAddressSelected={defaultAddressSelected}
            setSelectedAddress={setSelectedAddress}
            storeId={user.store.id}
          />
        </div>
      </div>
      <div className="card p-3 shadow-sm rounded">
        {Object.keys(defaultAddressSelected).length > 0 &&
        Object.keys(selectedAddress).length === 0 ? (
          <div>
            <div className="d-flex align-items-center">
              <div className="font-weight-bold font-lg mr-3">
                {defaultAddressSelected.name}
              </div>
              <div>
                {defaultAddressSelected.is_default && (
                  <CBadge color="success">Utama</CBadge>
                )}
              </div>
              {/* <div className="ml-auto">
                <CButton variant="outline" color="primary">
                  <FaEdit size={18} className="mr-2" />
                  <span>Edit Alamat</span>
                </CButton>
              </div> */}
            </div>

            <div className="my-2">{defaultAddressSelected.phone_number}</div>
            <div>{defaultAddressSelected.address}</div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};
