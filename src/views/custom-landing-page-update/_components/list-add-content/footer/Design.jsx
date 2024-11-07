import React, { useEffect, useState } from "react";
import ColorPicker from "../../common/ColorPicker";
import SelectOptions from "../../common/SelectOptions";
import { widthPageOptions } from "../../SelectOptions";
import { CButton } from "@coreui/react";
import { AiOutlineExport, AiOutlineImport } from "react-icons/ai";

const Design = ({
  previewSection,
  setPreviewSection,
  currentSection,
  pageSetting,
  setPageSetting,
}) => {
  console.log("🚀 ~ currentSection:", currentSection);
  const [bgColor, setBgColor] = useState(
    currentSection?.variant?.style?.bgColor || "#000000"
  );
  const [titleColor, setTitleColor] = useState(
    currentSection?.variant?.style?.titleColor || "EEEEEE"
  );
  const [contentColor, setContentColor] = useState(
    currentSection?.variant?.style?.contentColor || "#757575"
  );
  const [innerOutline, setInnerOutline] = useState(
    currentSection?.variant?.style?.innerOutline || ""
  );
  const [outline, setOutline] = useState(
    currentSection?.variant?.style?.outline || ""
  );

  const [widthFooter, setWidthFooter] = useState(
    widthPageOptions[1].options[2]
  );

  useEffect(() => {
    console.log("RUNNNNN");
    const currentWidthPageOption = widthPageOptions
      .flatMap((opts) => opts.options)
      .find((opt) => opt.value === currentSection?.variant?.style?.widthFooter);
    if (currentWidthPageOption) {
      setWidthFooter(currentWidthPageOption);
    }
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
    a.download = `${pageSetting.title}.txt`; // Nama file yang diunduh
    a.click();
    URL.revokeObjectURL(url);
  };

  // Fungsi untuk mengimpor data
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
          initialColor={bgColor}
          label="Background"
          onChange={(color) => {
            setBgColor(color);
            handleChangeVariantStyle("bgColor", color);
          }}
          width="w-0"
        />
        <ColorPicker
          initialColor={titleColor}
          label="Judul"
          onChange={(color) => {
            setTitleColor(color);
            handleChangeVariantStyle("titleColor", color);
          }}
          width="w-0"
        />
      </div>

      <div
        style={{ gap: 20, width: "85%" }}
        className="d-flex align-items-center mb-3  "
      >
        <ColorPicker
          initialColor={contentColor}
          label="Konten"
          onChange={(color) => {
            setContentColor(color);
            handleChangeVariantStyle("contentColor", color);
          }}
          width="w-0"
        />
        <ColorPicker
          initialColor={outline}
          label="Garis Luar"
          onChange={(color) => {
            setOutline(color);
            handleChangeVariantStyle("outline", color);
          }}
          width="w-0"
        />
      </div>

      <div className="mb-3">
        <ColorPicker
          initialColor={innerOutline}
          label="Garis"
          onChange={(color) => {
            setInnerOutline(color);
            handleChangeVariantStyle("innerOutline", color);
          }}
          width="w-0"
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Lebar Halaman"
          options={widthPageOptions}
          onChange={(selectedOption) => {
            setWidthFooter(selectedOption);
            handleChangeVariantStyle("widthFooter", selectedOption.value);
          }}
          value={widthFooter}
          width="0"
        />
      </div>

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
