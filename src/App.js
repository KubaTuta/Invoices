import { useState } from "react";
import "./App.css";
import contracts from "./contracts.json";

function App() {
  const maintance = contracts;

  const [fv, setFv] = useState([""]);
  const [plates, setPlates] = useState([""]);
  const [maintancePlates, setMaintancePlates] = useState([""]);

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

  const handleMaintance = (event, maintancePlate) => {
    event.preventDefault();
    const searchId = maintancePlate.trim();
    const foundObject = maintance.find((item) => item[searchId]);

    let result = null;

    if (foundObject) {
      result = foundObject[searchId];
    } else {
      result = "Nie znaleziono pasującego obiektu";
    }

    const maintanceAddress = `${result}`;
    window.open(maintanceAddress, "_blank");
  };

  const updateFv = (index, value) => {
    const updatedFv = [...fv];
    updatedFv[index] = value;
    setFv(updatedFv);
  };

  const updatePlate = (index, value) => {
    const updatedPlates = [...plates];
    updatedPlates[index] = value;
    setPlates(updatedPlates);
  };

  const updateMaintancePlate = (index, value) => {
    const updatedPlates = [...maintancePlates];
    updatedPlates[index] = value;
    setMaintancePlates(updatedPlates);
  };

  const addPlate = (event) => {
    event.preventDefault();
    setPlates([...plates, ""]);
  };

  const addFv = (event) => {
    event.preventDefault();
    setFv([...fv, ""]);
  };

  const addMaintancePlate = (event) => {
    event.preventDefault();
    setMaintancePlates([...maintancePlates, ""]);
  };

  console.log(maintancePlates);
  return (
    <div>
      numer faktury
      {fv.map((invoice, index) => (
        <div key={index}>
          <form>
            <input
              type="text"
              value={invoice}
              onChange={(event) => updateFv(index, event.target.value)}
            ></input>
            <button onClick={(event) => handleFv(event, invoice)}>GO</button>
            <a href={aHrefHandleFv(invoice)}>LINK</a>
            <button onClick={(event) => addFv(event)}>+</button>
          </form>
        </div>
      ))}
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
            <a href={aHrefHandleTotallLoss(plate)}>LINK</a>
            <button onClick={(event) => addPlate(event)}>+</button>
          </form>
        </div>
      ))}
      <br></br>
      <br></br>
      historia serwisowa:
      <br></br>
      {maintancePlates.map((maintancePlate, index) => (
        <div key={index}>
          <form>
            <input
              type="text"
              value={maintancePlate}
              onChange={(event) =>
                updateMaintancePlate(index, event.target.value)
              }
            ></input>
            <button onClick={(event) => handleMaintance(event, maintancePlate)}>
              GO
            </button>
            <button onClick={(event) => addMaintancePlate(event)}>+</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default App;
