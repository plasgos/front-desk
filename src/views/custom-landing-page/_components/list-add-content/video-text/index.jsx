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
import { createUniqueID } from "../../../../../lib/unique-id";
import AnimationControl from "../../common/AnimationControl";
import BackgroundTab from "../../common/BackgroundTab";
import UpdateContent from "./UpdateContent";
import VideoControlSetting from "../video/VideoControlSetting";
import Animation from "./Animation";

const VideoText = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
}) => {
  const [setting, setSetting] = useState({});

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "video-text",
      title: "Video + Text",
      content: {
        url: "https://www.youtube.com/watch?v=YDhrMwYCtOY",
        width: 500,
        ratio: 16 / 9,
        isAutoPlay: false,
        isLoop: true,
        isMuted: false,
        isControls: false,
        rotation: 0,
        textShadow: undefined,
        fontSize: "tw-text-sm",
        textColor: "#151414",
        textAlign: "tw-text-left",
        text: "<div><strong>Pepatah Tua Mengatakan</strong></div><div>Kita tidak boleh selalu saja bergantung pada orang lain</div><div><br></div><div>Karena bayangan kita sendiri saja,</div><div><br></div><div>Akan meninggalkan kita saat kita berada di dalam kegelapan.</div>",
        animation: {
          type: undefined,
          duration: 1,
          isReplay: false,
        },
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
        direction: "to right",
        fromColor: "",
        toColor: "",
        isRevert: false,
        pattern: "",
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

      <CTabs activeTab="video">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="video">Video</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="content">Konten</CNavLink>
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
          <CTabPane data-tab="video">
            <VideoControlSetting
              setPreviewSection={setPreviewSection}
              currentSection={isEditingSection ? currentSection : setting}
              isEditingSection={isEditingSection}
            />
          </CTabPane>

          <CTabPane className="p-1" data-tab="content">
            <UpdateContent
              setPreviewSection={setPreviewSection}
              currentSection={isEditingSection ? currentSection : setting}
              isEditingContent={isEditingSection}
            />
          </CTabPane>

          <CTabPane className="p-1" data-tab="animation">
            <AnimationControl
              label="Video"
              currentSection={isEditingSection ? currentSection : setting}
              setPreviewSection={setPreviewSection}
            />

            <Animation
              label="Konten"
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

export default VideoText;
