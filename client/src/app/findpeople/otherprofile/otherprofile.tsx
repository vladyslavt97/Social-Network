import "./otherprofile.css"
import {useState, useEffect} from "react"
import { useParams, useNavigate } from 'react-router-dom';

// interface OtherProfileState {
//       first: string,
//       last: string,
//       email: string,
//       profile_pic_url: string,
//   }

export function OtherProfile(){
    let { id } = useParams();
    console.log('useParamsId', id);
    const navigate = useNavigate();

    const [otherUserProfile, setOtherUserProfile] = useState({});
    useEffect(() => {
        fetch(`/userprofile/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(data=>{
                console.log('we are getting data for a particular user:id from the server', data.otherProfile);
                setOtherUserProfile(data.otherProfile[0]);
            })
            .catch(err=>{
                console.log('if threre is no match for user:id = output a message "no page found"', err);
            });
    },[otherUserProfile]);
    console.log('otherUserProfile', otherUserProfile);
    
    return <div>
        <h1 id="otherpeoplecomponent">other profile component</h1>
        <img src={otherUserProfile.profile_pic_url} alt={otherUserProfile.first} />
        <h5>{otherUserProfile.first}{otherUserProfile.last}</h5>
        <h6>{otherUserProfile.email}</h6>
        <h6>{otherUserProfile.bio}</h6>
    </div>
}