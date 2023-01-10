import "./Bio.css"

export function Bio({handleBioSubmit, handleBioChange, bioExists, openTextArea}: 
    {handleBioSubmit: any, handleBioChange: any; bioExists: any; openTextArea: any}) {
    // console.log("PROPS in profilePic: ", props);
    console.log('bioExists', bioExists);
    
    return <div >
        {!bioExists && <p onClick={openTextArea}>Add your bio</p>}
        {bioExists && <form onSubmit={handleBioSubmit} className="file-upload">
                <h1 id="bio">BIO</h1>
                <textarea name="bioSummary" onChange={handleBioChange} id="textareabio"></textarea>
                <button>Submit the biography</button>
            </form>}
            
        </div>
}