import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="274604613580-bosj58fvqqhlgn9m2g7bilt8abbheoah.apps.googleusercontent.com">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
