import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import twitterLogo from "/Logo_of_Twitter.svg.png"
import './App.css'

function App() {
  return(
    <div className="signInBody">
      <div className="signInBox">
        <img src={twitterLogo} className="signInLogo" alt="signInLogo"></img>
        <div className="SignInText1">
          <span className="text1">Happening now</span>
        </div>
        <div className="SignInText2">
          <span className="text2">Join Today</span>
        </div>
      </div>
    </div>
  )
}

export default App
