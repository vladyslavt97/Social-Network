import { Component, FormEvent, useInsertionEffect} from 'react';
import "./findpeople.css"
import {useState, useEffect} from "react"

// interface FindPeopleState {
//       email: string,
//       password: string,
//   }

export function FindPeople() {
    //find new people
    const [newPeople, setNewPeople] = useState([]);

    useEffect(()=>{
        fetch('/newpeople', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => 
                response.json())
            .then((data) => {
                console.log('server side: getting newpeople', data.newPeople);
                setNewPeople( data.newPeople)
            })
            .catch((error) => {
                console.error('Error caught:', error);
            });
    },[])




    //change to the new letter and find those searched (as many as there are)
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
            console.log('find people in fetch of find people', data.myPeople);
            // setPeople(data.myPeople);
            return;
        })
        .catch(err => {
                console.log('er: ', err);
            });   
    }, [findPeople])



    //new person is created by the setNewPeople
    console.log('newPerson', newPeople);
    console.log('findPeople', findPeople);

    return <div >
                <div id='theFindPeopleDiv'>
                    <h1 id='findpeople'>Find People</h1>
                    <input type="text" 
                        onChange={event => setPeople(event.target.value)}
                        value={findPeople}
                        />
                </div>
        
        {/* ... */}

        {newPeople.map(
            newPerson => (
                
                <div key={newPerson.id} id="threePersonsDiv">
                    {/* ... */}
                    <h1 id='threePersonsNames'>{newPerson.first} {newPerson.last}</h1>
                    <img src={newPerson.profile_pic_url} alt={newPerson.first} id='threepersons'/>
                </div>
            )
        )}

        {/* ... */}
    </div>
}