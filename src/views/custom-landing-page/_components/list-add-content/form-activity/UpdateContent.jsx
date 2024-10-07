import React, { useEffect, useState } from "react";
import ColorPicker from "../../common/ColorPicker";
import SelectOptions from "../../common/SelectOptions";
import Input from "../../common/Input";
import { CButton } from "@coreui/react";

const typeFormOptions = [
  { value: "subcribe-newsletter", label: "Berlangganan Newsletter" },
  { value: "redirect-to-registration", label: "Alihkan Ke Pendaftaran" },
  { value: "collected-email", label: "Kumpulkan Email" },
  { value: "collected-email-and-phone", label: "Kumpulkan Email & Telepon" },
];

const UpdateContent = ({
  setPreviewSection,
  currentSection,
  isEditingContent,
}) => {
  const initialIsCollected = currentSection?.content?.isCollected;

  const [btnColor, setBtnColor] = useState(
    currentSection?.content?.btnColor || "#ffffff"
  );

  const [typeForm, setTypeForm] = useState(
    typeFormOptions.find(
      (opt) => opt.value === currentSection?.content?.typeForm
    ) || typeFormOptions[0]
  );

  const [textBtn, setTextBtn] = useState(
    currentSection?.content?.textBtn || "Daftar"
  );

  const [placeholder, setPlaceholder] = useState(
    currentSection?.content?.placeholder || "Masukan alamat email kamu di sini"
  );

  const [isCollected, setIsCollected] = useState(initialIsCollected);
  const [isDefault, setIsDefault] = useState(!initialIsCollected);

  useEffect(() => {
    setIsCollected(initialIsCollected);
    setIsDefault(!initialIsCollected);
  }, [initialIsCollected]);

  const handleChangeContent = (key, value) => {
    setPreviewSection((prevSection) =>
      prevSection.map((section) =>
        section.id === currentSection.id
          ? {
              ...section,
              content: {
                ...section.content,
                [key]: value,
              },
            }
          : section
      )
    );
  };

  return (
    <div className="mt-2 pb-5">
      <div className="mb-2">
        <ColorPicker
          initialColor={btnColor}
          label="Tombol"
          onChange={(color) => {
            setBtnColor(color);
            handleChangeContent("btnColor", color);
          }}
        />
      </div>

      <SelectOptions
        label="Tipe Formulir"
        options={typeFormOptions}
        onChange={(selectedOption) => {
          setTypeForm(selectedOption);
          handleChangeContent("typeForm", selectedOption.value);
        }}
        value={typeForm}
        width="100"
      />

      <div>
        <div className="mb-2">Tinjau dalam kondisi</div>
        <div style={{ gap: 5 }} className="d-flex mb-2">
          <CButton
            onClick={() => {
              setIsDefault(true);
              setIsCollected(false);
              handleChangeContent("isCollected", false);
            }}
            color="primary"
            variant={isDefault ? "" : "outline"}
          >
            Default
          </CButton>
          <CButton
            onClick={() => {
              setIsCollected(true);
              setIsDefault(false);
              handleChangeContent("isCollected", true);
            }}
            color="primary"
            variant={isCollected ? "" : "outline"}
          >
            Terkumpul
          </CButton>
        </div>
      </div>

      <Input
        label="Tombol"
        value={textBtn}
        onChange={(e) => {
          const { value } = e.target;
          setTextBtn(value);
          handleChangeContent("textBtn", value);
        }}
      />

      <Input
        label="Placeholder"
        value={placeholder}
        onChange={(e) => {
          const { value } = e.target;
          setPlaceholder(value);
          handleChangeContent("placeholder", value);
        }}
      />
    </div>
  );
};

export default UpdateContent;
