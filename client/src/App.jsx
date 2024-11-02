import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/core/Header";
import Message from "./pages/Message";

function App() {
  return (
    <div className="h-screen flex flex-col bg-white text-black">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="message/:id" element={<Message />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>      
  );
}

export default App;
