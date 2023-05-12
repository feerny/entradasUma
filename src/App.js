import './App.css';
import SignIn from './pages/home/SignIn/SignIn';
import { Navigate , Route, Routes, BrowserRouter } from 'react-router-dom';
import NotFound from './pages/notFound/NotFound';
import { useState } from 'react';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

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
function App() {
  
  const [islogin, setislogin] = useState(false)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn Copyright={Copyright} />} />
          <Route exact path="/notFound" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/notFound" />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
