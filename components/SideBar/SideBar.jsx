
import homeLogo from "../../public/HomeIcon.png"
import twitterLogo from "../../public/Logo_of_Twitter.png"
import exploreLogo from "../../public/Explore.png"
import notiLogo from "../../public/notifications.png"
import "./SideBar.css"

function SideBar() {
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
                <div className="pfp"></div>
            </div>
        </div>
    )
}

export default SideBar;