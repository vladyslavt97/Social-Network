import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './chat.css'


export default function Chat() {
    const messages = useSelector((state: RootState) => state.messages);
    console.log('messages componenet State: ', messages);
    return (
        <div id='chat-div'> 
            <div id="the-messages-div">
                {messages.messagesValue.map(m => 
                    <div key={m.id} id="actual-message-div">
                        <div id='message-and-img-div'>
                            {/* <img src={m.profile_pic_url} alt={m.first} id="message-img-pic"/> */}
                            <h4 id="actual-message"><i>{m.message}</i></h4>
                        </div>
                        <h5 id='first_last_message'>{m.first} {m.last}</h5> 
                        <h6 id='date_message'>{m.created_at}</h6>
                    </div>
                )}
            </div>
        </div>
    )
}
