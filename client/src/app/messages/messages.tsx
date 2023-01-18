import React, { useEffect, useState } from 'react'
import './messages.css'
export default function Messages() {
  const [messages, setMessages] = useState();
  useEffect(()=>{
    //fetch to get ALL message from DB
    // setMessages([1,2,3])
  }, [])

  return (
    <div>
        {/* {messages?.length === 0 && <div> */}
            <div id='textarea-div'>
                <div id='other-messages-div'>
                    <h2>other messages</h2>
                    <h1 id='no-messages'>there are no messages for you!</h1>
                </div>
                <div id='chat-div'>
                    Chat
                </div>
                <div id='textarea-messages-div'>
                    <textarea  
                        id="textarea-messages"
                    ></textarea>
                    <button id='send-button'>SEND</button>
                </div>
            </div>
            {/* </div>} */}
    </div>
  )
}
