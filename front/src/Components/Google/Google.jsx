import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"

//JWT solo es necesario si se quiere usar datos del usuario que inicio sesion

const Google = () => {
    const [user, setUser] = useState({})

    const handleCallbackResponse = (response) => {
        //console.log("JWT: " + response.credential)
        var userObj = jwt_decode(response.credential);
        console.log(userObj)
        setUser(userObj)
        document.getElementById("signInDiv").hidden = true;
    }

    const handleSignOut = (event) => {
        setUser({})
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(()=>{
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
        