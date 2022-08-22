
import './App.css';

import firebaseConfig from './Firebase-config';
import firebase from 'firebase/compat/app';
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";
import { useState } from 'react';


 firebase.initializeApp(firebaseConfig);

  
function App() {
const [user ,setUser] = useState({
  isSignIn:false,
  name:'',
  email:'',
  photo:'',
})
  const provider = new GoogleAuthProvider();  
 const hendelSignIn = () =>{
  const auth = getAuth();
  signInWithPopup(auth, provider)
  .then(res => {
    const {displayName , email , photoURL}=res.user
    const signInUser ={
      isSignIn:true,
      name:displayName,
      email:email,
      photo:photoURL,
    }
    setUser(signInUser)
    
  })
  .catch(error => {
      console.log(error);
      console.log(error.message)
  }) 
 }
 const hendelSignOut = () =>{
  const auth = getAuth();
  signOut(auth)
  .then(res => {
    const signOutUser ={
      isSignIn:false,
      name:'',
      email:'',
      photo:'',
    }
    setUser(signOutUser)
  })
 }
  return (
    <div className="App">
      {
        user.isSignIn 
        ?<button onClick={hendelSignOut}>Sign out</button>
        :<button onClick={hendelSignIn}>Sign In</button>
      }
      
      {
        user.isSignIn && <div>
             <h3>hello {user.name}</h3>
             <p>{user.name}</p>
             <img src={user.photo} alt="" />
             </div>
      }

      
    </div>
  );
}

export default App;
