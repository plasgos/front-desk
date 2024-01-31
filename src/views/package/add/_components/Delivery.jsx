import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RiErrorWarningFill } from "react-icons/ri";
import { CButton, CAlert } from "@coreui/react";
import { FaShippingFast } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";

import { Checkbox } from '../../../../components'
import { setShipping } from '../../../../redux/modules/package/reducer';
import { resetCheckCosts } from '../../../../redux/modules/shipping/reducer';

export default () => {
  const dispatch = useDispatch();
  const { logged_in, token } = useSelector((state) => state.login);
  const { shipping } = useSelector((state) => state.package);

  const [drop, setDrop] = useState(shipping.drop);

  const onSetDrop = async (value) => {
    await setDrop(value)
    await dispatch(resetCheckCosts())
    await dispatch(setShipping({
      ...shipping,
      drop: value
    }))
  }


  return (
    <div>
      <div className="mb-3">
        <div className="font-weight-bold mb-2">Opsi Penjemputan</div>
        <form>
          <div className="form-row">
            <div className="form-group col-md-6 mb-0">
              <div className={`card my-2 px-3 py-2 shadow-sm ${drop === false && "border border-primary"}`}>
                <Checkbox checked={drop === false} onClick={() => onSetDrop(false)} size={18} style={{cursor: "pointer", transform: "scale(1.2)"}} label="Pick Up" labelStyle={{fontSize: 18}}/>
              </div>
            </div>
            <div className="form-group col-md-6 mb-0 ">
              <div className={`card my-2 px-3 py-2 shadow-sm ${drop && "border border-primary"}`}>
                <Checkbox checked={drop} onClick={() => onSetDrop(true)} size={18} style={{cursor: "pointer", transform: "scale(1.2)"}} label="Drop Off" labelStyle={{fontSize: 18}}/>
              </div>
            </div>
          </div>
        </form>
        <div className="mt-2">
          <CAlert color="info" className="m-0">
            <div className="d-flex align-items-center justify-content-start">
              <div className="mr-3"><IoInformationCircleOutline style={{fontSize: 28}} /></div>
              {
                drop ? (
                  <div style={{fontSize: 15}}>
                    Paket ini harus <b>DIANTARKAN</b> ke agen ekspedisi yang dipilih pembeli
                  </div>
                ) : (
                  <div style={{fontSize: 15}}>
                    Paket ini akan <b>DIAMBIL</b> oleh kurir ekspedisi
                  </div>
                )
              }
            </div>
          </CAlert>
        </div>
      </div>
    </div>
  );
};
