import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDimension,
  setNotesPackage,
  setTotalWeightOrders,
} from "../../../redux/modules/packages/actions/actions";
import { useDebounce } from "use-debounce";

export const Dimension = ({ selectedProduct }) => {
  const packages = useSelector((state) => state.packages);

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [high, setHigh] = useState("");
  const [notes, setNotes] = useState("");

  const [debouncedLength] = useDebounce(length, 1000);
  const [debouncedWidth] = useDebounce(width, 1000);
  const [debouncedHigh] = useDebounce(high, 1000);
  const [debounceNotes] = useDebounce(notes, 2000);
  const dispatch = useDispatch();

  const setDimensionToRedux = () => {
    dispatch(
      setDimension({
        length: +debouncedLength,
        width: +debouncedWidth,
        high: +debouncedHigh,
      })
    );
  };

  const setNotesToRedux = () => {
    dispatch(setNotesPackage(debounceNotes));
  };

  useEffect(() => {
    setNotesToRedux();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceNotes]);

  useEffect(() => {
    setDimensionToRedux();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedLength, debouncedHigh, debouncedWidth]);

  const handleTotalWeightChange = (value) => {
    dispatch(setTotalWeightOrders(Number(value)));
  };

  return (
    <div className="card-footer ">
      <CRow>
        <CCol md="3" className="p-1">
          <div className="form-group">
            <label className="required-label">Berat</label>
            <div style={{ position: "relative" }}>
              <input
                disabled={!selectedProduct.length}
                onChange={(e) => handleTotalWeightChange(e.target.value)}
                value={packages.totalWeight || ""}
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
                value={high}
                onChange={(e) => setHigh(e.target.value)}
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
