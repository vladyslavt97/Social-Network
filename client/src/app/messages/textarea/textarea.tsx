import React, { useState } from 'react'
import './textarea.css'
import { socket } from '../../socket';

export default function TextArea() {
    const [messageState, setMessageState] = useState('');
  const handleChangeOfMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessageState(event.target.value);
  }

  const handleSubmitMessages = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("chatMessage", messageState);
    setMessageState('');
  }
  const onEnterKeyDownChat = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      e.preventDefault();
      socket.emit("chatMessage", messageState);
      setMessageState('');
    }
  }
  return (
    <form onSubmit={handleSubmitMessages} id='textarea-messages-form'>
            <textarea  
                id="textarea-messages"
                name="message"
                placeholder="type your message here"
                onChange={handleChangeOfMessage}
                onKeyDown={onEnterKeyDownChat}
                value={messageState}
            ></textarea>
            <button id='send-button'>SEND</button>
        </form>
  )
}
