import { useState } from "react";
import {
  AStyled,
  FormStyled,
  InputStyled,
  PlusButton,
} from "../../common/styles";
import { Equator } from "./styles";

const Fv = () => {
  const [fv, setFv] = useState([""]);

  const handleFv = (event, invoice) => {
    event.preventDefault();
    const trimmedFv = invoice.trim();
    const address = `https://dynamos.benelux.intra.corp/Archive/MainArchive.aspx?searchModus=2&contractnr=0&calcbasisvolgnr=0&nawnr=0&SleutelWaarde=${trimmedFv}&Caller=OnNotifyRowClick`;
    window.open(address, "_blank");
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
    <Equator>
      numer faktury: &nbsp;
      {fv.map((invoice, index) => (
        <FormStyled key={index}>
          <InputStyled
            type="text"
            value={invoice}
            onChange={(event) => updateFv(index, event.target.value)}
          ></InputStyled>
          <AStyled
            href="https://"
            onClick={(event) => handleFv(event, invoice)}
            onAuxClick={(event) => handleFv(event, invoice)}
          >
            LINK
          </AStyled>
          <PlusButton onClick={(event) => addFv(event)}>+</PlusButton>
        </FormStyled>
      ))}
    </Equator>
  );
};

export default Fv;
