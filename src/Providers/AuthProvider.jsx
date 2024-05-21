import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import useAxiosSecure from "../Hooks/useAxiosSecure";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure(user);

  const googleProvider = new GoogleAuthProvider();

  // create users with email & password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //sign in with email & password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign in with google
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // update user
  const updateUser = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    })
  }

  // logout
  const logOut = () => {
    return signOut(auth);
  }


  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
        
        setUser(currentUser);
        console.log('observing user of', user);
        const userEmail = currentUser?.email;

        if(userEmail){
          axiosSecure.post('/jwt', {email: userEmail})
          .then(res => {
            const token = res.data.token;
            if(token){
              setLoading(false);
              localStorage.setItem("access-token", token)
            }
          })
          .catch(error => {
            console.log(error);
          })
        } else {
          localStorage.removeItem('access-token');
          setLoading(false);
        }
    })
  }, [axiosSecure, user])

  const info = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    updateUser,
    logOut
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
