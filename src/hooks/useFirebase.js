import { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import initializeAuth from "../Firebase/firebase.init";

initializeAuth();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        return signInWithPopup(auth, googleProvider)
        /* .then(result => {
             const user = result.user;
        }) */
    }

    const logOut = () => {
        signOut(auth)
        .then(() => {
            setUser({});
        });
    }

    //observer
    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser(user);
            } 
        });
    }, [auth]);

    return {
        user,
        logOut,
        signInUsingGoogle
    }
}

export default useFirebase;