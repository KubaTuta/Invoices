import { useState } from "react";
import "./App.css";

function App() {
  const [fv, setFv] = useState("");
  const [plates, setPlates] = useState([""]);

  const address = `https://dynamos.benelux.intra.corp/Archive/MainArchive.aspx?searchModus=2&contractnr=0&calcbasisvolgnr=0&nawnr=0&SleutelWaarde=${fv.trim()}&Caller=OnNotifyRowClick`;

  const updatePlate = (index, value) => {
    const updatedPlates = [...plates];
    updatedPlates[index] = value;
    setPlates(updatedPlates);
  };

  const handleInvoice = (event) => {
    event.preventDefault();
    window.open(address, "_blank");
  };

  const handleTotallLoss = (event, plate) => {
    event.preventDefault();
    const trimmedPlate = plate.trim();
    const totallLossAddress = `https://serwisarval.pl/claims/insurancecase/vehicle-history-report?contract_plate_number=${trimmedPlate}&submitForm=Generuj+raport+PDF`;
    window.open(totallLossAddress, "_blank");
  };

  const addPlate = (event) => {
    event.preventDefault();
    setPlates([...plates, ""]);
  };

  return (
    <div>
      numer faktury
      <form>
        <input
          type="text"
          value={fv}
          onChange={(event) => setFv(event.target.value)}
        ></input>
        <button onClick={(event) => handleInvoice(event)}>GO</button>
      </form>
      <br></br>
      <br></br>
      szkody
      {plates.map((plate, index) => (
        <div key={index}>
          <form>
            <input
              type="text"
              value={plate}
              onChange={(event) => updatePlate(index, event.target.value)}
            ></input>
            <button onClick={(event) => handleTotallLoss(event, plate)}>
              GO
            </button>
            <button onClick={(event) => addPlate(event)}>+</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default App;
