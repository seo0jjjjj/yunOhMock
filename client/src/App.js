import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/nav/Nav";
import GameBoard from "./components/gameboard/GameBoard";
import Message from "./message/Message";
import ChatBox from "./components/chatBox/ChatBox";

function App() {
  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/board" element= {<GameBoard/>} />
        <Route path="/message" element= {<Message/>} />
      </Routes>
      <ChatBox/>
    </BrowserRouter>
  );
}

export default App;
