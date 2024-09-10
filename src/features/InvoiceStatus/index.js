import {
  AStyled,
  FormStyled,
  VerticalDiv,
} from "../../common/styles";

const InvoiceStatus = ({plates}) => {
  const invoices = JSON.parse(localStorage.getItem("invoices")) || [];


  const handleInvoice = (event, plate) => {
    event.preventDefault();
    const searchId = plate.trim().toUpperCase();
    const plateIndex = invoices.findIndex((item) => item.plate === searchId);
    const invoice = invoices[plateIndex].fvNumber;

    const address = `https://dynamos.benelux.intra.corp/Archive/MainArchive.aspx?searchModus=2&contractnr=0&calcbasisvolgnr=0&nawnr=0&SleutelWaarde=${invoice}&Caller=OnNotifyRowClick`;
    window.open(address, "_blank");
  };

  const displayStatus = (plate) => {
    const searchId = plate.trim().toUpperCase();
    const plateIndex = invoices.findIndex((item) => item.plate === searchId);

    if (plateIndex === -1) {
      return "BRAK";
    } else return invoices[plateIndex].status;
  };

  return (
    <VerticalDiv>
      {plates.map((plate, index) => (
        <FormStyled key={index}>
          <AStyled
            href="https://"
            onClick={(event) => {
              if (
                displayStatus(plate) === "PAID" ||
                displayStatus(plate) === "REALEASED" ||
                displayStatus(plate) === "FREE" ||
                displayStatus(plate) === "SOLD" ||
                displayStatus(plate) === "DUBEL" ||
                displayStatus(plate) === "BRAK"
              ) {
                event.preventDefault();
              } else {
                handleInvoice(event, plate);
              }
            }}
            onAuxClick={(event) => {
              if (
                displayStatus(plate) === "PAID" ||
                displayStatus(plate) === "REALEASED" ||
                displayStatus(plate) === "FREE" ||
                displayStatus(plate) === "SOLD" ||
                displayStatus(plate) === "DUBEL" ||
                displayStatus(plate) === "BRAK"
              ) {
                event.preventDefault();
              } else {
                handleInvoice(event, plate);
              }
            }}
            disabled={
              displayStatus(plate) === "PAID" ||
              displayStatus(plate) === "REALEASED" ||
              displayStatus(plate) === "FREE" ||
              displayStatus(plate) === "SOLD" ||
              displayStatus(plate) === "DUBEL" ||
              displayStatus(plate) === "BRAK"
            }
          >
            {displayStatus(plate)}
          </AStyled>
        </FormStyled>
      ))}
    </VerticalDiv>
  );
};

export default InvoiceStatus;
