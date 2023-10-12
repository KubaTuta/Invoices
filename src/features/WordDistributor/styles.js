import styled from "styled-components";

export const ComboDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export const TextCombo = styled.textarea`
  height: 200px;
  width: 300px;
`;

export const ComboFrame = styled.div`
display: flex;
`

export const ComboButton = styled.button`
color: white;
background: black;
transition: 0.2s;
&:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.7);
  
}
`