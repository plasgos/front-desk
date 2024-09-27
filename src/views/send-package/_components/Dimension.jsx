import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTotalWeightOrders,
  resetExpeditions,
  resetSummary,
  setDimension,
  setNotesPackage,
} from "../../../redux/modules/packages/actions/actions";
import { useDebounce } from "use-debounce";

export const Dimension = ({ selectedProduct }) => {
  const packages = useSelector((state) => state.packages);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [notes, setNotes] = useState("");

  const [totalWeight, setTotalWeight] = useState("");

  const [debouncedLength] = useDebounce(length, 300);
  const [debouncedWidth] = useDebounce(width, 300);
  const [debouncedHeight] = useDebounce(height, 300);
  const [debounceNotes] = useDebounce(notes, 2000);
  const [debounceTotalWeight] = useDebounce(totalWeight, 2000);
  const dispatch = useDispatch();

  const setDimensionToRedux = () => {
    dispatch(resetExpeditions());
    dispatch(resetSummary());

    dispatch(
      setDimension({
        length: +debouncedLength,
        width: +debouncedWidth,
        height: +debouncedHeight,
      })
    );
  };

  const setNotesToRedux = () => {
    dispatch(resetExpeditions());
    dispatch(resetSummary());
    dispatch(setNotesPackage(debounceNotes));
  };

  const handleTotalWeightChange = () => {
    dispatch(resetExpeditions());
    dispatch(resetSummary());
    dispatch(changeTotalWeightOrders(Number(debounceTotalWeight)));
  };

  useEffect(() => {
    if (packages.totalWeight !== 0 && packages.totalWeight !== undefined) {
      setTotalWeight(packages.totalWeight);
    }
  }, [packages.totalWeight]);

  useEffect(() => {
    setNotesToRedux();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceNotes]);

  useEffect(() => {
    setDimensionToRedux();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedLength, debouncedHeight, debouncedWidth]);

  useEffect(() => {
    handleTotalWeightChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceTotalWeight]);

  return (
    <div className="card-footer ">
      <CRow>
        <CCol md="3" className="p-1">
          <div className="form-group">
            <label className="required-label">Berat</label>
            <div style={{ position: "relative" }}>
              <input
                disabled={!selectedProduct.length}
                onChange={(e) => setTotalWeight(e.target.value)}
                value={totalWeight || ""}
                type="number"
                inputMode="numeric"
                className="form-control"
              />
              <div
                className="text-muted"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 5,
                  transform: "translateX(-10px)",
                }}
              >
                gram
              </div>
            </div>
          </div>
        </CCol>
        <CCol md="3" className="p-1">
          <div className="form-group">
            <label className="required-label">Panjang</label>
            <div style={{ position: "relative" }}>
              <input
                disabled={!selectedProduct.length}
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                inputMode="numeric"
                className="form-control"
              />
              <div
                className="text-muted"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 5,
                  transform: "translateX(-10px)",
                }}
              >
                cm
              </div>
            </div>
          </div>
        </CCol>

        <CCol md="3" className="p-1">
          <div className="form-group ">
            <label className="required-label">Lebar</label>
            <div style={{ position: "relative" }}>
              <input
                disabled={!selectedProduct.length}
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                inputMode="numeric"
                className="form-control"
              />
              <div
                className="text-muted"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 5,
                  transform: "translateX(-10px)",
                }}
              >
                cm
              </div>
            </div>
          </div>
        </CCol>

        <CCol md="3" className="p-1">
          <div className="form-group ">
            <label className="required-label">Tinggi</label>
            <div style={{ position: "relative" }}>
              <input
                disabled={!selectedProduct.length}
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                inputMode="numeric"
                className="form-control"
              />
              <div
                className="text-muted"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 5,
                  transform: "translateX(-10px)",
                }}
              >
                cm
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol className="px-0">
          <div className="form-group">
            <label>Catatan</label>
            <textarea
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
              type="text"
              className="form-control"
            />
          </div>
        </CCol>
      </CRow>
    </div>
  );
};
