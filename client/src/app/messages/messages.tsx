import Chat from './chat/chat';
import './messages.css'
import TextArea from './textarea/textarea';


export default function Messages() {
  

  return (
    <div>
      <div id='messages-divs'>
        <div id='other-messages-div'>
            <h2>other messages</h2>
            <h1 id='no-messages'>there are no messages for you!</h1>
        </div>

        <Chat />
        <TextArea />
      </div>
    </div>
  )
}
