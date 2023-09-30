
import { Container } from "./common/styles";
import Invoices from "./features/Invoices";
import Plates from "./features/Plates";
import myImage from "./features/Images/logo.png"

function App() {
  return (
    <Container>
      <img src={myImage} alt="Opis obrazu" />
      <Invoices />
      <Plates />
    </Container>
  );
}

export default App;
