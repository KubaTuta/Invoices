
import { Container } from "./common/styles";
import Invoices from "./features/Invoices";
import Plates from "./features/Plates";
import myImage from "./features/Images/logo.png"
import WordDistributor from "./features/WordDistributor";
import Update from "./features/Update";

function App() {
  return (
    <Container>
      <img src={myImage} alt="Opis obrazu" />
      <Invoices />
      <Plates />
      <WordDistributor />
      <Update />
    </Container>
  );
}

export default App;
