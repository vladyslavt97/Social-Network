import "./Bio.css"
import {useState, useEffect} from "react"

export function Bio({ bioInDb}: 
    {bioInDb: {}}) {
            
    //showing text area onClick
    const [showBET, setShowBioEditorText] = useState(false);
    const showBioEditorTextarea = () => {
        //its originally set to false and later becomes true on click
        setShowBioEditorText( !showBET );
    }
    console.log('showBioEditor showBET', showBET);


    //showing edit button onClick
    // const [bioEdit, setBioInDb] = useState(bioInDb.bio);
    // const showBioEditorButton = () => {
    //     setBioInDb(!bioEdit );
    // }
    const handleBioSubmit = (event) => {
        event.preventDefault();
        console.log('trying to upload the bio');
        fetch('/bioupload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({textarea: bio }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('data on uload bio query', data.myBio[0].bio);
            setShowBioEditorText(false);
            setBio(data.myBio[0].bio);

        })
        .catch(err => {
                console.log('er: ', err);
            });   
    }
    
    const [bio, setBio] = useState(bioInDb.bio);
    const handleBio = (e) => {
        setBio(e.target.value);
    }
    useEffect(()=> {
        setBio(bioInDb.bio);
    }, [bioInDb.bio]);
    
    return <div >
        <div id="thebio">
            {bioInDb && !showBET && <h1 id="bioresult">{bio}</h1>}
            <br />
            {bioInDb.bio && !showBET && <p onClick={showBioEditorTextarea} id="editbiobutton">| edit bio |</p>}
        </div>

        {!bioInDb.bio && !showBET && <p onClick={showBioEditorTextarea} id="addyourbio">Add your bio</p>}

        {showBET && <form onSubmit={handleBioSubmit} className="file-upload">
                        <h1 id="bio">BIO</h1>
                        <textarea 
                        onChange={handleBio} 
                        id="textareabio" 
                        value={bio}
                        ></textarea>
                        <button>Submit the biography</button>
                    </form>}
        </div>
}