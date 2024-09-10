import { useState } from "react";
import {
  ComboButton,
  ComboDiv,
  ComboFrame,
  TextCombo,
} from "../Combo/styles";
import Input from "../Input";
import { AStyled, Container, VerticalDiv } from "../../common/styles";
import { LeftFormat } from "./styled";

const AuctionLoss = () => {
  const [textarea, setTextarea] = useState("");
  const [plates, setPlates] = useState([]);
  const losses = JSON.parse(localStorage.getItem("losses")) || [];

  const updateTextarea = (event) => {
    setTextarea(event.target.value);
  };

  const distributWords = (event) => {
    event.preventDefault();
    const words = textarea.split(/\s+/);
    const platesArray = words
      .map((word) => {
        const properWord = word.replace(/[^a-zA-Z0-9]/g, "");
        if (/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(properWord)) {
          return properWord.toUpperCase();
        } else return null;
      })
      .filter(
        (word) => word !== null && (word.length === 7 || word.length === 8)
      );

    setPlates(platesArray);
  };

  const checkOccuringLoss = (plate) => {
    const searchId = plate.trim().toUpperCase();
    const plateIndex = losses.findIndex((item) => item.plate === searchId);
    if (plateIndex >= 0) {
      return true;
    } else return false;
  };

  const displayLink = (plate) => {
    const searchId = plate.trim().toUpperCase();
    const plateIndex = losses.findIndex((item) => item.plate === searchId);
    const lossLink = losses[plateIndex].loss;
    if (lossLink === "brak") {
      return "Nie znaleziono szkód w naszych rejestrach";
    } else return lossLink;
  };

  const handleTotallLoss = (event, plate) => {
    event.preventDefault();
    const trimmedPlate = plate.trim();
    const totallLossAddress = `https://serwisarval.pl/claims/insurancecase/vehicle-history-report?contract_plate_number=${trimmedPlate}&submitForm=Generuj+raport+PDF`;
    window.open(totallLossAddress, "_blank");
  };

  return (
    <ComboDiv>
      <ComboFrame>
        <TextCombo value={textarea} onChange={updateTextarea}></TextCombo>
        <ComboButton onClick={distributWords}>GO</ComboButton>
      </ComboFrame>
      <Container>
        <Input plates={plates} setPlates={setPlates} />
        <VerticalDiv>
          {plates.map((plate, index) => (
            <div key={index}>
              {checkOccuringLoss(plate) ? (
                "OK"
              ) : (
                <AStyled
                  href="https://"
                  onClick={(event) => handleTotallLoss(event, plate)}
                  onAuxClick={(event) =>
                    handleTotallLoss(event, plate)
                  }
                >
                  SZKODA
                </AStyled>
              )}
            </div>
          ))}
        </VerticalDiv>
      </Container>
      <LeftFormat>
      Historia szkodowa znaleziona w naszych rejestrach:
      {plates.map((plate, index) => (
        <div key={index}>
          {checkOccuringLoss(plate) ? ` ${plate}: ${displayLink(plate)} ` : ""}
        </div>
      ))}
      </LeftFormat>
      
    </ComboDiv>
  );
};

export default AuctionLoss;
