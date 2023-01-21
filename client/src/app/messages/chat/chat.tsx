import { MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './chat.css'

export default function Chat() {
    const clickedFriendId = useSelector((state: RootState) => state.messages.id);
    const messages = useSelector((state: RootState) => state.messages.messagesValue.filter(m=>
        m.recipient_id === clickedFriendId || m.sender_id === clickedFriendId));
    console.log('messages componenet State: ', messages);

    const changeDate = (arg: string | number | Date) =>{
        let time = new Date(arg).toLocaleString();
        return time;
    }
    
    return (
        <div id='chat-div'> 
            <div id="the-messages-div">
                {messages.map((m) => 
                    <div key={m.id}>
                        {m.sender_id === clickedFriendId && 
                        <div id='message-totheleft'>
                            <div id='message-and-img-div'>
                                <h4 id="actual-message"><i>{m.message}</i></h4>
                                <h5 id='first_last_message'>{m.first} {m.last}</h5> 
                                <h6 id='date_message'>{changeDate(m.created_at)}</h6>
                            </div>
                            <div id="message-and-img-div-corner" ></div>
                        </div>}
                        {m.recipient_id === clickedFriendId && 
                        <div id='message-totheright'>
                            <div id='response-and-img-div'>
                                <h4 id="actual-message"><i>{m.message}</i></h4>
                                <h5 id='first_last_message'>{m.first} {m.last}</h5> 
                                <h6 id='date_message'>{changeDate(m.created_at)}</h6>
                            </div>
                            <div id="response-and-img-div-corner" ></div>
                        </div>}
                    </div>
                )}
            </div>
        </div>
    )
}
