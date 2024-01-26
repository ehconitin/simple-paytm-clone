import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Signup } from "./routes/signup";
import { Signin } from "./routes/signin";
import { Dashboard } from "./routes/dashboard";
import Modal from "./components/sendMoneyModal";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
