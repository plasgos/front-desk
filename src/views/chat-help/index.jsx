import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getHelpChat,
  getHelpTopic,
} from "../../redux/modules/chat-help/reducer";
import moment from "moment";

const Chat = () => {
  const { topic, chat } = useSelector((state) => state.chatHelp);
  console.log("🚀 ~ Chat ~ chat:", chat);
  const { token } = useSelector((state) => state.login);

  const [selectedChat, setSelectedChat] = useState({});
  const dispatch = useDispatch();

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CRow>
        <CCol md={4}>
          <h4 className="mb-2">List Chat</h4>
          <CCard
            className="shadow-sm"
            style={{ height: 400, overflowY: "auto" }}
          >
            <CCardBody style={{ padding: 10 }}>
              {topic.data.map((data) => {
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
        <CCol style={{ padding: 0 }} md={8}>
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
                <CCardBody style={{ padding: 10 }}>
                  {chat.data.map((data) => {
                    // const isAdmin = data.admin !== undefined;
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
                            borderRadius: "8px 8px 0 8px",
                          }}
                          className="p-2 bg-primary "
                        >
                          <div style={{ color: "white", maxWidth: 500 }}>
                            {data.message}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CCardBody>
              </>
            )}
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Chat;
