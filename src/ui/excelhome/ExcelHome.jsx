import * as React from "react";

import * as XLSX from "xlsx";

export default function ExcelHome() {
  var objet1 = [];
  var objet2 = [];
  var objetFinal = [];
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      jsonData.forEach((data) => {
        objet1.push({
          Proveedor: data[0],
          DocumentoCompra: data[1],
          Material: data[5],
          textoBreve: data[6],
          cantidadReparto: data[8],
        });
      });

    };

    reader.readAsArrayBuffer(file);
  };
  const handleFileUpload2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      jsonData.forEach((data) => {
        objet2.push({
          Material: data[1],
          Pedido: parseInt(data[11]),
          cantidad: data[10],
          fechaEntrada: data[16],
        });
      });

    };

    reader.readAsArrayBuffer(file);
  };

  const clickGenerar = () => {
    var suma = 0;
    var promFecha = [];
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
        Proveedor:data.Proveedor,
        DocumentoCompra:data.DocumentoCompra,
        Material:data.Material,
        textoBreve:data.textoBreve,
        cantidadReparto:data.cantidadReparto,
        cantidadEntrada:suma,
        fecha:getAverageAge(promFecha),
        estado:`${isNaN(getAverageAge(promFecha))?"NO ENCONTRADO":suma>data.cantidadReparto?"REVISAR":"OK"}`
      });
      promFecha=[]
      suma = 0;
    });
    objetFinal.shift()
    const newWorkbook = XLSX.utils.book_new();
    const newWorksheet = XLSX.utils.json_to_sheet(objetFinal);
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Entradas');
    XLSX.writeFile(newWorkbook, 'Entradas.xlsx');
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <input type="file" onChange={handleFileUpload2} />
      <button onClick={clickGenerar}>Generar</button>
    </div>
  );
}
