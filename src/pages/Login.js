import React, { useState, useEffect } from "react"
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendEmailVerification, updatePhoneNumber } from "firebase/auth";
import { auth } from '../config/firebase'

const initialState = { email: "", password: "" }

export default function Login() {

  const [state, setState] = useState(initialState)
  const [user, setUser] = useState({})

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        console.log(user)
        setUser(user)
        // ...
      } else {
        // User is signed out
        console.log("User is logged out")
        // ...
      }
    });
    console.log(auth.currentUser)
  }, [])

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(state)

    const { email, password } = state

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        console.log("User LoggedIn successful")
        console.log(userCredential)
        console.log(user)
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.error(error)
        // ..
      });
  }

  const handleLogout = () => {

    signOut(auth)
      .then(() => {
        console.log("User logged out")
        setUser({})
      })
      .catch((err) => {

        console.error(err)
      })
  }

  const showAuthUser = () => {

    console.log(auth.currentUser)
    sendEmailVerification(auth.currentUser)

    .then(()=>{
      console.log("Email sent!")

    })
    .catch((err)=>{
      console.log(err)
    });
  }


  const updateUserProfile = () => {
    const user = auth.currentUser

    updateProfile(user, {
      displayName: "M. Ali Haider", photoURL: "https://res.cloudinary.com/dnmwb1s5x/image/upload/v1661093845/WhatsApp_Image_2021-06-10_at_7.48.24_PM_cnqoxd.jpg"

    }).then(() => {
      console.log("Profile updated!")
      // ...
    }).catch((err) => {
      // An error occurred
      console.error(err)
      // ...
    });
  }




  return (

    <main >
      <div className='py-5 w-100'>

        <div className="container">

          {user.email ?
            <div className="row">
              <div className="col text-center">
                <img src={user.photoURL} alt={`${user.email} Profile Pic`} className='imp-fluid' />
                <h2 className="text-white">User Email: {user.email} </h2>
                <h2 className="text-white">User UID: {user.uid} </h2>
                <h2 className="text-white">User Display Name: {user.displayName} </h2>


                <button className=" btn btn-danger" onClick={handleLogout}>Logout</button><br />
                <button className=" btn btn-info my-3" onClick={showAuthUser}>Show Auth Current User</button><br />
                <button className=" btn btn-success" onClick={updateUserProfile}>Update User Profile</button><br />
              </div>
            </div>
            :
            <div className="row">
              <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg3">

                <div className="card p-2 p-md-4 p-lg-5">
                  <h2 className="text-center mb-4">
                    Login Form
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col">
                        <input type="email" className="form-control" placeholder="Email" name='email' onChange={handleChange} />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col">
                        <input type="password" className="form-control" placeholder="Password" name='password' onChange={handleChange} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col text-center">
                        <button className='btn btn-outline-success w-50'>Login</button>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>

          }



        </div>
      </div>
    </main>
  );
}

