import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";

import plgLogo from "../../../../../assets/new_plg_logo_256.png";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";

const Logo = ({ setPreviewSection, currentSection }) => {
  const [imageUrl, setImageUrl] = useState(
    currentSection?.logo?.image || plgLogo
  );

  const [width, setWidth] = useState(currentSection?.logo?.width || 120);

  useEffect(() => {
    setImageUrl(currentSection?.logo?.image || plgLogo);
  }, [currentSection]);

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

  useEffect(() => {
    // Update tempSections setelah imageUrl berubah
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              logo: {
                ...item.logo,
                image: imageUrl,
              },
            }
          : item
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleUpdateLogo = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              logo: {
                ...section.logo,
                [key]: value,
              },
            }
          : section
      )
    );
  };

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "width") {
      setWidth(newValue);
    }
    handleUpdateLogo(key, newValue);
  };

  return (
    <div className="p-3">
      <div className="mb-2">
        <div
          style={{
            backgroundColor: "#F5F5F5",
            width: "100%",
            overflow: "hidden",
          }}
          className="mx-auto mb-2"
        >
          <img
            style={{ objectFit: "contain", width: "100%", height: 100 }}
            src={imageUrl || plgLogo}
            alt="img"
          />
        </div>

        <CButton
          onClick={handleFileUpload}
          color="primary"
          variant="outline"
          className="btn-block"
        >
          Upload
        </CButton>
      </div>

      {imageUrl && (
        <InputRangeWithNumber
          label="Lebar"
          value={width}
          onChange={(newValue) => {
            setWidth(newValue);
            handleUpdateLogo("width", newValue);
          }}
          min={20}
          max={400}
          onBlur={() => handleSetValueWhenBlur(width, 20, 400, "width")}
        />
      )}
    </div>
  );
};

export default Logo;
