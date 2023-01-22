import "./Bio.css"
import {useState, useEffect} from "react"
import { UserInfo } from '../../interface';
import { useDispatch, useSelector } from "react-redux";
import { addBioUpdate, userInfoState } from "../../redux/bioSlice";
import { RootState } from "../../redux/store";

// interface BioProps{
//     userInfo: UserInfo,
// }

export function Bio() {
    const userState = useSelector((state: RootState) => state.userinfo.userInfoValue);
    console.log('userState in bio: ', userState);
    
    const dispatch = useDispatch();

    useEffect(()=>{//otherwise redoing app to functional componenet
        fetch('/user', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => 
                response.json())
            .then((data) => {
                dispatch(userInfoState(data.userData))
            })
            .catch((error) => {
                console.error('Error caught in get user:', error);
            });
    }, [])

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
            console.log('bio data post: ', data);
            setShowBioEditorText(false);
            setBio(data.myBio[0].bio);
            dispatch(addBioUpdate(data.myBio[0].bio))
        })
        .catch(err => {
                console.log('er: ', err);
            });   
    }
    
    const [bio, setBio] = useState(userState.bio);
    const handleBio = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(event.target.value);
    }
    useEffect(()=> {
        setBio(userInfo.bio);
    }, [userInfo.bio]);
    
    // console.log('showBET 1: ', showBET);
    // console.log('props.userInfo.bio 2: ', props.userInfo.bio);
    // console.log('bio 3: ', bio);
    
    return <div >
        <div id="thebio">
            {userInfo.bio && !showBET && <h1 id="bioresult">{bio}</h1>}
            <br />
            {userInfo.bio && !showBET && <p onClick={showBioEditorTextarea} id="editbiobutton">| edit bio |</p>}
        </div>

        {!userInfo.bio && !showBET && <p onClick={showBioEditorTextarea} id="addyourbio">Add your bio</p>}

        {showBET && <form onSubmit={handleBioSubmit} className="bio-upload">
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