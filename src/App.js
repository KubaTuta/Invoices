
import { Container } from "./common/styles";
import Invoices from "./features/Invoices";
import Maintance from "./features/Maintance";
import myImage from "./features/Images/logo.png"

function App() {
  return (
    <Container>
      <img src={myImage} alt="Opis obrazu" />
      <Invoices />
      <Maintance />
    </Container>
  );
}

export default App;
