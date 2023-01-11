import "./Bio.css"
import {useState} from "react"
// interface ResetState {
//       firstname: string,
//       lastname: string,
//       email: string,
//       password: string,
//   }

export function Bio({ bioInDb,showBET}: 
    {bioInDb: any; showBET: any}) {
    // console.log("PROPS in profilePic: ", props);
    console.log('showBioEditor in bioeditor', bioInDb);
    console.log('showBioEditor showBET', showBET);
    
    const showBioEditorTextarea = () => {//it has nothing to do with DB or STATE!!! 
        //its originally set to false and later becomes true on click
        // this.setState({ bioInDb: !this.state.bioInDb });
        this.setState({ showBET: !this.state.showBET });
        
    }
    const showBioEditorButton = () => {
        this.setState({ bioInDb: !this.state.bioInDb });
        // if(!this.state.bioInDb){
        //     this.setState({bioInDb: true});
        //     console.log('should activate the textarea');
        // } else{
        //     this.setState({bioInDb: false});
        //     console.log('should deactivate the textarea');
        // }
    }
    const handleBioSubmit = (event) => {
        event.preventDefault();
        console.log('trying to upload the bio');
        fetch('/bioupload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({textarea: this.state.bioSummary }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('data on uload bio query', data.myBio.rows[0]);
            this.setState({showBET: false});
            this.setState({bioInDb: data.myBio.rows[0]});

        })
        .catch(err => {
                console.log('er: ', err);
            });   
    }
    // const handleBioChange = (evt) => {
    //     const property = evt.target.name; // will hold 'firstname' when input for firstname is changed
    //     // will update firstname prop dynamically in this.state variable
    //     this.setState({ [property]: evt.target.value });
    // }
    const [bio, setBio] = useState(bioInDb.bio);
    const handleBio = (e) => {
        setBio(e.target.value);
        const property = e.target.name;
        this.setState({ [property]: e.target.value });
    }
    console.log('bio', bio);

    return <div >
        <div id="thebio">
            {bioInDb && !showBET && <h1 id="bioresult">{bioInDb.bio}</h1>}
            <br />
            {bioInDb.bio && !showBET && <p onClick={showBioEditorTextarea} id="editbiobutton">| edit bio |</p>}
        </div>

        {!bioInDb.bio && !showBET && <p onClick={showBioEditorTextarea} id="addyourbio">Add your bio</p>}

        {/* some state set to false indicating that the textarea is false and will become true onClick: showBioEditorTextarea*/}
        {showBET && <form onSubmit={handleBioSubmit} className="file-upload">
                                <h1 id="bio">BIO</h1>
                                <textarea name="bioSummary" 
                                onChange={handleBio} 
                                // onChange={handleBioChange}
                                id="textareabio" 
                                value={bio}
                                // onChange={e => this.setState({ text: e.target.value })}
                                // value={bioInDb.bio}
                                // onChange = {handleBio}
                                ></textarea>
                                <button>Submit the biography</button>
                            </form>}
            
        </div>
}