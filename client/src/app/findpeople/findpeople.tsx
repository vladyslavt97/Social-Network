import { Component, FormEvent, useInsertionEffect} from 'react';
import "./findpeople.css"
import {useState, useEffect} from "react"
import { Link } from 'react-router-dom';

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
            setMyPeople(data.myPeople || []);
            return;
        })
        .catch(err => {
                console.log('er: ', err);
            });   
    }, [findPeople])
    // console.log('myPeople', myPeople);
    // console.log('findPeople', findPeople);
    // console.log('------------------');
    //new person is created by the setNewPeople
    // console.log('newPeople', newPeople);

    return <div >
                <div id='theFindPeopleDiv'>
                    <h1 id='findpeople'>Find People</h1>
                    <input type="text" 
                        onChange={event => setPeople(event.target.value)}
                        value={findPeople}
                        />
                </div>
                {myPeople.length === 0 && findPeople && <div>
                                                <h1 id='noresults'>No results</h1>
                                            </div>
                                        }
                {myPeople.length === 0 && !findPeople && <div id="threePersonsDiv">
                                <h1 id='newestpeople'>Newest People</h1>
                                {newPeople.map(
                                    newPerson => (
                                        // <Link to="" >
                                            <div key={newPerson.id} >
                                            <h1 id='threePersonsNames'>{newPerson.first} {newPerson.last}</h1>
                                            <img src={newPerson.profile_pic_url} alt={newPerson.first} id='threepersons'/>
                                        </div>
                                        // </Link>
                                    )
                                )}
                            </div>}
                {myPeople.length !== 0  && <div id="theArrayOfFoundPeople">
                                {myPeople.map(
                                    myPerson => (
                                        <div key={myPerson.id} >
                                            <h1 id='theArrayOfFoundPeopleNames'>{myPerson.first} {myPerson.last}</h1>
                                            <Link to={`/user/${myPerson.id}`} >
                                                <img src={myPerson.profile_pic_url} alt={myPerson.first}
                                                id='theArrayOfFoundPeopleImgs'/>
                                            </Link>
                                        </div>
                                    )
                                )}
                            </div>}
            </div>
}