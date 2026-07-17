export async function addLike(tweetId) {
    try {
        const response = await fetch("http://localhost:5000/tweets/addLike", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tweetId })
        });

        const data = await response.json();
        if(!response.ok) {
            console.log(data);
        }
    } catch(err) {
        console.log(err.message)
    }
}

export async function removeLike(tweetId) {
    try {
        const response = await fetch("http://localhost:5000/tweets/removeLike", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ tweetId })
        });
        const data = await response.json();
        if(!response.ok) {
            console.log(data);
        }
    } catch(err) {
        console.log(err.message);
    }
}