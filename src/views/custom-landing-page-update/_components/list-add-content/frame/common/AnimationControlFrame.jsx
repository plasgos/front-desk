import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import SelectOptions from "../../../common/SelectOptions";

const animationTypeOptions = [
  { value: undefined, label: "Tidak Ada" },
  { value: "animate__fadeIn", label: "Fade In" },
  { value: "animate__fadeInUp", label: "Fade In Up" },
  { value: "fadeInDown", label: "Fade In Down" },
  { value: "fadeInLeft", label: "Fade In Left" },
  { value: "fadeInRight", label: "Fade In Right" },
  { value: "animate__bounceIn", label: "Bounce In" },
  { value: "animate__flipInX", label: "Flip In X" },
  { value: "animate__flipInY", label: "Flip In Y" },
  { value: "animate__zoomIn", label: "Zoom In" },
  { value: "animate__lightSpeedInRight", label: "SpeedInRight" },
  { value: "animate__lightSpeedInLeft", label: "SpeedInLeft" },
];

const durationOptions = [
  {
    label: "Cepat",
    options: [
      { value: 0.3, label: "0.3s" },
      { value: 0.6, label: "0.6s" },
    ],
  },
  {
    label: "Lambat",
    options: [
      { value: 1, label: "1s" },
      { value: 2, label: "2s" },
      { value: 3, label: "3s" },
    ],
  },
];

const AnimationControlFrame = ({
  sectionId,
  label,
  currentSection,
  currentContent,
  setPreviewSection,
  isForContent,
}) => {
  const [typeAnimation, setTypeAnimation] = useState(animationTypeOptions[0]);

  const [duration, setDuration] = useState(durationOptions[1]?.options[0]);

  const setAnimationAndDuration = (source) => {
    const currentAnimationType = animationTypeOptions.find(
      (opt) => opt.value === source?.animation?.type
    );

    if (currentAnimationType) {
      setTypeAnimation(currentAnimationType);
    }

    const currentDuration = durationOptions
      .flatMap((group) => group.options)
      .find((opt) => opt?.value === source?.animation?.duration);

    if (currentDuration) {
      setDuration(currentDuration);
    }
  };

  useEffect(() => {
    if (isForContent) {
      setAnimationAndDuration(currentContent);
    } else {
      setAnimationAndDuration(currentSection);
    }
  }, [currentSection, currentContent, isForContent]);

  const [isReplay, setIsReplay] = useState(true);

  const setValueAnimation = (newValue) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((content) =>
                content.id === currentSection.id
                  ? {
                      ...content,
                      animation: {
                        ...content.animation,
                        ...newValue,
                      },
                    }
                  : content
              ),
            }
          : section
      )
    );
  };

  const setValueAnimationForContent = (newValue) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((content) =>
                content.id === currentSection.id
                  ? {
                      ...content,
                      content: content.content.map((contentItem) =>
                        contentItem.id === currentContent.id
                          ? {
                              ...contentItem,
                              animation: {
                                ...contentItem.animation,
                                ...newValue,
                              },
                            }
                          : contentItem
                      ),
                    }
                  : content
              ),
            }
          : section
      )
    );
  };

  const handelChangeAnimation = (key, value) => {
    if (isForContent) {
      const newValue = {
        [key]: value,
      };
      setValueAnimationForContent(newValue);
    } else {
      const newValue = {
        [key]: value,
      };
      setValueAnimation(newValue);
    }
  };

  const handleReplay = () => {
    setIsReplay((prev) => !prev);

    if (isForContent) {
      const newValue = {
        isReplay,
      };
      setValueAnimationForContent(newValue);
    } else {
      const newValue = {
        isReplay,
      };
      setValueAnimation(newValue);
    }
  };

  return (
    <div className="mb-3">
      <h5>{label}</h5>

      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <SelectOptions
          label="Tipe"
          options={animationTypeOptions}
          onChange={(selectedOption) => {
            setTypeAnimation(selectedOption);
            handelChangeAnimation("type", selectedOption.value);
          }}
          value={typeAnimation}
          width="50"
        />

        {typeAnimation.value && (
          <SelectOptions
            label="Durasi"
            options={durationOptions}
            onChange={(selectedOption) => {
              setDuration(selectedOption);
              handelChangeAnimation("duration", selectedOption.value);
            }}
            value={duration}
            width="50"
          />
        )}
      </div>

      {typeAnimation.value && (
        <CButton onClick={handleReplay} color="primary" variant="outline">
          Replay
        </CButton>
      )}
    </div>
  );
};

export default AnimationControlFrame;
