import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { receivedMessage } from '../redux/messagesSlice';
import { RootState } from '../redux/store';
import { socket } from '../socket';
import './messages.css'


export default function Messages() {
  const messages = useSelector((state: RootState) => state.messages);
  console.log('messages componenet State: ', messages);
  const dispatch = useDispatch();
  // const handleSubmitMessages = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  const handleSubmitMessages = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let message = (document.getElementById('textarea-messages') as HTMLInputElement | null)?.value;
    console.log('message', message);
    
      // if (e.code === "Enter") {
        // no need to `fetch`! Just emit via the socket.
        // socket.emit("chatMessage", { message: message });
        
        socket.emit("chatMessage", message);
        // dispatch(receivedMessage({message}));
        // (document.getElementById('textarea-messages') as HTMLInputElement | null)?.value;

        // message = (document.getElementById('textarea-messages') as HTMLInputElement | null)?.value;
        message = '';
  }

  console.log('??', messages.messagesValue);
  
  return (
    <div>
      <div id='messages-divs'>
        <div id='other-messages-div'>
            <h2>other messages</h2>
            <h1 id='no-messages'>there are no messages for you!</h1>
        </div>

        {/* CHAT */}
        <div id='chat-div'> 
            {/* the sate is undefined? */}
            <div id="the-messages-div">
              {messages.messagesValue.map(m => 
                <div key={m.id} id="column-reverse-reverse">
                  <h4 id="actual-message">{m.message}</h4>
                  <br />
                  <br />
                </div>
              )}
            </div>
        </div>

        {/* textarea */}
        <form onSubmit={handleSubmitMessages} id='textarea-messages-form'>
            <textarea  
                id="textarea-messages"
                name="message"
                placeholder="type your message here"
                // onKeyDown={(e) => onChatKeyDown(e)}
                // onChange={handleMessageTextarea}
                // value={messages}
            ></textarea>
            <button id='send-button'>SEND</button>
        </form>
      </div>
    </div>
  )
}
