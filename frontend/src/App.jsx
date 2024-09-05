import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import DisplayCard from "./components/DisplayCard";
import Footer from "./components/Footer";
import Olamaps from "./components/OlaMap";
import Title from "./components/Title";
import TopBar from "./components/TopBar";
import Login from "./components/Login";
import Secure from "./components/Secure";

function App() {
  return (
    <>
      {/* <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/secure" element={<Secure />} />
        </Routes>
      </Router> */}
      <div className="bg-gray-900 w-full h-full">
        <TopBar />
        <Title />
        <DisplayCard />
        <Olamaps />
        <Footer />
      </div>
    </>
  );
}

export default App;
