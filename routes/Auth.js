import jwt from "jsonwebtoken";

export const jwtAuth = (req, res, next) => {
    //get token from cookie
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Not logged in"});
    }

    try {
        //pull data from token and attach to request
        const userID = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = userID.userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}