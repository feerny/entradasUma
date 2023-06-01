import React from "react";
import ResponsiveAppBar from "../../ui/navbar/Navbar.jsx";
import ExcelHome from "../../ui/excelhome/ExcelHome.jsx";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ModalUso from "../../components/modalUso/ModalUso.jsx";
import CachedIcon from '@mui/icons-material/Cached';
import { useTheme } from "@emotion/react";

//genera animacion de slide para el dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Home(props) {
  //estado del paso para el modal
  const [activeStep, setActiveStep] = React.useState(0);
  //llama al tema del aplicativo
  const theme = useTheme();
  //estado del dialog para abrir y cerrar
  const [open, setOpen] = React.useState(false);
  //funcion para abrir el dialog de modo de uso
  const handleClickOpen = () => {
    //actualiza el estado
    setOpen(true);
  };
  //funcion para cerrar el modal de modo de uso
  const handleClose = () => {
    //actualiza el estado
    setOpen(false);
  };
  return (
    <div>
      <ResponsiveAppBar
        handleClickOpen={handleClickOpen}
        setislogin={props.setislogin}
      ></ResponsiveAppBar>
      <Typography
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          color: "primary.main",
          letterSpacing: ".1rem",
        }}
        variant="h2"
      >
        GENERAR ENTRADAS
      </Typography>
      <ExcelHome></ExcelHome>
      <props.Copyright sx={{ mt: 8, mb: 4 }} />
      <Dialog
        open={open}
        maxWidth="md"
        fullWidth
        sx={{ "& .MuiDialog-paper": { maxWidth: "100vw", maxHeight: "95vw" } }}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderBottom: `1px solid ${theme.palette.primary.dark}`,
          }}
        >
          {"Paso a paso"}
          <CachedIcon onClick={()=>setActiveStep(0)} sx={{cursor:"pointer"}} />
        </DialogTitle>
        <DialogContent>
          <ModalUso setActiveStep={setActiveStep} activeStep={activeStep}  />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
