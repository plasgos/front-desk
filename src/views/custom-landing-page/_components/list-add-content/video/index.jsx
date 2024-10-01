import {
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { createUniqueID } from "../../../../../lib/unique-id";
import AnimationControl from "../../common/AnimationControl";
import BackgroundTab from "../../common/BackgroundTab";
import Input from "../../common/Input";
import { aspectRatioVideoOptions } from "../../SelectOptions";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import SelectOptions from "../../common/SelectOptions";
import Checkbox from "../../common/Checkbox";

const Video = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
}) => {
  const [videoUrl, setVideoUrl] = useState(
    currentSection?.content?.url ||
      "https://www.youtube.com/watch?v=VK5G-lZzdeg"
  );

  const [width, setWidth] = useState(currentSection?.content?.width || 500);
  const [isMuted, setIsMuted] = useState(
    currentSection?.content?.isMuted || false
  );
  const [isAutoPlay, setIsAutoPlay] = useState(
    currentSection?.content?.isAutoPlay || false
  );
  const [isLoop, setIsLoop] = useState(currentSection?.content?.isLoop || true);
  const [isControl, setIsControl] = useState(
    currentSection?.content?.isControl || false
  );
  const [rotation, setRotation] = useState(
    currentSection?.content?.rotation || 0
  );
  const [ratio, setRatio] = useState(aspectRatioVideoOptions[1].options[1]);
  console.log("🚀 ~ ratio:", ratio);

  const [videoUrlValue] = useDebounce(videoUrl, 300);

  const [setting, setSetting] = useState({});

  const contentIdToCheck = isEditingSection ? currentSection.id : setting.id;

  useEffect(() => {
    if (videoUrlValue !== currentSection?.content?.url) {
      handleChangeContent(videoUrlValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoUrlValue]);

  useEffect(() => {
    if (isEditingSection) {
      const currentRationOption = aspectRatioVideoOptions.flatMap((group) =>
        group.options.find(
          (opt) => opt.value === currentSection?.content?.ratio
        )
      );

      if (currentRationOption) {
        setRatio(currentRationOption);
      }
    }
  }, [currentSection, isEditingSection]);

  const handleChangeContent = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) => {
        return String(item.id) === contentIdToCheck
          ? {
              ...item,
              content: {
                ...item.content,
                [key]: value,
              },
            }
          : item;
      })
    );
  };

  const handleChangeContentValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "width") {
      setWidth(newValue);
    } else if (key === "rotation") {
      setRotation(newValue);
    }
    handleChangeContent(key, newValue);
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "video",
      title: "Video",
      content: {
        url: "https://www.youtube.com/watch?v=YDhrMwYCtOY",
        width: 500,
        ratio: "56.25%",
        isAutoPlay: false,
        isLoop: true,
        isMuted: false,
        isControls: false,
        rotation: 0,
      },
      animation: {
        type: undefined,
        duration: 1,
        isReplay: false,
      },
      background: {
        bgType: undefined,
        bgColor: "",
        bgImage: "",
        blur: 0,
        opacity: 0,
        paddingY: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingType: "equal",
      },
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const handleCancel = () => {
    if (isEditingSection) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handleConfirm = () => {
    isShowContent(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center border-bottom p-2">
        <div>
          <CButton
            onClick={handleCancel}
            color="primary"
            variant="outline"
            className="mx-2"
          >
            Batal
          </CButton>

          <CButton onClick={handleConfirm} color="primary">
            Selesai
          </CButton>
        </div>
      </div>

      <CTabs activeTab="konten">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="konten">Video</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="animation">Animasi</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="background">Background</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent
          style={{
            height: 340,
            paddingRight: 5,
            overflowY: "auto",
            overflowX: "hidden",
          }}
          className="pt-3"
        >
          <CTabPane data-tab="konten">
            <div>
              <Input
                label="Video URL"
                value={videoUrl}
                onChange={(e) => {
                  const { value } = e.target;
                  setVideoUrl(value);
                }}
                type="text"
              />

              <InputRangeWithNumber
                label="Lebar"
                value={width}
                onChange={(newValue) => {
                  setWidth(newValue);
                  handleChangeContent("width", newValue);
                }}
                min={100}
                max={1200}
                onBlur={() =>
                  handleChangeContentValueWhenBlur(width, 100, 1200, "width")
                }
              />

              <SelectOptions
                label="Rasio Gambar"
                options={aspectRatioVideoOptions}
                onChange={(selectedOption) => {
                  setRatio(selectedOption);
                  handleChangeContent("ratio", selectedOption.value);
                }}
                value={ratio}
                width="50"
              />

              <div style={{ gap: 8 }} className="d-flex flex-column mb-2">
                <Checkbox
                  id="isControl"
                  checked={isControl}
                  onChange={(e) => {
                    const { checked } = e.target;
                    setIsControl(checked);
                    handleChangeContent("isControl", checked);
                  }}
                  label="Sembunyikan Kontrol"
                />

                <Checkbox
                  id="isAutoPlay"
                  checked={isAutoPlay}
                  onChange={(e) => {
                    const { checked } = e.target;
                    setIsAutoPlay(checked);
                    handleChangeContent("isAutoPlay", checked);
                  }}
                  label="Auto Play"
                />

                <Checkbox
                  id="isMuted"
                  checked={isMuted}
                  onChange={(e) => {
                    const { checked } = e.target;
                    setIsMuted(checked);
                    handleChangeContent("isMuted", checked);
                  }}
                  label="Tanpa Suara"
                />

                <Checkbox
                  id="isLoop"
                  checked={isLoop}
                  onChange={(e) => {
                    const { checked } = e.target;
                    setIsLoop(checked);
                    handleChangeContent("isLoop", checked);
                  }}
                  label="Loop"
                />
              </div>

              <InputRangeWithNumber
                label="Rotasi"
                value={rotation}
                onChange={(newValue) => {
                  setRotation(newValue);
                  handleChangeContent("rotation", newValue);
                }}
                min={-90}
                max={90}
                onBlur={() =>
                  handleChangeContentValueWhenBlur(
                    rotation,
                    -90,
                    90,
                    "rotation"
                  )
                }
              />
            </div>
          </CTabPane>

          <CTabPane className="p-1" data-tab="animation">
            <AnimationControl
              label="Teks"
              currentSection={isEditingSection ? currentSection : setting}
              setPreviewSection={setPreviewSection}
            />
          </CTabPane>

          <CTabPane
            style={{ overflowX: "hidden", height: "100%" }}
            className="p-1"
            data-tab="background"
          >
            <BackgroundTab
              currentSection={isEditingSection ? currentSection : setting}
              setPreviewSection={setPreviewSection}
              type={isEditingSection ? "edit" : "add"}
            />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
};

export default Video;
