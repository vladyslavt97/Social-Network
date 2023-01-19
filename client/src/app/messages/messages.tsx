import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { socket } from '../socket';
import './messages.css'


export default function Messages() {
  // const messages = useSelector((state) => state.messages);
    const [message, setMessage] = useState("");

    // const onChatKeyDown = (e) => {
    //     if (e.code === "Enter") {
    //         e.preventDefault();
    //         // no need to `fetch`! Just emit via the socket.
    //         socket.emit("chatMessage", { message: message.trim() });
    //         // clear the input field!
    //     }
    // };

    // const onMessageChange = (e) => {
    //     // 1. get the text from e.currentTarget.value
    //     // 2. update the message state (in this component only)
    // }

    // ...

  return (
    <div>
      <div id='textarea-div'>
        <div id='other-messages-div'>
            <h2>other messages</h2>
            <h1 id='no-messages'>there are no messages for you!</h1>
        </div>

        {/* CHAT */}
        <div id='chat-div'>
            Chat
        </div>

        {/* textarea */}
        <div id='textarea-messages-div'>
            <textarea  
                id="textarea-messages"
                name="message"
                placeholder="type your message here"
                // onKeyDown={(e) => onChatKeyDown(e)}
                // onChange={(e) => onMessageChange(e)}
                value={message}
            ></textarea>
            <button id='send-button'>SEND</button>
        </div>
      </div>
    </div>
  )
}
