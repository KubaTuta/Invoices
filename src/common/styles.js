import styled from "styled-components";

export const Container = styled.div`
  margin: 50px auto;
  text-align: center;
  display: flex;
  justify-content: center;
`;

export const FormStyled = styled.form``;

export const InputStyled = styled.input`
  border-radius: 100px;
  text-align: center;
`;

export const AStyled = styled.a`
  cursor: ${props => (props.disabled? "not-allowed" : "pointer")};
  color: ${props => (props.disabled? "#C0C0C0" : "#FFFFFF")};
  margin-right: 5px;
  margin-left: 5px;
  text-decoration: none;
  transition: 0.5s;
  display: inline-block;
  &:hover {
    transform: ${props => (props.disabled? "scale(1)" : "scale(1.1)")}
  }
`;

export const PlusButton = styled.button`
border-radius: 100%;
border: 2px solid #ffc001;
transition: 0.2s;
&:hover {
  cursor: pointer;
  color: white;
  background-color: #ffc001;
  transform: scale(1.2)
}
`

export const VerticalDiv = styled.div`
display: flex;
flex-direction: column;
`