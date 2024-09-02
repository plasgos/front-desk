import React from "react";
import InputFormCheckout from "../../../common/InputFormCheckout";
import { SelectDistrict } from "../../../common/SelectDistrict";
import TextArea from "../../../common/TextArea";
import CheckboxFormCheckout from "../../../common/CheckboxFormCheckout";

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
          name={`custom-${section.type}[${section.id}]`}
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
          minLength={section.minLength}
        />
      )}

      {section.type === "divider" && (
        <div
          className="tw-my-3"
          style={{
            fontSize: section.fontSize,
            color: inputStyle.labelColor,
          }}
        >
          {section.label}
        </div>
      )}

      {section.type === "line" && (
        <div
          style={{
            fontSize: section.fontSize,
            color: inputStyle.labelColor,
            marginTop: 1 + section.emptySpace,
            marginBottom: 33 + section.emptySpace,
          }}
        >
          <div
            style={{
              height: section.height,
              backgroundColor: inputStyle.labelColor,
              marginLeft:
                -1 + (section.width > 0 ? -section.width : section.width),
              marginRight:
                -1 + (section.width > 0 ? -section.width : section.width),
            }}
          ></div>
        </div>
      )}

      {section.type === "emptySpace" && (
        <div
          style={{
            height: section.height,
          }}
        ></div>
      )}

      {section.type === "checkbox" && (
        <div className="tw-my-3">
          <CheckboxFormCheckout
            style={inputStyle}
            label={section.label}
            name={`custom-${section.type}[${section.id}]`}
            control={control}
            rules={{
              required: section.isRequired ? "Harus Di isi" : false,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ViewCustomField;
