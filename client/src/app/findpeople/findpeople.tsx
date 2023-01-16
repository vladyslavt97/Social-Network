import { Component, FormEvent, useInsertionEffect} from 'react';
import "./findpeople.css"
import {useState, useEffect} from "react"
import { Link } from 'react-router-dom';

interface NewPeople{
    id: number,
    first: string,
    last: string,
    profile_pic_url: string,
}
interface myPeople{
    id: number,
    first: string,
    last: string,
    profile_pic_url: string,
}
export function FindPeople() {

    const [newPeople, setNewPeople] = useState<NewPeople[]>([]);
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
                setNewPeople( data.newPeople)
            })
            .catch((error) => {
                console.error('Error caught:', error);
            });
    },[])

    //change to the new letter and find those searched (as many as there are)
    const [findPeople, setPeople] = useState('');
    const [myPeople, setMyPeople] = useState<myPeople[]>([]);

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
            setMyPeople(data.myPeople || []);
            return;
        })
        .catch(err => {
                console.log('er: ', err);
            });   
    }, [findPeople])

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
                                <h1 id='newestpeople'>Joined recenlty: </h1>
                                {newPeople.map(
                                    newPerson => (
                                        <div key={newPerson.id} >
                                                <Link to={`/user/${newPerson.id}`} id="link-decoration-none">
                                                <h1 id='threePersonsNames'>{newPerson.first} {newPerson.last}</h1>
                                                <img src={newPerson.profile_pic_url} alt={newPerson.first} id='threepersons'/>
                                                </Link>
                                            </div>
                                    )
                                )}
                            </div>}
                {myPeople.length !== 0  && <div id="theArrayOfFoundPeople">
                                                {myPeople.map(
                                                    myPerson => (
                                                        <div key={myPerson.id} >
                                                            <Link to={`/user/${myPerson.id}`} id="link-decoration-none">
                                                            <h1 id='theArrayOfFoundPeopleNames'>{myPerson.first} {myPerson.last}</h1>
                                                                <img src={myPerson.profile_pic_url} alt={myPerson.first}
                                                                id='theArrayOfFoundPeopleImgs'/>
                                                            </Link>
                                                        </div>
                                                    )
                                                )}
                                            </div>}
            </div>
}