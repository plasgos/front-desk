import React, { useState } from "react";
import SelectOptions from "../../../../../common/SelectOptions";

const paymentMethodOptions = [
  { value: "required", label: "Harus Di Isi" },
  { value: "skip", label: "Lewati" },
];

const designOptions = [
  { value: "open", label: "Terbuka" },
  { value: "close", label: "Tertutup" },
];

const Payment = ({
  setPreviewSection,
  currentSection,
  sectionId,
  columnId,
}) => {
  const [paymentMethod, setPaymentMethod] = useState(
    paymentMethodOptions.find(
      (opt) =>
        opt.value === currentSection?.form?.paymentMethod?.paymentMethodOption
    ) || paymentMethodOptions[0]
  );

  const [design, setDesign] = useState(
    designOptions.find(
      (opt) => opt.value === currentSection?.form?.paymentMethod?.design
    ) || designOptions[0]
  );

  const handleChangeFormValue = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) =>
                        content.id === currentSection.id
                          ? {
                              ...content,
                              form: {
                                ...content.form,
                                paymentMethod: {
                                  ...content.form.paymentMethod,
                                  [key]: value,
                                },
                              },
                            }
                          : content
                      ),
                    }
                  : column
              ),
            }
          : section
      )
    );
  };

  return (
    <div style={{ gap: 10 }} className="d-flex align-items-center">
      <SelectOptions
        label="Metode Pengiriman"
        options={paymentMethodOptions}
        onChange={(selectedOption) => {
          setPaymentMethod(selectedOption);
          handleChangeFormValue("shippingMethodOption", selectedOption.value);
        }}
        value={paymentMethod}
        width="50"
      />

      <SelectOptions
        label="Desain"
        options={designOptions}
        onChange={(selectedOption) => {
          setDesign(selectedOption);
          handleChangeFormValue("design", selectedOption.value);
        }}
        value={design}
        width="50"
      />
    </div>
  );
};

export default Payment;
