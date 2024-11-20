import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CButton } from "@coreui/react";
import ColorPicker from "./ColorPicker";

const IconUploader = ({
  iconPack,
  icon,
  imageUrl,
  handleFileUpload,
  handleRemoveIcon,
  handleSearchIcon,
  colorIcon,
  handleUpdateColorIcon,
  isCustomPositionColor,
}) => {
  const hasIcon =
    iconPack && iconPack.length > 0 && Object.keys(icon).length > 0;

  return (
    <div className="mb-3">
      <label>Icon</label>

      {hasIcon && (
        <div
          style={{
            backgroundColor: "#F5F5F5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            height: 50,
            padding: 10,
            marginBottom: 10,
          }}
        >
          <FontAwesomeIcon icon={[`${icon.prefix}`, icon.iconName]} size="xl" />
        </div>
      )}

      {imageUrl && (
        <div
          style={{
            backgroundColor: "#F5F5F5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            height: 50,
            padding: 10,
            overflow: "hidden",
            marginBottom: 10,
          }}
        >
          <img
            style={{
              objectFit: "cover",
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
            }}
            src={imageUrl}
            alt="img"
          />
        </div>
      )}

      <div style={{ gap: 5 }} className="d-flex align-items-center w-50">
        {handleUpdateColorIcon && (
          <ColorPicker
            initialColor={colorIcon}
            onChange={(color) => {
              handleUpdateColorIcon(color);
            }}
            width="w-0"
            isCustomPosition={isCustomPositionColor}
            bottom={isCustomPositionColor ? 40 : null}
          />
        )}
        <CButton
          className="w-50"
          onClick={handleFileUpload}
          color="primary"
          variant="outline"
        >
          Upload
        </CButton>

        {handleRemoveIcon ? (
          <>
            {Object.keys(icon).length > 0 || imageUrl ? (
              <CButton
                className="w-50"
                onClick={handleRemoveIcon}
                color="danger"
                variant="outline"
              >
                Hapus
              </CButton>
            ) : (
              <CButton
                className="w-50"
                onClick={() => handleSearchIcon(icon)}
                color="primary"
                variant="outline"
              >
                Cari
              </CButton>
            )}
          </>
        ) : (
          <CButton
            className="w-50"
            onClick={() => handleSearchIcon(icon)}
            color="primary"
            variant="outline"
          >
            Cari
          </CButton>
        )}
      </div>
    </div>
  );
};

export default IconUploader;
