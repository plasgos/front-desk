import React, { useState } from "react";
import SelectOptions from "../../../common/SelectOptions";

const typeOptions = [
  {
    label: "Checkout",
    options: [
      {
        value: "phoneNumber",
        label: "Telepon (C)",
      },
      {
        value: "firstName",
        label: "Nama Depan (C)",
      },
      {
        value: "email",
        label: "Email (C)",
      },
      {
        value: "district",
        label: "Kecamatan (C)",
      },
      {
        value: "address",
        label: "Alamat (C)",
      },
      {
        value: "postalCode",
        label: "Kode Pos (C)",
      },
    ],
  },
  {
    label: "Pemisah",
    options: [
      {
        value: "divider",
        label: "Judul Pembatas",
      },
      {
        value: "line",
        label: "Garis",
      },
      {
        value: "space",
        label: "Ruang Kosong",
      },
    ],
  },
  {
    label: "Teks",
    options: [
      {
        value: "text",
        label: "Teks",
      },
      {
        value: "longText",
        label: "Teks Panjang",
      },
      {
        value: "email",
        label: "Email",
      },
      {
        value: "phoneNumber",
        label: "Telepon",
      },
    ],
  },
  {
    label: "Opsi",
    options: [
      {
        value: "selectOption",
        label: "Seleksi / Pilihan Opsi",
      },
      {
        value: "checkbox",
        label: "Checkbox",
      },
      {
        value: "multiSelect",
        label: "Multi Seleksi",
      },
    ],
  },
  {
    label: "Angka",
    options: [
      {
        value: "number",
        label: "Angka",
      },
      {
        value: "price",
        label: "Harga",
      },
      {
        value: "counter",
        label: "Counter",
      },
      {
        value: "rating",
        label: "Rating",
      },
    ],
  },
  {
    label: "Waktu",
    options: [
      {
        value: "date",
        label: "Tanggal",
      },
      {
        value: "time",
        label: "Jam & Menit",
      },
    ],
  },
];

const UpdateContent = ({
  idSection,
  currentContent,
  setPreviewSection,
  isEditingContent,
}) => {
  const [typeOption, setTypeOption] = useState(typeOptions[0]);

  const handleChangeContent = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                return String(contentItem.id) === String(currentContent.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        [key]: value,
                      },
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
  };

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <SelectOptions
          label="Tipe"
          options={typeOptions}
          onChange={(selectedOption) => {
            setTypeOption(selectedOption);
            handleChangeContent("type", selectedOption.value);
          }}
          value={typeOption}
          width="50"
        />
      </div>
    </div>
  );
};

export default UpdateContent;
