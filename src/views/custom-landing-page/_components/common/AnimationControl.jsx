import { CButton } from "@coreui/react";
import React, { useState } from "react";
import SelectOptions from "./SelectOptions";

const animationTypeOptions = [
  { value: undefined, label: "Tidak Ada" },
  { value: "fadeIn", label: "Fade In" },
  { value: "fadeInUp", label: "Fade In Up" },
  { value: "fadeInDown", label: "Fade In Down" },
  { value: "fadeInLeft", label: "Fade In Left" },
  { value: "fadeInRight", label: "Fade In Right" },
  { value: "zoomIn", label: "Zoom In" },
  { value: "slideInUp", label: "Slide In Up" },
  { value: "slideInDown", label: "Slide In Down" },
  { value: "slideInLeft", label: "Slide In Left" },
  { value: "slideInRight", label: "Slide In Right" },
  { value: "bounceIn", label: "Bounce In" },
  { value: "flipInX", label: "Flip In X" },
  { value: "flipInY", label: "Flip In Y" },
];

const durationOptions = [
  {
    label: "Cepat",
    options: [
      { value: 0.3, label: "0.3s" },
      { value: 0.4, label: "0.4s" },
      { value: 0.5, label: "0.5s" },
      { value: 0.6, label: "0.6s" },
      { value: 0.7, label: "0.7s" },
      { value: 0.8, label: "0.8s" },
      { value: 0.9, label: "0.9s" },
    ],
  },
  {
    label: "Lambat",
    options: [
      { value: 1, label: "1s" },
      { value: 1.3, label: "1.3s" },
      { value: 1.6, label: "1.6s" },
      { value: 2, label: "2s" },
    ],
  },
];

const AnimationControl = ({ label, currentSection, setPreviewSection }) => {
  const [typeAnimation, setTypeAnimation] = useState(
    animationTypeOptions.find(
      (opt) => opt.value === currentSection?.animation?.type
    ) || animationTypeOptions[0]
  );

  const [duration, setDuration] = useState(
    durationOptions
      .flatMap((group) => group.options)
      .find((opt) => opt?.value === currentSection?.animation?.duration) ||
      durationOptions[1]?.options[0]
  );

  const [replay, setReplay] = useState(0);

  const handelChangeAnimation = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        item.id === currentSection.id
          ? {
              ...item,
              animation: {
                ...item.animation,
                [key]: value,
              },
            }
          : item
      )
    );
  };

  const handleReplay = () => {
    setReplay((prev) => prev + 1);

    setPreviewSection((arr) =>
      arr.map((item) =>
        item.id === currentSection.id
          ? {
              ...item,
              animation: {
                ...item.animation,
                replay: replay,
              },
            }
          : item
      )
    );
  };

  return (
    <div>
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

export default AnimationControl;
