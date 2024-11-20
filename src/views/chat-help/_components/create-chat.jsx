import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHelpChat } from "../../../modules/chat-help/reducer";

export default function CreateChat() {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    message: "",
  });

  const { newChat } = useSelector((state) => state.chatHelp);
  const { token } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const onChangeFormData = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleCreateHelpChat = async () => {
    await dispatch(
      createHelpChat({
        topic: {
          title: formData.title,
          category: formData.category,
        },
        message: formData.message,
        token,
      })
    );

    if (Object.keys(newChat).length > 0) {
      setModal(false);
      setFormData({
        title: "",
        category: "",
        message: "",
      });
    }
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="d-flex justify-content-end w-100 ">
        <CButton onClick={toggle} color="primary">
          Buat Pesan
        </CButton>
      </div>

      <CModal show={modal} centered onClose={toggle}>
        <CModalHeader closeButton>
          <h4 className="mb-2 ">Buat Pesan Baru</h4>
        </CModalHeader>

        <CModalBody>
          <form>
            <div className="">
              <div className="form-group ">
                <label className="required-label">Judul</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(event) => onChangeFormData(event)}
                  className="form-control"
                />
              </div>
              <div className="form-group ">
                <label className="required-label">Kategori</label>
                <input
                  type="text"
                  id="category"
                  value={formData.category}
                  onChange={(event) => onChangeFormData(event)}
                  className="form-control"
                />
              </div>
              <div className="form-group ">
                <label className="required-label">Pesan</label>
                <textarea
                  type="text"
                  id="message"
                  placeholder="Ketik pesan"
                  value={formData.message}
                  onChange={(event) => onChangeFormData(event)}
                  className="form-control"
                />
              </div>
            </div>
          </form>
        </CModalBody>

        <CModalFooter>
          <CButton
            disabled={newChat.loading}
            onClick={handleCreateHelpChat}
            color="primary"
          >
            Kirim
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}
