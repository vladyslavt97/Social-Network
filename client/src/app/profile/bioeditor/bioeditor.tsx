import "./Bio.css"

export function Bio({handleBioSubmit, handleBioChange, showBioEditor, openTextArea, bioData}: 
    {handleBioSubmit: any, handleBioChange: any; showBioEditor: any; openTextArea: any; bioData: any}) {
    // console.log("PROPS in profilePic: ", props);
    console.log('showBioEditor in bioeditor', showBioEditor);
    
    return <div >
        <div id="thebio">
            {showBioEditor && <h1>{bioData.bio}</h1>}
            <br />
            {showBioEditor && <p onClick={openTextArea}>| edit bio |</p>}
        </div>
        {!showBioEditor && <p onClick={openTextArea}>Add your bio</p>}
        {!showBioEditor && <form onSubmit={handleBioSubmit} className="file-upload">
                                <h1 id="bio">BIO</h1>
                                <textarea name="bioSummary" onChange={handleBioChange} id="textareabio"></textarea>
                                <button>Submit the biography</button>
                            </form>}
            
        </div>
}