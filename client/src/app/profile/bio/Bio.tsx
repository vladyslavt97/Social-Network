import "./Bio.css"
import {useState, useEffect} from "react"
import { UserInfo } from '../../interface';

interface BioProps{
    userInfo: UserInfo,
}

export function Bio(props: BioProps) {
            
    const [showBET, setShowBioEditorText] = useState(false);
    const showBioEditorTextarea = () => {
        setShowBioEditorText( !showBET );
    }

    const handleBioSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch('/bioupload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({textarea: bio }),
        })
        .then(response => response.json())
        .then(data => {
            //look for issue!!! 
            console.log('bio data: ', data);
            
            setShowBioEditorText(false);
            setBio(data.myBio[0].bio);

        })
        .catch(err => {
                console.log('er: ', err);
            });   
    }
    
    const [bio, setBio] = useState(props.userInfo.bio);
    const handleBio = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(event.target.value);
    }
    useEffect(()=> {
        setBio(props.userInfo.bio);
    }, [props.userInfo.bio]);
    

    console.log('showBET 1: ', showBET);
    console.log('props.userInfo.bio 2: ', props.userInfo.bio);
    
    return <div >
        <div id="thebio">
            {props.userInfo.bio && !showBET && <h1 id="bioresult">{props.userInfo.bio}</h1>}
            <br />
            {props.userInfo.bio && !showBET && <p onClick={showBioEditorTextarea} id="editbiobutton">| edit bio |</p>}
        </div>

        {!props.userInfo.bio && !showBET && <p onClick={showBioEditorTextarea} id="addyourbio">Add your bio</p>}

        {showBET && <form onSubmit={handleBioSubmit} className="file-upload">
                        <h1 id="bio">BIO</h1>
                        <textarea 
                        onChange={handleBio} 
                        id="textareabio" 
                        value={bio || ''}
                        ></textarea>
                        <button>Submit the biography</button>
                    </form>}
        </div>
}