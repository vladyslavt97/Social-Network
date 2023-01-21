import { useState } from 'react';
import Chat from './chat/chat';
import './messages.css'
import OnlineFriends from './online-friends/online-friends';
import TextArea from './textarea/textarea';


export default function Messages() {
  
  //message toggle
  const [counterpartChosen, setCounterpartChosen] = useState<boolean>(false)
    const toggleRelevantMessage = () => {
            setCounterpartChosen(!counterpartChosen);
        }

  return (
    <div>
      <div id='messages-divs'>
        <div id='onlinefriends-and-chat'>
          <OnlineFriends toggleRelevantMessage={toggleRelevantMessage}/>
          <Chat counterpartChosen={counterpartChosen} />
        </div>
        <TextArea />
      </div>
    </div>
  )
}
