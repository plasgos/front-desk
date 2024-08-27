import React, { useEffect } from "react";
import { useFontAwesomeIconPack } from "../../../../../hooks/useFontAwesomePack";
import IconPicker from "../../common/IconPicker";
import PlainSimple from "./plain/Simple";
import KapsulSimple from "./kapsul/KapsulSimple";
import AccordionThick from "./accordion/AccordionThick";
import AccordionClean from "./accordion/AccordionClean";

const DesignTabTry = ({
  previewSection,
  currentSection,
  setPreviewSection,
  isEditingSection = false,
  setIconBeforeEdit,
  variant,
  isListIconVisible,
  setIsListIconVisible,
  imageUrl,
  setImageUrl,
  icon,
  setIcon,
  setPreviousIcon,
}) => {
  console.log("🚀 ~ currentSection:", currentSection);
  const iconPack = useFontAwesomeIconPack();
  useEffect(() => {
    if (imageUrl !== "") {
      // Update tempSections hanya jika imageUrl bukan string kosong
      setIcon(null);
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                variant: {
                  ...item.variant,
                  style: {
                    ...item.variant.style,
                    image: imageUrl,
                    icon: "",
                  },
                },
              }
            : item
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImageUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    };
  };

  const handleSearchIcon = (prevIcon) => {
    setIconBeforeEdit([...previewSection]);
    setPreviousIcon(prevIcon);
    setIsListIconVisible(true);
  };

  useEffect(() => {
    if (iconPack) {
      const iconToSet = !isEditingSection
        ? currentSection?.iconStyle?.icon || "plus"
        : currentSection?.iconStyle?.icon;
      const iconExists = iconPack.some((icon) => icon.iconName === iconToSet);

      if (iconExists) {
        setIcon(iconToSet);
      } else {
        console.warn(`Icon ${iconToSet} not found in iconPack`);
        setIcon(null); // Atau set ke ikon default yang pasti ada
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconPack, currentSection, isEditingSection]);

  const handleChangeStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              variant: {
                ...item.variant,
                style: {
                  ...item.variant.style,
                  [key]: value,
                },
              },
            }
          : item
      )
    );
  };

  const handleChangeIcon = (value) => {
    setIcon(value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              variant: {
                ...item.variant,
                style: {
                  ...item.variant.style,
                  icon: value,
                  image: "",
                },
              },
            }
          : item
      )
    );
  };

  return (
    <div>
      {isListIconVisible ? (
        <IconPicker
          value={icon}
          onChange={(value) => handleChangeIcon(value)}
        />
      ) : (
        <div>
          {variant === "1" ? (
            <PlainSimple
              currentSection={currentSection}
              handleChangeStyle={handleChangeStyle}
            />
          ) : variant === "2" ? (
            <KapsulSimple
              currentSection={currentSection}
              handleChangeStyle={handleChangeStyle}
            />
          ) : variant === "3" ? (
            <AccordionThick
              currentSection={currentSection}
              handleChangeStyle={handleChangeStyle}
              handleFileUpload={handleFileUpload}
              handleSearchIcon={handleSearchIcon}
              icon={icon}
              imageUrl={imageUrl}
              iconPack={iconPack}
            />
          ) : variant === "4" ? (
            <AccordionClean
              currentSection={currentSection}
              handleChangeStyle={handleChangeStyle}
              handleFileUpload={handleFileUpload}
              handleSearchIcon={handleSearchIcon}
              icon={icon}
              imageUrl={imageUrl}
              iconPack={iconPack}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default DesignTabTry;
