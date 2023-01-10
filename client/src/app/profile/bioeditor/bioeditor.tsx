import "./Bio.css"

export function Bio({handleBioSubmit, handleBioChange, bioInDb, showBioEditorTextarea, bioData, showBioEditorButton, showBET}: 
    {handleBioSubmit: any, handleBioChange: any; bioInDb: any; showBioEditorTextarea: any; bioData: any; showBioEditorButton; showBET: any}) {
    // console.log("PROPS in profilePic: ", props);
    console.log('showBioEditor in bioeditor', bioInDb);
    
    return <div >
        <div id="thebio">
            {bioInDb && <h1>{bioInDb.bio}</h1>}
            <br />
            {bioInDb && <p onClick={showBioEditorButton}>| edit bio |</p>}
        </div>

        {!bioInDb && !showBET && <p onClick={showBioEditorTextarea}>Add your bio</p>}

        {/* some state set to false indicating that the textarea is false and will become true onClick: showBioEditorTextarea*/}
        {showBET && <form onSubmit={handleBioSubmit} className="file-upload">
                                <h1 id="bio">BIO</h1>
                                <textarea name="bioSummary" onChange={handleBioChange} id="textareabio"></textarea>
                                <button>Submit the biography</button>
                            </form>}
            
        </div>
}