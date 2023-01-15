import "./deletion_btn.css"

export function Deletion() {
    const deletion = () => {
        fetch('/deletemyaccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('deleted', data);
            location.replace('/');
        })
        .catch(err => {
                console.log('er: ', err);
            });
    }        
    return <div id="deletion_div">
                <button onClick={deletion} id="deletion_btn">Delete the account</button>
            </div>
}