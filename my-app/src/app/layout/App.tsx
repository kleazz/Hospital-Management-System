import { Fragment, useEffect } from "react";
import NavBar from "../../features/nav/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import Librat from "../../features/librat/dashboard/Librat";
import Kategorite from "../../features/kategorite/dashboard/Kategorite";
import Autoret from "../../features/autoret/dashboard/Autoret";
import Login from "../../features/registration/Login";
import Registration from "../../features/registration/Register";
import LibriDetails from "../../features/librat/details/LibriDetails";
import Profili from "../../features/profili/Profili";
import Lexuesit from "../../features/lexuesit/dashboard/Lexuesit";
import Footer from "../../features/footer/Footer";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Rezervimet from "../../features/rezervimet/dashboard/Rezervimet";
import Huazimet from "../../features/huazimet/dashboard/Huazimet";
import TeamTable from "../../features/andertesat/TeamTable";
import PlayerTable from "../../features/ashensoret/PlayerTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./api/authContext";
import Cookies from "js-cookie";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <Main />
      </AuthProvider>
    </QueryClientProvider>
  );
};

const Main = () => {
  const accessToken = Cookies.get('accessToken'); // Get access token from cookies
  const role = Cookies.get('role'); // Get role from cookies

  return (
    <Fragment>
      {accessToken && <NavBar />} {/* Render NavBar only if user is authenticated */}
      <Routes>
        <>
          <Route path="/home" element={<HomePage />} />
          <Route path="/details/:libriIsbn" element={<LibriDetails />} />
          <Route path="profili" element={<Profili />} />
          {role === "admin" ? ( // Check if the user is admin
            <>
              <Route path="/teams" element={<TeamTable />} />
              <Route path="/players" element={<PlayerTable />} />
              <Route path="/librat" element={<Librat />} />
              <Route path="/kategorite" element={<Kategorite />} />
              <Route path="/autoret" element={<Autoret />} />
              <Route path="/lexuesit" element={<Lexuesit />} />
              <Route path="/rezervimet" element={<Rezervimet />} />
              <Route path="/huazimet" element={<Huazimet />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/home" />} />
          )}
          <Route path="*" element={<HomePage />} />
        </>
        <>
          <Route path="/register" element={<Registration />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
        </>
      </Routes>
      <Footer />
    </Fragment>
  );
};

export default App;