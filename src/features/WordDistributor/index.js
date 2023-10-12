import { useState } from "react";
import { ComboButton, ComboDiv, ComboFrame, TextCombo } from "./styles";
import Main from "../Main";

const WordDistributor = () => {
  const [textarea, setTextarea] = useState("");
  const [plates, setPlates] = useState([]);

  const updateTextarea = (event) => {
    setTextarea(event.target.value);
  };

  const distributWords = (event) => {
    event.preventDefault();
    const words = textarea.split(/\s+/);
    const platesArray = words
      .map((word) => {
        const properWord = word.replace(/[^a-zA-Z0-9]/g, "");
        if (/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(properWord)) {
          return properWord.toUpperCase();
        } else return null;
      })
      .filter((word) => word !== null && (word.length === 7 || word.length === 8));

    setPlates(platesArray);
  };

  return (
    <ComboDiv>
      <ComboFrame>
        <TextCombo value={textarea} onChange={updateTextarea}></TextCombo>
        <ComboButton onClick={distributWords}>GO</ComboButton>
      </ComboFrame>
      <Main plates={plates} setPlates={setPlates} />
    </ComboDiv>
  );
};

export default WordDistributor;
