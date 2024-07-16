import React from "react";
import useFormatChatDate from "../../../hooks/useFormatChatDate";

export default function ListChat({ data, selectedChat, handleSelectChat }) {
  const isSelected = data._id === selectedChat.id;
  const formattedDate = useFormatChatDate(data.updatedAt);

  return (
    <div
      key={data._id}
      onClick={() => handleSelectChat({ id: data._id, user: data.user })}
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
          <div className="font-weight-bold ">{data.user.name}</div>

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
}
