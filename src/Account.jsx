import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar"
import Tweets from "../components/Tweets/Tweets"
import "./Account.css"
function Account() {
    const [myuser, setMyUser] = useState(null);
    const [user, setUser] = useState(null);
    const [allTweets, setAllTweets] = useState([]);
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

        const getUserTweets = async () => {
            try {
                const response = await fetch("http://localhost:5000/tweets/userTweets", {
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
                console.log(data);
                setAllTweets(data);


            } catch(err) {
                console.log(err.message);
            }
        };

        getMyUser();
        getUser();
        getUserTweets();
    }, [handle])


    return(
        <div className="AccountBody">
            <SideBar />
             <div className="center">
                <div className="topBar2">
                    <h4>{user?.username}</h4>
                    <p className="numTweets">{allTweets?.length} posts</p>
                </div>
                <div className="accountInfo">
                    <div className="header-profile">
                        <img src={user?.header} className="header" alt="header"></img>
                        <img src={user?.pfp} className="profilePicture2" alt="profilePicture2"></img>
                    </div>
                    <div className="accountName">
                        <h4 className="userName">{user?.username}</h4>
                        <h3 className="handle">@{user?.handle}</h3>
                    </div>
                    <div className="accountBio">
                        <h3>{user?.bio}</h3>
                    </div>
                    <div className="accountDate">
                        <p className="dateOfBirth">Born {new Date(user?.dateOfBirth).toLocaleDateString()}</p>
                        <p className="createdAt">Joined {new Date(user?.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="accountFollowing">
                        <p>{user?.following.length} following</p>
                        <p>{user?.followers.length} followers</p>
                    </div>
                    <div className="typeOfTweets">
                        <h2 className="postOption">Posts</h2>
                        <h2 className="repliesOption">Replies</h2>
                        <h2 className="mediaOption">Media</h2>
                        <h2 className="likesOption">Likes</h2>
                    </div>
                </div>
                <div className="userTweets">
                    <Tweets tweets={allTweets} setTweets={setAllTweets} user={myuser}></Tweets>
                </div>
            </div>
        </div>
    )
}

export default Account