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
                // console.log('server side: getting newpeople', data.newPeople);
                setNewPeople( data.newPeople)
            })
            .catch((error) => {
                console.error('Error caught:', error);
            });
    },[])




    //change to the new letter and find those searched (as many as there are)
    const [findPeople, setPeople] = useState('');
    const [myPeople, setMyPeople] = useState([]);

    useEffect(() => {
        fetch('/findpeople', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ foundPeople: findPeople }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('find people in fetch of find people', data.myPeople);
            setMyPeople(data.myPeople);
            return;
        })
        .catch(err => {
                console.log('er: ', err);
            });   
    }, [findPeople])
    //You can break this loop by updating a different state variable with the data received in the fetch request and not update the state variable being used in the useEffect dependency array.
    console.log('myPeople', myPeople);
    console.log('findPeople', findPeople);
    console.log('------------------');


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
        
                {!myPeople && <div>
                                {newPeople.map(
                                    newPerson => (
                                        
                                        <div key={newPerson.id} id="threePersonsDiv">
                                            {/* ... */}
                                            <h1 id='threePersonsNames'>{newPerson.first} {newPerson.last}</h1>
                                            <img src={newPerson.profile_pic_url} alt={newPerson.first} id='threepersons'/>
                                        </div>
                                    )
                                )}
                            </div>}
                {myPeople && <div id="theArrayOfFoundPeople">
                                {myPeople.map(
                                    myPerson => (
                                        
                                        <div key={myPerson.id} >
                                            {/* ... */}
                                            <h1 id='theArrayOfFoundPeopleNames'>{myPerson.first} {myPerson.last}</h1>
                                            <img src={myPerson.profile_pic_url} alt={myPerson.first} id='theArrayOfFoundPeopleImgs'/>
                                        </div>
                                    )
                                )}
                            </div>}

    </div>
}