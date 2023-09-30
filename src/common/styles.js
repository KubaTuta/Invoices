import styled from "styled-components";

export const Container = styled.div`
  margin: 50px auto;
  text-align: center;
`;

export const FormStyled = styled.form``;

export const InputStyled = styled.input`
  border-radius: 100px;
`;

export const AStyled = styled.a`
  color: white;
  margin-right: 5px;
  margin-left: 5px;
  text-decoration: underline;
  transition: 0.5s;
  display: inline-block;
  &:hover {
    text-decoration: none;
    transform: scale(1.1)
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
