import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar"
function Account() {
    const [myuser, setMyUser] = useState(null);
    const [user, setUser] = useState(null);
    const { handle } = useParams();
    console.log(handle);


    //run this as soon as page loads
    useEffect(() => {
        const getMyUser = async () => {
            try {
                

                const response = await fetch("http://localhost:5000/users/me", {
                    credentials: "include" //add this for cookies
                });
                if(!response.ok) {
                    throw new Error("Failed to fetch user");
                }
                const data = await response.json();
                setMyUser(data);
            } 
            catch (err) {
                console.log(err.message);
            }
        };

        const getUser = async () => {
            console.log(handle)
            try {
                const response = await fetch("http://localhost:5000/users/account", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    handle
                })
            })

            if(!response.ok) {
                console.log("Status", response.status)
                const text = await response.text()
                console.log(text);
                return;
            }

            const data = await response.json();
            console.log(data)
            setUser(data)
            console.log(user);

            } catch (err) {
                console.log(err.message);
            }
        };

        getMyUser();
        getUser();
    }, [handle])

    
    
    return(
        <div className="AccountBody">
            <SideBar />
             <div className="center">
                <div className="topBar">
                    <h4>${user?.handle}</h4>
                </div>
            </div>
        </div>
    )
}

export default Account