import { CButton, CCard } from "@coreui/react";
import React from "react";
import { FaCheck } from "react-icons/fa";

const SelectVariant = ({
  optionVariant,
  selectedVariant,
  onChangeVariant,
  verticalList,
}) => {
  return (
    <div className="px-3">
      {optionVariant.map((group, groupIndex) => (
        <CCard key={groupIndex} className="my-3 p-2">
          <div
            style={{ fontSize: 12, fontStyle: "italic" }}
            className="mb-2 text "
          >
            {group.group} {/* Display the group label */}
          </div>
          <div
            style={{ gap: 10 }}
            className={` ${
              verticalList ? "d-flex flex-column" : " d-flex align-items-center"
            }`}
          >
            {group.options.map((option, optionIndex) => {
              const isSelected =
                selectedVariant?.value === option.value &&
                selectedVariant?.group === group.group;

              return (
                <CButton
                  style={{ whiteSpace: "nowrap" }}
                  key={optionIndex}
                  onClick={() => onChangeVariant(group.group, option)}
                  color={isSelected ? "primary" : "secondary"}
                  variant={isSelected ? "outline" : "ghost"}
                >
                  <div className="d-flex align-items-center">
                    <div>{option.label}</div>
                    {isSelected && (
                      <FaCheck
                        size={16}
                        color="#13CC48"
                        style={{ marginLeft: 8 }}
                      />
                    )}
                  </div>
                </CButton>
              );
            })}
          </div>
        </CCard>
      ))}
    </div>
  );
};

export default SelectVariant;
