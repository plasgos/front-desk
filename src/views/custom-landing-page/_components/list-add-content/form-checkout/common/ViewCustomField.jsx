import React from "react";
import InputFormCheckout from "../../../common/InputFormCheckout";
import { SelectDistrict } from "../../../common/SelectDistrict";
import TextArea from "../../../common/TextArea";

const ViewCustomField = ({
  section,
  inputStyle,
  control,
  onSetSubdistrict,
}) => {
  return (
    <div>
      {(section.type === "text" ||
        section.type === "postalCode" ||
        section.type === "firstName" ||
        section.type.includes("email") ||
        section.type.includes("phoneNumber")) && (
        <InputFormCheckout
          style={inputStyle}
          type={
            section.type.includes("email")
              ? "email"
              : section.type.includes("phoneNumber")
              ? "number"
              : section.type === "postalCode"
              ? "number"
              : "text"
          }
          label={section.label}
          name={`custom-${section.type}`}
          control={control}
          placeholder={section.placeholder}
          rules={{
            required: section.isRequired ? "Harus Di isi" : false,
          }}
          isPhoneNumber={section.type.includes("phoneNumber") ? true : false}
        />
      )}

      {section.type === "subdistrict" && (
        <div className="tw-mb-4">
          <SelectDistrict
            label={section.label}
            placeholder={section.placeholder}
            style={inputStyle}
            onSelectDistrict={onSetSubdistrict}
          />
        </div>
      )}

      {(section.type === "addressC" || section.type === "longText") && (
        <TextArea
          style={inputStyle}
          type="text"
          label={section.label}
          name={`custom-${section.type}`}
          control={control}
          placeholder={section.placeholder}
          rules={{
            required: "Harus Di isi",
          }}
          height={100}
        />
      )}
    </div>
  );
};

export default ViewCustomField;
