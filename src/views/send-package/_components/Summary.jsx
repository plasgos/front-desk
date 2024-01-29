import React, { useEffect, useState } from "react";
import { formatPrice } from "../../../lib/format-price";
import { CAlert, CButton, CSwitch } from "@coreui/react";
import { RiErrorWarningFill } from "react-icons/ri";
import { GoQuestion } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  resetExpeditions,
  resetSummary,
  setBilledByReceiverBeforeCustomCod,
  setSummary,
} from "../../../redux/modules/packages/actions/actions";
import { TbReportMoney } from "react-icons/tb";
import { useDebounce } from "use-debounce";
import { DetailsShippingOrders } from "./modal/DetailsShippingOrders";

import { useHistory } from "react-router-dom";

export const Summary = () => {
  const packages = useSelector((state) => state.packages);
  const { selectedExpedition } = packages;
  const [isChecked, setIsChecked] = useState(false);
  const [insuranceFee, setInsuranceFee] = useState(0);
  const [codFee, setCodFee] = useState(0);
  const [countInsuranceFee, setCountInsuranceFee] = useState(0);

  const [customCod, setCustomCod] = useState(null);

  const [debouncedCustomCod] = useDebounce(customCod, 1000);

  const [billedByReceiver, setBilledByReceiver] = useState(0);
  const [estimateFundReceived, setEstimateFundReceived] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (selectedExpedition) {
      dispatch(
        setSummary({
          service: selectedExpedition.name,
          shippingCost: selectedExpedition.cost,
          item_value: packages.item_value,
        })
      );
    }
  }, [dispatch, packages.item_value, selectedExpedition]);

  useEffect(() => {
    if (countInsuranceFee) {
      dispatch(setSummary({ insuranceFee: countInsuranceFee }));
    } else {
      dispatch(setSummary({ insuranceFee: 0 }));
    }
  }, [countInsuranceFee, dispatch]);

  useEffect(() => {
    if (debouncedCustomCod) {
      dispatch(setSummary({ billedByReceiver: Number(debouncedCustomCod) }));
    } else {
      dispatch(setSummary({ billedByReceiver: billedByReceiver || 0 }));
    }
  }, [billedByReceiver, debouncedCustomCod, dispatch]);

  useEffect(() => {
    const countBilled =
      selectedExpedition.cost +
      countInsuranceFee +
      codFee +
      packages.item_value;

    setBilledByReceiver(countBilled);
  }, [
    codFee,
    countInsuranceFee,
    dispatch,
    packages.item_value,
    selectedExpedition.cost,
  ]);

  useEffect(() => {
    if (debouncedCustomCod) {
      const countEstimateFund =
        debouncedCustomCod -
        codFee -
        countInsuranceFee -
        selectedExpedition.cost;
      setEstimateFundReceived(countEstimateFund);
      dispatch(
        setSummary({
          estimateFund: countEstimateFund,
        })
      );
    } else {
      dispatch(setSummary({ estimateFund: packages.item_value }));
    }
  }, [
    codFee,
    countInsuranceFee,
    debouncedCustomCod,
    dispatch,
    packages.item_value,
    selectedExpedition.cost,
  ]);

  useEffect(() => {
    if (codFee) {
      dispatch(setSummary({ codFee }));
    } else {
      dispatch(setSummary({ codFee: 0 }));
    }
  }, [codFee, dispatch]);

  const toggleSwitch = () => {
    setIsChecked((prev) => !prev);
    setCountInsuranceFee((prev) => (prev === insuranceFee ? 0 : insuranceFee));
  };

  useEffect(() => {
    if (debouncedCustomCod && debouncedCustomCod < billedByReceiver) {
      dispatch(setBilledByReceiverBeforeCustomCod(billedByReceiver));
      setCustomCod(null);
    }
  }, [
    debouncedCustomCod,
    countInsuranceFee,
    codFee,
    packages.item_value,
    selectedExpedition.cost,
    setCustomCod,
    dispatch,
    billedByReceiver,
  ]);

  useEffect(() => {
    if (selectedExpedition.setting !== undefined) {
      const countInsurance =
        selectedExpedition.setting.insurance_fee * packages.item_value * 100 +
          selectedExpedition.setting.insurance_add_cost || 0;

      setInsuranceFee(countInsurance);
    }
  }, [selectedExpedition, selectedExpedition.setting, packages]);

  useEffect(() => {
    if (selectedExpedition.setting !== undefined) {
      const insuranse = countInsuranceFee ? countInsuranceFee : 0;

      const codFee =
        selectedExpedition.setting?.cod_fee *
          (packages.item_value + selectedExpedition.cost + insuranse) || 0;

      if (codFee === 0) {
        setCodFee(0);
      } else if (codFee <= 3000) {
        setCodFee(3000);
      } else {
        setCodFee(codFee);
      }
    }
  }, [
    selectedExpedition,
    selectedExpedition.setting,
    selectedExpedition.cost,
    countInsuranceFee,
    packages,
    dispatch,
  ]);

  const handleResetPackages = async () => {
    try {
      await dispatch(resetSummary());
      await dispatch(resetExpeditions());
      history.push("/");
    } catch (error) {
      console.error("Error resetting packages:", error);
    }
  };

  return (
    <div>
      {packages.item_value &&
      Object.keys(packages.selectedExpedition).length > 0 ? (
        <div>
          <div className="font-weight-bold mb-3">Kustom COD</div>
          {debouncedCustomCod < packages.billedByReceiverBeforeCustomCod ? (
            <CAlert closeButton color="info" className="text-center">
              Jika Ingin Kustom COD Silahkan Masukan Nilai Yang Melebihi Angka
              Yang Di Tagih Ke Penerima
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
                      Object.keys(packages.selectedExpedition).length === 0
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
          <div className="mb-3">
            <div className="pt-3 card p-3 shadow-sm">
              <div className="card shadow-sm p-3 ">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="font-weight-bold mb-1">Asuransi</div>
                    <div className="text-success">
                      Biaya Asuransi{" "}
                      {insuranceFee ? formatPrice(insuranceFee) : 0}
                    </div>
                  </div>
                  <div>
                    <CSwitch
                      shape="pill"
                      color="primary"
                      checked={isChecked}
                      onChange={toggleSwitch}
                    />
                  </div>
                </div>
              </div>

              <div style={{ gap: 10 }} className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Layanan</div>
                  <div className="font-weight-bold">
                    {selectedExpedition.name}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Ongkir</div>
                  <div className="font-weight-bold mb-2 text-success">
                    {/* <span
                style={{ textDecoration: "line-through" }}
                className="text-decoration-line-through text-danger mr-1"
              >
                {formatPrice(12000)}
              </span>{" "} */}
                    <span>
                      {selectedExpedition.cost
                        ? formatPrice(selectedExpedition.cost)
                        : 0}
                    </span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Biaya Asuransi</div>
                  <div className="font-weight-bold">
                    {isChecked ? formatPrice(insuranceFee || 0) : 0}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">COD Fee</div>
                  <div className="font-weight-bold">
                    {codFee ? formatPrice(codFee) : 0}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">Nilai Barang</div>
                  <div className="font-weight-bold">
                    {packages.item_value ? formatPrice(packages.item_value) : 0}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className=" font-weight-bold text-primary">
                    Ditagih ke Penerima
                  </div>
                  <div className="font-weight-bold text-primary">
                    {debouncedCustomCod
                      ? formatPrice(+debouncedCustomCod)
                      : packages.item_value && selectedExpedition.cost
                      ? formatPrice(billedByReceiver)
                      : 0}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="font-weight-bold text-success">
                    Estimasi Pencairan
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="font-weight-bold text-success">
                      {debouncedCustomCod
                        ? formatPrice(estimateFundReceived)
                        : formatPrice(packages.item_value)}
                    </div>
                    <GoQuestion className="ml-2 text-success" />
                  </div>
                </div>

                <div className="">
                  <div
                    style={{ backgroundColor: "#D7E3FF", gap: 15 }}
                    className="d-flex justify-content-between align-items-center rounded p-2"
                  >
                    <div
                      className="d-flex  align-items-center"
                      style={{ color: "#2D61AC" }}
                    >
                      <RiErrorWarningFill size={18} />
                      <span className="ml-2">Syarat & Ketentuan</span>
                    </div>
                    <div style={{ color: "#2D61AC" }}>Details</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-end">
              <CButton
                onClick={handleResetPackages}
                className="btn-outline-primary"
              >
                Batal
              </CButton>
              <DetailsShippingOrders />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
