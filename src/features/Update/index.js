import { useState } from "react";
import { FormStyled, InputStyled, VerticalDiv } from "../../common/styles";
import { Container } from "./styled";
import { useHooks } from "../../hooks";
import { Title } from "./styled";

const Update = () => {
  const [file, setFile] = useState([null, null, null]);
  const [data, setData] = useState([null, null, null]);

  const lastUpdateDate = (storage) => {
    const array = JSON.parse(localStorage.getItem(storage)) || [];
    const updateDate = array[0];
    return updateDate;
  };

  const handleInput = (event, number) => {
    event.preventDefault();
    setFile((prevFile) => {
      const fileArray = [...prevFile];
      fileArray[number] = event.target.files[0];
      return fileArray;
    });
  };

  const {
    handleConvertRecords,
    handleConvertAuctionLossess,
  } = useHooks(setData, file);

  const handleUpdate = (data, arrayName) => {
    localStorage.setItem(arrayName, JSON.stringify(data));
    alert("Można działać");
  };

  return (
    <VerticalDiv>
      <Title>
        Ewidencja: &nbsp;{" "}
        {typeof lastUpdateDate("invoices") === "string"
          ? `(ostatni update: ${lastUpdateDate("invoices")})`
          : ""}
      </Title>
      <Container>
        <FormStyled>
          <InputStyled
            type="file"
            onChange={(event) => handleInput(event, 0)}
          />
          {file[0] && data[0] === null ? (
            <button onClick={(event) => handleConvertRecords(event)}>
              Konwertuj
            </button>
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
      <Title>
        Szkody do aukcji: &nbsp;{" "}
        {typeof lastUpdateDate("losses") === "string"
          ? `(Ostatni update: ${lastUpdateDate("losses")})`
          : ""}
      </Title>
      <Container>
        <FormStyled>
          <InputStyled
            type="file"
            onChange={(event) => handleInput(event, 1)}
          />
          {file[1] && data[1] === null ? (
            <button onClick={(event) => handleConvertAuctionLossess(event)}>
              Konwertuj
            </button>
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
    </VerticalDiv>
  );
};

export default Update;
