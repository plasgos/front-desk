import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { createUniqueID } from "../../../../lib/unique-id";
import { PiTargetDuotone } from "react-icons/pi";
import { useDispatch } from "react-redux";
import {
  removeOptionScrollTarget,
  setOptionsScrollTarget,
} from "../../../../redux/modules/custom-landing-page/reducer";

const ScrollTarget = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  toggleAddContent,
}) => {
  const [name, setName] = useState("");
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [isCopiedAnchor, setIsCopiedAnchor] = useState(false);
  const [setting, setSetting] = useState({});
  const [hasAddedContent, setHasAddedContent] = useState(false);

  const dispatch = useDispatch();

  const generateRandomNumberString = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return randomNumber.toString();
  };

  useEffect(() => {
    setName(`Target-${generateRandomNumberString()}`);
  }, []);

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
        }, 1000);
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
        }, 1000);
      });
  };

  const handleNameChange = (value) => {
    setName(value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === String(setting.id)
          ? {
              ...item,
              content: {
                ...item.content,
                name: value,
                anchor: `#${value}`,
                link: baseURLandAnchor,
              },
            }
          : item
      )
    );
  };

  useEffect(() => {
    if (name && !hasAddedContent) {
      const handleAddContent = () => {
        let uniqueId = createUniqueID(previewSection);
        let payload = {
          id: uniqueId,
          name: "scroll-target",
          title: "Scrol Target",
          icon: <PiTargetDuotone size={24} />,
          content: {
            name,
            anchor: `#${name}`,
            link: baseURLandAnchor,
          },
        };

        setPreviewSection((prevSections) => [...prevSections, payload]);
        setSetting(payload);
        setHasAddedContent(true);
        dispatch(
          setOptionsScrollTarget({ id: uniqueId, value: name, label: name })
        );
      };

      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, hasAddedContent, dispatch]);

  const handelCancel = () => {
    toggleAddContent("");
    isShowContent(false);
    setPreviewSection((prevSections) =>
      prevSections.filter((section) => section.id !== setting.id)
    );
    dispatch(removeOptionScrollTarget(setting.id));
  };

  const handelConfirm = () => {
    toggleAddContent("");
    isShowContent(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center border-bottom p-2 mb-3">
        <div>
          <CButton
            onClick={handelCancel}
            color="primary"
            variant="outline"
            className="mx-2"
          >
            Batal
          </CButton>

          <CButton onClick={handelConfirm} color="primary">
            Selesai
          </CButton>
        </div>
      </div>

      <div className="p-2 rounded-lg w-100 border  bg-secondary mb-3 ">
        "Scroll Target" akan muncul di pilihan "Tipe link" pada tombol dan link
        dalam halaman ini`
      </div>

      <div className="d-flex align-items-center w-100 ">
        <div className="form-group w-100 mb-2">
          <label>Nama</label>
          <input
            value={name}
            onChange={(event) => handleNameChange(event.target.value)}
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
