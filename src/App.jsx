import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import twitterLogo from "/Logo_of_Twitter.svg.png"
import './App.css'

function App() {
   //function to handle signin
  function signIn(formData) {
    const email = formData.get("email"); 
    const password = formData.get("password");
    alert(`You inputted ${email} and ${password}`);
  }


  return(
    <div className="signInBody">
      <div className="signInBox">
        <img src={twitterLogo} className="signInLogo" alt="signInLogo"></img>
        <div className="signInRightSide">
          <div className="signInText1">
            <span className="text1">Happening now</span>
          </div>
          <div className="signInText2">
            <span className="text2">Join Today.</span>
          </div>
          {/* action calls function upon submission*/}
          <form action={signIn}> 
            <input
              type="email"
              name="email"
              placeholder="Enter email"
            
            />
            <input 
              type="password"
              name="password"
              placeholder="Enter password"
            />

            <button type="submit">signIn</button>
          </form>
       </div>
      </div>
    </div>
  )
}

export default App
