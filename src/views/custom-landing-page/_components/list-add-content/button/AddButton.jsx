import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { useSelector } from "react-redux";
import Select from "react-select";
import { createUniqueID } from "../../../../../lib/unique-id";
import { customStyles } from "./ListButtonControl";

const variantButton = [
  { value: "fill", label: "Fill" },
  { value: "ghost", label: "Ghost" },
];

const AddButton = ({ idSection, sections, setPreviewSection }) => {
  const { optionsScrollTarget, optionsTarget } = useSelector(
    (state) => state.customLandingPage
  );
  const [title, setTitle] = useState("Click Me");
  const [setting, setSetting] = useState({});
  const [selectedVariantButton, setSelectedVariantButton] = useState(
    variantButton[0]
  );

  const [showColorPickerButton, setShowColorPickerButton] = useState(false);
  const [showColorPickerText, setShowColorPickertext] = useState(false);

  const [selectedColorButton, setSelectedColorButton] = useState("#2196F3");
  const [selectedColorText, setSelectedColorText] = useState("#FFFFFF");
  const handleChangeVariantButton = (selectedOption) => {
    setSelectedVariantButton(selectedOption);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        style: {
                          ...contentItem.content.style,
                          variant: selectedOption.value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleChangeColorButton = (color) => {
    setSelectedColorButton(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        style: {
                          ...contentItem.content.style,
                          btnColor: color,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleChangeColorText = (color) => {
    setSelectedColorText(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        style: {
                          ...contentItem.content.style,
                          textColor: color,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(sections);
    let payload = {
      id: uniqueId,
      content: {
        title,
        style: {
          variant: selectedVariantButton.value,
          btnColor: selectedColorButton,
          textColor: selectedColorText,
        },
      },
      target: {},
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === idSection
          ? { ...section, content: [...section.content, payload] }
          : section
      )
    );

    setSetting(payload);
  };

  useEffect(() => {
    handleAddContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const popover = {
    position: "absolute",
    zIndex: "2",
    bottom: "8px",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <div className="w-50">
          <div className="mb-1" style={{ fontFamily: "Arial" }}>
            Tombol
          </div>
          <div
            onClick={() => setShowColorPickerButton(!showColorPickerButton)}
            style={{
              width: 35,
              height: 35,
              backgroundColor: selectedColorButton,
              cursor: "pointer",
            }}
            className="rounded border"
          />
          {showColorPickerButton && (
            <div style={popover}>
              <div
                style={cover}
                onClick={() => setShowColorPickerButton(false)}
              />
              <ChromePicker
                color={selectedColorButton}
                Title
                onChange={(e) => handleChangeColorButton(e.hex)}
              />
            </div>
          )}
        </div>

        <div className="d-flex align-items-center w-50">
          <div
            onClick={() => setShowColorPickertext(!showColorPickerText)}
            style={{
              width: 35,
              height: 35,
              backgroundColor: selectedColorText,
              cursor: "pointer",
            }}
            className="rounded border"
          />
          <div className="mb-1 ml-2" style={{ fontFamily: "Arial" }}>
            Teks
          </div>
          {showColorPickerText && (
            <div style={popover}>
              <div
                style={cover}
                onClick={() => setShowColorPickertext(false)}
              />
              <ChromePicker
                color={selectedColorText}
                Title
                onChange={(e) => handleChangeColorText(e.hex)}
              />
            </div>
          )}
        </div>
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <div className="form-group w-50 ">
          <label>Desain</label>
          <Select
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#FED4C6",
                // Set the color when focused
              },
            })}
            classNames={{
              control: (state) =>
                state.isFocused ? "rounded  border-primary" : "rounded",
            }}
            options={variantButton}
            styles={customStyles}
            onChange={handleChangeVariantButton}
            isSearchable={false}
            value={selectedVariantButton}
          />
        </div>
        {/* <div className="form-group w-50 ">
          <label>Jarak</label>
          <Select
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#FED4C6",
                // Set the color when focused
              },
            })}
            classNames={{
              control: (state) =>
                state.isFocused ? "rounded  border-primary" : "rounded",
            }}
            options={distanceOptions}
            styles={customStyles}
            onChange={handleChangeDistance}
            isSearchable={false}
            value={selectedDistance}
            defaultValue={{
              value: 2,
              label: "2",
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default AddButton;
