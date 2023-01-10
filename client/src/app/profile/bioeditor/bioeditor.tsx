import "./Bio.css"

export function Bio({handleBioSubmit, handleBioChange, bioExists, openTextArea, bioData}: 
    {handleBioSubmit: any, handleBioChange: any; bioExists: any; openTextArea: any; bioData: any}) {
    // console.log("PROPS in profilePic: ", props);
    console.log('bioExists', bioExists);
    
    return <div >
        <div id="thebio">
        <h1>{bioData.bio}</h1><p>edit bio</p>
        </div>
        {!bioExists && <p onClick={openTextArea}>Add your bio</p>}
        {bioExists && <form onSubmit={handleBioSubmit} className="file-upload">
                <h1 id="bio">BIO</h1>

                <textarea name="bioSummary" onChange={handleBioChange} id="textareabio"></textarea>
                <button>Submit the biography</button>
            </form>}
            
        </div>
}