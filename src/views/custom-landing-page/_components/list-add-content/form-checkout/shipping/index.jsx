import React, { useCallback, useEffect, useState } from "react";
import SelectOptions from "../../../common/SelectOptions";
import Checkbox from "../../../common/Checkbox";
import { CCard, CCardBody } from "@coreui/react";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAddCouriers,
  setIsEditCouriers,
} from "../../../../../../redux/modules/custom-landing-page/reducer";
import { DraggableList } from "../../../common/DraggableList";

const shippingMethodOptions = [
  { value: "required", label: "Harus Di Isi" },
  { value: "skip", label: "Lewati" },
];

const designOptions = [
  { value: "open", label: "Terbuka" },
  { value: "close", label: "Tertutup" },
];

const couriersOptions = [
  {
    label: "Kurir Indonesia",
    options: [
      { id: "1", value: "jne", label: "JNE" },
      { id: "2", value: "sicepat", label: "Sicepat" },
      { id: "3", value: "ninja", label: "Ninja" },
      { id: "4", value: "j&t", label: "J&T" },
      { id: "5", value: "sap", label: "SAP" },
      { id: "6", value: "anteraja", label: "Anteraja" },
      { id: "7", value: "idexpress", label: "ID Express" },
    ],
  },
];

const Shipping = ({
  currentSection,
  setPreviewSection,
  previewSection,
  isEditingSection,
}) => {
  const { isAddCouriers, isEditingCouriers } = useSelector(
    (state) => state.customLandingPage
  );

  const dispatch = useDispatch();

  const [shippingMethod, setShippingMethod] = useState(
    shippingMethodOptions.find(
      (opt) =>
        opt.value === currentSection?.form?.shippingMethod?.shippingMethodOption
    ) || shippingMethodOptions[0]
  );

  const [design, setDesign] = useState(
    designOptions.find(
      (opt) => opt.value === currentSection?.form?.shippingMethod?.design
    ) || designOptions[0]
  );

  const [isCustom, setIsCustom] = useState(
    currentSection?.form?.shippingMethod?.isCustom || false
  );

  const [selectedCourier, setSelectedCourier] = useState(
    couriersOptions
      .flatMap((group) => group.options)
      .find(
        (opt) =>
          opt.value === currentSection?.form?.shippingMethod?.selectedCourier
      ) || couriersOptions[0].options[0]
  );

  const [isShowEstimate, setIsShowEstimate] = useState(true);

  const [currentCourier, setCurrentCourier] = useState({});
  const [currentCourierBeforeEdit, setCurrentCourierBeforeEdit] = useState([]);

  const handleSelectCourier = (selectedOption) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              couriers: [...item.couriers, selectedOption],
            }
          : item
      )
    );
  };

  const handleChangeFormValue = (key, selectedOption) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              form: {
                ...item.form,
                shippingMethod: {
                  ...item.form.shippingMethod,
                },
              },
            }
          : item
      )
    );
  };

  const removeSection = useCallback(
    (sectionId, contentIndex) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              couriers: section.couriers.filter((_, i) => i !== contentIndex),
            };
          }
          return section;
        })
      );
    },
    [setPreviewSection]
  );
  const moveSection = useCallback(
    (name, dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.name === name) {
            const updatedContent = [...section.couriers];
            const draggedItem = updatedContent[dragIndex];
            updatedContent.splice(dragIndex, 1);
            updatedContent.splice(hoverIndex, 0, draggedItem);
            return { ...section, couriers: updatedContent };
          }
          return section;
        });
      });

      return () => {};
    },
    [setPreviewSection]
  );

  const editSection = useCallback(
    (section) => {
      setCurrentCourierBeforeEdit([...previewSection]);
      setCurrentCourier(section);
      setIsEditCouriers(true);
    },
    [previewSection]
  );

  console.log(currentSection.id);

  const handleAddCourier = () => {
    let payload = {
      id: "1",
      value: "jne",
      label: "JNE",
    };

    console.log("first", currentSection.id);

    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === currentSection.id
          ? { ...section, couriers: [...section.couriers, payload] }
          : section
      )
    );
  };

  useEffect(() => {
    // if (!isEditingSection && isAddCouriers) {
    //   console.log("RUNNNN");
    // }

    console.log("RUNNNN");

    handleAddCourier();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section?.couriers?.map((contentItem, contentIndex) => (
            <DraggableList
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              showInfoText={contentItem.label}
              moveSection={(dragIndex, hoverIndex) =>
                moveSection(section.name, dragIndex, hoverIndex)
              }
              editSection={() => editSection(contentItem)}
              removeSection={() => removeSection(section.id, contentIndex)}
            />
          ))}
        </div>
      );
    },
    [editSection, moveSection, removeSection]
  );

  return (
    <>
      {isAddCouriers ? (
        <div>
          <SelectOptions
            label="Metode Pengiriman"
            options={couriersOptions}
            onChange={(selectedOption) => {
              setSelectedCourier(selectedOption);
              handleSelectCourier(selectedOption);
            }}
            value={selectedCourier}
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
      ) : isEditingCouriers ? null : (
        <div className="my-3">
          <SelectOptions
            label="Metode Pengiriman"
            options={shippingMethodOptions}
            onChange={(selectedOption) => {
              setShippingMethod(selectedOption);
              handleChangeFormValue(
                "shippingMethodOption",
                selectedOption.value
              );
            }}
            value={shippingMethod}
            width="100"
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

          <Checkbox
            checked={isCustom}
            id={"isCustom"}
            label="Kustomisasi"
            onChange={(e) => {
              const { checked } = e.target;
              setIsCustom(checked);
              handleChangeFormValue("isCustom", checked);
            }}
          />

          {isCustom && (
            <div className="my-3">
              {!isAddCouriers && !isEditingCouriers && (
                <>
                  <div>
                    {previewSection
                      .filter((section) => section.id === currentSection.id)
                      .map((section, i) => renderSection(section, i))}
                  </div>
                  <CCard
                    style={{ cursor: "pointer" }}
                    onClick={() => dispatch(setIsAddCouriers(true))}
                  >
                    <CCardBody className="p-1">
                      <div className="d-flex align-items-center ">
                        <IoAdd
                          style={{
                            cursor: "pointer",
                            margin: "0px 10px 0px 6px",
                          }}
                          size={18}
                        />

                        <div>Tambah Konten</div>
                      </div>
                    </CCardBody>
                  </CCard>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Shipping;
