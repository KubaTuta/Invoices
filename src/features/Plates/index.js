import { useState } from "react";
import contracts from "../../contracts.json";
import {
  AStyled,
  Container,
  FormStyled,
  InputStyled,
  PlusButton,
} from "../../common/styles";

const Plates = () => {
  const maintance = contracts;

  const [plates, setPlates] = useState([""]);

  const handleMaintance = (event, maintancePlate) => {
    event.preventDefault();
    const searchId = maintancePlate.trim().toUpperCase();
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

  const updatePlate = (index, value) => {
    const updatedPlates = [...plates];
    updatedPlates[index] = value;
    setPlates(updatedPlates);
  };

  const addPlate = (event) => {
    event.preventDefault();
    setPlates([...plates, ""]);
  };

  const handleHref = (maintancePlate) => {
    const searchId = maintancePlate.trim().toUpperCase();
    const foundObject = maintance.find((item) => item[searchId]);

    let result = null;

    if (foundObject) {
      result = foundObject[searchId];
    } else {
      result = "Nie znaleziono pasującego obiektu";
    }

    const maintanceAddress = `https://dynamos.benelux.intra.corp/Maintenance/ContractMaintenanceHistoryEntry.aspx?ContractNr=${result}&FromDashboard=1`;
    return maintanceAddress;
  };
  const handleTotallLoss = (event, plate) => {
    event.preventDefault();
    const trimmedPlate = plate.trim();
    const totallLossAddress = `https://serwisarval.pl/claims/insurancecase/vehicle-history-report?contract_plate_number=${trimmedPlate}&submitForm=Generuj+raport+PDF`;
    window.open(totallLossAddress, "_blank");
  };
  const aHrefHandleTotallLoss = (plate) => {
    const trimmedPlate = plate.trim();
    const totallLossAddress = `https://serwisarval.pl/claims/insurancecase/vehicle-history-report?contract_plate_number=${trimmedPlate}&submitForm=Generuj+raport+PDF`;
    return totallLossAddress;
  };

  return (
    <Container>
      nr tablicy:
      {plates.map((maintancePlate, index) => (
        <FormStyled key={index}>
          <InputStyled
            type="text"
            value={maintancePlate}
            onChange={(event) => updatePlate(index, event.target.value)}
          ></InputStyled>
          <AStyled
            href={aHrefHandleTotallLoss(maintancePlate)}
            onClick={(event) => handleTotallLoss(event, maintancePlate)}
          >
            SZKODA  
          </AStyled>
          <AStyled
            href={handleHref(maintancePlate)}
            onClick={(event) => handleMaintance(event, maintancePlate)}
          >
            SERWIS
          </AStyled>
          <PlusButton onClick={(event) => addPlate(event)}>+</PlusButton>
        </FormStyled>
      ))}
    </Container>
  );
};

export default Plates;