import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";



export default function SignIn(props) {
  let navigate = useNavigate();
  const [dataSesion, setdataSesion] = useState({
    email: "",
    password: "",
    chek: "not remenber",
  });
  const [messageError, setmessageError] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(dataSesion);
    if (dataSesion.email === process.env.REACT_APP_EMAIL) {
      if (dataSesion.password === process.env.REACT_APP_PASSWORD) {
        if (dataSesion.chek === "remember") {
          props.setislogin(true);
          localStorage.setItem(
            "userValiSesion",
            `${process.env.REACT_APP_LOGINVALIDATION}`
          );
          setTimeout(() => navigate("home"), 200);
        } else if (dataSesion.chek === "not remenber") {
          props.setislogin(true);
          sessionStorage.setItem(
            "userValiSesion",
            `${process.env.REACT_APP_LOGINVALIDATION}`
          );
          setTimeout(() => navigate("home"), 200);
        }
      } else {
        setmessageError({
          email: messageError.email,
          password: "contraseñaIncorrecta",
        });
      }
    } else {
      setmessageError({
        email: "correo incorrecto",
        password: messageError.password,
      });
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "dark.main" }}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresa Aprovisionamiento
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              error={messageError.email !== "" ? true : false}
              helperText={messageError.email}
              onChange={(e) => {
                setdataSesion({
                  email: e.target.value,
                  password: dataSesion.password,
                  chek: dataSesion.chek,
                });
                setmessageError({ email: "", password: messageError.password });
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
            />
            <FormControl
              error={messageError.password !== "" ? true : false}
              onChange={(e) => {
                setdataSesion({
                  email: dataSesion.email,
                  password: e.target.value,
                  chek: dataSesion.chek,
                });
                setmessageError({ email: messageError.email, password: "" });
              }}
              sx={{ mt: 1 }}
              required
              fullWidth
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                margin="normal"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) =>
                    setdataSesion({
                      email: dataSesion.email,
                      password: dataSesion.password,
                      chek: e.target.value,
                    })
                  }
                  value="remember"
                  color="primary"
                />
              }
              label="Recordar sesión"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvidaste la contraseña?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <props.Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>

  );
}
