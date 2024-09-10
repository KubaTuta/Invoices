import { Route, Routes, useNavigate } from "react-router-dom";
import { Bar, LinkDiv, StyledNavLink } from "./styles";
import { useState } from "react";
import Combo from "./features/Combo";
import Fv from "./features/Fv";
import KeyRack from "./features/KeyRack";
import AuctionLoss from "./features/AuctionLoss";
import S2D from "./features/S2D";
import Update from "./features/Update";

function App() {
  const [plates, setPlates] = useState([""]);
  const navigate = useNavigate();

  const cleaningHandler = (url) => {
    navigate(url);
  };
  return (
    <>
      <Bar>

        <LinkDiv>
          <StyledNavLink
            to="/combo"
            onClick={() => cleaningHandler("/combo")}
          >
            Combo
          </StyledNavLink>
        </LinkDiv>
        <LinkDiv>
          <StyledNavLink to="/fv" onClick={() => cleaningHandler("/fv")}>
            FV
          </StyledNavLink>
        </LinkDiv>
        <LinkDiv>
          <StyledNavLink
            to="/keyRack"
            onClick={() => cleaningHandler("/keyRack")}
          >
            Szafa
          </StyledNavLink>
        </LinkDiv>
        <LinkDiv>
          <StyledNavLink
            to="/auctionLoss"
            onClick={() => cleaningHandler("/auctionLoss")}
          >
            Aukcje
          </StyledNavLink>
        </LinkDiv>
        <LinkDiv>
          <StyledNavLink
            to="/S2D"
  
          >S2D</StyledNavLink>
        </LinkDiv>
        <LinkDiv>
          <StyledNavLink
            to="/update"
            onClick={() => cleaningHandler("/update")}
          >
            Update
          </StyledNavLink>
        </LinkDiv>
      </Bar>

      <Routes>
        <Route
          path="*"
          element={<Combo plates={plates} setPlates={setPlates} />}
        />
        <Route path="/fv" element={<Fv />} />
        <Route path="/keyRack" element={<KeyRack />} />
        <Route path="/auctionLoss" element={<AuctionLoss />} />
        <Route path="/S2D" element={<S2D />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </>
  );
}

export default App;
