import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import twitterLogo from "/Logo_of_Twitter.svg.png"
import './App.css'
import { checkValid } from "./verify"


function App() {
  //hook for form data
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  
  const handleChange = (event) => {
    setFormData({
      ...formData,
      //actual html element
      [event.target.name]: event.target.value
    });
  };


  const signIn = async (event) => {
    //stop page reloading
    event.preventDefault();

    const { email, password} = formData

    if(!checkValid(password)) {
      alert("Password has no uppercase");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/users/login?email=${encodeURIComponent(email)}`)
      const data = await response.json()
      if(!response.ok) {
        console.log("response failed")
        return;
      }

    } catch (err) {
      console.log(err.message);
    }
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
          <form onSubmit={signIn}> 
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            
            />
            <input 
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />

            <button class="submit" type="submit">Sign In</button>
          </form>
          <button className="signUp">Create account</button>
       </div>
      </div>
    </div>
  )
}

export default App
