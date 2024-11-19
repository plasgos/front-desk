import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { createUniqueID } from "../../../../../lib/unique-id";
import {
  removeOptionScrollTarget,
  setOptionsScrollTarget,
} from "../../../../../redux/modules/custom-landing-page/reducer";
import { useDebounce } from "use-debounce";
import Confirmation from "../../common/Confirmation";

const ScrollTarget = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  isMultiColumn,
  setPreviewFloatingSection,
}) => {
  const [name, setName] = useState(currentSection?.content?.name || "");
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [isCopiedAnchor, setIsCopiedAnchor] = useState(false);
  const [setting, setSetting] = useState({});
  const [hasAddedContent, setHasAddedContent] = useState(false);

  const [nameValue] = useDebounce(name, 300);

  const dispatch = useDispatch();

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

  const contentIdToCheck = isEditingSection ? currentSection.id : setting.id;

  const handleNameChange = (value) => {
    setPreviewSection((arr) =>
      arr.map((item) => {
        return String(item.id) === contentIdToCheck
          ? {
              ...item,
              content: {
                ...item.content,
                name: value,
                anchor: `#${value}`,
                link: baseURLandAnchor,
              },
            }
          : item;
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

          const id = isMultiColumn
            ? `multi-column-${uniqueId}`
            : `parent-${uniqueId}`;
          let payload = {
            id,
            name: "scroll-target",
            title: "Scrol Target",
            content: {
              name,
              anchor: `#${name}`,
              link: baseURLandAnchor,
            },
          };

          setPreviewSection((prevSections) => [...prevSections, payload]);
          setSetting(payload);
          setHasAddedContent(true);
        };

        handleAddContent();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, hasAddedContent, dispatch, isEditingSection]);

  const handleCancel = () => {
    if (isEditingSection) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
      dispatch(removeOptionScrollTarget(setting.id));
    }
  };

  const handleConfirm = async () => {
    await dispatch(
      setOptionsScrollTarget({
        id: contentIdToCheck,
        value: name,
        label: name,
      })
    );

    if (isEditingSection) {
      const updateScrollTarget = (sections) =>
        sections.map((section) => {
          if (Array.isArray(section.content)) {
            return {
              ...section,
              content: section.content.map((contentItem) => {
                const { target } = contentItem || {};

                if (target?.scrollTarget?.id === contentIdToCheck) {
                  return {
                    ...contentItem,
                    target: {
                      scrollTarget: {
                        id: contentIdToCheck,
                        value: name,
                        label: name,
                      },
                    },
                  };
                }
                return contentItem;
              }),
            };
          }
          return section;
        });

      setPreviewSection((section) => updateScrollTarget(section));
      setPreviewFloatingSection((section) => updateScrollTarget(section));
    }

    isShowContent(false);
  };

  return (
    <div>
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

      <div className="p-3">
        <div className="p-2 rounded-lg w-100 border  bg-secondary mb-3 ">
          "Scroll Target" akan muncul di pilihan "Tipe link" pada tombol dan
          link dalam halaman ini`
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
    </div>
  );
};

export default ScrollTarget;
