import React, { useCallback, useState } from "react";
import { CCard, CCardBody } from "@coreui/react";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentCourierBeforeEdit,
  setIsAddCouriers,
  setIsEditCouriers,
} from "../../../../../../../redux/modules/custom-landing-page/reducer";
import { DraggableList } from "../../../../common/DraggableList";
import SelectOptions from "../../../../common/SelectOptions";
import Checkbox from "../../../../common/Checkbox";
import UpdateCourier from "./UpdateCourier";

const shippingMethodOptions = [
  { value: "required", label: "Harus Di Isi" },
  { value: "skip", label: "Lewati" },
];

const designOptions = [
  { value: "open", label: "Terbuka" },
  { value: "close", label: "Tertutup" },
];

const Shipping = ({ previewSection, setPreviewSection, currentSection }) => {
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
    ) || designOptions[1]
  );

  const [isCustom, setIsCustom] = useState(
    currentSection?.form?.shippingMethod?.isCustom || false
  );

  const [currentCourier, setCurrentCourier] = useState({});

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
      dispatch(setCurrentCourierBeforeEdit([...previewSection]));
      setCurrentCourier(section);
      dispatch(setIsEditCouriers(true));
    },
    [dispatch, previewSection]
  );

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
                moveSection(section.id, dragIndex, hoverIndex)
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
        <UpdateCourier
          previewSection={previewSection}
          currentSection={currentSection}
          setPreviewSection={setPreviewSection}
        />
      ) : isEditingCouriers ? (
        <UpdateCourier
          previewSection={previewSection}
          currentSection={currentSection}
          currentCourier={currentCourier}
          setCurrentCourier={setCurrentCourier}
          setPreviewSection={setPreviewSection}
          isEditingCourier={true}
        />
      ) : (
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

                        <div>Tambah Kurir</div>
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
