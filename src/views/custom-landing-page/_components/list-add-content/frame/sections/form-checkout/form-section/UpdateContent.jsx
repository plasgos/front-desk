import React, { useEffect, useState } from "react";
import SelectOptions from "../../../../../common/SelectOptions";
import { createUniqueID } from "../../../../../../../../lib/unique-id";
import CustomFieldControl from "../common/CustomFieldControl";
import Checkbox from "../../../../../common/Checkbox";

import DividerControl from "../common/DividerControl";
import LineControl from "../common/LineControl";
import EmptySpaceControl from "../common/EmptySpaceControl";
import Input from "../../../../../common/Input";
import MultiSelectControl from "../common/MultiSelectControl";
import { useSelector } from "react-redux";
import SelectOptionsControl from "../common/SelectOptionsControl";
import { useDebounce } from "use-debounce";

const typeOptions = [
  {
    label: "Checkout",
    options: [
      {
        value: "phoneNumberC",
        label: "Telepon (C)",
      },
      {
        value: "firstName",
        label: "Nama Depan (C)",
      },
      {
        value: "emailC",
        label: "Email (C)",
      },
      {
        value: "subdistrict",
        label: "Kecamatan (C)",
      },
      {
        value: "addressC",
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
        value: "emptySpace",
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
  { label: "Media", options: [{ value: "image", label: "Gambar" }] },
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

const defaultValueDateOptions = [
  { value: false, label: "Kosong" },
  { value: true, label: "Hari Ini" },
];

const designRatingOptions = [
  { value: "star", label: "Bintang" },
  { value: "love", label: "Hati" },
];

const UpdateContent = ({
  idSection,
  currentContent,
  previewSection,
  setPreviewSection,
  isEditingContent,
}) => {
  const [typeOption, setTypeOption] = useState(
    typeOptions
      ?.flatMap((group) => group.options)
      .find((opt) => opt.value === currentContent?.type) ||
      typeOptions[2].options[0]
  );
  const [isRequired, setIsRequired] = useState(
    currentContent?.isRequired || true
  );

  const [label, setLabel] = useState(currentContent?.label || "Nama");
  const [labelValue] = useDebounce(label, 300);

  useEffect(() => {
    if (labelValue) {
      handleChangeValueContent("label", labelValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelValue]);

  const [isTodayDate, setIsTodayDate] = useState(
    defaultValueDateOptions.find(
      (opt) => opt.value === currentContent?.isToday
    ) || defaultValueDateOptions[0]
  );

  const [designRating, setDesignRating] = useState(
    designRatingOptions.find((opt) => opt.value === currentContent?.design) ||
      designRatingOptions[0]
  );

  const { isSelectVariantMultiSelect } = useSelector(
    (state) => state.customLandingPage
  );

  const [setting, setSetting] = useState({});
  const commonConfig = {
    isRequired,
    label: "Nama",
    placeholder: "John",
  };

  const payloadConfig = {
    phoneNumber: {
      ...commonConfig,
      placeholder: "895070089",
    },
    phoneNumberC: {
      ...commonConfig,
      placeholder: "895070089",
    },
    firstName: {
      ...commonConfig,
      placeholder: "John",
    },
    email: {
      ...commonConfig,
      placeholder: "user@email.com",
    },
    emailC: {
      ...commonConfig,
      placeholder: "user@email.com",
    },
    subdistrict: {
      label: "Kota / Kabupaten",
      placeholder: "Masukan Kecamatan / Kota",
      design: "search",
    },
    addressC: {
      ...commonConfig,
      placeholder: "Jl Layur 1",
      minLength: "",
    },
    postalCode: {
      ...commonConfig,
      placeholder: "14400",
    },
    divider: {
      label: "Nama",
      fontSize: 12,
    },
    line: {
      label: "Nama",
      height: 2,
      emptySpace: 8,
      width: 4,
    },
    emptySpace: {
      label: "Nama",
      height: 24,
    },
    text: {
      ...commonConfig,
    },
    longText: {
      ...commonConfig,
      minLength: "",
    },
    checkbox: {
      label: "Nama",
      isRequired,
    },
    multiSelect: {
      designId: "1",
      label: "Nama",
      options: [],
      typeInput: "checkbox",
    },
    number: {
      ...commonConfig,
      minValue: undefined,
      maxValue: undefined,
    },
    price: {
      ...commonConfig,
      placeholder: "10.000",
      minValue: undefined,
      maxValue: undefined,
    },
    counter: {
      label: "Nama",
      defaultValue: undefined,
      minValue: undefined,
      maxValue: undefined,
    },
    rating: {
      label: "Nama",
      design: "star",
      isRequired,
    },
    image: {
      label: "Nama",
      isRequired,
    },
    date: {
      label: "Nama",
      isToday: false,
      isRequired,
    },
    time: {
      label: "Nama",
    },
    selectOption: {
      label: "Nama",
      placeholder: "Pilih Opsi",
      defaultValue: undefined,
      options: [],
      optionsGroup: [],
      isRequired,
      typeOption: "single",
    },
  };

  const handleChangeType = (selectedOption) => {
    const specificPayload = payloadConfig[selectedOption.value] || {};

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                const contentIdToCheck = isEditingContent
                  ? currentContent.id
                  : setting.id;
                return String(contentItem.id) === String(contentIdToCheck)
                  ? {
                      id: contentIdToCheck,
                      type: selectedOption.value,
                      labelType: selectedOption.label,
                      ...specificPayload,
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );

    if (!isEditingContent) {
      setSetting(() => ({
        id: setting.id,
        type: selectedOption.value,
        labelType: selectedOption.label,
        ...specificPayload,
      }));
    }
  };

  const handleChangeValueContent = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                const contentIdToCheck = isEditingContent
                  ? currentContent.id
                  : setting.id;

                return String(contentItem.id) === String(contentIdToCheck)
                  ? {
                      ...contentItem,
                      [key]: value,
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentContent);
    let payload = {
      id: uniqueId,
      ...commonConfig,
      type: typeOption.value,
      labelType: "Teks",
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === idSection
          ? { ...section, content: [...section.content, payload] }
          : section
      )
    );

    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingContent) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingContent]);

  return (
    <div>
      <div
        style={{
          gap: 10,
          display: isSelectVariantMultiSelect ? "none" : "flex",
        }}
        className=" align-items-center my-3"
      >
        <SelectOptions
          label="Tipe"
          options={typeOptions}
          onChange={(selectedOption) => {
            setTypeOption(selectedOption);
            handleChangeType(selectedOption);
          }}
          value={typeOption}
          width="50"
        />

        {typeOption.value !== "multiSelect" && typeOption.value !== "time" && (
          <Checkbox
            disabled={typeOption.value === "subdistrict"}
            checked={isRequired}
            id={"isRequired"}
            label="Diharuskan"
            onChange={(e) => {
              const { checked } = e.target;
              setIsRequired(checked);
              handleChangeValueContent("isRequired", checked);
            }}
          />
        )}
      </div>

      {(typeOption.value === "text" ||
        typeOption.value === "postalCode" ||
        typeOption.value === "addressC" ||
        typeOption.value === "subdistrict" ||
        typeOption.value === "longText" ||
        typeOption.value === "firstName" ||
        typeOption.value === "number" ||
        typeOption.value === "price" ||
        typeOption.value === "counter" ||
        typeOption.value.includes("email") ||
        typeOption.value.includes("phoneNumber")) && (
        <CustomFieldControl
          currentContent={isEditingContent ? currentContent : setting}
          handleChangeValueContent={handleChangeValueContent}
          typeOptionValue={typeOption.value}
        />
      )}

      {typeOption.value === "divider" && (
        <DividerControl
          currentContent={isEditingContent ? currentContent : setting}
          handleChangeValueContent={handleChangeValueContent}
        />
      )}

      {typeOption.value === "line" && (
        <LineControl
          currentContent={isEditingContent ? currentContent : setting}
          handleChangeValueContent={handleChangeValueContent}
        />
      )}

      {typeOption.value === "emptySpace" && (
        <EmptySpaceControl
          currentContent={isEditingContent ? currentContent : setting}
          handleChangeValueContent={handleChangeValueContent}
        />
      )}

      {typeOption.value === "checkbox" && (
        <Input
          type="text"
          value={label}
          label="Nama"
          onChange={(e) => {
            const { value } = e.target;
            setLabel(value);
          }}
        />
      )}

      {typeOption.value === "selectOption" && (
        <SelectOptionsControl
          currentContent={isEditingContent ? currentContent : setting}
          handleChangeValueContent={handleChangeValueContent}
          idSection={idSection}
          setPreviewSection={setPreviewSection}
          previewSection={previewSection}
        />
      )}

      {typeOption.value === "multiSelect" && (
        <MultiSelectControl
          currentContent={isEditingContent ? currentContent : setting}
          handleChangeValueContent={handleChangeValueContent}
          idSection={idSection}
          setPreviewSection={setPreviewSection}
          previewSection={previewSection}
        />
      )}

      {typeOption.value === "rating" && (
        <div>
          <SelectOptions
            label="Desain"
            options={designRatingOptions}
            onChange={(selectedOption) => {
              setDesignRating(selectedOption);
              handleChangeValueContent("design", selectedOption.value);
            }}
            value={designRating}
            width="50"
          />

          <Input
            type="text"
            value={label}
            label="Nama"
            onChange={(e) => {
              const { value } = e.target;
              setLabel(value);
            }}
          />
        </div>
      )}

      {typeOption.value === "image" && (
        <Input
          type="text"
          value={label}
          label="Nama"
          onChange={(e) => {
            const { value } = e.target;
            setLabel(value);
          }}
        />
      )}

      {typeOption.value === "time" && (
        <Input
          type="text"
          value={label}
          label="Nama"
          onChange={(e) => {
            const { value } = e.target;
            setLabel(value);
          }}
        />
      )}

      {typeOption.value === "date" && (
        <div>
          <Input
            type="text"
            value={label}
            label="Nama"
            onChange={(e) => {
              const { value } = e.target;
              setLabel(value);
            }}
          />

          <SelectOptions
            label="Default"
            options={defaultValueDateOptions}
            onChange={(selectedOption) => {
              setIsTodayDate(selectedOption);
              handleChangeValueContent("isToday", selectedOption.value);
            }}
            value={isTodayDate}
            width="50"
          />
        </div>
      )}
    </div>
  );
};

export default UpdateContent;
