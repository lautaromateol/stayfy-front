import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";
import { useUser } from '../../Context/UserContext';

//JWT solo es necesario si se quiere usar datos del usuario que inicio sesion

const Google = () => {
    const [user, setUser] = useState({})
    const { signIn, signOut } = useUser();
    const userContexto = useUser(user);
    const navigate = useNavigate();

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
<<<<<<< HEAD
        localStorage.setItem("logged", response.credential)
=======
        // // localStorage.setItem("jwtToken", response.credential)
        signIn(response.credential);
        //insertar en la bd 
>>>>>>> a9bb89f (logueo context global)
        document.getElementById("signInDiv").hidden = true;
        navigate("/");
    }

    const handleSignOut = (event) => {
        setUser({})
        localStorage.removeItem("logged")
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
    }, [navigate]);

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
        