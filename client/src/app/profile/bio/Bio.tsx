import "./Bio.css"
import {useState, useEffect} from "react"
import { UserInfo } from '../../interface';
import { useDispatch, useSelector } from "react-redux";
import { setBioRedux, modifyBio } from "../../redux/bioSlice";
import { RootState } from "../../redux/store";

interface BioProps{
    userInfo: UserInfo,
}

export function Bio(props: BioProps) {
    const bioS = useSelector((state: RootState) => state.bio.biovalue);
    console.log('bioS: ', bioS);
    console.log('props.userInfo.bio: ', props.userInfo.bio);
    
    const [showBET, setShowBioEditorText] = useState(false);
    const showBioEditorTextarea = () => {
        setShowBioEditorText( !showBET );
    }
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log('some log');
        
        dispatch(setBioRedux(props.userInfo.bio));
    }, [props.userInfo.bio]);


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
            console.log('bio data: ', data);
            setShowBioEditorText(false);
            // setBio(data.myBio[0].bio);
            dispatch(modifyBio(data.myBio[0].bio));
        })
        .catch(err => {
                console.log('er: ', err);
            });   
    }
    
    const [bio, setBio] = useState('');
    const handleBio = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(event.target.value);
    }
    

    console.log('showBET 1: ', showBET);
    console.log('props.userInfo.bio 2: ', props.userInfo.bio);
    console.log('bio 3: ', bio);
    console.log('bioS 2: ', bioS);
    
    return <div >
        <div id="thebio">
            {bioS && !showBET && <h1 id="bioresult">{bioS}</h1>}
            <br />
            {bioS && !showBET && <p onClick={showBioEditorTextarea} id="editbiobutton">| edit bio |</p>}
        </div>

        {!bioS && !showBET && <p onClick={showBioEditorTextarea} id="addyourbio">Add your bio</p>}

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