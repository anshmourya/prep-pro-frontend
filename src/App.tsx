import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/feed";
import PageLayout from "./pages/layout";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import useUser from "./apis/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import Tags from "./pages/tags";
const App = () => {
  const cookies = new Cookies();
  const { checkUser, createUser } = useUser();

  const { refetch: refetchUser } = useQuery({
    queryKey: ["user", "check"],
    queryFn: async () => {
      if (!user?.id) return null;
      const response = await checkUser(user.id);
      return response.data;
    },
    enabled: false,
  });

  //register the user
  const { mutate: registerUser } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      refetchUser();
    },
  });

  //store the token everytime it change in the cookie
  const { getToken, isAuthenticated, user } = useKindeAuth();
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

  useEffect(() => {
    const handleUserAuth = async () => {
      if (isAuthenticated && user) {
        const userExists = await refetchUser();
        if (
          !userExists.data?.found &&
          user.email &&
          user.given_name &&
          user.id
        ) {
          const newUuser = {
            name: user.given_name,
            email: user.email,
            kindeId: user.id,
          };
          registerUser(newUuser);
        }
      }
    };

    handleUserAuth();
  }, [isAuthenticated, user]);

  
  return (
    <Router>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/" element={<PageLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feed" element={<Feed />} />
        </Route>
        <Route path="/tags" element={<Tags />} />
      </Routes>
    </Router>
  );
};

export default App;
