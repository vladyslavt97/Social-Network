import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { socket } from '../socket';
import './messages.css'


export default function Messages() {
  const messages = useSelector((state: RootState) => state.messages);
  console.log('messages componenet State: ', messages);
  
  const handleSubmitMessages = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      // if (e.code === "Enter") {
        // no need to `fetch`! Just emit via the socket.
        socket.emit("chatMessage", { message: messages });
        // clear the input field!!!
  }


      
  const handleMessageTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.target.value;
        // 1. get the text from e.currentTarget.value
        // 2. update the message state (in this component only)
  }

  return (
    <div>
      <div id='messages-divs'>
        <div id='other-messages-div'>
            <h2>other messages</h2>
            <h1 id='no-messages'>there are no messages for you!</h1>
        </div>

        {/* CHAT */}
        <div id='chat-div'> 
            <h1 id='chat'>CHAT</h1>
            {/* the sate is undefined? */}
            {/* {messages.map(message => { */}
              <div>
                {/* <h6>{message.recipient_id}</h6> */}
              </div>
            {/* })} */}
        </div>

        {/* textarea */}
        <form onSubmit={handleSubmitMessages} id='textarea-messages-form'>
            <textarea  
                id="textarea-messages"
                name="message"
                placeholder="type your message here"
                // onKeyDown={(e) => onChatKeyDown(e)}
                onChange={handleMessageTextarea}
                // value={messages[0].}
            ></textarea>
            <button id='send-button'>SEND</button>
        </form>
      </div>
    </div>
  )
}
