import React, { useEffect, useRef, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  createHelpChat,
  getHelpChat,
  getHelpTopic,
  replyHelpChat,
  resetHelpChat,
} from "../../redux/modules/chat-help/reducer";
import moment from "moment";
import { IoMdSend } from "react-icons/io";

const ChatHelp = () => {
  const [selectedChat, setSelectedChat] = useState({});
  console.log("🚀 ~ ChatHelp ~ selectedChat:", selectedChat);
  const [replyChat, setReplyChat] = useState("");
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    message: "",
  });

  const {
    topic,
    chat,
    newChat,
    replyChat: replyChatStore,
  } = useSelector((state) => state.chatHelp);
  const { token } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const sortedTopicBydate = topic.data.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  const chatListRef = useRef(null);
  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chat.data]);

  const textareaRef = useRef(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Menyesuaikan tinggi textarea sesuai konten, hanya ketika melebihi satu baris
      textarea.style.height = "auto"; // Reset tinggi ke auto
      if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.style.height = `${Math.min(textarea.scrollHeight, 80)}px`;
      } else {
        textarea.style.height = "30px"; // Tinggi awal untuk satu baris
      }
    }
  }, [replyChat]);

  const handleReplyChat = async () => {
    await dispatch(
      replyHelpChat({
        topic_id: selectedChat.id,
        message: replyChat,
        token,
      })
    );

    if (Object.keys(replyChatStore).length > 0) {
      setReplyChat("");
    }
  };

  useEffect(() => {
    getData();

    if (selectedChat.id) {
      dispatch(
        getHelpChat({
          topic_id: selectedChat.id,
          token,
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replyChatStore, newChat]);

  const onChangeFormData = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const getData = async () => {
    await dispatch(getHelpTopic({ token }));
  };

  const handleSelectChat = async (value) => {
    setSelectedChat(value);
    await dispatch(
      getHelpChat({
        topic_id: value.id,
        token,
      })
    );
  };

  useEffect(() => {
    getData();

    return () => {
      dispatch(resetHelpChat());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    setModal(!modal);
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

  useEffect(() => {
    getData();
    if (newChat.data) {
      setSelectedChat({ id: newChat.data._id, user: newChat.data.user });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newChat]);

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

      <div>
        <CRow>
          <CCol md={5}>
            <h4 className="mb-2">List Chat</h4>
            <CCard
              className="shadow-sm"
              style={{ height: 400, overflowY: "auto" }}
            >
              <CCardBody style={{ padding: 10 }}>
                {sortedTopicBydate.map((data) => {
                  const isSelected = data._id === selectedChat.id;
                  const now = moment();
                  const updatedDate = moment(data.updatedAt);
                  const isSameDay = now.isSame(updatedDate, "day");
                  const formattedDate = isSameDay
                    ? updatedDate.format("hh:mm A")
                    : updatedDate.format("DD/MM/YYYY");

                  return (
                    <div
                      key={data._id}
                      onClick={() =>
                        handleSelectChat({ id: data._id, user: data.user })
                      }
                      style={{
                        backgroundColor: isSelected ? "#E1E5EC" : "",
                        gap: 10,
                        height: 65,
                        cursor: "pointer",
                        marginBottom: 10,
                        minWidth: 270,
                      }}
                      className="d-flex p-2 rounded-lg align-items-center chat-hover "
                    >
                      <div
                        style={{
                          width: 35,
                          height: 35,
                          position: "relative",
                          display: "flex",
                          flexShrink: 0,
                          overflow: "hidden",
                        }}
                        className="rounded-circle"
                      >
                        <img
                          src={data.user.avatar_img}
                          alt="avatar"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      <div style={{ flexGrow: 1 }}>
                        <div className="d-flex justify-content-between mb-1">
                          <div className="font-weight-bold ">
                            {data.user.name}
                          </div>

                          <div
                            style={{
                              fontSize: 12,
                            }}
                          >
                            {formattedDate}
                          </div>
                        </div>

                        <div
                          style={{
                            fontSize: 12,
                          }}
                        >
                          {data.topic.title}
                        </div>

                        <div
                          style={{
                            fontSize: 12,
                          }}
                          className="mt-1 text-secondary"
                        >
                          {data.topic.category}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CCardBody>
            </CCard>
          </CCol>
          <CCol style={{ padding: 0 }} md={7}>
            <h4 className="mb-2">Chat</h4>
            <CCard
              className="shadow-sm"
              style={{ height: 400, overflowY: "auto" }}
            >
              {chat.data.length === 0 ? (
                <div
                  style={{ flex: 1, justifyContent: "center" }}
                  className="d-flex align-items-center"
                >
                  <p className="font-weight-bold">Silahkan Pilih List Chat!</p>
                </div>
              ) : (
                <>
                  <div style={{ height: 55 }} className="py-2 px-3 bg-primary">
                    {Object.keys(selectedChat).length > 0 && (
                      <div
                        style={{ gap: 10 }}
                        className="d-flex align-items-center"
                      >
                        <div
                          style={{
                            width: 35,
                            height: 35,
                            position: "relative",
                            display: "flex",
                            flexShrink: 0,
                            overflow: "hidden",
                          }}
                          className="rounded-circle"
                        >
                          <img
                            src={selectedChat.user.avatar_img}
                            alt="avatar"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        <div
                          style={{ color: "white" }}
                          className="font-weight-bold "
                        >
                          {selectedChat.user.name}
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    ref={chatListRef}
                    style={{
                      padding: 10,
                      maxHeight: 400,
                      height: "100%",
                      overflowY: "auto",
                    }}
                  >
                    {chat.data.map((data) => {
                      const isUser = data.user !== undefined;

                      return (
                        <div
                          className="mb-2"
                          style={{
                            display: "flex",
                            justifyContent: isUser ? "flex-end" : "flex-start",
                          }}
                          key={data._id}
                        >
                          <div
                            style={{
                              borderRadius: isUser
                                ? "8px 8px 0 8px"
                                : "8px 8px 8px 0",
                              backgroundColor: isUser ? "#fa541c" : "#E1E5EC",
                            }}
                            className="p-2"
                          >
                            <div
                              style={{
                                color: isUser ? "white" : "",
                                maxWidth: 500,
                              }}
                            >
                              {data.message}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div
                    style={{ gap: 10 }}
                    className="w-100 bg-primary d-flex align-items-center p-2"
                  >
                    <textarea
                      id="chatReply"
                      placeholder="Ketik pesan"
                      ref={textareaRef}
                      value={replyChat}
                      onChange={(event) => setReplyChat(event.target.value)}
                      className="form-control"
                      style={{
                        resize: "none",
                        overflow: "auto",
                        height: "30px",
                        maxHeight: "200px",
                        flex: 1,
                      }}
                    />

                    <IoMdSend
                      onClick={handleReplyChat}
                      style={{ cursor: "pointer" }}
                      size={24}
                      color="white"
                    />
                  </div>
                </>
              )}
            </CCard>
          </CCol>
        </CRow>
      </div>
    </>
  );
};

export default ChatHelp;
