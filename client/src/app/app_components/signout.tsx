import { Link } from "react-router-dom";

export function Signout() {
    const signOut = (event) => {
        event.preventDefault();
        fetch('/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            location.replace('/');
        })
        .catch(err => {
                console.log('er: ', err);
            });
    }        
    return <div>
            <form onClick={signOut}>
                <img src="signout.png" alt="empty" id="signout"/>
            </form>
            </div>
}