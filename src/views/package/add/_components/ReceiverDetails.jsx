import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { setReceiver } from "../../../../redux/modules/package/reducer";
import { InputDistrict } from "../../../../components";
import { resetCheckCosts } from '../../../../redux/modules/shipping/reducer';

// import { useDebounce } from "use-debounce";

const ReceiverDetails = () => {
  const dispatch = useDispatch();
  const { receiver } = useSelector(state => state.package);

  const [receiverName, setReceiverName] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [address, setAddress] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const regNumber = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;

  const onSetSubdistrict = async (obj) => {
    await dispatch(resetCheckCosts())
    await dispatch(setReceiver({
      ...receiver,
      subdistrict_id: obj.id,
      district_id: obj.id,
      Subdistrict: obj
    }))
  };

  const onChangePostalCode = (value) => {
    if (regNumber.test(value) && value.length <= 5) {
      setPostalCode(value)
    }
  }
  const onBlurPostalCode = () => {
    dispatch(setReceiver({
      ...receiver,
      postal_code: postal_code
    }))
  }

  const onBlurName = (e) => {
    dispatch(setReceiver({
      ...receiver,
      name: receiverName,
    }))
  }
  const onBlurPhoneNumber = (e) => {
    dispatch(setReceiver({
      ...receiver,
      phone_number: noTelp
    }))
  }
  const onBlurAddress = (e) => {
    dispatch(setReceiver({
      ...receiver,
      address: address
    }))
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
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
              <label className="required-label">Nama Penerima <span className="text-danger">*</span></label>
              <input
                type="text"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                className="form-control"
                onBlur={onBlurName}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="required-label">Nomor Telepon <span className="text-danger">*</span></label>
              <input
                value={noTelp}
                onChange={(e) => setNoTelp(e.target.value)}
                className="form-control"
                onBlur={onBlurPhoneNumber}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-8">
              <label className="required-label">Kecamatan / Kota <span className="text-danger">*</span></label>
              <InputDistrict onSelectDistrict={onSetSubdistrict} />
            </div>
            <div className="form-group col-md-4">
              <label className="required-label">Kode Pos <span className="text-danger">*</span></label>
              <input
                value={postal_code}
                onChange={(e) => onChangePostalCode(e.target.value)}
                className="form-control"
                onBlur={onBlurPostalCode}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="required-label">Alamat Penerima <span className="text-danger">*</span></label>
            <textarea
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              onBlur={onBlurAddress}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReceiverDetails;
