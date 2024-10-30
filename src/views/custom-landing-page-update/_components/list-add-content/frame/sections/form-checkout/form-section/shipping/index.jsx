import React, { useCallback, useState } from "react";
import { CCard, CCardBody } from "@coreui/react";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentCourierBeforeEdit,
  setIsAddCouriers,
  setIsEditCouriers,
} from "../../../../../../../../../redux/modules/custom-landing-page/reducer";
import UpdateCourier from "./UpdateCourier";
import { DraggableList } from "../../../../../../common/DraggableList";
import SelectOptions from "../../../../../../common/SelectOptions";
import Checkbox from "../../../../../../common/Checkbox";

const shippingMethodOptions = [
  { value: "required", label: "Harus Di Isi" },
  { value: "skip", label: "Lewati" },
];

const designOptions = [
  { value: "open", label: "Terbuka" },
  { value: "close", label: "Tertutup" },
];

const Shipping = ({
  previewSection,
  setPreviewSection,
  currentSection,
  sectionId,
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
    ) || designOptions[1]
  );

  const [isCustom, setIsCustom] = useState(
    currentSection?.form?.shippingMethod?.isCustom || false
  );

  const [currentCourier, setCurrentCourier] = useState({});

  const handleChangeFormValue = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((content) =>
                content.id === currentSection.id
                  ? {
                      ...content,
                      form: {
                        ...content.form,
                        shippingMethod: {
                          ...content.form.shippingMethod,
                          [key]: value,
                        },
                      },
                    }
                  : content
              ),
            }
          : section
      )
    );
  };

  const removeSection = useCallback(
    (sectionId, sectionFrameId, contentId) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              content: section.content.map((sectionFrame) =>
                sectionFrame.id === sectionFrameId
                  ? {
                      ...sectionFrame,
                      couriers: sectionFrame.couriers.filter(
                        (contentItem) => contentItem.id !== contentId
                      ),
                    }
                  : sectionFrame
              ),
            };
          }
          return section;
        })
      );
    },
    [setPreviewSection]
  );

  const moveSection = useCallback(
    (sectionId, sectionFrameId, dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              content: section.content.map((sectionFrame) => {
                if (sectionFrame.id === sectionFrameId) {
                  const updatedContent = [...sectionFrame.couriers];
                  const draggedItem = updatedContent[dragIndex];
                  updatedContent.splice(dragIndex, 1);
                  updatedContent.splice(hoverIndex, 0, draggedItem);

                  return { ...sectionFrame, couriers: updatedContent };
                }

                return sectionFrame;
              }),
            };
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
      if (section.id !== sectionId) return null;

      const selectedSectionFrame = section.content.find(
        (content) => content.id === currentSection.id
      );
      if (!selectedSectionFrame) return null;

      return selectedSectionFrame?.couriers.map((contentItem, contentIndex) => (
        <div key={contentItem.id}>
          <DraggableList
            key={contentItem.id || contentIndex}
            index={contentIndex}
            id={contentItem.id}
            showInfoText={contentItem.label}
            moveSection={(dragIndex, hoverIndex) =>
              moveSection(section.id, currentSection.id, dragIndex, hoverIndex)
            }
            editSection={() => editSection(contentItem)}
            removeSection={() =>
              removeSection(
                section.id,
                currentSection.id,
                contentItem.id,
                contentIndex
              )
            }
            hiddenFocus={true}
          />
        </div>
      ));
    },
    [sectionId, currentSection.id, moveSection, editSection, removeSection]
  );

  return (
    <>
      {isAddCouriers ? (
        <UpdateCourier
          sectionId={sectionId}
          previewSection={previewSection}
          currentSection={currentSection}
          setPreviewSection={setPreviewSection}
        />
      ) : isEditingCouriers ? (
        <UpdateCourier
          sectionId={sectionId}
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
                      .filter((section) => section.id === sectionId)
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
