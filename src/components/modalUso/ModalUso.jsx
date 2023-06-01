import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Tooltip from "@mui/material/Tooltip";

//data de cada paso
const steps = [
  {
    label: "Paso 1",
    description:
      "Copia las siguientes columnas con toda su informacion del indicador de cumplimiento: Proveedor/Centro suministrador, Documento compras, fecha entrega CKD, Fecha de entrega Propuesta, Fecha entrega Real., Material, Texto breve, Lead Time, Cantidad de reparto",
    image: "/assets/images/paso1.png",
    width: "",
  },
  {
    label: "Paso 2",
    description:
      "Pega las columnas copiadas en una nueva hoja de otro archivo excel y guardalo donde desees",
    image: "/assets/images/paso2.png",
    width: "900",
  },
  {
    label: "Paso 3",
    description:
      "Genera MB51 desde sap y guardarlo donde desees sin modificarlo, las columnas deben ser las siguientes en el mismo orden: Documento material, Material, Texto breve de material, Fe.contabilización, Hora de entrada, Centro, Almacén, Clase de movimiento, Fecha de documento, Proveedor, Cantidad, Pedido, Referencia, Posición, Lote, Impte.mon.local, Fecha de entrada, Texto de clase-mov., Nombre del usuario, Texto cab.documento, Pos.pedido, cliente, Orden, Nº hoja de ruta operaciones",
    image: "/assets/images/paso3.png",
    width: "1250",
  },
  {
    label: "Paso 4",
    description:
      'Seleccione el primer archivo con las columnas copiadas del indicador de cumplimiento en el espacio de "Listado de control"',
    image: "/assets/images/paso4.png",
    width: "",
  },
  {
    label: "Paso 5",
    description:
      'Seleccione el segundo archivo(MB51) que genero de sap en el espacio de "Listado de MB51"',
    image: "/assets/images/paso5.png",
    width: "",
  },
  {
    label: "Paso 6",
    description:
      'Una vez seleccionados ambos archivos haga click en el boton "Generar" y espere a que se descarge el nuevo archivo con los datos calculados',
    image: "/assets/images/paso6.png",
    width: "",
  },
  {
    label: "Paso 7",
    description:
      "Al abrir el archivo generado dar si en el mensaje de advertencia y luego en cerrar",
    image: "/assets/images/paso7.png",
    width: "",
  },
  {
    label: "Explicacion estado",
    description:
      "En la columna estado encontrara 3 posibles estados dependiendo del resultado del calculo",
    image: "/assets/images/paso8.png",
    width: "",
  },
];

export default function ModalUso(props) {
  //llama el tema de la app
  const theme = useTheme();

  //estado del modal de la imagen
  const [open, setOpen] = React.useState(false);
  //estado del hover de la imagen
  const [isHovered, setIsHovered] = React.useState(false);

  //funcion que cambia el estado al paso siguiente
  const handleNext = () => {
    //actualiza estado del paso al siguiente paso
    props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  //funcion que cambia el estado al paso anterior
  const handleBack = () => {
    //actualiza estado del paso al anterior paso
    props.setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  //funcion para actualizar el estado del modal de la imagen
  const handleImageClick = () => {
    //actualiza el estado del modal de la imagen
    setOpen(true);
  };

  //funcion para actualizar el estado del modal de la imagen
  const handleClose = () => {
    //actualiza el estado del modal de la imagen
    setOpen(false);
  };

  //funcion para actualizar el estado del hover de la imagen
  const handleMouseEnter = () => {
    //actualiza el estado del hover de la imagen a true
    setIsHovered(true);
  };
  //funcion para actualizar el estado del hover de la imagen
  const handleMouseLeave = () => {
    //actualiza el estado del hover de la imagen a false
    setIsHovered(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: 600,
        mx: "auto",
        flexGrow: 1,
        p: 2,
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h4">{steps[props.activeStep].label}</Typography>
      </Paper>
      <Box
        sx={{
          maxWidth: 600,
          width: "100%",
          p: 2,
          mt: 2,
          textAlign: "center",
        }}
      >
        {steps[props.activeStep].description}
      </Box>
      <Tooltip title="click para ampliar">
        <Box
          component="img"
          onClick={handleImageClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            margin: "0 auto",
            cursor: "pointer",
            maxWidth: 400,
            width: "100%",
            p: 2,
            mt: 2,
            textAlign: "center",
            filter: isHovered ? "brightness(120%)" : "brightness(100%)",
            transition: "filter 0.3s ease-in-out",
          }}
          src={steps[props.activeStep].image}
          alt={steps[props.activeStep].label}
        />
      </Tooltip>
      <MobileStepper
        variant="progress"
        steps={steps.length}
        position="static"
        activeStep={props.activeStep}
        sx={{ maxWidth: "100%", flexGrow: 1, mt: 2 }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={props.activeStep === steps.length - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={props.activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{ "& .MuiDialog-paper": { maxWidth: "100vw", maxHeight: "100vw" } }}
      >
        <DialogTitle>{steps[props.activeStep].label}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <img
            width={steps[props.activeStep].width}
            src={steps[props.activeStep].image}
            alt={steps[props.activeStep].label}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
