import { CCard } from "@coreui/react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { BsCheck2All } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { replyHelpChat } from "../../../modules/chat-help/reducer";

export default function DetailMessage({ selectedChat }) {
  const [replyChat, setReplyChat] = useState("");
  const dispatch = useDispatch();

  const { chat, replyChat: replyChatStore } = useSelector(
    (state) => state.chatHelp
  );
  const { token } = useSelector((state) => state.login);

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

  let lastDate = null;

  return (
    <CCard className="shadow-sm" style={{ height: 400, overflowY: "auto" }}>
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
              <div style={{ gap: 10 }} className="d-flex align-items-center">
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

                <div style={{ color: "white" }} className="font-weight-bold ">
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
            {chat.data
              .sort((a, b) => moment(a.createdAt) - moment(b.createdAt))
              .map((data) => {
                const messageDate = moment(data.createdAt).format("YYYY-MM-DD");
                const showDateSeparator = lastDate !== messageDate;

                lastDate = messageDate;

                const isUser = data.user !== undefined;
                const hours = moment(data.updatedAt).format("HH:mm");

                return (
                  <div key={data._id}>
                    {showDateSeparator && (
                      <div className="d-flex justify-content-center align-items-center my-2">
                        <hr style={{ width: "35%" }} />
                        {moment(data.createdAt).format("DD MMMM YYYY")}
                        <hr style={{ width: "35%" }} />
                      </div>
                    )}
                    <div
                      className="mb-2"
                      style={{
                        display: "flex",
                        justifyContent: isUser ? "flex-end" : "flex-start",
                      }}
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
                        <div className="d-flex flex-column"></div>
                        <div
                          style={{
                            color: isUser ? "white" : "",
                            maxWidth: 500,
                            marginBottom: 4,
                          }}
                        >
                          {data.message}
                        </div>
                        <div
                          style={{
                            color: isUser ? "white" : "",
                            maxWidth: 500,
                            fontSize: 10,
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              color: isUser ? "#e2e8f0" : "#94a3b8",
                              marginRight: 4,
                            }}
                          >
                            {hours}
                          </div>
                          {data.is_read && isUser && <BsCheck2All size={14} />}
                        </div>
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
  );
}
