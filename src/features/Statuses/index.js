import { Container } from "../../common/styles";
import MaintanceStatus from "../MaintanceStatus";
import InvoiceStatus from "../InvoiceStatus";
import Input from "../Input";
import { ResetButton } from "../../styles";
import LossStatus from "../LossStatus";
import TplStatus from "../TplStatus";

const Statuses = ({plates, setPlates, setTextarea}) => {

  const handleReset = () => {
    setPlates([""])
    setTextarea([""])
  }

  return (
    <>
    <Container>
      {/* <img src={myImage} alt="Opis obrazu" /> */}    
      <Input plates={plates} setPlates={setPlates} />
      <LossStatus plates={plates} />
      <MaintanceStatus plates={plates} />
      <InvoiceStatus plates={plates} />
      <TplStatus plates={plates} />
    </Container>
    <ResetButton onClick={()=>handleReset()}>RESET</ResetButton>
    </>
    
  );
};

export default Statuses;
