import React, { useEffect, useContext, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { DataContext } from "../contexts/dataContext";
import axios from "axios";

const CopyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
      />
    </svg>
  );
};

const Generate = () => {
  const { data, setData } = useContext(DataContext);
  const [messages, setMessages] = useState([]);
  const [replyBoxText, setReplyBoxText] = useState("");

  const sendReply = (response) => {
    let reply;
    if (response) {
      reply = response;
    } else {
      reply = replyBoxText;
    }

    let data = JSON.stringify({
      messages,
      reply,
    });

    setMessages([
      ...messages,
      {
        role: "user",
        content: reply,
      },
      {
        role: "assistant",
        content: "Please Wait. I am working on it...",
      },
    ]);

    setReplyBoxText("");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://rabackend.onrender.com/api/genrateCopyWriterResponse",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setMessages(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const { post_for, address, description } = data;

    let reqData = JSON.stringify({
      address,
      description,
      post_for,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://rabackend.onrender.com/api/copyAssist",
      headers: {
        "Content-Type": "application/json",
      },
      data: reqData,
    };

    axios
      .request(config)
      .then((response) => {
        const { data } = response;
        setMessages([data]); // initailly
        console.log(JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);

  return (
    <div className="flex px-2 py-8 bg-gray-100 pb-32 overflow-x-hidden relative h-screen flex-row justify-center gap-6">
      <div className="max-w-3xl border border-grey-200 bg-white overflow-y-scroll rounded-3xl no-scrollbar">
        {messages.length == 0 ? (
          <div>Loading</div>
        ) : (
          <div>
            {" "}
            {messages &&
              messages.map((message, index) => {
                return (
                  <div key={index}>
                    <div className="flex flex-row justify-start">
                      <div
                        className={`w-full flex m-4 ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`${
                            message.role === "user"
                              ? "bg-blue-700 text-white "
                              : "bg-white text-gray-800"
                          } border border-grey-200 rounded-xl relative`}
                        >
                          <div className="flex justify-between relative items-center">
                            <p
                              style={{ whiteSpace: "pre-line" }}
                              contentEditable={message.role === "assistant"}
                              className={`m-1 outline-none  ${
                                message.role === "assistant" ? "p-5" : "p-2"
                              }`}
                            >
                              {message.content}
                            </p>
                            {message.role === "assistant" && (
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    message.content
                                  );
                                }}
                              >
                                <div className="absolute opacity-40 hover:opacity-100 top-1.5 right-1.5 bg-white hover:cursor-pointer rounded-lg ">
                                  <CopyIcon />
                                </div>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="absolute w-full bottom-2 ">
              <div className="max-w-3xl">
                <div className="buttons_desc p-2 pl-0 flex overflow-x-scroll no-scrollbar w-full gap-4">
                  <button
                    onClick={() => sendReply("Make it longer.")}
                    class=" w-fit h-[42px] bg-gray-300 text-black hover:bg-slate-400 overflow-hidden py-1 px-6 rounded-xl"
                  >
                    Make it longer
                  </button>
                  <button
                    onClick={() =>
                      sendReply("Make it shorter not more than 250.")
                    }
                    class=" w-fit bg-gray-300 text-black hover:bg-slate-400 py-2 px-6 rounded-xl"
                  >
                    Make it shorter
                  </button>
                  <button
                    onClick={() => sendReply("Write in spanish.")}
                    class=" w-fit bg-gray-300 text-black hover:bg-slate-400 py-2 px-6 rounded-xl"
                  >
                    Write in spanish
                  </button>
                  <button
                    onClick={() => sendReply("Write in spanish.")}
                    class=" w-fit bg-gray-300 text-black hover:bg-slate-400 py-2 px-6 rounded-xl"
                  >
                    Write in spanish
                  </button>
                  <button
                    onClick={() => sendReply("Write in spanish.")}
                    class=" w-fit bg-gray-300 text-black hover:bg-slate-400 py-2 px-6 rounded-xl"
                  >
                    Write in spanish
                  </button>
                  <button
                    onClick={() => sendReply("Write in spanish.")}
                    class=" w-fit bg-gray-300 text-black hover:bg-slate-400 py-2 px-6 rounded-xl"
                  >
                    Write in spanish
                  </button>
                  <button
                    onClick={() => sendReply("Write in spanish.")}
                    class=" w-fit bg-gray-300 text-black hover:bg-slate-400 py-2 px-6 rounded-xl"
                  >
                    Write in spanish
                  </button>
                  <button
                    onClick={() => sendReply("Write in spanish.")}
                    class=" w-fit bg-gray-300 text-black hover:bg-slate-400 py-2 px-6 rounded-xl"
                  >
                    Write in spanish
                  </button>
                </div>
                <div className="flex py-2 w-full items-center justify-center gap-2">
                  <input
                    type="text"
                    className="block background_desc w-full py-2 px-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="What can I assist you with"
                    value={replyBoxText}
                    onChange={(e) => setReplyBoxText(e.target.value)}
                  />
                  <button onClick={() => sendReply()}>
                    <SendOutlined
                      style={{
                        fontSize: "1rem",
                        padding: "0.5rem",
                        color: "white",
                      }}
                      className=" flex items-center justify-center font-bold bg-blue-700 rounded-full h-9 w-9"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generate;
