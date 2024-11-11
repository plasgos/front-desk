import React, { useEffect, useState } from "react";
import ColorPicker from "../../common/ColorPicker";
import SelectOptions from "../../common/SelectOptions";
import { shadowOptions, widthPageOptions } from "../../SelectOptions";
import { CButton } from "@coreui/react";
import { AiOutlineExport, AiOutlineImport } from "react-icons/ai";
import { directionGradientOptions } from "../frames/FrameControl";
import Checkbox from "../../common/Checkbox";

const bgTypeOptions = [
  { value: "solid", label: "Solid" },
  { value: "gradient", label: "Gradasi" },
];

const navbarPostionOptions = [
  { value: "static", label: "Statik" },
  { value: "fixedTop", label: "Menempel Di Atas" },
  { value: "floating", label: "Floating" },
  { value: "floating-sticky", label: "Floating Sticky" },
];

const shapeOptions = [
  { value: undefined, label: "Tidak Ada" },
  { value: "square", label: "Square" },
  { value: "circle", label: "Circle" },
  { value: "circle-top", label: "Circle Top" },
  { value: "circle-bottom", label: "Circle Bottom" },
  { value: "circle-diag-a", label: "Circle Diag A" },
  { value: "circle-diag-b", label: "Circle Diag B" },
  { value: "circle-top-left", label: "Circle Top Left" },
  { value: "circle-top-right", label: "Circle Top Right" },
  { value: "circle-bottom-left", label: "Circle Bottom Left" },
  { value: "circle-bottom-right", label: "Circle Bottom Right" },
  { value: "ribbon", label: "Ribbon" },
];

const Design = ({
  previewSection,
  setPreviewSection,
  currentSection,
  pageSetting,
  setPageSetting,
  isShowContent,
}) => {
  const [titleColor, setTitleColor] = useState(
    currentSection?.variant?.style?.titleColor || "#EEEEEE"
  );

  const [hoverTitleColor, setHoverTitleColor] = useState(
    currentSection?.variant?.style?.hoverTitleColor || "#fa541c"
  );

  const [widthNavbar, setWidthNavbar] = useState(
    widthPageOptions[1].options[2]
  );

  const [shadow, setShadow] = useState(shadowOptions[0]);
  const [position, setPosition] = useState(navbarPostionOptions[0]);
  const [shape, setShape] = useState(shapeOptions[0]);

  const [bgType, setBgType] = useState(bgTypeOptions[0]);

  const [bgSolidColor, setBgSolidColor] = useState(
    currentSection?.variant?.style?.background?.solidColor || "#ffffff"
  );

  const [direction, setDirection] = useState(directionGradientOptions[1]);

  const [fromColor, setFromColor] = useState(
    currentSection?.variant?.style?.background?.fromColor || "#FF6F61"
  );

  const [toColor, setToColor] = useState(
    currentSection?.variant?.style?.background?.toColor || "#6B5B95"
  );

  const [isRevert, setIsRevert] = useState(
    currentSection?.variant?.style?.background?.isRevert || false
  );

  useEffect(() => {
    setTitleColor(currentSection?.variant?.style?.titleColor || "#EEEEEE");

    setHoverTitleColor(
      currentSection?.variant?.style?.hoverTitleColor || "#fa541c"
    );

    const currentWidthPageOption = widthPageOptions
      .flatMap((opts) => opts.options)
      .find((opt) => opt.value === currentSection?.variant?.style?.widthNavbar);
    if (currentWidthPageOption) {
      setWidthNavbar(currentWidthPageOption);
    }

    const currentShadow = shadowOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.shadow
    );

    if (currentShadow) {
      setShadow(currentShadow);
    }

    const currentPosition = navbarPostionOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.position
    );

    if (currentPosition) {
      setPosition(currentPosition);
    }

    const currentShape = shapeOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.shape
    );

    if (currentShape) {
      setShape(currentShape);
    }

    const currentBgType = bgTypeOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.background?.type
    );

    if (currentBgType) {
      setBgType(currentBgType);
    }

    setBgSolidColor(
      currentSection?.variant?.style?.background?.solidColor || "#ffffff"
    );

    const currentDirection = directionGradientOptions.find(
      (opt) =>
        opt.value === currentSection?.variant?.style?.background?.direction
    );

    if (currentDirection) {
      setDirection(currentDirection);
    }

    setFromColor(
      currentSection?.variant?.style?.background?.fromColor || "#FF6F61"
    );

    setToColor(
      currentSection?.variant?.style?.background?.toColor || "#6B5B95"
    );
  }, [currentSection]);

  const handleChangeVariantStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) => {
        return String(item.id) === currentSection?.id
          ? {
              ...item,
              variant: {
                ...item.variant,
                style: {
                  ...item.variant.style,
                  [key]: value,
                },
              },
            }
          : item;
      })
    );
  };

  const handleChangeBg = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) => {
        return String(item.id) === currentSection?.id
          ? {
              ...item,
              variant: {
                ...item.variant,
                style: {
                  ...item.variant.style,
                  background: {
                    ...item.variant.style.background,
                    [key]: value,
                  },
                },
              },
            }
          : item;
      })
    );
  };

  const exportData = (section) => {
    // Mengonversi array of objects ke string JSON
    const jsonString = JSON.stringify(section);

    // Meng-encode string JSON ke Base64
    const base64String = btoa(jsonString);

    const exportString = `${base64String}`;

    // Membuat file untuk diunduh
    const blob = new Blob([exportString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `footer-${pageSetting.title}.txt`; // Nama file yang diunduh
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;

      // Pisahkan ID unik dan data yang di-encode
      const [base64String] = fileContent.split(":");

      // Decode string Base64
      const jsonString = atob(base64String);

      // Parse JSON string ke array of objects
      const dataArray = JSON.parse(jsonString);
      // Gunakan dataArray sesuai kebutuhan
      setPreviewSection([...dataArray]);

      // setPageSetting(dataArray.pageSetting);
      isShowContent(false);
    };

    reader.readAsText(file);
  };

  const handleFileImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt"; // Menentukan jenis file yang diterima (ubah sesuai kebutuhan)
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        importData(file);
      }
    };
  };

  return (
    <div>
      <div
        style={{ gap: 20, width: "85%" }}
        className="d-flex align-items-center mb-3  "
      >
        <ColorPicker
          initialColor={titleColor}
          label="Teks"
          onChange={(color) => {
            setTitleColor(color);
            handleChangeVariantStyle("titleColor", color);
          }}
          width="w-0"
        />
        <ColorPicker
          initialColor={hoverTitleColor}
          label="Teks (Hover)"
          onChange={(color) => {
            setHoverTitleColor(color);
            handleChangeVariantStyle("hoverTitleColor", color);
          }}
          width="w-0"
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Lebar Halaman"
          options={widthPageOptions}
          onChange={(selectedOption) => {
            setWidthNavbar(selectedOption);
            handleChangeVariantStyle("widthNavbar", selectedOption.value);
          }}
          value={widthNavbar}
        />

        <SelectOptions
          label="Bayangan"
          options={shadowOptions}
          onChange={(selectedOption) => {
            setShadow(selectedOption);
            handleChangeVariantStyle("shadow", selectedOption.value);
          }}
          value={shadow}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Posisi"
          options={navbarPostionOptions}
          onChange={(selectedOption) => {
            setPosition(selectedOption);
            handleChangeVariantStyle("position", selectedOption.value);
          }}
          value={position}
        />

        <SelectOptions
          label="Wadah"
          options={shapeOptions}
          onChange={(selectedOption) => {
            setShape(selectedOption);
            handleChangeVariantStyle("shape", selectedOption.value);
          }}
          value={shape}
        />
      </div>

      <h6>Background</h6>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Tipe Background"
          options={bgTypeOptions}
          onChange={(selectedOption) => {
            setBgType(selectedOption);
            handleChangeBg("type", selectedOption.value);
          }}
          value={bgType}
          width="w-0"
        />

        {bgType.value === "solid" && (
          <ColorPicker
            initialColor={bgSolidColor}
            label="Background"
            onChange={(color) => {
              setBgSolidColor(color);
              handleChangeBg("solidColor", color);
            }}
            type="rgba"
            isCustomPosition={true}
            bottom={40}
          />
        )}

        {bgType.value === "gradient" && (
          <SelectOptions
            label="Arah"
            options={directionGradientOptions}
            onChange={(selectedOption) => {
              setDirection(selectedOption);
              handleChangeBg("direction", selectedOption.value);
            }}
            value={direction}
            width="50"
          />
        )}
      </div>

      {bgType.value === "gradient" && (
        <div style={{ gap: 10 }} className="d-flex align-items-center mb-3 ">
          <ColorPicker
            initialColor={fromColor}
            label="Warna 1"
            onChange={(color) => {
              setFromColor(color);
              handleChangeBg("fromColor", color);
            }}
            type="rgba"
            isCustomPosition={true}
            bottom={40}
          />

          <ColorPicker
            initialColor={toColor}
            label="Warna 2"
            onChange={(color) => {
              setToColor(color);
              handleChangeBg("toColor", color);
            }}
            type="rgba"
            isCustomPosition={true}
            bottom={40}
          />

          <Checkbox
            id="isRevert"
            label="Terbalik"
            checked={isRevert}
            onChange={(e) => {
              const { checked } = e.target;
              setIsRevert(checked);
              handleChangeBg("isRevert", checked);
            }}
          />
        </div>
      )}

      <h6>Export / Import</h6>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <CButton
          disabled={previewSection.length === 0}
          onClick={() => exportData(previewSection)}
          variant="outline"
          color="primary"
          className="w-50"
        >
          <div className="d-flex align-items-center justify-content-center">
            <AiOutlineExport
              size={18}
              color="bg-primary"
              style={{ marginRight: 10 }}
            />

            <div>Export</div>
          </div>
        </CButton>

        <CButton
          onClick={handleFileImport}
          variant="outline"
          color="primary"
          className="w-50"
        >
          <div className="d-flex align-items-center justify-content-center">
            <AiOutlineImport
              size={18}
              color="bg-primary"
              style={{ marginRight: 10 }}
            />

            <div>Import</div>
          </div>
        </CButton>
      </div>
    </div>
  );
};

export default Design;
