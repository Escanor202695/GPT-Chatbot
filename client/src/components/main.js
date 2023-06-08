import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import Chat from "./chat";

function Main({pdfText}) {
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([
    {
      role: "system",
      content: "How can I help you today?",
    },
  ]);

  const handleChange = (msg) => {
    setMessage(msg);
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (message !== '') {
      axios
        .post("http://localhost:3080/", {
          message: message,
          systemMessage: pdfText,
        })
        .then((response) => {
          setChat([
            ...chat,
            {
              role: "user",
              content: message,
            },
            {
              role: "assistant",
              content: response.data.data.choices[0].message.content,
            },
          ]);
  
          setMessage("");
          console.log(response.data.data.choices[0].message);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  };
  

  return (
    <div className="w-full h-[100vh] max-h-[100vh] flex flex-col items-center justify-center bg-white text-black">
      <div className="w-full h-[90%] flex flex-col items-center flex-grow overflow-scroll pt-[2rem]">
        {chat.length !== 0 &&
          chat.map((data, index) => {
            return <Chat role={data.role} content={data.content} />;
          })}
      </div>
      <div className="flex w-[70%] my-[2rem]">
        <TextField
          className="mr-2"
          label="Prompt"
          variant="outlined"
          onChange={(e) => handleChange(e.target.value)}
          value={message}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<Send />}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default Main;
