import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import SendIcon from "@mui/icons-material/Send";
import * as React from "react";
import * as XLSX from "xlsx";
import PostAddIcon from "@mui/icons-material/PostAdd";

export default function ExcelHome() {
  const [open, setOpen] = React.useState(false);
  const [errorFile, seterrorFile] = React.useState({
    file1: false,
    file2: false,
    file3: false,
  });

  const [objet1, setobjet1] = React.useState([]);
  const [objet2, setobjet2] = React.useState([]);
  var objetFinal = [];

  React.useEffect(() => {
    setTimeout(() => {
      if (open) {
        if (
          errorFile.file1 === false &&
          errorFile.file2 === false &&
          errorFile.file3 === false
        ) {
          setOpen(false);
        }
      }
    }, 5000);
    // eslint-disable-next-line
  }, [open]);

  const handleFileUpload = async(event) => {
    setOpen(true);
    const file = await event.target.files[0];
    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      seterrorFile({
        file1: false,
        file2: errorFile.file2,
        file3: errorFile.file3,
      });
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        jsonData.forEach((data) => {
          setobjet1((prevArray) => [
            ...prevArray,
            {
              Proveedor: data[0],
              DocumentoCompra: data[1],
              Material: data[5],
              textoBreve: data[6],
              cantidadReparto: data[8],
            },
          ]);
        });
      };

      reader.readAsArrayBuffer(file);
    } else {
      seterrorFile({
        file1: true,
        file2: errorFile.file2,
        file3: errorFile.file3,
      });
    }
    setOpen(false);
    console.log(objet1);
  };
  const handleFileUpload2 = async(event) => {
    setOpen(true);
    const file = await event.target.files[0];
    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      seterrorFile({ file1: errorFile.file1, file2: false });
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        jsonData.forEach((data) => {
          setobjet2((prevArray) => [
            ...prevArray,
            {
              Material: data[1],
              Pedido: parseInt(data[11]),
              cantidad: data[10],
              fechaEntrada: data[16],
            },
          ]);
        });
      };

      reader.readAsArrayBuffer(file);
    } else {
      seterrorFile({ file1: errorFile.file1, file2: true });
    }

    setOpen(false);
    console.log(objet2);
  };

  const clickGenerar = (e) => {
    e.preventDefault();
    if (objet1.length > 0 && objet2.length > 0) {
      setOpen(true);
      let suma = 0;
      let promFecha = [];
      objet1.forEach((data) => {
        const datafilter = objet2.filter(
          (data2) =>
            data2.Material === data.Material &&
            data2.Pedido === data.DocumentoCompra
        );
        datafilter.forEach((data4) => {
          promFecha.push(data4.fechaEntrada);
          suma = suma + data4.cantidad;
        });
        function getAverageAge(users) {
          return users.reduce((prev, user) => prev + user, 0) / users.length;
        }

        objetFinal.push({
          Proveedor: data.Proveedor,
          DocumentoCompra: data.DocumentoCompra,
          Material: data.Material,
          textoBreve: data.textoBreve,
          cantidadReparto: data.cantidadReparto,
          cantidadEntrada: suma,
          fecha: getAverageAge(promFecha),
          estado: `${
            isNaN(getAverageAge(promFecha))
              ? "NO ENCONTRADO"
              : suma > data.cantidadReparto
              ? "REVISAR"
              : "OK"
          }`,
        });
        promFecha = [];
        suma = 0;
      });
      setTimeout(() => {
        objetFinal.shift();
        const newWorkbook = XLSX.utils.book_new();
        const newWorksheet = XLSX.utils.json_to_sheet(objetFinal);
        XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Entradas");
        XLSX.writeFile(newWorkbook, "Entradas.xlsx");
        setOpen(false);
      }, 3000);
    } else {
      console.log("entro error");
      seterrorFile({
        file1: errorFile.file1,
        file2: errorFile.file2,
        file3: true,
      });
      setOpen(false);
    }
  };

  return (
    <Box onSubmit={(e) => clickGenerar(e)} component={"form"}>
      <Grid
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "60px" }}
        container
        spacing={2}
      >
        <Grid item xs={5.5}>
          <Paper
            sx={{
              padding: "60px 0px 60px 0px",
            }}
            elevation={7}
          >
            <FormControl
              helperText="Incorrect entry."
              error={errorFile.file1 ? true : false}
              required
              variant="standard"
            >
              <InputLabel htmlFor="input-with-icon-adornment">
                Listado del control
              </InputLabel>
              <Input
                onChange={handleFileUpload}
                type="file"
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <PostAddIcon />
                  </InputAdornment>
                }
              />
              {errorFile.file1 ? (
                <FormHelperText id="component-error-text">
                  Solo archivos excel
                </FormHelperText>
              ) : null}
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={5.5}>
          <Paper
            sx={{
              padding: "60px 0px 60px 0px",
            }}
            elevation={7}
          >
            <FormControl
              error={errorFile.file2 ? true : false}
              required
              variant="standard"
            >
              <InputLabel htmlFor="input-with-icon-adornment">
                Listado de MB51
              </InputLabel>
              <Input
                onChange={handleFileUpload2}
                type="file"
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <PostAddIcon />
                  </InputAdornment>
                }
              />
              {errorFile.file2 ? (
                <FormHelperText id="component-error-text">
                  Solo archivos excel
                </FormHelperText>
              ) : null}
            </FormControl>
          </Paper>
        </Grid>
      </Grid>

      <Button
        disabled={errorFile.file1 ? true : errorFile.file2 ? true : false}
        type="submit"
        sx={{ marginTop: "80px" }}
        variant="contained"
        endIcon={<SendIcon />}
      >
        GENERAR
      </Button>
      {errorFile.file3 ? (
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6} sx={{ marginTop: "20px" }}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Archivos no coinciden con los solicitados —{" "}
              <strong>Subirlos como se indica en la guia de uso</strong>
            </Alert>
          </Grid>
        </Grid>
      ) : null}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
