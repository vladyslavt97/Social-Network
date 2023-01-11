import { Component, FormEvent} from 'react';
import "./findpeople.css"
import {useState, useEffect} from "react"

// interface FindPeopleState {
//       email: string,
//       password: string,
//   }

export function FindPeople() {
    const [findPeople, setPeople] = useState('');
    
    useEffect(() => {
        fetch('/findpeople', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({foundPeople: findPeople }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('data on uload find people', data.myPeople);
        })
        .catch(err => {
                console.log('er: ', err);
            });   
    }, [findPeople])
    // const [bio, setBio] = useState(bioInDb.bio);
    // const handleBio = (e) => {
    //     setBio(e.target.value);
    // }

    return <div id='theFindPeopleDiv'>
        <h1 id='findpeople'>Find People</h1>
        <input type="text" 
            // name='findPeopleInput' 
            onChange={event => setPeople(event.target.value)}
            value={findPeople}
            />
    </div>
}