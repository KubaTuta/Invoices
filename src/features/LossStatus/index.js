import { AStyled, VerticalDiv } from "../../common/styles";

const LossStatus = ({ plates }) => {
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
        </div>
      ))}
    </VerticalDiv>
  );
};
export default LossStatus;
