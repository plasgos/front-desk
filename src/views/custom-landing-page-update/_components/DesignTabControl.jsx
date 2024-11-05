import React, { useEffect, useState } from "react";
import SelectOptions from "./common/SelectOptions";
import { widthPageOptions } from "./SelectOptions";
import ColorPicker from "./common/ColorPicker";
import { CButton } from "@coreui/react";
import { AiOutlineImport } from "react-icons/ai";
import { AiOutlineExport } from "react-icons/ai";

const DesignTabControl = ({
  setPageSetting,
  pageSetting,
  previewSection,
  previewFloatingSection,
  setPreviewSection,
  setPreviewFloatingSection,
}) => {
  const [widthPage, setWidthPage] = useState(undefined);
  const [bgColor, setBgColor] = useState(pageSetting.bgColor);
  useEffect(() => {
    const currentWidthPageOption = widthPageOptions
      .flatMap((opts) => opts.options)
      .find((opt) => opt.value === pageSetting?.maxWidth);
    if (currentWidthPageOption) {
      setWidthPage(currentWidthPageOption);
    }
  }, [pageSetting.maxWidth]);

  useEffect(() => {
    setBgColor(pageSetting.bgColor);
  }, [pageSetting.bgColor]);

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

  const handleChangeWidthPage = (selectedOption) => {
    setWidthPage(selectedOption);
    setPageSetting((pageSetting) => ({
      ...pageSetting,
      maxWidth: selectedOption.value,
    }));
  };

  const handleChangeBgColor = (color) => {
    setBgColor(color);
    setPageSetting((pageSetting) => ({
      ...pageSetting,
      bgColor: color,
    }));
  };

  const exportData = (section, floatingSection) => {
    const combineData = {
      section,
      pageSetting,
      floatingSection,
    };

    // Mengonversi array of objects ke string JSON
    const jsonString = JSON.stringify(combineData);

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
      console.log("🚀 ~ importData ~ dataArray:", dataArray);

      // Gunakan dataArray sesuai kebutuhan
      setPreviewSection([...dataArray.section]);
      const floatingSectionDelay = dataArray.floatingSection.map((section) =>
        section.name === "sales-notification"
          ? {
              ...section,
              shownOnWhen: {
                ...section.shownOnWhen,
                isShown: false,
              },
            }
          : section
      );

      setPreviewFloatingSection([...floatingSectionDelay]);
      setPageSetting(dataArray.pageSetting);
      console.log(dataArray);
    };

    reader.readAsText(file);
  };

  return (
    <div className="p-3">
      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Lebar Halaman"
          options={widthPageOptions}
          onChange={handleChangeWidthPage}
          value={widthPage}
          width="0"
        />

        <ColorPicker
          initialColor={bgColor}
          onChange={handleChangeBgColor}
          type="rgba"
        />
      </div>

      <h6>Export / Import</h6>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <CButton
          // disabled={
          //   previewSection.length === 0 || previewFloatingSection.length === 0
          // }
          onClick={() => exportData(previewSection, previewFloatingSection)}
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

export default DesignTabControl;
