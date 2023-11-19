import { useState } from "react";
import {
  Container,
  FormStyled,
  InputStyled,
  VerticalDiv,
} from "../../common/styles";
var XLSX = require("xlsx");

const Update = () => {
  const [file, setFile] = useState([null, null]);
  const [data, setData] = useState([null, null]);

  const handleInput = (event, number) => {
    event.preventDefault();
    setFile((prevFile) => {
      const fileArray = [...prevFile];
      fileArray[number] = event.target.files[0];
      return fileArray;
    });
  };

  const handleConvert = (event) => {
    event.preventDefault();
    if (file[0]) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file[0]);

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
              const invoiceIssue =
                excelDate !== "Brak"
                  ? new Date(
                      (excelDate - 25569) * 86400000
                    ).toLocaleDateString()
                  : "Brak";
              const obj = { id: i, plate, status, fvNumber, invoiceIssue };
              resultArray.push(obj);
            }
          }
        });
        setData((prevData) => {
          const dataArray = [...prevData];
          dataArray[0] = resultArray;
          return dataArray;
        });
      };
    }
  };

  const handleLoss = (event) => {
    event.preventDefault();
    if (file[1]) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file[1]);

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
            const cellB = worksheet[XLSX.utils.encode_cell({ r: i, c: 1 })];

            if (cellA) {
              const plate = cellA.v;
              const loss = cellB ? cellB.v : "nieaktualne";
              const obj = { id: i, plate, loss };
              resultArray.push(obj);
            }
          }
        });
        setData((prevData) => {
          const dataArray = [...prevData];
          dataArray[1] = resultArray;
          return dataArray;
        });
      };
    }
  };

  const handleUpdate = (data, arrayName) => {
    localStorage.setItem(arrayName, JSON.stringify(data));
    alert("Można działać");
  };

  return (
    <VerticalDiv>
      <Container>
        <FormStyled>
          <InputStyled
            type="file"
            onChange={(event) => handleInput(event, 0)}
          />
          {file[0] && data[0] === null ? (
            <button onClick={(event) => handleConvert(event)}>Konwertuj</button>
          ) : (
            ""
          )}
        </FormStyled>
        {data[0] !== null ? (
          <button onClick={() => handleUpdate(data[0], "invoices")}>GO</button>
        ) : (
          ""
        )}
      </Container>
      <Container>
        <FormStyled>
          <InputStyled
            type="file"
            onChange={(event) => handleInput(event, 1)}
          />
          {file[1] && data[1] === null ? (
            <button onClick={(event) => handleLoss(event)}>Konwertuj</button>
          ) : (
            ""
          )}
        </FormStyled>
        {data[1] !== null ? (
          <button onClick={() => handleUpdate(data[1], "lossess")}>GO</button>
        ) : (
          ""
        )}
      </Container>
    </VerticalDiv>
  );
};

export default Update;