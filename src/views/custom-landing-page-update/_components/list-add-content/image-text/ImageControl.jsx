import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";

import image from "../../../../../assets/bg.jpg";
import Page from "./variant/Page";
import Frosty from "./variant/Frosty";

const ImageControl = ({
  setPreviewSection,
  currentSection,
  selectedVariant,
}) => {
  const [imageUrl, setImageUrl] = useState(
    currentSection?.variant?.style?.image || image
  );
  useEffect(() => {
    const currentImage = currentSection?.variant?.style?.image;

    if (currentImage) {
      setImageUrl(currentImage);
    }
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
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              variant: {
                ...item.variant,
                style: {
                  ...item.variant.style,
                  image: imageUrl,
                },
              },
            }
          : item
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  return (
    <div style={{ overflowX: "hidden" }}>
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
            src={imageUrl}
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

      {(selectedVariant.group === "Page" ||
        selectedVariant.group === "Penuh") && (
        <Page
          setPreviewSection={setPreviewSection}
          currentSection={currentSection}
          selectedVariant={selectedVariant}
        />
      )}

      {selectedVariant.group === "Frosty" && (
        <Frosty
          setPreviewSection={setPreviewSection}
          currentSection={currentSection}
          selectedVariant={selectedVariant}
        />
      )}
    </div>
  );
};

export default ImageControl;
