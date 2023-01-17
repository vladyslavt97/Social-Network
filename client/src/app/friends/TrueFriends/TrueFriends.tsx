import { Link } from 'react-router-dom'
import { Friend } from '../../interface'
import ButtonRejectFrienship from './button-reject/button-reject'

export default function TrueFriends(props: { friends: Friend[] }) {
  return (
    <div id="friends">
      {props.friends.length !== 0 && <div id="big-friends-div">
        <h2 id="friends">Friends</h2>
        {props.friends.map(friend => (
                    <div key={friend.id} >
                            <div id="friends-div">
                            <Link to={`/user/${friend.id}`} id="link-decoration-none">
                                <img src={friend.profile_pic_url} alt={friend.first} 
                                id='friends-img'/>
                                <h1 id='friends-text'>{friend.first} {friend.last}</h1>
                            </Link>
                            <ButtonRejectFrienship id={friend.id}/>
                            </div>
                    </div>
                )
            )}
        </div>}
      {props.friends.length ===0 && <div id="no-friends">
                      <h2 id="no-friends-text">You have no friends 😥 </h2>
                  </div>}
    </div>
  )
}
