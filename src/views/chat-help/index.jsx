import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getHelpChat,
  getHelpTopic,
  resetHelpChat,
} from "../../redux/modules/chat-help/reducer";
import ListChat from "./_components/list-chat";
import CreateChat from "./_components/create-chat";
import DetailMessage from "./_components/detail-message";

const ChatHelp = () => {
  const [selectedChat, setSelectedChat] = useState({});
  const {
    topic,
    newChat,
    replyChat: replyChatStore,
  } = useSelector((state) => state.chatHelp);
  const { token } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const sortedTopicBydate = topic.data.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

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

  useEffect(() => {
    getData();
    if (newChat && newChat.data && newChat.data._id && newChat.data.user) {
      setSelectedChat({ id: newChat.data._id, user: newChat.data.user });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newChat]);

  return (
    <>
      <CreateChat />
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
                  return (
                    <ListChat
                      key={data._id}
                      data={data}
                      selectedChat={selectedChat}
                      handleSelectChat={(value) => handleSelectChat(value)}
                    />
                  );
                })}
              </CCardBody>
            </CCard>
          </CCol>
          <CCol style={{ padding: 0 }} md={7}>
            <h4 className="mb-2">Chat</h4>
            <DetailMessage selectedChat={selectedChat} />
          </CCol>
        </CRow>
      </div>
    </>
  );
};

export default ChatHelp;
