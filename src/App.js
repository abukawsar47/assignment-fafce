import { Route, Routes } from "react-router-dom";
// import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./NotFound";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";


function App() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-12">
        <Routes>
          <Route path="/" element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }></Route>
          <Route path="/contact" element={
            <RequireAuth>
              <Contact />
            </RequireAuth>
          }></Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
