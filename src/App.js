
import { Container } from "./common/styles";
import Invoices from "./features/Invoices";
import Plates from "./features/Plates";
import myImage from "./features/Images/logo.png"
import WordDistributor from "./features/WordDistributor";

function App() {
  return (
    <Container>
      <img src={myImage} alt="Opis obrazu" />
      <Invoices />
      <Plates />
      <WordDistributor />
    </Container>
  );
}

export default App;
