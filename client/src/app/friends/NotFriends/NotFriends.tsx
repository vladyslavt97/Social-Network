import { Link } from 'react-router-dom'
import { Friend } from '../../interface'
import ButtonAcceptFriendship from './button-accept/button-accept'

export default function NotFriends(props: {wannabees: Friend[]} ) {
  return (
    <div id="friend-reqs">
        {props.wannabees.length !== 0 && <div id="big-tobe-friends-div">
            <h2 id="friends">Want to be friends</h2>
            {props.wannabees.map(wannabe => (
                    <div key={wannabe.id} >
                        <div id="tobe-friends-div" key={wannabe.id}>
                                    <Link to={`/user/${wannabe.id}`} id="link-decoration-none">
                                        <img src={wannabe.profile_pic_url} alt={wannabe.first} 
                                        id='friends-img'/>
                                        <h1 id='friends-text'>{wannabe.first} {wannabe.last}</h1>
                                    </Link>
                                    <ButtonAcceptFriendship id={wannabe.id}/>
                                </div>
                        </div>
                    )
                )}
            </div>}
        {props.wannabees.length ===0 && <div id="no-tobe-friends">
                <h2 id="no-tobe-friends-text">No new friend requests 😥</h2>
            </div>}
    </div>
  )
}
