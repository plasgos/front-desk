import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import bca from "../../../../../assets/bca.png";
import mandiri from "../../../../../assets/mandiri.png";
import bri from "../../../../../assets/bri.png";
import { FaHandHoldingDollar } from "react-icons/fa6";
import SelectOptionsCustomForm from "../../common/SelectOptionsCustomForm";

const bankTransferOptions = [
  {
    value: "bca",
    label: "BCA",
  },
  {
    value: "bri",
    label: "BRI",
  },
  {
    value: "mandiri",
    label: "Mandiri",
  },
];

const ViewPaymentMethod = ({ style, control, content }) => {
  const { setValue } = useFormContext();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  const [selectedPaymentMethodOption, setSelectedPaymentMethodOption] =
    useState(bankTransferOptions[0]);

  const isInitialRender = useRef(true);

  // Trigger setValue only on initial render
  useEffect(() => {
    if (isInitialRender.current) {
      if (selectedPaymentMethodOption && selectedBank) {
        const payload = {
          type: "bank-transfer",
          bank: selectedPaymentMethodOption.value,
        };
        setValue("paymentMethod", payload); // Set default value using setValue
      }
      isInitialRender.current = false; // Set flag to false after first render
    }
  }, [selectedBank, selectedPaymentMethodOption, setValue]);

  return (
    <>
      {content?.form?.paymentMethod?.design === "close" ? (
        <Controller
          name="paymentMethod"
          control={control}
          rules={{
            required:
              content?.form?.paymentMethod?.paymentMethodOption === "required"
                ? "Harus Di Isi"
                : false,
          }}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <div className="tw-flex tw-items-center tw-gap-x-3">
                <div className="tw-w-full">
                  <SelectOptionsCustomForm
                    style={style}
                    options={bankTransferOptions}
                    onChange={(selectedOption) => {
                      setSelectedPaymentMethodOption(selectedOption);
                      const payload = {
                        type: "bank-transfer",
                        bank: selectedOption.value,
                      };
                      onChange(payload);
                    }}
                    value={selectedPaymentMethodOption}
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                  />
                </div>
              </div>

              {error && (
                <span className="tw-text-red-500 tw-text-sm">
                  {error.message}
                </span>
              )}
            </>
          )}
        />
      ) : (
        <Controller
          name="paymentMethod"
          control={control}
          rules={{
            required:
              content?.form?.paymentMethod?.paymentMethodOption === "required"
                ? "Harus Di Isi"
                : false,
          }}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <div
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#ccc",
              }}
              className="tw-w-full tw-rounded tw-py-2 tw-px-4 tw-my-3"
            >
              {/* COD Option */}
              <div
                style={{ borderBottom: `1px solid #ccc` }}
                className="tw-flex tw-items-center tw-mb-2 tw-justify-between tw-pb-3"
              >
                <div className="tw-flex tw-gap-x-3">
                  <input
                    id="isCod"
                    value="cod"
                    checked={selectedPaymentMethod === "cod"}
                    onChange={() => {
                      setSelectedPaymentMethod("cod");
                      setSelectedBank("");
                      onChange("cod");
                    }}
                    onBlur={onBlur}
                    style={{ cursor: "pointer" }}
                    type="radio"
                  />

                  <label className="mb-0 tw-cursor-pointer" htmlFor="isCod">
                    Bayar Di Tempat
                  </label>
                </div>

                <div>
                  <FaHandHoldingDollar size={32} />
                </div>
              </div>

              {/* Bank Transfer Option */}
              <div className="tw-flex tw-gap-x-3 tw-my-3">
                <input
                  id="isBankTransfer"
                  value="bank-transfer"
                  checked={selectedPaymentMethod === "bank-transfer"}
                  onChange={() => {
                    setSelectedPaymentMethod("bank-transfer");
                    setSelectedBank("bca"); // Default bank selection when "Bank Transfer" is selected
                    onChange({
                      type: "bank-transfer",
                      bank: "bca",
                    });
                  }}
                  onBlur={onBlur}
                  style={{ cursor: "pointer" }}
                  type="radio"
                />

                <label
                  className="mb-0 tw-cursor-pointer"
                  htmlFor="isBankTransfer"
                >
                  Bank Transfer
                </label>
              </div>

              {/* Bank Selection */}
              {selectedPaymentMethod === "bank-transfer" && (
                <div className="tw-flex tw-items-center tw-gap-x-3 tw-mb-2">
                  <div
                    className={`tw-w-1/3 tw-rounded`}
                    style={{
                      border:
                        selectedBank === "bca"
                          ? "1px solid #fa541c"
                          : "1px solid #D8DBE0 ",
                      cursor: "pointer",
                      padding: 12,
                    }}
                  >
                    <div
                      className={`tw-h-8 tw-flex tw-justify-center tw-items-center  `}
                      onClick={() => {
                        setSelectedBank("bca");
                        onChange({
                          type: "bank-transfer",
                          bank: "bca",
                        });
                      }}
                    >
                      <img
                        src={bca}
                        alt="BCA"
                        style={{ width: "100%", objectFit: "contain" }}
                      />
                    </div>
                  </div>

                  <div
                    className="tw-w-1/3 tw-rounded "
                    style={{
                      border:
                        selectedBank === "bri"
                          ? "1px solid #fa541c"
                          : "1px solid #D8DBE0 ",
                      cursor: "pointer",
                      padding: 12,
                    }}
                  >
                    <div
                      className={`tw-h-8 tw-flex tw-justify-center tw-items-center`}
                      onClick={() => {
                        setSelectedBank("bri");
                        onChange({
                          type: "bank-transfer",
                          bank: "bri",
                        });
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={bri}
                        alt="BRI"
                        style={{ width: "100%", objectFit: "contain" }}
                      />
                    </div>
                  </div>

                  <div
                    className="tw-w-1/3 tw-rounded "
                    style={{
                      border:
                        selectedBank === "mandiri"
                          ? "1px solid #fa541c"
                          : "1px solid #D8DBE0 ",
                      cursor: "pointer",
                      padding: 12,
                    }}
                  >
                    <div
                      className={` tw-h-8 tw-flex tw-justify-center tw-items-center `}
                      onClick={() => {
                        setSelectedBank("mandiri");
                        onChange({
                          type: "bank-transfer",
                          bank: "mandiri",
                        });
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={mandiri}
                        alt="Mandiri"
                        style={{ width: "100%", objectFit: "contain" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <span className="tw-text-red-500">{error.message}</span>
              )}
            </div>
          )}
        />
      )}
    </>
  );
};

export default ViewPaymentMethod;
