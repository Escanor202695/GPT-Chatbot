import React from "react";

function Chat({role,content }) {
  return (
    <div
      className={`flex  justify-center w-full py-[1rem] border-b-[1px] ${
        role !== "user" ? "bg-[#F7F7F8]" : null
      }`}
    >
      <div className="flex w-[70%]">
        <img
          src={role === "user" ? "/user.png" : "/assistant.png"}
          alt={role}
          className="w-[30px] h-[30px] rounded-full mr-[20px]"
        />
        <div className="flex flex-wrap items-center">
          <pre className="flex-wrap content-[12px] leading-6" style={{overflowWrap:'break-word',whiteSpace:"pre-wrap"}}>{content}</pre>
        </div>
      </div>
    </div>
  );
}

export default Chat;
