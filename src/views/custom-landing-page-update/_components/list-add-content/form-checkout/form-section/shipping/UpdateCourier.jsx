import React, { useEffect, useState } from "react";
import jne from "../../../../../../../assets/jne-logo.png";
import sicepat from "../../../../../../../assets/logo-sicepat.png";
import ninja from "../../../../../../../assets/ninja-xpress.png";
import jnt from "../../../../../../../assets/jnt.png";
import sap from "../../../../../../../assets/sap xpress logo.png";
import anteraja from "../../../../../../../assets/anteraja logo.png";
import idexpress from "../../../../../../../assets/id-express logo.png";
import { useDispatch } from "react-redux";
import { setSelectCourier } from "../../../../../../../redux/modules/custom-landing-page/reducer";
import SelectOptions from "../../../../common/SelectOptions";
import Checkbox from "../../../../common/Checkbox";

const couriersOptions = [
  {
    label: "Kurir Indonesia",
    options: [
      {
        id: "1",
        value: "jne",
        label: "JNE",
        image: jne,
        service: "Reg",
        price: "8000",
        estimate: "1-2 Hari",
      },
      {
        id: "2",
        value: "sicepat",
        label: "Sicepat",
        image: sicepat,
        service: "Reg",
        price: "8000",
        estimate: "1-2 Hari",
      },
      {
        id: "3",
        value: "ninja",
        label: "Ninja",
        image: ninja,
        service: "Reg",
        price: "8000",
        estimate: "1-2 Hari",
      },
      {
        id: "4",
        value: "j&t",
        label: "J&T",
        image: jnt,
        service: "Reg",
        price: "8000",
        estimate: "1-2 Hari",
      },
      {
        id: "5",
        value: "sap",
        label: "SAP",
        image: sap,
        service: "Reg",
        price: "8000",
        estimate: "1-2 Hari",
      },
      {
        id: "6",
        value: "anteraja",
        label: "Anteraja",
        image: anteraja,
        service: "Reg",
        price: "8000",
        estimate: "1-2 Hari",
      },
      {
        id: "7",
        value: "idexpress",
        label: "ID Express",
        image: idexpress,
        service: "Reg",
        price: "8000",
        estimate: "1-2 Hari",
      },
    ],
  },
];

const UpdateCourier = ({
  previewSection,
  currentSection,
  setPreviewSection,
  currentCourier,
  setCurrentCourier,
  isEditingCourier,
}) => {
  const [currentSectionCouriers, setCurrentSectionCouriers] = useState([]);
  const [courier, setCourier] = useState(undefined);

  const [isShowEstimate, setIsShowEstimate] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const couriers =
      previewSection.find((section) => section.id === currentSection.id)
        ?.couriers || [];

    setCurrentSectionCouriers(couriers);
  }, [previewSection, currentSection]);

  useEffect(() => {
    if (isEditingCourier) {
      const currentCourierOpiton = couriersOptions
        .flatMap((group) => group.options)
        .find((opt) => opt.value === currentCourier.value);

      if (currentCourierOpiton) {
        setCourier(currentCourier);
      }
    }
  }, [currentCourier, isEditingCourier]);

  const handleUpdateCourier = (selectedOption) => {
    if (!isEditingCourier && Object.keys(selectedOption).length > 0) {
      dispatch(setSelectCourier(selectedOption));
    } else {
      setCurrentCourier(selectedOption);
      setPreviewSection((arr) =>
        arr.map((item) => {
          if (item.id === currentSection.id) {
            const isCourierExists = item.couriers.some(
              (courier) => courier.id === selectedOption.id
            );

            if (isCourierExists) {
              return item;
            }

            const updatedCourier = item.couriers.find(
              (courier) => courier.id === currentCourier.id
            );

            if (updatedCourier) {
              return {
                ...item,
                couriers: item.couriers.map((courier) =>
                  courier.id === currentCourier.id ? selectedOption : courier
                ),
                form: {
                  ...item.form,
                  shippingMethod: {
                    ...item.form.shippingMethod,
                    selectedCourier: selectedOption.value,
                  },
                },
              };
            }
          }

          return item;
        })
      );
    }
  };

  const handleChangeFormValue = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              form: {
                ...item.form,
                shippingMethod: {
                  ...item.form.shippingMethod,
                  [key]: value,
                },
              },
            }
          : item
      )
    );
  };

  const updatedCouriersOptions = couriersOptions.map((group) => ({
    ...group,
    options: group.options.map((option) => ({
      ...option,
      isDisabled: currentSectionCouriers.some(
        (courier) => courier.id === option.id
      ),
    })),
  }));

  return (
    <div>
      <SelectOptions
        label="Metode Pengiriman"
        placeholder="Pilih Kurir"
        options={updatedCouriersOptions}
        isOptionDisabled={(option) => option.isDisabled}
        onChange={(selectedOption) => {
          setCourier(selectedOption);
          handleUpdateCourier(selectedOption);
        }}
        value={courier}
        width="100"
      />

      <Checkbox
        checked={isShowEstimate}
        id={"isShowEstimate"}
        label="Perlihatkan Estimasi"
        onChange={(e) => {
          const { checked } = e.target;
          setIsShowEstimate(checked);
          handleChangeFormValue("isShowEstimate", checked);
        }}
      />
    </div>
  );
};

export default UpdateCourier;
