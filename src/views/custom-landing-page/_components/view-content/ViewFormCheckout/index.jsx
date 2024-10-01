import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useFontAwesomeIconPack } from "../../../../../hooks/useFontAwesomePack";
import { setReceiver } from "../../../../../redux/modules/package/reducer";
import { resetCheckCosts } from "../../../../../redux/modules/shipping/reducer";
import Checkbox from "../../common/Checkbox";
import InputFormCheckout from "../../common/InputFormCheckout";
import { SelectDistrict } from "../../common/SelectDistrict";
import TextArea from "../../common/TextArea";
import ViewCustomField from "../../list-add-content/form-checkout/common/ViewCustomField";

import ViewPaymentMethod from "./ViewPaymentMethod";
import ViewShippingMethod from "./ViewShippingMethod";

const ViewFormCheckout = forwardRef(
  (
    {
      isDragging,
      content,
      isResizing,
      isFocused,
      setPreviewSection,
      sectionId,
      columnId,
      isMultiColumn,
    },
    ref
  ) => {
    const {
      emailVisitor,
      subscribeNewsletter,
      phoneNumberVisitor,
      firstName,
      lastName,
      address,
      country,
      postcalCode,
      subdictrict,
      phoneNumber,
      dropshipping,
      dropshipperName,
      dropshipperPhoneNumber,
    } = content.form.information || {};

    const methods = useForm({
      defaultValues: {
        emailVisitor: emailVisitor || "",
        subscribeNewsletter: subscribeNewsletter || false,
        phoneNumberVisitor: phoneNumberVisitor || "",
        firstName: firstName || "",
        lastName: lastName || "",
        address: address || "",
        country: country || "",
        postcalCode: postcalCode || "",
        subdictrict: subdictrict || "",
        phoneNumber: phoneNumber || "",
        isDropshipping: dropshipping || false,
        dropshipperName: dropshipperName || "",
        dropshipperPhoneNumber: dropshipperPhoneNumber || "",
        customField: [],
      },
    });

    // Destructuring methods
    const {
      handleSubmit,
      control,
      formState: { isValid },
    } = methods;

    const {
      visitor,
      isSubscribeNewsletter,
      isShowAddress,
      isLastName,
      amountLengthAddress,
      isPostcalCode,
      isShowPhoneNumber,
      subdistrictType,
      isCountry,
      isDropshipping,
      phoneNumberDropshipper,
    } = content?.form?.formSetting || {};

    const {
      labelColor,
      textInputColor,
      bgInputColor,
      outlineInputColor,
      widthForm,
      fontSizeLabel,
      fontStyle,
      fontSizeTextInputColor,
      outlineInputColorSize,
      borderRadius,
      distance,
      btnSubmitText,
      btnSubmitColor,
      icon,
      iconColor,
      image,
    } = content?.form?.style || {};

    const dispatch = useDispatch();
    const { receiver } = useSelector((state) => state.package);

    const onSetSubdistrict = async (obj) => {
      await dispatch(resetCheckCosts());
      await dispatch(
        setReceiver({
          ...receiver,
          subdistrict_id: obj.id,
          district_id: obj.id,
          Subdistrict: obj,
        })
      );
    };

    const iconPack = useFontAwesomeIconPack();
    const [iconName, setIconName] = useState(null);

    useEffect(() => {
      if (iconPack) {
        const iconToSet = icon || "";
        const iconExists = iconPack.some(
          (icon) => icon.iconName === iconToSet?.iconName
        );
        if (iconExists) {
          setIconName(iconToSet);
        } else {
          setIconName(null); // Set default icon
        }
      }
    }, [icon, iconPack]);

    useEffect(() => {
      if (content.form?.style?.image) {
        setIconName(null);
      }
    }, [content.form.style.image]);

    const removeEmptyValues = (obj) => {
      const cleanedObj = Object.fromEntries(
        Object.entries(obj)
          .map(([key, value]) =>
            value && typeof value === "object"
              ? [key, removeEmptyValues(value)] // Rekursif untuk nested object
              : [key, value]
          )
          .filter(
            ([_, value]) =>
              value !== "" &&
              value !== null &&
              value !== undefined &&
              !(typeof value === "object" && Object.keys(value).length === 0) // Hapus objek kosong
          )
      );

      // Hapus objek kosong di level teratas
      return Object.keys(cleanedObj).length === 0 &&
        typeof cleanedObj === "object"
        ? {}
        : cleanedObj;
    };

    const onSubmit = (data) => {
      const filteredData = removeEmptyValues(data);

      console.log("🚀 ~ onSubmit ~ filteredData:", filteredData);

      if (isMultiColumn) {
        const contentId = content.id;

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
                            content.id === contentId
                              ? {
                                  ...content,
                                  form: {
                                    ...content.form,
                                    information: {
                                      ...filteredData,
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
      } else {
        setPreviewSection((arr) =>
          arr.map((item) =>
            String(item.id) === content.id
              ? {
                  ...item,
                  form: {
                    ...item.form,
                    information: {
                      ...filteredData,
                    },
                  },
                }
              : item
          )
        );
      }
    };

    const inputStyle = {
      labelColor,
      textInputColor,
      bgInputColor,
      outlineInputColor,
      widthForm,
      fontSizeLabel,
      fontStyle,
      fontSizeTextInputColor,
      outlineInputColorSize,
      borderRadius,
      distance,
    };
    return (
      <div
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
          position: "relative",
          zIndex: 1,
        }}
        className={`tw-w-full tw-flex tw-justify-center  tw-p-4 `}
      >
        <FormProvider {...methods}>
          <form style={{ width: widthForm }} onSubmit={handleSubmit(onSubmit)}>
            <div>
              {visitor === "email" && (
                <div>
                  <InputFormCheckout
                    style={inputStyle}
                    type="email"
                    label="Email"
                    name="emailVisitor"
                    control={control}
                    placeholder="Doe"
                    rules={{
                      required: visitor ? "Email Harus Di isi" : false,
                    }}
                  />

                  {isSubscribeNewsletter !== undefined && (
                    <div style={{ marginTop: -8, marginBottom: 10 }}>
                      <Controller
                        name="subscribeNewsletter"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="subscribeNewsletter"
                            label="Berlangganan Ke Newsletter"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        )}
                      />
                    </div>
                  )}
                </div>
              )}

              {visitor === "phoneNumber" && (
                <div className="tw-w-full">
                  <InputFormCheckout
                    style={inputStyle}
                    type="number"
                    label="No Telepon"
                    name="phoneNumberVisitor"
                    control={control}
                    placeholder="895787784"
                    rules={{
                      required: visitor ? "No Telepon Harus Di isi" : false,
                    }}
                    isPhoneNumber={true}
                  />
                </div>
              )}
            </div>

            {content?.content?.map((section, index) => (
              <div key={section.id}>
                <ViewCustomField
                  section={section}
                  inputStyle={inputStyle}
                  control={control}
                  onSetSubdistrict={onSetSubdistrict}
                  index={index}
                />
              </div>
            ))}

            {isShowAddress && (
              <div>
                <InputFormCheckout
                  style={inputStyle}
                  type="text"
                  label="Nama"
                  name="firstName"
                  control={control}
                  placeholder="John"
                  rules={{ required: "Nama Harus Di isi" }}
                />
                {isShowAddress && isLastName && (
                  <InputFormCheckout
                    style={inputStyle}
                    type="text"
                    label="Nama Belakang"
                    name="lastName"
                    control={control}
                    placeholder="Doe"
                    rules={{
                      required:
                        isLastName === "required"
                          ? "Nama Belakang Harus Di isi"
                          : false,
                    }}
                  />
                )}

                <div className="tw-mb-4">
                  <SelectDistrict
                    label="Kota / Kabupaten"
                    placeholder="Masukan Kecamatan / Kota"
                    style={inputStyle}
                    onSelectDistrict={onSetSubdistrict}
                  />
                </div>

                {isShowAddress && amountLengthAddress === "1" ? (
                  <InputFormCheckout
                    style={inputStyle}
                    type="text"
                    label="Alamat"
                    name="address"
                    control={control}
                    placeholder="Jl Layur 14"
                    rules={{
                      required: "Alamat  Harus Di isi",
                    }}
                  />
                ) : (
                  <TextArea
                    style={inputStyle}
                    type="text"
                    label="Alamat"
                    name="address"
                    control={control}
                    placeholder="Jl Layur 14"
                    rules={{
                      required: "Alamat  Harus Di isi",
                    }}
                    height={amountLengthAddress}
                  />
                )}

                {isShowAddress && isPostcalCode && (
                  <InputFormCheckout
                    style={inputStyle}
                    type="number"
                    label="Kode Pos"
                    name="postcalCode"
                    control={control}
                    placeholder="17530"
                    rules={{
                      required:
                        isPostcalCode === "required"
                          ? "Alamat  Harus Di isi"
                          : false,
                    }}
                  />
                )}

                {isShowAddress && isShowPhoneNumber && (
                  <InputFormCheckout
                    style={inputStyle}
                    type="number"
                    label="No Telepon"
                    name="phoneNumber"
                    control={control}
                    placeholder="Doe"
                    rules={{
                      required:
                        isShowPhoneNumber === "required"
                          ? "No Telepon Harus Di isi"
                          : false,
                    }}
                    isPhoneNumber
                  />
                )}

                {isShowAddress && isDropshipping && (
                  <div style={{ marginTop: -8 }}>
                    <Controller
                      name="isDropshipping"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="isDropshipping"
                          label="Kirim sebagai dropshipper"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      )}
                    />

                    <div className="tw-mt-3">
                      <InputFormCheckout
                        style={inputStyle}
                        type="text"
                        label="Nama Dropshipper"
                        name="dropshipperName"
                        control={control}
                        placeholder="Smith"
                        rules={{
                          required: isDropshipping
                            ? "Nama Harus Di isi"
                            : false,
                        }}
                      />
                    </div>
                  </div>
                )}

                {isShowAddress && phoneNumberDropshipper && (
                  <InputFormCheckout
                    style={inputStyle}
                    type="number"
                    label="No Telepon Dropshipper"
                    name="dropshipperPhoneNumber"
                    control={control}
                    placeholder="Doe"
                    rules={{
                      required:
                        phoneNumberDropshipper === "required"
                          ? "No Telepon Harus Di isi"
                          : false,
                    }}
                    isPhoneNumber
                  />
                )}
              </div>
            )}

            <h5>Metode Pengiriman</h5>

            <ViewShippingMethod
              style={inputStyle}
              content={content}
              control={control}
            />

            <h5>Metode Pembayaran</h5>

            <ViewPaymentMethod
              style={inputStyle}
              control={control}
              content={content}
            />

            <button
              disabled={!isValid}
              style={{
                backgroundColor: !isValid ? "#d9d9d9" : "#fa541c",
                color: !isValid ? "#a6a6a6" : "#ffffff",
                cursor: !isValid ? "not-allowed" : "pointer",
                opacity: !isValid ? 0.6 : 1,
              }}
              className=" tw-hover:bg-blue-600 tw-text-white   tw-py-2.5 tw-px-4 tw-rounded focus:tw-outline-none focus:tw-ring-0 tw-border-none tw-w-full"
              type="submit"
            >
              <div className="tw-flex tw-justify-center tw-items-center tw-gap-x-3">
                <div>
                  {iconName && (
                    <div
                      style={{
                        color: iconColor,
                      }}
                    >
                      <FontAwesomeIcon
                        size="lg"
                        icon={[`${iconName.prefix}`, iconName.iconName]}
                      />
                    </div>
                  )}

                  {image && (
                    <div
                      style={{
                        width: 50,
                      }}
                    >
                      <img
                        src={image}
                        alt="icon"
                        style={{ width: "100%", objectFit: "contain" }}
                      />
                    </div>
                  )}
                </div>

                {btnSubmitText}
              </div>
            </button>
          </form>
        </FormProvider>
      </div>
    );
  }
);

export default ViewFormCheckout;
