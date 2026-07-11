import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./Tweets.css"
import retweetLogo from "../../public/Retweet.png"
import replyLogo from "../../public/Reply.png"
import likeLogo from "../../public/Like.png"
import { addLike } from "../../src/Interaction"

function Tweets({ tweets = [], user }) {

    return (
       tweets.toReversed().map((tweet) => (
            <div className="tweetBody" key={tweet._id}>
                <div className="tweetTop">
                    <img src={tweet.pfpkey} className="profilePicture" alt="profilePicture"></img>
                    <h4 className="username">{tweet.username}</h4>
                    <p className="handle2">@{tweet.handle}</p>
                    <p className="dateOfTweet2">{new Date(tweet?.dateOfTweet).toLocaleDateString()}</p>
                </div>

                <div className="tweetText">
                    <p id="tweetText">{tweet.text}</p>
                </div>

                <div className="tweetDetails">
                    <div className="repliesVisuals">
                        <img src={replyLogo} className="replyLogo"></img>
                        <p className="numReplies">{tweet.replies.length}</p>
                    </div>
                    <div className="retweetsVisuals">
                        <img src={retweetLogo} className="retweetLogo"></img>
                        <p className="numRetweets">{tweet.retweets.length}</p>
                    </div>
                    <div className="likesVisuals">
                        <button className="likeButton" onClick={() => addLike(tweet._id)}>
                            <img src={likeLogo} className="likeLogo"></img>
                        </button>
                        <p className="numLikes">{tweet.retweets.length}</p>
                    </div>
                </div>
                
            </div>
       ))
    );
}

export default Tweets;