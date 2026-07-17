import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./Tweets.css"
import retweetLogo from "../../public/Retweet.png"
import replyLogo from "../../public/Reply.png"
import likeLogo from "../../public/Like.png"
import { addLike } from "../../src/Interaction"
import { removeLike } from "../../src/Interaction"

function Tweets({ tweets = [], setTweets, user }) {

    const likeOrRemove = async (tweetId) => {
        const response = await fetch("http://localhost:5000/tweets/likeOrRemove", {
            method: "POST",
             credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tweetId })
        });
        const data = await response.json();
        let updatedTweet;
        if(!data.liked) {
            updatedTweet = await addLike(tweetId);

        }
        else {
            updatedTweet = await removeLike(tweetId);
        }


        setTweets(prevTweets =>
                prevTweets.map(tweet =>
                    tweet._id === tweetId
                        ? {
                            ...tweet,
                            likes: updatedTweet.likes
                        }
                        : tweet
                )
            );
    }
    return (
       <>
            {tweets.toReversed().map((tweet) => {
               let liked = tweet.likes?.some(id => id.toString() === user?._id);
                return (
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
                                <button className="likeButton" onClick={() => likeOrRemove(tweet._id)}>
                                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
                                        <path d="M100 180 C100 180, 20 120, 20 70 A40 40 0 0 1 100 70 A40 40 0 0 1 180 70 C180 120, 100 180, 100 180 Z" fill={liked ? "red" : "gray"} />
                                    </svg>
                                </button>
                                <p className="numLikes">{tweet.likes?.length || 0}</p>
                            </div>
                        </div>
                        
                    </div>
                );
            })}
        </>
    );
}

export default Tweets;