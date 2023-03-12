import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/navbar/Navbar";
import Video from "./pages/Video";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/videos/:videoId" element={<Video/>} />
                </Routes>
            <Footer />
        </Router>
    )
}

export default App;
