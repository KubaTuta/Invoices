import { AStyled, VerticalDiv } from "../../common/styles";
import contracts from "../../service.json";

const MaintanceStatus = ({ plates }) => {
  const maintance = contracts;

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

  return (
    <VerticalDiv>
      {plates.map((maintancePlate, index) => (
        <div key={index}>
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

export default MaintanceStatus;
