import Chat from './chat/chat';
import './messages.css'
import OnlineFriends from './online-friends/online-friends';
import TextArea from './textarea/textarea';


export default function Messages() {
  

  return (
    <div>
      <div id='messages-divs'>
        <div id='onlinefriends-and-chat'>
          <OnlineFriends />
          <Chat />
        </div>
        <TextArea />
      </div>
    </div>
  )
}
