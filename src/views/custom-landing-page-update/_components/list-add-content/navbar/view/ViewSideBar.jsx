import React, { useEffect, useState } from "react";
import { useFontAwesomeIconPack } from "../../../../../../hooks/useFontAwesomePack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ViewSideBar = ({ sidebar, setPreviewNavbar }) => {
  const { bgColor, lineColor, textColor, isShowSidebar, iconColor } =
    sidebar || {};

  const toggleSidebar = (value) => {
    setPreviewNavbar((arr) =>
      arr.map((section) => ({
        ...section,
        sidebar: {
          ...section.sidebar,
          isShowSidebar: value,
        },
      }))
    );
  };

  const iconPack = useFontAwesomeIconPack();
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (iconPack && iconPack.length > 0) {
      const iconToSet = sidebar?.icon;

      if (iconToSet && Object.keys(iconToSet).length > 0) {
        const iconExists = iconPack.some(
          (icon) => icon.iconName === iconToSet.iconName
        );

        setIcon(iconExists ? iconToSet : {});
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconPack, sidebar]);

  useEffect(() => {
    if (sidebar?.image) {
      setIcon(null);
    }
  }, [sidebar.image]);

  return (
    <div className="tw-relative">
      <div onClick={() => toggleSidebar(true)} className="tw-cursor-pointer">
        {icon && (
          <div
            style={{
              position: "relative",
              marginRight: 8,
              color: iconColor,
              fontSize: 20,
            }}
          >
            <FontAwesomeIcon
              icon={[`${icon.prefix}`, icon.iconName]}
              style={{ fontSize: sidebar?.iconSize }}
            />
          </div>
        )}

        {sidebar?.image && (
          <div
            style={{
              position: "relative",
              marginRight: 8,
              width: 30,
            }}
          >
            <img
              src={sidebar?.image}
              alt="icon"
              style={{ width: "100%", objectFit: "contain" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSideBar;
