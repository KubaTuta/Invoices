import { AStyled, VerticalDiv } from "../../common/styles";

const Plates = ({ plates }) => {
  const maintance = JSON.parse(localStorage.getItem("service")) || [];

  const handleMaintance = (event, maintancePlate) => {
    event.preventDefault();
    const searchedPlate = maintancePlate.trim().toUpperCase();
    const foundObject = maintance.find((item) => item.plate === searchedPlate);

    let result = null;

    if (foundObject) {
      result = foundObject.contract;
    } else {
      result = "Nie znaleziono pasującego obiektu";
    }

    const maintanceAddress = `https://dynamos.benelux.intra.corp/Maintenance/ContractMaintenanceHistoryEntry.aspx?ContractNr=${result}&FromDashboard=1`;
    window.open(maintanceAddress, "_blank");
  };

  const handleTotallLoss = (event, plate) => {
    event.preventDefault();
    const trimmedPlate = plate.trim();
    const totallLossAddress = `https://serwisarval.pl/claims/insurancecase/vehicle-history-report?contract_plate_number=${trimmedPlate}&submitForm=Generuj+raport+PDF`;
    window.open(totallLossAddress, "_blank");
  };

  return (
    <VerticalDiv>
      {plates.map((maintancePlate, index) => (
        <div key={index}>
          <AStyled
            href="https://"
            onClick={(event) => handleTotallLoss(event, maintancePlate)}
            onAuxClick={(event) => handleTotallLoss(event, maintancePlate)}
          >
            SZKODA
          </AStyled>
          <AStyled
            href="https://"
            onClick={(event) => handleMaintance(event, maintancePlate)}
            onAuxClick={(event) => handleMaintance(event, maintancePlate)}
          >
            SERWIS
          </AStyled>
        </div>
      ))}
    </VerticalDiv>
  );
};

export default Plates;
