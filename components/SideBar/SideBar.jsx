import { useEffect, useState } from 'react'
import homeLogo from "../../public/HomeIcon.png"
import twitterLogo from "../../public/Logo_of_Twitter.png"
import exploreLogo from "../../public/Explore.png"
import notiLogo from "../../public/notifications.png"
import "./SideBar.css"

function SideBar() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                
                const response = await fetch("http://localhost:5000/users/me", {
                    credentials: "include" //add this for cookies
                });
                if(!response.ok) {
                    throw new Error("Failed to fetch user");
                }
                const data = await response.json();
                setUser(data);
                console.log(user)
            } 
            catch (err) {
                console.log(err.message);
            }
        };
        getUser();
    }, [])
    return(
        <div className="SideBar">
            <div className="banner">
                <div className="logos">
                    <div className="TwitterIcon">
                        <img src={twitterLogo} className="sideBarLogo" alt="sideBarLogo"></img> 
                    </div>
                    <nav className="Icons">
                        <a herf="/Home">
                            <img src={homeLogo} className="sideBarLogo" alt="sideBarLogo"></img> 
                            <h3>Home</h3>
                        </a>
                        <a href="#explore">
                            <img src={exploreLogo} className="sideBarLogo" alt="sideBarLogo"></img>
                            <h3>Explore</h3>
                        </a>
                        <a href="#notis">
                            <img src={notiLogo} className="sideBarLogo" alt="sideBarLogo"></img>
                            <h3>Notifications</h3>
                        </a>
                    </nav>
                </div>
                <div className="profile">
                    <button className="myAccount">
                        <div className="pfp">
                            <img src={user?.pfp} className="profilePicture" alt="profilePicture"></img> 
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideBar;