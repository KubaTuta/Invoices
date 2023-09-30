import { useState } from "react";
import {
  AStyled,
  Container,
  FormStyled,
  InputStyled,
  PlusButton,
} from "../../common/styles";

const Invoices = () => {
  const [fv, setFv] = useState([""]);

  const handleFv = (event, invoice) => {
    event.preventDefault();
    const trimmedFv = invoice.trim();
    const address = `https://dynamos.benelux.intra.corp/Archive/MainArchive.aspx?searchModus=2&contractnr=0&calcbasisvolgnr=0&nawnr=0&SleutelWaarde=${trimmedFv}&Caller=OnNotifyRowClick`;
    window.open(address, "_blank");
  };
  const aHrefHandleFv = (invoice) => {
    const trimmedFv = invoice.trim();
    const address = `https://dynamos.benelux.intra.corp/Archive/MainArchive.aspx?searchModus=2&contractnr=0&calcbasisvolgnr=0&nawnr=0&SleutelWaarde=${trimmedFv}&Caller=OnNotifyRowClick`;
    return address;
  };

  const updateFv = (index, value) => {
    const updatedFv = [...fv];
    updatedFv[index] = value;
    setFv(updatedFv);
  };

  const addFv = (event) => {
    event.preventDefault();
    setFv([...fv, ""]);
  };

  return (
    <Container>
      numer faktury
      {fv.map((invoice, index) => (
        <FormStyled key={index}>
          <InputStyled
            type="text"
            value={invoice}
            onChange={(event) => updateFv(index, event.target.value)}
          ></InputStyled>
          <AStyled
            href={aHrefHandleFv(invoice)}
            onClick={(event) => handleFv(event, invoice)}
          >
            LINK
          </AStyled>
          <PlusButton onClick={(event) => addFv(event)}>+</PlusButton>
        </FormStyled>
      ))}
    </Container>
  );
};

export default Invoices;
