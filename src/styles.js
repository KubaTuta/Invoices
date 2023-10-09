import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Bar = styled.div`
  display: flex;
  background: black;
  justify-content: center;
`;

export const LinkDiv = styled.div`
  padding: 0 20px;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const StyledNavLink = styled(NavLink)`
color: white;
text-decoration: none;
  padding: 0 20px;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
  &.active {
    border: 1px solid white;
    border-radius: 10px;
  }
`;

