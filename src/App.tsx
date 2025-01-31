import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/feed";
import PageLayout from "./pages/layout";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Cookies from "universal-cookie";
import { useEffect } from "react";
const App = () => {
  const cookies = new Cookies();
  //store the token everytime it change in the cookie
  const { getToken } = useKindeAuth();
  useEffect(() => {
    const fetchToken = async () => {
      if (getToken) {
        const token = await getToken();

        if (token) {
          cookies.set("token", token);
        }
      }
    };

    fetchToken();
  }, [getToken]);
  return (
    <Router>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/" element={<PageLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
