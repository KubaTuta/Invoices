import { FormStyled, InputStyled, VerticalDiv } from "../../common/styles";

const Input = ({ plates, setPlates }) => {
  const updatePlate = (index, value) => {
    const updatedPlates = [...plates];
    updatedPlates[index] = value;
    setPlates(updatedPlates);
  };

  return (
    <VerticalDiv>
      {plates.map((plate, index) => (
        <FormStyled key={index}>
          <InputStyled
            type="text"
            value={plate}
            onChange={(event) => updatePlate(index, event.target.value)}
          ></InputStyled>
        </FormStyled>
      ))}
    </VerticalDiv>
  );
};

export default Input;
