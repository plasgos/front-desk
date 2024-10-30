import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { aspectRatioVideoOptions } from "../../../../SelectOptions";
import Input from "../../../../common/Input";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";
import SelectOptions from "../../../../common/SelectOptions";
import Checkbox from "../../../../common/Checkbox";

const VideoControlSetting = ({
  setPreviewSection,
  currentSection,
  isEditingSection,
  sectionId,
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

  const [videoUrlValue] = useDebounce(videoUrl, 300);

  useEffect(() => {
    if (videoUrlValue !== currentSection?.content?.url) {
      handleChangeContent("url", videoUrlValue);
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
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((sectionFrame) =>
                sectionFrame.id === currentSection.id
                  ? {
                      ...sectionFrame,
                      content: {
                        ...sectionFrame.content,
                        [key]: value,
                      },
                    }
                  : sectionFrame
              ),
            }
          : section
      )
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

  return (
    <div className="pb-3">
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
          handleChangeContentValueWhenBlur(rotation, -90, 90, "rotation")
        }
      />
    </div>
  );
};

export default VideoControlSetting;
