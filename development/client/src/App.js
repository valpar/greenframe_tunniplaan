import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./App.css";
import Home from "./pages/Home";
import UserList from "./pages/UserList";

function App() {
  return (
    <GoogleOAuthProvider clientId="274604613580-bosj58fvqqhlgn9m2g7bilt8abbheoah.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
