import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/nav/Nav";
import GameBoard from "./components/gameboard/GameBoard";
import Message from "./message/Message";
import ChatApp from "./components/chatApp/ChatApp";
import Login from "./pages/Login";
import GoogleAuth from "./pages/GoogleAuth";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<GameBoard />} />
        <Route path="/message" element={<Message />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/google" element={<GoogleAuth />} />
      </Routes>
      <ChatApp />
    </BrowserRouter>
  );
}

export default App;
