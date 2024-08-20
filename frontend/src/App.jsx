import "./App.css";
import DisplayCard from "./components/DisplayCard";
import Footer from "./components/Footer";
import Olamaps from "./components/OlaMap";
import Title from "./components/Title";
import TopBar from "./components/TopBar";

function App() {
  return (
    <>
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
