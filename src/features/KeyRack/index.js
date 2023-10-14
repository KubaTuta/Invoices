import { useState } from "react";
import { Layout, Tile } from "./styles";

export const KeyRack = () => {
  const evidence = JSON.parse(localStorage.getItem("invoices"));
  console.log(evidence);

  const [selectedFilter, setSelectedFilter] = useState("Wszystko");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const uniqueStatuses = Array.from(
    new Set(evidence.map((plate) => plate.status))
  );

  const filteredEvidence = evidence.filter((plate) => {
    if (selectedFilter === "Wszystko") {
      return true;
    }
    return plate.status === selectedFilter;
  });

  return (
    <>
      <Layout>
        {Object.keys(evidence[0]).map((header, index) => (
          <Tile key={index}>{header}</Tile>
        ))}
      </Layout>
      <Layout>





        
        <select
        value={selectedFilter}
        onChange={(e) => handleFilterChange(e.target.value)}
      >
        <option value="Wszystko">Wszystko</option>

        {uniqueStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      </Layout>
      
      {filteredEvidence.slice(0, 100).map((plate) => (
        <Layout key={plate.id}>
          <Tile>{plate.id}</Tile>
          <Tile>{plate.plate}</Tile>
          <Tile>{plate.status}</Tile>
          <Tile>{plate.fvNumber}</Tile>
          <Tile>{plate.invoiceIssue}</Tile>
        </Layout>
      ))}
      <button>BACK</button>
      <button>NEXT</button>
    </>
  );
};

export default KeyRack;
