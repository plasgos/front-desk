import React, { useState } from "react";
import { useEffect } from "react";
import ColorPicker from "../../common/ColorPicker";
import IconPicker from "../../common/IconPicker";
import { useFontAwesomeIconPack } from "../../../../../hooks/useFontAwesomePack";
import { CButton } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Confirmation from "../../common/Confirmation";

// icon: {
//     iconName: "list-ul",
//     prefix: "fas",
//   },

const Sidebar = ({
  setPreviewSection,
  currentSection,
  isListIconVisible,
  setIsListIconVisible,
}) => {
  const [bgColor, setBgColor] = useState(
    currentSection?.sidebar?.bgColor || "#ffffff"
  );

  const [lineColor, setLineColor] = useState(
    currentSection?.sidebar?.lineColor || "#E0E0E0"
  );

  const [textColor, setTextColor] = useState(
    currentSection?.sidebar?.textColor || "#616161"
  );

  const iconPack = useFontAwesomeIconPack();

  const [previousIcon, setPreviousIcon] = useState("");

  const [icon, setIcon] = useState(currentSection?.sidebar?.icon || "");

  const [iconColor, setIconColor] = useState(
    currentSection?.sidebar?.iconColor || "#000000"
  );

  const [imageUrl, setImageUrl] = useState(
    currentSection?.sidebar?.image || ""
  );

  useEffect(() => {
    if (imageUrl !== "") {
      setIcon({});
      handleChangeImageUrl(imageUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  useEffect(() => {
    if (iconPack && iconPack.length > 0) {
      const iconToSet = currentSection?.sidebar?.icon;

      if (iconToSet && Object.keys(iconToSet).length > 0) {
        const iconExists = iconPack.some(
          (icon) => icon.iconName === iconToSet.iconName
        );

        setIcon(iconExists ? iconToSet : {});
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconPack, currentSection]);

  const handleSearchIcon = (prevIcon) => {
    setPreviousIcon(prevIcon);
    setIsListIconVisible(true);
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImageUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    };
  };

  const handleChangeIcon = (value) => {
    setIcon(value);
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              sidebar: {
                ...section.sidebar,
                icon: value,
                image: "",
              },
            }
          : section
      )
    );
  };

  const handleChangeImageUrl = (value) => {
    setImageUrl(value);
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              sidebar: {
                ...section.sidebar,
                image: value,
                icon: "",
              },
            }
          : section
      )
    );
  };

  const handleCancel = () => {
    setIsListIconVisible(false);

    if (imageUrl) {
      setImageUrl(imageUrl);
      setIcon({});
      handleChangeImageUrl(imageUrl);
    } else {
      handleChangeIcon(previousIcon);
    }
  };

  const handleConfirm = () => {
    setIsListIconVisible(false);
    if (icon.iconName) {
      setImageUrl("");
    }
  };

  useEffect(() => {
    setBgColor(currentSection?.sidebar?.bgColor || "#ffffff");
    setLineColor(currentSection?.sidebar?.lineColor || "#E0E0E0");
    setTextColor(currentSection?.sidebar?.textColor || "#616161");
    // setIsShowSidebar(currentSection?.sidebar?.isShowSidebar || false);
  }, [currentSection]);

  const handleChangeSidebar = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              sidebar: {
                ...section.sidebar,
                [key]: value,
              },
            }
          : section
      )
    );
  };

  return (
    <>
      {isListIconVisible ? (
        <>
          <Confirmation
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
          />

          <IconPicker
            value={icon}
            onChange={(value) => handleChangeIcon(value)}
          />
        </>
      ) : (
        <div className="p-3">
          <div
            style={{ backgroundColor: "#F5F5F5", color: "#9E9E9E" }}
            className="p-3 shadow mb-3"
          >
            <span
              onClick={() => handleChangeSidebar("isShowSidebar", true)}
              style={{
                textDecoration: "underline",
                textUnderlineOffset: 2,
                cursor: "pointer",
              }}
            >
              Perlihatkan Mobile Sidebar
            </span>{" "}
            untuk melihat hasil editan
          </div>

          <div style={{ gap: 30 }} className="d-flex align-items-center mb-3  ">
            <ColorPicker
              initialColor={bgColor}
              label="Background"
              onChange={(color) => {
                setBgColor(color);
                handleChangeSidebar("bgColor", color);
              }}
            />
            <ColorPicker
              initialColor={lineColor}
              label="Garis"
              onChange={(color) => {
                setLineColor(color);
                handleChangeSidebar("lineColor", color);
              }}
            />
          </div>

          <div className="mb-3">
            <ColorPicker
              initialColor={textColor}
              label="Teks"
              onChange={(color) => {
                setTextColor(color);
                handleChangeSidebar("textColor", color);
              }}
            />
          </div>

          <div className="mb-3">
            <label>Icon Menu</label>
            {imageUrl && (
              <div
                style={{
                  backgroundColor: "#F5F5F5",
                  width: 146,
                  height: 40,
                  overflow: "hidden",
                }}
                className="mx-auto mb-2"
              >
                <img
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: 100,
                  }}
                  src={imageUrl}
                  alt="img"
                />
              </div>
            )}

            {iconPack &&
              iconPack.length > 0 &&
              Object.keys(icon).length > 0 && (
                <div
                  style={{
                    backgroundColor: "#F5F5F5",
                    width: "100%",
                    overflow: "hidden",
                  }}
                  className="mx-auto mb-2 p-2"
                >
                  <div>
                    <FontAwesomeIcon
                      icon={[`${icon.prefix}`, icon.iconName]}
                      size="xl"
                    />
                  </div>
                </div>
              )}

            <div style={{ gap: 5 }} className="d-flex align-items-center">
              <ColorPicker
                initialColor={iconColor}
                onChange={(color) => {
                  setIconColor(color);
                  handleChangeSidebar("iconColor", color);
                }}
                width="w-0"
              />

              <CButton
                onClick={handleFileUpload}
                color="primary"
                variant="outline"
              >
                Upload
              </CButton>

              <CButton
                onClick={() => handleSearchIcon(icon)}
                color="primary"
                variant="outline"
              >
                Cari
              </CButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
