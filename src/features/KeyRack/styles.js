import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Tile = styled.div`
  height: 30px;
  width: 100px;
  background: rgb(0, 120, 94);
  margin: 1px;
  padding-left: 5px;
`;

export const Layout = styled.div`
  display: flex;
`;

export const StyledSelect = styled.select`
  width: 100px;
  margin: 1px;
`;

export const CustomDatePicker = styled(DatePicker)`
  width: 100px;
  height: 30px;
  margin: 1px;
`;
