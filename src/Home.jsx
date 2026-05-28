import { useNavigate } from "react-router-dom";
import "./Home.css";
import SideBar from "../components/SideBar/SideBar"
import Post from "../components/Post/Post"
function Home() {
    
    const navigate = useNavigate();
    return(
        <div className="homeBody">
            <SideBar />
            <div className="center">
                <div className="topBar">
                    <button className="fyp">For you</button>
                    <button className="following">Following</button>
                </div>
                <Post />
            </div>
        </div>
    )
}

export default Home;