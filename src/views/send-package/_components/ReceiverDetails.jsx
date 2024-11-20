import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  resetExpeditions,
  resetSummary,
  setDestination,
} from "../../../modules/packages/actions/actions";
import { InputDistrict } from "../../../components/InputDistrict";

import { useDebounce } from "use-debounce";

const ReceiverDetails = () => {
  const [subdistrict, setSubdistrict] = useState(undefined);
  const [receiverName, setReceiverName] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [address, setAddress] = useState("");

  const [debouncedReceiverName] = useDebounce(receiverName, 300);
  const [debouncednoTelp] = useDebounce(noTelp, 300);
  const [debouncedAddress] = useDebounce(address, 300);

  const onSetSubdistrict = (value) => {
    setSubdistrict(value);
  };

  const dispatch = useDispatch();

  const setDestinationToRedux = () => {
    dispatch(resetExpeditions());
    dispatch(resetSummary());

    dispatch(
      setDestination({
        receiver: {
          name: debouncedReceiverName,
          phone_number: debouncednoTelp,
          address: debouncedAddress,
          Subdistrict: {
            name: subdistrict?.name,
            cityType: subdistrict?.City.type,
            cityName: subdistrict?.City.name,
          },
          subdistrict_id:
            // 201,
            subdistrict?.id,
          lat: undefined,
          long: undefined,
        },
      })
    );
  };

  useEffect(() => {
    setDestinationToRedux();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subdistrict, debouncedReceiverName, debouncednoTelp, debouncedAddress]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="font-weight-bold font-lg">Detail Penerima</div>
        <button className="btn btn-outline-primary">
          <IoSearch size={18} className="mr-2" />
          <span>Cari Penerima</span>
        </button>
      </div>
      <div className="card p-3 shadow-sm rounded">
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="required-label">Nama Penerima</label>
              <input
                type="text"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <label className="required-label">Nomor Telepon</label>
              <input
                type="number"
                value={noTelp}
                onChange={(e) => setNoTelp(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="required-label">Kecamatan</label>
            <InputDistrict onSelectDistrict={onSetSubdistrict} />
          </div>
          <div className="form-group">
            <label className="required-label">Alamat Penerima</label>
            <textarea
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReceiverDetails;
