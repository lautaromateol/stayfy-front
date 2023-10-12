import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { useUser } from '../../Context/UserContext';

const Google = () => {
    const [user, setUser] = useState({})
    const { signIn, signOut } = useUser();

    const checkToken = () => {
        const token = localStorage.getItem("logged")
        if(token){
            setUser(token);
            document.getElementById("signInDiv").hidden = true;
        }else {
            document.getElementById("signInDiv").hidden = false; // Show the signInDiv if there is no token
        }
    }

    const handleCallbackResponse = async (response) => {
        //console.log("JWT: " + response.credential)
        var userObj = jwt_decode(response.credential);

        const existingUser = await checkIfUserExists(userObj.email);

  if (!existingUser) {
    await createUser(userObj);
  }

  setUser(userObj);
  signIn(response.credential);
  document.getElementById("signInDiv").hidden = true;
};

async function checkIfUserExists(email) {
  try {
    const response = await fetch('http://localhost:3001/users/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.exists;
    } else {
      console.error('Error al verificar si el usuario existe');
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function createUser(userObj) {
  try {
    const response = await fetch('http://localhost:3001/users/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObj),
    });

    if (response.ok) {
      console.log('Usuario creado con éxito');
    } else {
      console.error('Error al crear el usuario');
    }
  } catch (error) {
    console.error(error);
  }
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
    }, []);

    return(
        <div>
        <div id="signInDiv"></div>
        </div>
    )
}

export default Google
        