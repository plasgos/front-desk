import React, { useEffect, useState } from "react";
import {
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CSpinner,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useFontAwesomeIconPack } from "../../../../hooks/useFontAwesomePack";

const IconPicker = ({ value, onChange }) => {
  const [searchText, setSearchText] = useState("");
  const iconPack = useFontAwesomeIconPack();
  const [uniqueIcons, setUniqueIcons] = useState([]);

  useEffect(() => {
    if (iconPack) {
      const uniqueIconMap = new Map();
      iconPack.forEach((icon) => {
        if (!uniqueIconMap.has(icon.iconName)) {
          uniqueIconMap.set(icon.iconName, icon);
        }
      });
      setUniqueIcons(Array.from(uniqueIconMap.values()));
    }
  }, [iconPack]);

  if (!iconPack) {
    // Log message if iconPack is not loaded
    console.log("Icon pack is not loaded yet");
    return <CSpinner color="primary" />;
  }

  const iconsFiltered = uniqueIcons.filter((icon) => {
    return icon.iconName?.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div placement="bottom p-3">
      <div className="iconPicker__popoverContainer">
        <div className="iconPicker__popoverHeader">
          <CInputGroup>
            <CInput
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <CInputGroupAppend>
              <CInputGroupText className={""}>
                <FontAwesomeIcon icon={["fas", "search"]} />
              </CInputGroupText>
            </CInputGroupAppend>
          </CInputGroup>
        </div>
        <div className="iconPicker__iconsContainer">
          {iconsFiltered.map((icon) => (
            <div className="iconPicker__iconWrapper" key={icon.iconName}>
              <button
                className={`iconPicker__iconItem ${
                  icon.iconName === value.iconName ? "selected" : ""
                }`}
                title={icon.iconName}
                onClick={() =>
                  onChange?.({ prefix: icon.prefix, iconName: icon.iconName })
                }
              >
                <FontAwesomeIcon icon={[icon.prefix, icon.iconName]} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconPicker;
