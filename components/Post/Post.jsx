import { useEffect, useState } from 'react'
import "./Post.css"

function Post() {
    const [user, setUser] = useState(null);

    //run this as soon as page loads
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
        <div className="posts">
            <div className="profile">
                <img src={user?.pfp} className="profilePicture" alt="profilePicture"></img> 
            </div>
            <div className="tweetText">
                <textarea id="tweetText" placeholder="What's happening?" row="4" cols="50"/>
                <div className="tweetOptions">
                    <button className="post2">Post</button>
                </div>
            </div>

        </div>
    )
}

export default Post;