import React, { useState } from "react";
import SelectOptions from "../../../common/SelectOptions";

const visitorOptions = [
  { value: "phoneNumber", label: "Telepon" },
  { value: "email", label: "Email" },
  { value: undefined, label: "Tidak Ada" },
];

const subcribeNewLetterOptions = [
  { value: undefined, label: "Non Aktif" },
  { value: false, label: "Default Tidak" },
  { value: true, label: "Default Ya" },
];

const formAddressOption = [
  { value: true, label: "Tampilkan" },
  { value: false, label: "Sembunyikan" },
];

const lastNameOptions = [
  { value: undefined, label: "Non Aktif" },
  { value: "optional", label: "Opsional" },
  { value: "required", label: "Diharuskan" },
];

const countryOption = [
  { value: false, label: "Non Aktif" },
  { value: true, label: "Diharuskan" },
];
const postalOption = [
  { value: false, label: "Non Aktif" },
  { value: "optional", label: "Opsional" },
  { value: "required", label: "Diharuskan" },
];

const subdistrictOption = [
  { value: "menu", label: "Menu" },
  { value: "search", label: "Pencarian" },
];

const amountLengthAddressOption = [
  { value: "1", label: "1" },
  { value: 60, label: "2" },
  { value: 80, label: "3" },
  { value: 100, label: "4" },
  { value: 120, label: "5" },
];

const phoneNumberOptions = [
  { value: false, label: "Non Aktif" },
  { value: "optional", label: "Opsional" },
  { value: "required", label: "Diharuskan" },
];

const dropshippingOptions = [
  { value: false, label: "Non Aktif" },
  { value: true, label: "Aktif" },
];

const phoneNumberDropshipperOptions = [
  { value: false, label: "Non Aktif" },
  { value: "optional", label: "Opsional" },
  { value: "required", label: "Diharuskan" },
];

const Information = ({ setPreviewSection, currentSection }) => {
  const [visitor, setVisitor] = useState(visitorOptions[0]);
  const [subcribeNewsletter, setSetsubcribeNewsletter] = useState(
    subcribeNewLetterOptions[2]
  );
  const [isAddressShow, setIsAddressShow] = useState(formAddressOption[0]);
  const [lastNameOption, setlastNameOption] = useState(lastNameOptions[0]);
  const [isCountryActive, setIsCountryActive] = useState(countryOption[0]);
  const [postcalCode, setPostcalCode] = useState(postalOption[0]);
  const [subdictrictType, setSetsubdictrictType] = useState(
    subdistrictOption[0]
  );
  const [lengthAddress, setLengthAddress] = useState(
    amountLengthAddressOption[0]
  );
  const [phoneNumberOption, setPhoneNumberOption] = useState(
    phoneNumberOptions[0]
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDropshipping, setIsDropshipping] = useState(dropshippingOptions[0]);
  const [phoneNumberDropshipper, setPhoneNumberDropshipper] = useState(
    phoneNumberDropshipperOptions[0]
  );

  const handleChangeFormValue = (key, selectedOption) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              form: {
                ...item.form,
                formSetting: {
                  ...item.form.formSetting,
                  [key]: selectedOption,
                },
              },
            }
          : item
      )
    );
  };

  return (
    <div>
      <div
        className="mb-3 mt-2"
        style={{
          boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.1)",
          borderBottom: "0.5px solid #F5F5F5 ",
        }}
      >
        <div style={{ gap: 10 }} className="d-flex align-items-center">
          <SelectOptions
            label="Tamu checkout menggunakan"
            options={visitorOptions}
            onChange={(selectedOption) => {
              setVisitor(selectedOption);
              handleChangeFormValue("visitor", selectedOption.value);
            }}
            value={visitor}
            width="50"
          />

          {visitor.value === "email" && (
            <SelectOptions
              label="Berlangganan ke newsletter"
              options={subcribeNewLetterOptions}
              onChange={(selectedOption) => {
                setSetsubcribeNewsletter(selectedOption);
                handleChangeFormValue(
                  "isSubcribeNewsletter",
                  selectedOption.value
                );
              }}
              value={subcribeNewsletter}
              width="50"
            />
          )}
        </div>

        <h5>Alamat</h5>

        <SelectOptions
          label="Formulir Alamat"
          options={formAddressOption}
          onChange={(selectedOption) => {
            setIsAddressShow(selectedOption);
            handleChangeFormValue("isShowAddress", selectedOption.value);
          }}
          value={isAddressShow}
          width="50"
        />

        {isAddressShow.value && (
          <div>
            <div style={{ gap: 10 }} className="d-flex align-items-center ">
              <SelectOptions
                label="Nama Belakang"
                options={lastNameOptions}
                onChange={(selectedOption) => {
                  setlastNameOption(selectedOption);
                  handleChangeFormValue("isLastName", selectedOption.value);
                }}
                value={lastNameOption}
                width="50"
              />

              <SelectOptions
                label="Negara / Wilayah"
                options={countryOption}
                onChange={(selectedOption) => {
                  setIsCountryActive(selectedOption);
                  handleChangeFormValue("isCountry", selectedOption.value);
                }}
                value={isCountryActive}
                width="50"
              />
            </div>

            <div style={{ gap: 10 }} className="d-flex align-items-center ">
              <SelectOptions
                label="Kode Pos"
                options={postalOption}
                onChange={(selectedOption) => {
                  setPostcalCode(selectedOption);
                  handleChangeFormValue("isPostcalCode", selectedOption.value);
                }}
                value={postcalCode}
                width="50"
              />

              <SelectOptions
                label="Tipe Input Kecamatan"
                options={subdistrictOption}
                onChange={(selectedOption) => {
                  setSetsubdictrictType(selectedOption);
                  handleChangeFormValue(
                    "subdistrictType",
                    selectedOption.value
                  );
                }}
                value={subdictrictType}
                width="50"
              />
            </div>

            <div style={{ gap: 10 }} className="d-flex align-items-center">
              <SelectOptions
                label="Jumlah Baris Alamat"
                options={amountLengthAddressOption}
                onChange={(selectedOption) => {
                  setLengthAddress(selectedOption);
                  handleChangeFormValue(
                    "amountLengthAddress",
                    selectedOption.value
                  );
                }}
                value={lengthAddress}
                width="50"
              />
            </div>

            <div style={{ gap: 10 }} className="d-flex align-items-center">
              <SelectOptions
                label="Telepon"
                options={phoneNumberOptions}
                onChange={(selectedOption) => {
                  setPhoneNumberOption(selectedOption);
                  handleChangeFormValue(
                    "isShowPhoneNumber",
                    selectedOption.value
                  );
                }}
                value={phoneNumberOption}
                width="50"
              />

              {/* {phoneNumberOption.value && (
                <Input
                  label="Nomor Telepon"
                  value={phoneNumber}
                  onChange={(e) => {
                    const { value } = e.target;
                    setPhoneNumber(value);
                    handleChangeFormValue("phoneNumber", value);
                  }}
                  isPhoneNumber
                />
              )} */}
            </div>

            <div style={{ gap: 10 }} className="d-flex align-items-center ">
              <SelectOptions
                label="Dropshipping"
                options={dropshippingOptions}
                onChange={(selectedOption) => {
                  setIsDropshipping(selectedOption);
                  handleChangeFormValue("isDropshipping", selectedOption.value);
                }}
                value={isDropshipping}
                width="50"
              />

              {isDropshipping.value && (
                <SelectOptions
                  label="Telepon Dropshipper"
                  options={phoneNumberDropshipperOptions}
                  onChange={(selectedOption) => {
                    setPhoneNumberDropshipper(selectedOption);
                    handleChangeFormValue(
                      "phoneNumberDropshipper",
                      selectedOption.value
                    );
                  }}
                  value={phoneNumberDropshipper}
                  width="50"
                />
              )}
            </div>
          </div>
        )}
        <h5>Custom Field</h5>
      </div>
    </div>
  );
};

export default Information;
