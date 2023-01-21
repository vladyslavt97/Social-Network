import React, { useState } from 'react'
import './textarea.css'
import { socket } from '../../socket';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function TextArea() {
  const clickedFriendId = useSelector((state: RootState) => state.messages.id);

  const [messageState, setMessageState] = useState('');
  const handleChangeOfMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessageState(event.target.value);
  }
  console.log('id of the friend clicked', clickedFriendId);
  
  const handleSubmitMessages = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("chatMessage", {messageState, selectedFriendId: clickedFriendId});
    setMessageState('');
  }
  const onEnterKeyDownChat = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      e.preventDefault();
      socket.emit("chatMessage", {messageState, selectedFriendId: clickedFriendId});
      // socket.emit("chatMessage", messageState);
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
