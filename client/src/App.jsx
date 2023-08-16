import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { Home, Form, Landing, Detail } from "./View";
import NavBar from "./components/NavBar/NavBar";
import { Paginated } from "./components/Paginated/Paginated";

const email = "prueba@gmail.com"
const password = "12345678"

function App() {
  const location = useLocation();
  const [dogs, setDogs] = useState([]);
  const [access, setAccess] = React.useState(false);
  const navigate = useNavigate();
  async function login(userData) {
    const { email, password } = userData;
    const URL = "http://localhost:3001/login/";

    try {
      const backendLogin = await axios(
        URL + `?email=${email}&password=${password}`
      );
      const { data } = backendLogin;
      const { access } = data;
      setAccess(access);
      access && navigate("/home");
    } catch (error) {
      // No se pudo hacer la solicitud al backend.
      alert(error.message);
    }
   
  }

  useEffect(() => {
    !access && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/dogs")
      .then((response) => setDogs(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className="App">
       {location.pathname === "/" ? (
        <Landing login={login} />
      ) : (
        <NavBar />
      )}
      <Routes>
        <Route path="/home" element={[<Home />]} />
        <Route path="/detail/:idRace" element={<Detail />} />
        <Route path="/create" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
