import React, { useEffect, useState } from "react";
import {
  CCol,
  CRow,
  CInput,
  CInputGroup,
  CInputGroupText,
  CInputGroupAppend,
  CInputGroupPrepend,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   setDimension,
//   setNotesPackage,
//   setTotalWeightOrders,
// } from "../../../redux/modules/packages/actions/actions";
// import { useDebounce } from "use-debounce";
import { formatPrice } from "../../../../lib";
import { setDetail } from "../../../../redux/modules/package/reducer";
import { resetCheckCosts } from "../../../../redux/modules/shipping/reducer";

export const Detail = () => {
  const dispatch = useDispatch();
  const { items, detail } = useSelector((state) => state.package);

  const [qty, setQty] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [notes, setNotes] = useState("");
  const [totalWeight, setTotalWeight] = useState("");

  const regNumber = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;

  //
  // const [debouncedLength] = useDebounce(length, 300);
  // const [debouncedWidth] = useDebounce(width, 300);
  // const [debouncedHigh] = useDebounce(high, 300);
  // const [debounceNotes] = useDebounce(notes, 2000);
  // const [debounceTotalWeight] = useDebounce(totalWeight, 2000);
  //
  // const setDimensionToRedux = () => {
  //   dispatch(
  //     setDimension({
  //       length: +debouncedLength,
  //       width: +debouncedWidth,
  //       high: +debouncedHigh,
  //     })
  //   );
  // };
  //
  // useEffect(() => {
  //   if (packages.totalWeight !== 0 && packages.totalWeight !== undefined) {
  //     setTotalWeight(packages.totalWeight);
  //   }
  // }, [packages.totalWeight]);
  //
  // const setNotesToRedux = () => {
  //   dispatch(setNotesPackage(debounceNotes));
  // };
  //
  // useEffect(() => {
  //   setNotesToRedux();
  //
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debounceNotes]);
  //
  // useEffect(() => {
  //   setDimensionToRedux();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedLength, debouncedHigh, debouncedWidth]);
  //
  // useEffect(() => {
  //   handleTotalWeightChange();
  //
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debounceTotalWeight]);
  //
  // const handleTotalWeightChange = () => {
  //   dispatch(setTotalWeightOrders(Number(debounceTotalWeight)));
  // };
  const total_weight = () =>
    items.reduce(
      (acc, val) => acc + Number(val.product.weight) * Number(val.quantity),
      0
    );
  const total_item_value = () =>
    items.reduce(
      (acc, val) => acc + Number(val.product.price) * Number(val.quantity),
      0
    );
  const total_qty = () =>
    items.reduce((acc, val) => acc + Number(val.quantity), 0);
  const onChangeTotalWeight = (value) => {
    if (regNumber.test(value) || value === "") {
      setTotalWeight(value);
      if (detail.weight === 0) {
        onBlurWeight();
      }
    }
  };
  const onChangeWidth = (value) => {
    if (regNumber.test(value) || value === "") {
      setWidth(value);
    }
  };
  const onChangeHeight = (value) => {
    if (regNumber.test(value) || value === "") {
      setHeight(value);
    }
  };
  const onChangeLength = (value) => {
    if (regNumber.test(value) || value === "") {
      setLength(value);
    }
  };
  const onChangeQty = (value) => {
    if (regNumber.test(value) || value === "") {
      setQty(value);
    }
  };
  const onBlurQty = () => {
    dispatch(
      setDetail({
        ...detail,
        qty: Number(qty),
      })
    );
  };

  const onBlurWeight = async () => {
    await dispatch(resetCheckCosts());
    await dispatch(
      setDetail({
        ...detail,
        weight: Number(totalWeight),
      })
    );
  };
  const onBlurLength = async () => {
    await dispatch(resetCheckCosts());
    await dispatch(
      setDetail({
        ...detail,
        length: Number(length),
      })
    );
  };
  const onBlurWidth = async () => {
    await dispatch(resetCheckCosts());
    await dispatch(
      setDetail({
        ...detail,
        width: Number(width),
      })
    );
  };
  const onBlurHeight = async () => {
    await dispatch(resetCheckCosts());
    await dispatch(
      setDetail({
        ...detail,
        height: Number(height),
      })
    );
  };

  const onBlurNote = () => {
    dispatch(
      setDetail({
        ...detail,
        note: notes,
      })
    );
  };
  const resetAny = async () => {
    await dispatch(resetCheckCosts());
    await onChangeTotalWeight(Number(total_weight()));
    await onChangeQty(Number(total_qty()));
  };
  useEffect(() => {
    if (items) {
      resetAny();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);
  return (
    <div className="card-footer ">
      <CRow>
        <CCol md="6" className="p-1">
          <div className="form-group">
            <label className="required-label">
              Nilai Barang <span className="text-danger">*</span>
            </label>
            <CInput
              required
              style={{ color: "#000" }}
              className="border-right-0"
              placeholder="25"
              id="input-item-value"
              name="input-item-value"
              value={formatPrice(total_item_value())}
              onChange={() => {}}
            />
          </div>
        </CCol>
        <CCol md="6" className="p-1">
          <div className="form-group">
            <label className="required-label">Jumlah item dalam paket</label>
            <CInputGroup>
              <CInput
                required
                style={{ color: "#000" }}
                className="border-right-0"
                placeholder="1"
                id="input-qty"
                name="input-qty"
                value={qty}
                onChange={(e) => onChangeQty(e.target.value)}
                onBlur={onBlurQty}
              />
              <CInputGroupAppend>
                <CInputGroupText className="px-2 bg-white border-left-0">
                  item
                </CInputGroupText>
              </CInputGroupAppend>
            </CInputGroup>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol md="3" className="p-1">
          <div className="form-group">
            <label className="required-label">
              Berat <span className="text-danger">*</span>
            </label>
            <CInputGroup>
              <CInput
                required
                style={{ color: "#000" }}
                className="border-right-0"
                placeholder="250"
                id="input-weight"
                name="input-weight"
                disabled={items.length === 0}
                value={totalWeight}
                onChange={(e) => onChangeTotalWeight(e.target.value)}
                onBlur={onBlurWeight}
              />
              <CInputGroupAppend>
                <CInputGroupText className="px-2 bg-white border-left-0">
                  gram
                </CInputGroupText>
              </CInputGroupAppend>
            </CInputGroup>
          </div>
        </CCol>
        <CCol md="3" className="p-1">
          <div className="form-group">
            <label className="required-label">
              Panjang <span className="text-danger">*</span>
            </label>
            <CInputGroup>
              <CInput
                required
                style={{ color: "#000" }}
                className="border-right-0"
                placeholder="15"
                disabled={items.length === 0}
                id="input-length"
                name="input-length"
                value={length}
                onChange={(e) => onChangeLength(e.target.value)}
                onBlur={onBlurLength}
              />
              <CInputGroupAppend>
                <CInputGroupText className="px-2 bg-white border-left-0">
                  cm
                </CInputGroupText>
              </CInputGroupAppend>
            </CInputGroup>
          </div>
        </CCol>

        <CCol md="3" className="p-1">
          <div className="form-group">
            <label className="required-label">
              Lebar <span className="text-danger">*</span>
            </label>
            <CInputGroup>
              <CInput
                required
                style={{ color: "#000" }}
                className="border-right-0"
                placeholder="15"
                disabled={items.length === 0}
                id="input-width"
                name="input-width"
                value={width}
                onChange={(e) => onChangeWidth(e.target.value)}
                onBlur={onBlurWidth}
              />
              <CInputGroupAppend>
                <CInputGroupText className="px-2 bg-white border-left-0">
                  cm
                </CInputGroupText>
              </CInputGroupAppend>
            </CInputGroup>
          </div>
        </CCol>

        <CCol md="3" className="p-1">
          <div className="form-group">
            <label className="required-label">
              Tinggi <span className="text-danger">*</span>
            </label>
            <CInputGroup>
              <CInput
                required
                style={{ color: "#000" }}
                className="border-right-0"
                placeholder="25"
                disabled={items.length === 0}
                id="input-height"
                name="input-height"
                value={height}
                onChange={(e) => onChangeHeight(e.target.value)}
                onBlur={onBlurHeight}
              />
              <CInputGroupAppend>
                <CInputGroupText className="px-2 bg-white border-left-0">
                  cm
                </CInputGroupText>
              </CInputGroupAppend>
            </CInputGroup>
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
              onBlur={onBlurNote}
            />
          </div>
        </CCol>
      </CRow>
    </div>
  );
};
