import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./Post.css"

function Post() {
    const [user, setUser] = useState(null);
    const [text, setText] = useState(null);

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

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:5000/tweets/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", //add this for cookies
            body: JSON.stringify({
                text: text
            })
      })


      const data = await response.json();
      console.log(data)
      if(!response.ok) {
        console.log("response failed")
        alert("Could not post tweet")
        return;
      }


    } catch (err) {
      console.log(err.message);
    }
    }

    return(
        <div className="posts">
            <div className="profile">
                <Link to={`/account/${user?.handle}`}>
                    <img src={user?.pfp} className=
                    "profilePicture" alt="profilePicture"></img> 
                </Link>
            </div>
            <div className="tweetText">
                <textarea id="tweetText" placeholder="What's happening?" row="4" cols="50" onChange={(event) => setText(event.target.value)}/>
                <div className="tweetOptions">
                    <button className="post2" onClick={handleSubmit}>Post</button>
                </div>
            </div>

        </div>
    )
}

export default Post;