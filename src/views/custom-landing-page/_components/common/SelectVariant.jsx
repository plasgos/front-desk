import { CButton, CCard } from "@coreui/react";
import React from "react";
import { FaCheck } from "react-icons/fa";

const SelectVariant = ({ optionVariant, selectedVariant, onChangeVariant }) => {
  return (
    <div>
      {optionVariant.map((group, index) => (
        <CCard key={index} className="my-3 p-2">
          <div
            style={{ fontSize: 12, fontStyle: "italic" }}
            className="mb-2 text "
          >
            {group.group} {/* Display the group label */}
          </div>
          <div style={{ gap: 10 }} className="d-flex align-items-center">
            {group.options.map((option, index) => (
              <CButton
                key={index}
                onClick={() => onChangeVariant(option)}
                color="primary"
                variant={selectedVariant === option ? "outline" : "ghost"}
              >
                <div className="d-flex align-items-center">
                  <div>{option.label}</div>
                  {selectedVariant === option && (
                    <FaCheck
                      size={16}
                      color="#13CC48"
                      style={{ marginLeft: 10 }}
                    />
                  )}
                </div>
              </CButton>
            ))}
          </div>
        </CCard>
      ))}
    </div>
  );
};

export default SelectVariant;
