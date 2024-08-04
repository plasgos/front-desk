import { CButton } from "@coreui/react";
import React, { useState } from "react";
import { setOptionsScrollTarget } from "../../../../redux/modules/custom-landing-page/reducer";
import { useDispatch, useSelector } from "react-redux";

const EditScrollTarget = ({
  curentSection,
  previewSection,
  setPreviewSection,
  sections,
  setSections,
  isShowContent,
  sectionBeforeEdit,
}) => {
  const [name, setName] = useState(curentSection.content.name);
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [isCopiedAnchor, setIsCopiedAnchor] = useState(false);

  const { optionsScrollTarget } = useSelector(
    (state) => state.customLandingPage
  );

  console.log("🚀 ~ optionsScrollTarget:", optionsScrollTarget);

  const dispatch = useDispatch();
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
        String(item.id) === String(curentSection.id)
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

  const handelCancel = () => {
    isShowContent("");
    setPreviewSection([...sectionBeforeEdit]);
  };

  const handelConfirm = () => {
    dispatch(
      setOptionsScrollTarget({ id: curentSection.id, value: name, label: name })
    );
    isShowContent("");
    setSections(previewSection);
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

export default EditScrollTarget;
