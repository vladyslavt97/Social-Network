import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { socket } from '../../socket';
import './chat-to-all.css'
export default function ChatToAll() {
    const messages = useSelector((state: RootState) => state.messages.messagesValue.filter(el => el.recipient_id === null));
    console.log('chat to all componenet State: ', messages);
    
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

  const [openChat, setOpenChat] = useState<boolean>(false)
    const toggleGeneralChat = () => {
            setOpenChat(!openChat);
        }

  return (
    <div>
    <button id='chat-to-all-button' onClick={toggleGeneralChat}>Chat to all!</button>
        {openChat && <div id='general-chat'>
                        <div id='general-chat-div'> 
                            <div id="general-the-messages-div">
                                {messages.map(m => <>
                                    <div key={m.id} id="actual-general-message-div">
                                        <h4 id="general-actual-message"><i>{m.message}</i></h4>
                                        <h5 id='general-first_last_message'>{m.first} {m.last}</h5> 
                                        <h6 id='general-date_message'>{m.created_at}</h6>
                                    </div>
                                    <div id="actual-general-message-div-corner" ></div>
                                </>
                                )}
                            </div>
                        </div>
                        <form onSubmit={handleSubmitMessages} id='textarea-general-chat-form'>
                            <textarea  
                                id="general-textarea-messages"
                                name="message"
                                placeholder="type your message here"
                                onChange={handleChangeOfMessage}
                                onKeyDown={onEnterKeyDownChat}
                                value={messageState}
                            ></textarea>
                            <button id='general-send-button'>SEND</button>
                        </form>
                    </div>}
    </div>
  )

}
