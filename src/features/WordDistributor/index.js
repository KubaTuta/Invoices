import { useState } from "react";
import {
  AStyled,
  Container,
  FormStyled,
  InputStyled,
} from "../../common/styles";
import contracts from "../../contracts.json";

const WordDistributor = () => {
  const maintance = contracts;
  const [textarea, setTextarea] = useState("");
  const [plates, setPlates] = useState([]);

  const updateTextarea = (event) => {
    setTextarea(event.target.value);
  };

  const distributWords = (event) => {
    event.preventDefault();
    const words = textarea.split(/\s+/);
    const platesArray = words
      .map((word) => {
        const properWord = word.replace(/[^a-zA-Z0-9]/g, "");
        return properWord.toUpperCase();
      })
      .filter((word) => word.length === 7);

    setPlates(platesArray);
  };

  const updateSinglePlate = (index, value) => {
    const updatedPlates = [...plates];
    updatedPlates[index] = value;
    setPlates(updatedPlates);
  };
  const handleTotallLoss = (event, plate) => {
    event.preventDefault();
    const totallLossAddress = `https://serwisarval.pl/claims/insurancecase/vehicle-history-report?contract_plate_number=${plate}&submitForm=Generuj+raport+PDF`;
    window.open(totallLossAddress, "_blank");
  };

  const handleHref = (plate) => {
    const foundObject = maintance.find((item) => item[plate]);

    let result = null;

    if (foundObject) {
      result = foundObject[plate];
    } else {
      result = "Nie znaleziono pasującego obiektu";
    }

    const maintanceAddress = `https://dynamos.benelux.intra.corp/Maintenance/ContractMaintenanceHistoryEntry.aspx?ContractNr=${result}&FromDashboard=1`;
    return maintanceAddress;
  };
  const handleMaintance = (event, plate) => {
    event.preventDefault();
    const searchId = plate.trim().toUpperCase();
    const foundObject = maintance.find((item) => item[searchId]);

    let result = null;

    if (foundObject) {
      result = foundObject[searchId];
    } else {
      result = "Nie znaleziono pasującego obiektu";
    }

    const maintanceAddress = `https://dynamos.benelux.intra.corp/Maintenance/ContractMaintenanceHistoryEntry.aspx?ContractNr=${result}&FromDashboard=1`;
    window.open(maintanceAddress, "_blank");
  };
  return (
    <Container>
      <FormStyled>
        <textarea value={textarea} onChange={updateTextarea}></textarea>
        <button onClick={distributWords}>GO</button>

        {plates.map((plate, index) => (
          <div key={index}>
            <InputStyled
              key={index}
              type="text"
              value={plate}
              onChange={(event) => updateSinglePlate(index, event.target.value)}
            ></InputStyled>
            <AStyled
              href={`https://serwisarval.pl/claims/insurancecase/vehicle-history-report?contract_plate_number=${plate}&submitForm=Generuj+raport+PDF`}
              onClick={(event) => handleTotallLoss(event, plate)}
            >
              SZKODA
            </AStyled>
            <AStyled
              href={handleHref(plate)}
              onClick={(event) => handleMaintance(event, plate)}
            >
              SERWIS
            </AStyled>
            <br></br>
          </div>
        ))}
      </FormStyled>
    </Container>
  );
};

export default WordDistributor;
