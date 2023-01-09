import { Link } from "react-router-dom";

export function Signout({signOut}:{
    signOut: any;
}) {        
    return <div>
            <form onClick={signOut}>
                <img src="signout.png" alt="empty" id="signout"/>
            </form>
            </div>
}