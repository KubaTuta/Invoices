import { Container } from "../../common/styles";
import Plates from "../Plates";
import NewInvoice from "../NewInvoice";

import Input from "../Input";

const Main = ({plates, setPlates}) => {

  return (
    <Container>
      {/* <img src={myImage} alt="Opis obrazu" /> */}    
      <Input plates={plates} setPlates={setPlates} />
      <Plates plates={plates} setPlates={setPlates} />
      <NewInvoice plates={plates} setPlates={setPlates} />
    </Container>
  );
};

export default Main;
