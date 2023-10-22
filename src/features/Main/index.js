import { Container } from "../../common/styles";
import Plates from "../Plates";
import NewInvoice from "../NewInvoice";

import Input from "../Input";
import { ResetButton } from "../../styles";

const Main = ({plates, setPlates}) => {

  return (
    <>
    <Container>
      {/* <img src={myImage} alt="Opis obrazu" /> */}    
      <Input plates={plates} setPlates={setPlates} />
      <Plates plates={plates} setPlates={setPlates} />
      <NewInvoice plates={plates} setPlates={setPlates} />
    </Container>
    <ResetButton onClick={()=>setPlates([""])}>RESET</ResetButton>
    </>
    
  );
};

export default Main;
