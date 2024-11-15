import {
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
import Confirmation from "../../common/Confirmation";
import VideoControlSetting from "../video/VideoControlSetting";
import Animation from "./Animation";
import UpdateContent from "./UpdateContent";

const VideoText = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  isMultiColumn,
}) => {
  const [setting, setSetting] = useState({});

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);

    const id = isMultiColumn
      ? `multi-column-${uniqueId}`
      : `parent-${uniqueId}`;

    let payload = {
      id,
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
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

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
            overflowY: "auto",
            height: "calc(100vh - 110px)",
          }}
          className="p-3"
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

          <CTabPane
            style={{ height: "80vh" }}
            className="p-1"
            data-tab="animation"
          >
            <div className="mb-2">
              <AnimationControl
                label="Video"
                currentSection={isEditingSection ? currentSection : setting}
                setPreviewSection={setPreviewSection}
              />
            </div>

            <Animation
              label="Konten"
              currentSection={isEditingSection ? currentSection : setting}
              setPreviewSection={setPreviewSection}
            />
          </CTabPane>

          <CTabPane className="p-1" data-tab="background">
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
