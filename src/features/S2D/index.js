import { useState } from "react";
import {
  ComboButton,
  ComboDiv,
  ComboFrame,
  TextCombo,
} from "../WordDistributor/styles";
const XLSX = require('xlsx');

const S2D = () => {
  
  const [textarea, setTextarea] = useState("");
  const [excelExport, setExcelExport] = useState([])
  const [cells, setCells] = useState({
    plate: undefined,
    przebieg: undefined,
    mailAddress: undefined,
  });
  console.log(textarea);
  console.log(cells);
  console.log(excelExport)
  const updateTextarea = (event) => {
    setTextarea(event.target.value);
  };

  const handleExportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const sheetData = excelExport.map((data) => [
      data.plate,
      undefined,
      undefined,
      undefined,
      undefined,
      data.przebieg,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      data.mailAddress,
    ]);

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, ws, "Sheet1");

    XLSX.writeFile(workbook, "exported_data.xlsx");
  };


  const distributWords = (event) => {
    const startPlateIndex = textarea.indexOf("Numer rejestracyjny");
    const endPlateIndex = textarea.indexOf("Aktualny przebieg pojazdu");
    const startPrzebiegIndex = textarea.indexOf("Aktualny przebieg pojazdu");
    const endPrzebiegIndex = textarea.indexOf("Firma użytkująca");
    const mailRegex = /Adres email\s*([\w.-]+@[\w.-]+\.\w+)/i;
    const mailMatch = textarea.match(mailRegex);

    const plateText = textarea
      .substring(startPlateIndex + "Numer rejestracyjny".length, endPlateIndex)
      .trim();
    const plate = plateText.replace(/\s+/g, "");

    const przebiegText = textarea
      .substring(
        startPrzebiegIndex + "Aktualny przebieg pojazdu".length,
        endPrzebiegIndex
      )
      .trim();
    const przebieg = przebiegText.replace(/\s+/g, "");

    const newCells = {
      plate,
      przebieg,
      mailAddress: mailMatch ? mailMatch[1] : undefined,
    };

    setCells(newCells);
    setExcelExport((prevExport) => [...prevExport, { ...newCells }]);
    setTextarea("")
  };
  return (
    <ComboDiv>
      <ComboFrame>
        <TextCombo value={textarea} onChange={updateTextarea}></TextCombo>
        <ComboButton onClick={distributWords}>GO</ComboButton>
        <ComboButton onClick={handleExportToExcel}>EXPORT</ComboButton>
      </ComboFrame>
      
      <div>
        {excelExport.map((record, index)=> (
          <div>
            {record.plate}, {record.przebieg}, {record.mailAddress}
          </div>
          
        )

        )}
      </div>


    </ComboDiv>
  );
};

export default S2D;
