import { useNavigate } from "react-router-dom";
import "./Home.css";
import SideBar from "../components/SideBar/SideBar"
function Home() {
    
    const navigate = useNavigate();
    return(
        <div className="homeBody">
            <SideBar />
        </div>
    )
}

export default Home;