import { useState } from "react";
import { Container, FormStyled, InputStyled } from "../../common/styles";
var XLSX = require("xlsx");

const Update = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const handleInput = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
  };
  console.log(file);

  const handleConvert = (event) => {
    event.preventDefault();
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload = (event) => {
        const fileData = event.target.result;
        const workbook = XLSX.read(fileData, { type: "binary" });
        const resultArray = [];

        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const range = XLSX.utils.decode_range(worksheet["!ref"]);
          const rows = range.e.r;

          for (let i = 1; i <= rows; i++) {
            const cellA = worksheet[XLSX.utils.encode_cell({ r: i, c: 0 })];
            const cellB = worksheet[XLSX.utils.encode_cell({ r: i, c: 36 })];
            const cellC = worksheet[XLSX.utils.encode_cell({ r: i, c: 2 })];

            if (cellA && cellB && cellC) {
              const plate = cellA.v;
              const fvNumber = cellB.v;
              const status = cellC.v;
              const obj = { plate, status, fvNumber };
              resultArray.push(obj);
            }
          }
        });
        setData(resultArray);
      };
    }
  };

  const handleUpdate = () => {
    localStorage.setItem("invoices", JSON.stringify(data))
  }

  return (
    <Container>
      <FormStyled>
        <InputStyled type="file" onChange={(event) => handleInput(event)} />
        <button onClick={(event) => handleConvert(event)}>Konwertuj</button>
      </FormStyled>
      <button onClick={handleUpdate}>{data !== null ? "YES" : "NO"}</button>
    </Container>
  );
};

export default Update;
