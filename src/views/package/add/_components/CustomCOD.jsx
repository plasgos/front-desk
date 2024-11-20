import React, { useState } from "react";
import { TbReportMoney } from "react-icons/tb";
import { useDebounce } from "use-debounce";
import { useSelector, useDispatch } from "react-redux";
import { CAlert, CInput } from "@coreui/react";

import { setShipping, setError } from "../../../../modules/package/reducer";
import { formatPrice } from "../../../../lib";

// import { Summary } from "./Summary";

export default () => {
  const dispatch = useDispatch();
  const { error, shipping_cost, cod_fee, insurance_fee, item_value, shipping } =
    useSelector((state) => state.package);

  const [cod_value, setCodValue] = useState("");

  const regNumber = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
  const totalFee = shipping_cost + cod_fee + insurance_fee;

  const onChangeCodValue = (value) => {
    if (regNumber.test(value) || value === "") {
      setCodValue(value);
    }
  };
  const onBlurCodValue = async () => {
    if (Number(cod_value) > 0 && Number(cod_value) < totalFee) {
      await dispatch(
        setError({
          ...shipping,
          cod: {
            status: true,
            msg: `Nilai COD tidak boleh kurang dari ${formatPrice(totalFee)}`,
          },
        })
      );
      await dispatch(
        setShipping({
          ...shipping,
          cod_value: Number(totalFee),
        })
      );
    } else if (cod_value === "" || cod_value === 0) {
      await dispatch(
        setError({
          ...shipping,
          cod: {
            status: false,
            msg: "",
          },
        })
      );
      await dispatch(
        setShipping({
          ...shipping,
          cod_value: 0,
        })
      );
    } else {
      await dispatch(
        setError({
          ...shipping,
          cod: {
            status: false,
            msg: "",
          },
        })
      );
      await dispatch(
        setShipping({
          ...shipping,
          cod_value: Number(cod_value),
        })
      );
    }
  };

  if (!shipping.cod) {
    return null;
  }
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <div className="font-weight-bold font-lg ">Kustom COD</div>
        <div style={{ height: 35 }} />
      </div>
      <div className="card py-2 px-3 shadow-sm">
        {error.cod.status && (
          <CAlert closeButton color="danger" className="text-left">
            {error.cod.msg}
          </CAlert>
        )}
        <form>
          <div className="form-group mb-0">
            <label>
              Ubah Nilai COD Anda (kosongi jika tidak ada perubahan)
            </label>
            <input
              value={cod_value}
              onChange={(e) => onChangeCodValue(e.target.value)}
              onBlur={onBlurCodValue}
              className="form-control "
            />
          </div>
        </form>
      </div>
    </>
  );
};

{
  /*packages.item_value &&
Object.keys(packages.selectedExpedtion).length > 0 ? (
  <div>
    <div className="font-weight-bold mb-3">Kustom COD</div>
    {customCod < packages.billedByReceiverBeforeCustomCod ? (
      <CAlert closeButton color="danger" className="text-center">
        Silahkan Masukan Nilai Yang Melebihi Angka Yang Di Tagih Ke
        Penerima
      </CAlert>
    ) : null}
    <div className="card p-3 shadow-sm">
      <form>
        <div className="form-group mb-0">
          <label>
            Ubah Nilai COD Anda (kosongi jika tidak ada perubahan)
          </label>
          <div style={{ position: "relative" }}>
            <input
              disabled={
                !packages.item_value ||
                Object.keys(packages.selectedExpedtion).length === 0
              }
              value={customCod || ""}
              onChange={(e) => setCustomCod(e.target.value)}
              style={{ paddingLeft: 30 }}
              type="number"
              className="form-control "
            />
            <div
              style={{ position: "absolute", top: 6, left: 8 }}
              className="text-muted"
            >
              Rp.
            </div>
          </div>
        </div>
      </form>
    </div>

    <div className="font-weight-bold mb-3">Estimasi Biaya</div>
    <div className="mb-3">
      <button type="button" className="btn btn-primary  btn-block">
        <TbReportMoney size={18} className="mr-2" />
        Gunakan Voucher
      </button>
    </div>

    <Summary customCod={debouncedCustomCod} setCustomCod={setCustomCod} />
  </div>
) : null */
}
