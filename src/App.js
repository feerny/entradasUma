import './App.css';
import { lazy, Suspense } from 'react';
import SignIn from './pages/home/SignIn/SignIn';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Home from './pages/home/Home';
import { createTheme, ThemeProvider } from "@mui/material/styles";

//creacion de tema de la pagina 
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#7B89D8",
    },
  },
});

//pie de la pagina con Copyright
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link target="__blank" color="inherit" href="https://github.com/feerny">
        Felipe Ferrer
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const NotFound = lazy(() => import('./pages/notFound/NotFound'));

function App() {
  //guarda la sesion
  const [islogin, setislogin] = useState(false)
  //carga la sesion si se encuentra guardada
  useEffect(() => {
    if (localStorage.getItem("userValiSesion") === process.env.REACT_APP_LOGINVALIDATION || sessionStorage.getItem("userValiSesion") === process.env.REACT_APP_LOGINVALIDATION) {
      setislogin(true)
    }
  }, [])


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={islogin === true ? <Navigate to="/home" /> : <SignIn setislogin={setislogin} Copyright={Copyright} />} />
            <Route exact path="/home" element={islogin === true ? <Home setislogin={setislogin} Copyright={Copyright} /> : <Navigate to="/" />} />
            <Route exact path="/notFound" element={<Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>} />
            <Route path="*" element={<Navigate to="/notFound" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div >
  );
}

export default App;
