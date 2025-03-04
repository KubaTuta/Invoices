import { useState } from "react";
import { ComboButton, ComboDiv, ComboFrame, TextCombo } from "../Combo/styles";
const XLSX = require("xlsx");

const S2D = () => {
  const [textarea, setTextarea] = useState("");
  const [excelExport, setExcelExport] = useState([]);

  const updateTextarea = (event) => {
    setTextarea(event.target.value);
  };

  const handleExportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const sheetData = excelExport.map((data) => [
      data.plate,
      data.przebieg,
      data.comment,
      data.mailAddress,
      data.phoneNumber,
    ]);

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, ws, "Sheet1");

    XLSX.writeFile(workbook, "exported_data.xlsx");
  };

  const distributWords = (event) => {
    const startPlateIndex = textarea.indexOf("Numer rejestracyjny");
    const endPlateIndex = textarea.indexOf("Aktualny przebieg pojazdu");
    const startPrzebiegIndex = textarea.indexOf("Aktualny przebieg pojazdu");
    const endPrzebiegIndex = textarea.indexOf(
      textarea.includes("Firma użytkująca")
        ? "Firma użytkująca"
        : "Data zakończenia kontraktu"
    );
    const startCommentIndex = textarea.indexOf("Uwagi o stanie pojazdu");
    const endCommentIndex = textarea.indexOf("Imię i nazwisko");
    const mailRegex = /Adres email\s*([\w.-]+@[\w.-]+\.\w+)/i;
    const mailMatch = textarea.match(mailRegex);
    const startPhoneNumberIndex = textarea.indexOf("Numer telefonu");
    const endPhoneNumberIndex = textarea.indexOf(
      "Twoja proponowana cena pojazdu"
    );
    const alternateEndPhoneNumberIndex = textarea.indexOf(
      "Wyrażam zgodę na kontakt w celu przedstawienia oferty"
    );

    const plate = textarea
      .substring(startPlateIndex + "Numer rejestracyjny".length, endPlateIndex)
      .trim()
      .replace(/\s+/g, "");

    const przebieg = textarea
      .substring(
        startPrzebiegIndex + "Aktualny przebieg pojazdu".length,
        endPrzebiegIndex
      )
      .trim()
      .replace(/\s+/g, "");

    const comment =
      startCommentIndex === -1
        ? null
        : textarea
            .substring(
              startCommentIndex + "Uwagi o stanie pojazdu".length,
              endCommentIndex
            )
            .trim();

    const phoneNumber = textarea.substring(
      startPhoneNumberIndex + "Numer telefonu".length, endPhoneNumberIndex === -1
        ? alternateEndPhoneNumberIndex
        : endPhoneNumberIndex
    );

    const newCells = {
      plate,
      przebieg,
      comment,
      mailAddress: mailMatch ? mailMatch[1] : undefined,
      phoneNumber,
    };

    setExcelExport((prevExport) => [...prevExport, { ...newCells }]);
    setTextarea("");
  };
  return (
    <ComboDiv>
      <ComboFrame>
        <TextCombo value={textarea} onChange={updateTextarea}></TextCombo>
        <ComboButton onClick={distributWords}>GO</ComboButton>
        <ComboButton onClick={handleExportToExcel}>EXPORT</ComboButton>
      </ComboFrame>

      <div>
        {excelExport.map((record, index) => (
          <div key={index}>
            {record.plate}, {record.przebieg}, {record.mailAddress},{record.phoneNumber},{" "}
            {record.comment}
          </div>
        ))}
      </div>
    </ComboDiv>
  );
};

export default S2D;
