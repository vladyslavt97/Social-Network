import "./Bio.css"

export function Bio({handleBioSubmit, handleBioChange}: {handleBioSubmit: any, handleBioChange: any}) {
    // console.log("PROPS in profilePic: ", props);
    
    return <div >
            <form onSubmit={handleBioSubmit} className="file-upload">
                <h1 id="bio">BIO</h1>
                <textarea name="textarea" onChange={handleBioChange} id="textareabio"></textarea>
                <button>Submit the biography</button>
            </form>
        </div>
}