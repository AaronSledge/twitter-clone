import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

function App() {
    //have webpage go straight to sign in page.
    return (
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
        </Routes>
    );
}

export default App;