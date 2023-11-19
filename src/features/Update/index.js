import { useState } from "react";
import {
  Container,
  FormStyled,
  InputStyled,
  VerticalDiv,
} from "../../common/styles";
import { useHooks } from "../../hooks";
import { Title } from "./styled";
var XLSX = require("xlsx");

const Update = () => {
  const [file, setFile] = useState([null, null, null]);
  const [data, setData] = useState([null, null, null]);

  const handleInput = (event, number) => {
    event.preventDefault();
    setFile((prevFile) => {
      const fileArray = [...prevFile];
      fileArray[number] = event.target.files[0];
      return fileArray;
    });
  };

  const {handleConvertRecords, handleConvertAuctionLossess , handleConvertService} = useHooks(setData, file);

  const handleUpdate = (data, arrayName) => {
    localStorage.setItem(arrayName, JSON.stringify(data));
    alert("Można działać");
  };

  return (
    <VerticalDiv>
      <Title>Ewidencja:</Title>
      <Container>
        <FormStyled>
          <InputStyled
            type="file"
            onChange={(event) => handleInput(event, 0)}
          />
          {file[0] && data[0] === null ? (
            <button onClick={(event) => handleConvertRecords(event)}>Konwertuj</button>
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
      <Title>Szkody do aukcji:</Title>
      <Container>
        <FormStyled>
          <InputStyled
            type="file"
            onChange={(event) => handleInput(event, 1)}
          />
          {file[1] && data[1] === null ? (
            <button onClick={(event) => handleConvertAuctionLossess(event)}>Konwertuj</button>
          ) : (
            ""
          )}
        </FormStyled>
        {data[1] !== null ? (
          <button onClick={() => handleUpdate(data[1], "losses")}>GO</button>
        ) : (
          ""
        )}
      </Container>
      <Title>Numery kontraktów do historii serwisowych:</Title>
      <Container>
        <FormStyled>
          <InputStyled
            type="file"
            onChange={(event) => handleInput(event, 2)}
          />
          {file[2] && data[2] === null ? (
            <button onClick={(event) => handleConvertService(event)}>Konwertuj</button>
          ) : (
            ""
          )}
        </FormStyled>
        {data[2] !== null ? (
          <button onClick={() => handleUpdate(data[2], "service")}>GO</button>
        ) : (
          ""
        )}
      </Container>
    </VerticalDiv>
  );
};

export default Update;