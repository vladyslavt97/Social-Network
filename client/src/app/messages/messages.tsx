import { useState } from 'react';
import { UserInfo } from '../interface';
import ChatToAll from './chat-to-all/chat-to-all';
import Chat from './chat/chat';
import './messages.css'
import OnlineFriends from './online-friends/online-friends';
import TextArea from './textarea/textarea';

interface MessagesProps{
  id: number
}

export default function Messages(props: MessagesProps ) {

  //message toggle
  const [counterpartChosen, setCounterpartChosen] = useState<boolean>(false)
    const toggleRelevantMessage = () => {
            setCounterpartChosen(!counterpartChosen);
        }
      
  return (
    <div>
      <div id='messages-divs'>
        <div id='onlinefriends'>
          <OnlineFriends toggleRelevantMessage={toggleRelevantMessage} counterpartChosen={counterpartChosen}/>
        </div>
        <div id='chat-and-textarea'>
          {!counterpartChosen && <div id='choose-a-friend-div'>
             <p>⬅️ &nbsp; </p> <h1 id='choose-a-friend'> Choose a friend to start the chat</h1>
            </div>}
          {counterpartChosen && <div id='chat-and-textarea-subdiv'>
                  <Chat id={props.id}/>
                  <TextArea /></div>}
        </div>
        <div id='chat-to-all-bottom'>
          <ChatToAll />
        </div>
      </div>
    </div>
  )
}
