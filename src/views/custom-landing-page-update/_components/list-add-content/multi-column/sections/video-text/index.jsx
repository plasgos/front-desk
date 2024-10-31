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
import UpdateContent from "./UpdateContent";
import VideoControlSetting from "../video/VideoControlSetting";
import Animation from "./Animation";
import AnimationControlMultiColumn from "../../common/AnimationControlMultiColumn";
import BackgroundTabMultiColumnContent from "../../common/BackgroundTabMultiColumnContent";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAddColumnSection,
  setIsEditingColumnSection,
  setIsEditingSection,
} from "../../../../../../../redux/modules/custom-landing-page/reducer";
import { cancelSectionMultiColumn } from "../../helper/cancelSectionMultiColumn";
import { addSectionMultiColumn } from "../../helper/addSectionMultiColumn";
import Confirmation from "../../../../common/Confirmation";

const VideoText = ({
  previewSection,
  setPreviewSection,
  sectionBeforeEdit,
  currentSection,
  sectionId,
  columnId,
}) => {
  const { isEditingSection, isAddColumnSection } = useSelector(
    (state) => state.customLandingPage.multiColumnSection
  );

  const dispatch = useDispatch();

  const [setting, setSetting] = useState({});

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "video-text",
      title: "Video + Text",
      content: {
        url: "https://www.youtube.com/watch?v=YDhrMwYCtOY",
        width: 250,
        ratio: "56.25%",
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

    addSectionMultiColumn(setPreviewSection, sectionId, columnId, payload);
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
      setPreviewSection([...sectionBeforeEdit]);
      dispatch(setIsEditingSection(false));
    } else {
      dispatch(setIsAddColumnSection(false));
      dispatch(setIsEditingColumnSection(false));

      cancelSectionMultiColumn(setPreviewSection, sectionId, columnId, setting);
    }
  };

  const handleConfirm = () => {
    if (isAddColumnSection) {
      dispatch(setIsAddColumnSection(false));
    } else if (isEditingSection) {
      dispatch(setIsEditingSection(false));
    } else {
      dispatch(setIsEditingColumnSection(false));
    }
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
          }}
          className="p-3"
        >
          <CTabPane data-tab="video">
            <VideoControlSetting
              setPreviewSection={setPreviewSection}
              currentSection={isEditingSection ? currentSection : setting}
              isEditingSection={isEditingSection}
              sectionId={sectionId}
              columnId={columnId}
            />
          </CTabPane>

          <CTabPane className="p-1" data-tab="content">
            <UpdateContent
              setPreviewSection={setPreviewSection}
              currentSection={isEditingSection ? currentSection : setting}
              isEditingContent={isEditingSection}
              sectionId={sectionId}
              columnId={columnId}
            />
          </CTabPane>

          <CTabPane
            style={{ height: "80vh" }}
            className="p-1"
            data-tab="animation"
          >
            <AnimationControlMultiColumn
              label="Video"
              currentSection={isEditingSection ? currentSection : setting}
              setPreviewSection={setPreviewSection}
              sectionId={sectionId}
              columnId={columnId}
            />

            <Animation
              label="Konten"
              currentSection={isEditingSection ? currentSection : setting}
              setPreviewSection={setPreviewSection}
              sectionId={sectionId}
              columnId={columnId}
            />
          </CTabPane>

          <CTabPane
            style={{ overflowX: "hidden", height: "100%" }}
            className="p-1"
            data-tab="background"
          >
            <BackgroundTabMultiColumnContent
              currentSection={isEditingSection ? currentSection : setting}
              setPreviewSection={setPreviewSection}
              type={isEditingSection ? "edit" : "add"}
              sectionId={sectionId}
              columnId={columnId}
            />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
};

export default VideoText;
