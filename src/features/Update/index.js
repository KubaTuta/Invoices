import { useState } from "react";
import { Container, FormStyled, InputStyled, VerticalDiv } from "../../common/styles";
var XLSX = require("xlsx");

const Update = () => {
  const [file, setFile] = useState(null);
  const [lossFile, setLossFile] = useState(null)
  const [data, setData] = useState(null);
  const [lossData, setLossData] = useState(null)

  const handleInput = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
  };

  const handleLossInput = (event) => {
    event.preventDefault();
    setLossFile(event.target.files[0]);
  }

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
            const cellD = worksheet[XLSX.utils.encode_cell({ r: i, c: 37 })];

            if (cellA) {
              const plate = cellA.v;
              const fvNumber = cellB ? cellB.v : "Brak";
              const status = cellC ? cellC.v : "Brak";
              const excelDate = cellD ? cellD.v : "Brak";
              const invoiceIssue = excelDate !== "Brak" ? (new Date((excelDate-25569)*86400000)).toLocaleDateString() : "Brak";
              const obj = { id: i, plate, status, fvNumber, invoiceIssue };
              resultArray.push(obj);
            }
          }
        });
        setData(resultArray);
      };
    }
  };

  const handleLoss = (event) => {
    event.preventDefault();
    if (lossFile) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(lossFile);

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
            const cellB = worksheet[XLSX.utils.encode_cell({ r: i, c: 13 })];
            

            if (cellA) {
              const plate = cellA.v;
              const loss = cellB.v;
              const obj = { id: i, plate, loss };
              resultArray.push(obj);
            }
          }
        });
        setLossData(resultArray);
      };
    }
  }

  const handleUpdate = () => {
    localStorage.setItem("invoices", JSON.stringify(data));
    alert("Można działać");
  };

  const handleLossUpdate = () => {
    localStorage.setItem("losses", JSON.stringify(lossData));
    alert("Można działać");
  };

  return (
    <VerticalDiv>
      <Container>
      <FormStyled>
        <InputStyled type="file" onChange={(event) => handleInput(event)} />
        {file && data === null ? (
          <button onClick={(event) => handleConvert(event)}>Konwertuj</button>
        ) : (
          ""
        )}
      </FormStyled>
      {data !== null ? <button onClick={handleUpdate}>GO</button> : ""}
    </Container>
    <Container>
      <FormStyled>
        <InputStyled type="file" onChange={(event) => handleLossInput(event)} />
        {lossFile && lossData === null ? (
          <button onClick={(event) => handleLoss(event)}>Konwertuj</button>
        ) : (
          ""
        )}
      </FormStyled>
      {lossData !== null ? <button onClick={handleLossUpdate}>GO</button> : ""}
    </Container>


    </VerticalDiv>
    
  );
};

export default Update;
