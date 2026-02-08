import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import twitterLogo from "/Logo_of_Twitter.svg.png"
import './App.css'
import { checkValid } from "./verify"
import CreateAccount from "../components/CreateAccount/CreateAccount";
import bcryptjs from "bcryptjs";


function App() {
  //hook for form data
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [accountData, setAccountData] = useState({
    username: "",
    handle: "",
    email: "",
    password: "",
    date: ""
  });
  //hook for popup
  const [accountPopup, setAccountPopup] = useState(false);
  
  const handleChange = (event) => {
    setFormData({
      ...formData,
      //actual html element
      [event.target.name]: event.target.value
    });
  };

  const accountChange = (event) => {
    setAccountData({
      ...accountData,
      [event.target.name]: event.target.value
    })
  }

  const signIn = async (event) => {
    //stop page reloading
    event.preventDefault();

    const { email, password} = formData

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

  const signUp = async (event) => {
    event.preventDefault();
    const { username, handle, email, password, date } = accountData;
    
    if(!checkValid(password)) {
      alert("Password has no uppercase");
      return;
    }

    
  
    try {
      //hash password before storing
      const saltRounds = 10;
      const newPassword = bcryptjs.hashSync(password, saltRounds);
      const response = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          handle: handle,
          email: email,
          password: newPassword,
          date: date
        })

      });
      

      const data = await response.json();
      if(!response.ok) {
        console.log("response failed");
        return
      }
    } catch(err) {
      console.log(err.message)
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
          <button className="signUp" onClick={() => setAccountPopup(true)}>Create account</button>
          <CreateAccount trigger={accountPopup} setTrigger={setAccountPopup}>
            <form onSubmit={signUp}>
              <br/>
              <label for="username">Username:</label><br/>
              <input
                type="text"
                name="username"
                placeholder="Create Username"
                value={accountData.username}
                onChange={accountChange}
              /> 
              <label for="handle">Twitter handle:</label><br/>
              <input
                type="text"
                name="handle"
                placeholder="Create twitter handle"
                value={accountData.handle}
                onChange={accountChange}
              />
              <label for ="email">Email:</label><br/>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={accountData.email}
                onChange={accountChange}
              />
              <label for ="password">Password:</label><br/>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={accountData.password}
                onChange={accountChange}
              />
              <label for ="handle">Date of Birth:</label><br/>
              <input
                type="date"
                name="date"
                value={accountData.date}
                onChange={accountChange}
              />
              <button class="submit" type="submit">Create Account</button>
            </form>
          </CreateAccount>
       </div>
      </div> 
    </div>
  )
}

export default App
