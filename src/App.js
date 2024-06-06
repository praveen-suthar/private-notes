import LogIn from "./Features/LogIn";
import DashBoard from "./Features/Calendar/DashBoard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./Features/Calendar/Test";
import SignUp from "./Features/Calendar/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="signup" element={<SignUp/>} /> 
          <Route path="" element={<DashBoard />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
