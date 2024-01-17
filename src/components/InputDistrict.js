import React, { useState, useEffect } from "react";
import { CInput, CDropdown, CDropdownMenu, CDropdownItem } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/modules/addresses/actions/actions";

const InputDistrict = ({ placeholder, value, onSelectDistrict }) => {
  const dispatch = useDispatch();
  const { subdistricts } = useSelector((state) => state.addresses);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const getData = () => {
    dispatch(actions.getSubdistrict());
  };
  useEffect(() => {
    if (text.length > 2) {
      setShow(true);
    } else {
      setShow(false);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  useEffect(() => {
    if (value && value.length > 0) {
      setText(value);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  useEffect(() => {
    getData();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-100">
      <CInput
        className="w-100"
        onChange={(e) => setText(e.target.value)}
        value={text}
        required
        placeholder={placeholder}
      />
      {subdistricts && subdistricts.length > 0 && (
        <CDropdown className="w-100">
          <CDropdownMenu show={show} className="p-2 w-100">
            <div
              style={{ width: "100%", height: 200 }}
              className="react-horizontal-scrolling-menu--scroll-container vertical-scrolling-menu"
            >
              {subdistricts
                .filter((dt) => {
                  return (
                    dt.name.toLowerCase().match(text.toLowerCase()) ||
                    dt.City.name.toLowerCase().match(text.toLowerCase())
                  );
                })
                .map((item, i) => (
                  <CDropdownItem
                    key={item.id}
                    onClick={() => onSelectDistrict(item)}
                  >{`${item.name}, ${item.City.type} ${item.City.name}, ${item.City.Province.name}`}</CDropdownItem>
                ))}
            </div>
          </CDropdownMenu>
        </CDropdown>
      )}
    </div>
  );
};

export default InputDistrict;
