import "./otherprofile.css"
import {useState, useEffect} from "react"
// import { response } from "express";
import { useParams, useNavigate } from 'react-router-dom';

export function OtherProfile(){
    let { id } = useParams();
    console.log('useParamsId', id);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/user/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(data=>{
                console.log('we are getting data for a particular user:id from the server', data);
            })
            .catch(err=>{
                console.log('if threre is no match for user:id = output a message "no page found"');
            });
    });

    return <div>
        <h1 id="otherpeoplecomponent">other profile component</h1>
        {/* <img src={profile_pic_url} alt={first} /> */}
        {/* <h5>{first}{last}</h5>
        <h6>{email}</h6>
        <h6>{bio}</h6> */}
    </div>
}