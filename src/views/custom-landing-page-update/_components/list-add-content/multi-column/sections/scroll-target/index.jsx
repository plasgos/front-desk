import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useDebounce } from "use-debounce";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import {
  removeOptionScrollTarget,
  setIsAddColumnSection,
  setIsEditingColumnSection,
  setIsEditingSection,
  setOptionsScrollTarget,
} from "../../../../../../../redux/modules/custom-landing-page/reducer";
import { cancelSectionMultiColumn } from "../../helper/cancelSectionMultiColumn";
import { addSectionMultiColumn } from "../../helper/addSectionMultiColumn";
import Confirmation from "../../../../common/Confirmation";

const ScrollTarget = ({
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

  const [name, setName] = useState(currentSection?.content?.name || "");
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [isCopiedAnchor, setIsCopiedAnchor] = useState(false);
  const [setting, setSetting] = useState({});
  const [hasAddedContent, setHasAddedContent] = useState(false);

  const [nameValue] = useDebounce(name, 300);

  const generateRandomNumberString = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return randomNumber.toString();
  };

  useEffect(() => {
    if (!isEditingSection) {
      setName(`Target-${generateRandomNumberString()}`);
    }
  }, [isEditingSection]);

  const copyToClipboardAnchor = () => {
    navigator.clipboard
      .writeText(`#${name}`)
      .then(() => {
        setIsCopiedAnchor(true);
      })
      .catch((err) => {
        console.error("Gagal menyalin: ", err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsCopiedAnchor(false);
        }, 300);
      });
  };

  const baseURLandAnchor = `${window.location.protocol}//${window.location.host}#${name}`;

  const copyToClipboardLink = () => {
    navigator.clipboard
      .writeText(baseURLandAnchor)
      .then(() => {
        setIsCopiedLink(true);
      })
      .catch((err) => {
        console.error("Gagal menyalin: ", err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsCopiedLink(false);
        }, 300);
      });
  };

  const handleNameChange = (value) => {
    setPreviewSection((arr) =>
      arr.map((section) => {
        return String(section.id) === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) => {
                        const contentIdToCheck = isEditingSection
                          ? currentSection.id
                          : setting.id;
                        return content.id === contentIdToCheck
                          ? {
                              ...content,
                              content: {
                                ...content.content,
                                name: value,
                                anchor: `#${value}`,
                                link: baseURLandAnchor,
                              },
                            }
                          : content;
                      }),
                    }
                  : column
              ),
            }
          : section;
      })
    );
  };

  useEffect(() => {
    if (nameValue !== currentSection?.content?.name) {
      handleNameChange(nameValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameValue]);

  useEffect(() => {
    if (!isEditingSection) {
      if (name && !hasAddedContent) {
        const handleAddContent = () => {
          let uniqueId = createUniqueID(previewSection);
          let payload = {
            id: uniqueId,
            name: "scroll-target",
            title: "Scrol Target",
            content: {
              name,
              anchor: `#${name}`,
              link: baseURLandAnchor,
            },
          };

          addSectionMultiColumn(
            setPreviewSection,
            sectionId,
            columnId,
            payload
          );

          setSetting(payload);
          setHasAddedContent(true);
          dispatch(
            setOptionsScrollTarget({ id: uniqueId, value: name, label: name })
          );
        };

        handleAddContent();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, hasAddedContent, dispatch, isEditingSection]);

  const handleCancel = () => {
    if (isEditingSection) {
      setPreviewSection([...sectionBeforeEdit]);
      dispatch(setIsEditingSection(false));
    } else {
      dispatch(setIsAddColumnSection(false));
      dispatch(setIsEditingColumnSection(false));

      cancelSectionMultiColumn(setPreviewSection, sectionId, columnId, setting);

      dispatch(removeOptionScrollTarget(setting.id));
    }
  };

  const handleConfirm = async () => {
    if (isAddColumnSection) {
      dispatch(setIsAddColumnSection(false));
    } else if (isEditingSection) {
      await dispatch(
        setOptionsScrollTarget({
          id: currentSection.id,
          value: name,
          label: name,
        })
      );
      dispatch(setIsEditingSection(false));
    } else {
      dispatch(setIsEditingColumnSection(false));
    }
  };

  return (
    <div>
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

      <div className="p-2 rounded-lg w-100 border  bg-secondary mb-3 ">
        "Scroll Target" akan muncul di pilihan "Tipe link" pada tombol dan link
        dalam halaman ini`
      </div>

      <div className="d-flex align-items-center w-100 ">
        <div className="form-group w-100 mb-2">
          <label>Nama</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            className="form-control"
          />
        </div>
      </div>

      <div className="form-group w-100 mb-2">
        <label>Anchor</label>
        <div className="d-flex align-items-center w-100  ">
          <input
            readOnly
            value={`#${name}`}
            type="text"
            className="form-control"
          />
          <CButton
            style={{ whiteSpace: "nowrap" }}
            onClick={copyToClipboardAnchor}
            color="primary"
            variant="outline"
            className="mx-2"
          >
            {isCopiedAnchor ? "Sudah Tercopy" : "Copy"}
          </CButton>
        </div>
      </div>

      <div className="form-group w-100 mb-2">
        <label>Link</label>

        <div className="d-flex align-items-center w-100 ">
          <input
            readOnly
            value={baseURLandAnchor}
            type="text"
            className="form-control"
          />
          <CButton
            style={{ whiteSpace: "nowrap" }}
            onClick={copyToClipboardLink}
            color="primary"
            variant="outline"
            className="mx-2"
          >
            {isCopiedLink ? "Sudah Tercopy" : "Copy"}
          </CButton>
        </div>
      </div>
    </div>
  );
};

export default ScrollTarget;
