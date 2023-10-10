import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { useUser } from '../../Context/UserContext';
import { useNavigate } from "react-router-dom";

//JWT solo es necesario si se quiere usar datos del usuario que inicio sesion

const Google = () => {
    const [user, setUser] = useState({})
    const { signIn, signOut } = useUser();

    const checkToken = () => {
        const token = localStorage.getItem("logged")
        if(token){
            //const userObj = jwt_decode(token);
            setUser(token);
            document.getElementById("signInDiv").hidden = true;
        }else {
            document.getElementById("signInDiv").hidden = false; // Show the signInDiv if there is no token
        }
    }

    const handleCallbackResponse = (response) => {
        //console.log("JWT: " + response.credential)
        var userObj = jwt_decode(response.credential);
        setUser(userObj)
        // localStorage.setItem("logged", response.credential)
        signIn(response.credential);
        document.getElementById("signInDiv").hidden = true;
    }

    const handleSignOut = (event) => {
        setUser({})
        // localStorage.removeItem("logged")
        signOut();
        document.getElementById("signInDiv").hidden = false;
        
    }

    useEffect(()=>{
        checkToken();
        /* global google */
        
        google.accounts.id.initialize({
            client_id: "977033928878-fhtsoleu1of5a13q4psdn699t31apk5q.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large"}
        );

        //google.accounts.id.prompt(); Esta linea es para que salga automaticamente el cartel para iniciar sesion
    }, []);

    return(
        <div>
        <div id="signInDiv"></div>
        {Object.keys(user).length != 0 &&
        <button onClick={ (e) => handleSignOut(e)}>Sign out</button>
        }
        </div>
    )
}

export default Google
        