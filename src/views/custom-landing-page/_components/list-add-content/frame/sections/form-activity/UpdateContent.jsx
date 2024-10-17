import React, { useState } from "react";
import ColorPicker from "../../../../common/ColorPicker";
import SelectOptions from "../../../../common/SelectOptions";
import Input from "../../../../common/Input";

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
  sectionId,
}) => {
  const [btnColor, setBtnColor] = useState(
    currentSection?.content?.btnColor || "#2196F3"
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

  const handleChangeContent = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((sectionFrame) =>
                sectionFrame.id === currentSection.id
                  ? {
                      ...sectionFrame,
                      content: {
                        ...sectionFrame.content,
                        [key]: value,
                      },
                    }
                  : sectionFrame
              ),
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

      <Input
        label="Tombol"
        value={textBtn}
        onChange={(e) => {
          const { value } = e.target;
          setTextBtn(value);
          handleChangeContent("textBtn", value);
        }}
      />

      {currentSection?.content?.typeForm ===
      "collected-email-and-phone" ? null : (
        <Input
          label="Placeholder"
          value={placeholder}
          onChange={(e) => {
            const { value } = e.target;
            setPlaceholder(value);
            handleChangeContent("placeholder", value);
          }}
        />
      )}
    </div>
  );
};

export default UpdateContent;
