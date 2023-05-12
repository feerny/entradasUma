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
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export default function SignIn(props) {
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
        console.log("inicio de sesion correcto");
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

  return (
    <ThemeProvider theme={theme}>
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
            <TextField
              error={messageError.password !== "" ? true : false}
              helperText={messageError.password}
              onChange={(e) => {
                setdataSesion({
                  email: dataSesion.email,
                  password: e.target.value,
                  chek: dataSesion.chek,
                });
                setmessageError({ email: messageError.email, password: "" });
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
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
    </ThemeProvider>
  );
}
