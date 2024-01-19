import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setDestination } from "../../../redux/modules/packages/actions/actions";
import { InputDistrict } from "../../../components/InputDistrict";

import { useDebounce } from "use-debounce";

const ReceiverDetails = () => {
  const [subdistrictId, setSubdistrictId] = useState({});
  const [receiverName, setReceiverName] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [address, setAddress] = useState("");

  const [debouncedReceiverName] = useDebounce(receiverName, 1000);
  const [debouncednoTelp] = useDebounce(noTelp, 1000);
  const [debouncedAddress] = useDebounce(address, 1000);

  const onSetSubdistrict = (value) => {
    setSubdistrictId(value);
  };

  const dispatch = useDispatch();

  const setDestinationToRedux = () => {
    dispatch(
      setDestination({
        destination: {
          district_id: subdistrictId,
          lat: undefined,
          long: undefined,
          address: debouncedAddress,
        },
        receiver: {
          name: debouncedReceiverName,
          phone_number: debouncednoTelp,
          address: debouncedAddress,
          subdistrict_id: subdistrictId,
        },
      })
    );
  };

  useEffect(() => {
    setDestinationToRedux();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subdistrictId, debouncedReceiverName, debouncednoTelp, debouncedAddress]);

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
                type="text"
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
