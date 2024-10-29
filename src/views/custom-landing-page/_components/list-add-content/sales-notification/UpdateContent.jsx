import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import image from "../../../../../assets/profile.jpg";
import { createUniqueID } from "../../../../../lib/unique-id";

import { useDebounce } from "use-debounce";
import Input from "../../common/Input";

export const UpdateContent = ({
  idSection,
  currentContent,
  setPreviewSection,
  isEditingContent,
}) => {
  const [imageUrl, setImageUrl] = useState(
    isEditingContent ? currentContent?.image : image
  );
  const [name, setName] = useState(
    isEditingContent ? currentContent?.name : "Smith"
  );
  const [location, setLocation] = useState(
    isEditingContent ? currentContent?.location : "Jakarta , Indonesia"
  );

  const [time, setTime] = useState(
    isEditingContent ? currentContent?.time : "14:10"
  );

  const [nameValue] = useDebounce(name, 1000);
  const [locationValue] = useDebounce(location, 1000);
  const [timeValue] = useDebounce(time, 1000);

  const [setting, setSetting] = useState({});

  useEffect(() => {
    if (nameValue !== currentContent?.name) {
      handleChangeContent("name", nameValue);
    }

    if (locationValue !== currentContent?.location) {
      handleChangeContent("location", locationValue);
    }

    if (timeValue !== currentContent?.time) {
      handleChangeContent("time", timeValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameValue, locationValue, timeValue]);

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

  useEffect(() => {
    // Update tempSections setelah imageUrl berubah
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                const contentIdToCheck = isEditingContent
                  ? currentContent.id
                  : setting.id;

                return String(contentItem.id) === String(contentIdToCheck)
                  ? {
                      ...contentItem,
                      image: imageUrl,
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleChangeContent = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                const contentIdToCheck = isEditingContent
                  ? currentContent.id
                  : setting.id;

                return String(contentItem.id) === String(contentIdToCheck)
                  ? {
                      ...contentItem,
                      [key]: value,
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentContent?.content);
    let payload = {
      id: uniqueId,
      name: "Smith",
      location: "Bekasi , Indonesia",
      time: "15:00",
      image: image,
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
    if (!isEditingContent) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingContent]);

  return (
    <CCard
      style={{
        borderRadius: 0,
        border: 0,
      }}
    >
      <div style={{ zIndex: 1 }} className="w-100">
        <div className="mb-2">
          <div
            style={{
              backgroundColor: "#F5F5F5",
              width: "100%",
              overflow: "hidden",
            }}
            className="mx-auto mb-2"
          >
            <img
              style={{ objectFit: "contain", width: "100%", height: 100 }}
              src={imageUrl || image}
              alt="img"
            />
          </div>

          <CButton
            onClick={handleFileUpload}
            color="primary"
            variant="outline"
            className="btn-block"
          >
            Upload
          </CButton>
        </div>

        <Input
          label="Nama"
          value={name}
          onChange={(event) => {
            const { value } = event.target;
            setName(value);
          }}
          type="text"
        />

        <Input
          label="Lokasi"
          value={location}
          onChange={(event) => {
            const { value } = event.target;
            setLocation(value);
          }}
          type="text"
        />

        <Input
          label="Waktu"
          value={time}
          onChange={(event) => {
            const { value } = event.target;
            setTime(value);
          }}
          type="text"
        />
      </div>
    </CCard>
  );
};
