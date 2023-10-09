import contracts from "../../contracts.json";
import { AStyled, VerticalDiv } from "../../common/styles";

const Plates = ({ plates, setPlates }) => {
  const maintance = contracts;

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
    <VerticalDiv>
      {plates.map((maintancePlate, index) => (
        <div key={index}>
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
        </div>
      ))}
    </VerticalDiv>
  );
};

export default Plates;
