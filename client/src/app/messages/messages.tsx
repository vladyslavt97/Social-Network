import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { receivedMessage } from '../redux/messagesSlice';
import { RootState } from '../redux/store';
import { socket } from '../socket';
import './messages.css'


export default function Messages() {
  const messages = useSelector((state: RootState) => state.messages);
  console.log('messages componenet State: ', messages);
  // const handleSubmitMessages = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   let message = (document.getElementById('textarea-messages') as HTMLInputElement | null)?.value;
  //   console.log('message', message);
  //   socket.emit("chatMessage", message);
  //       // (document.getElementById('textarea-messages') as HTMLInputElement | null)?.value;
  //       // message = (document.getElementById('textarea-messages') as HTMLInputElement | null)?.value;
  //       // message = '';
  // }
  const [messageState, setMessageState] = useState('');
  const handleChangeOfMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessageState(event.target.value);
  }

  const handleSubmitMessages = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("chatMessage", messageState);
    setMessageState('');
  }
  // const onChatKeyDown = (e: KeyboardEvent<HTMLImageElement>) => {
  //   if (e.code === "Enter") {
  //     e.preventDefault();
  //       socket.emit("chatMessage", messageState);
  //       setMessageState("");
  //   }
  // }

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
                <div key={m.id} id="actual-message-div">
                  <h4 id="actual-message"><i>{m.message}</i></h4>
                  <h5 id='first_last_message'>{m.first} {m.last}</h5> 
                  <h6 id='date_message'>{m.created_at}</h6>
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
                onChange={handleChangeOfMessage}
                // onKeyDown={onChatKeyDown}
                value={messageState}
            ></textarea>
            <button id='send-button'>SEND</button>
        </form>
      </div>
    </div>
  )
}
