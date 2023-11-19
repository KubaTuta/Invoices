import { useState } from "react";
import { CustomDatePicker, Layout, StyledSelect, Tile } from "./styles";

export const KeyRack = () => {
  const evidence = JSON.parse(localStorage.getItem("invoices"));

  const [selectedFilter, setSelectedFilter] = useState({
    id: "ALL",
    plate: "ALL",
    status: "ALL",
    fvNumber: "ALL",
    invoiceIssue: "ALL",
  });
  const headers = Object.keys(selectedFilter);

  const handleFilterChanger = (filter, filterType) => {
    setSelectedFilter((prevFilter) => ({
      ...prevFilter,
      [filterType]: isNaN(filter) ? filter : parseFloat(filter),
    }));
  };

  const handleDate = (date) => {
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    setSelectedFilter({ ...selectedFilter, invoiceIssue: formattedDate });
  };

  const dateFormatter = () => {
    const dateArray = selectedFilter.invoiceIssue.split(".");
    const day = parseInt(dateArray[0], 10);
    const month = parseInt(dateArray[1], 10) - 1;
    const year = parseInt(dateArray[2], 10);
    return new Date(year, month, day);
  };

  const filteredEvidence = evidence.filter((filterType) => {
    return headers.every((key) => {
      return (
        selectedFilter[key] === "ALL" || selectedFilter[key] === filterType[key]
      );
    });
  });

  return (
    <>
      <Layout>
        {headers.map((header, index) => (
          <Tile key={index}>{header}</Tile>
        ))}
      </Layout>

      <Layout>
        {headers.map((header, index) => {
          const unique = Array.from(
            new Set(filteredEvidence.map((filterType) => filterType[header]))
          );
          if (header === "invoiceIssue") {
            return (
              <CustomDatePicker
                selected={
                  selectedFilter.invoiceIssue === "ALL"
                    ? new Date()
                    : dateFormatter()
                }
                onSelect={(date) => handleDate(date)}
                onClickOutside={() =>
                  setSelectedFilter({ ...selectedFilter, invoiceIssue: "ALL" })
                }
                dateFormat="dd.MM.yyyy"
              />
            );
          } else
            return (
              <StyledSelect
                key={index}
                value={selectedFilter[header]}
                onChange={(e) => handleFilterChanger(e.target.value, header)}
              >
                <option value="ALL">ALL</option>
                {unique.slice(0, 1000).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </StyledSelect>
            );
        })}
      </Layout>

      {filteredEvidence.slice(0, 100).map((filterType) => (
        <Layout key={filterType.id}>
          <Tile>{filterType.id}</Tile>
          <Tile>{filterType.plate}</Tile>
          <Tile>{filterType.status}</Tile>
          <Tile>{filterType.fvNumber}</Tile>
          <Tile>{filterType.invoiceIssue}</Tile>
        </Layout>
      ))}
      <button>BACK</button>
      <button>NEXT</button>
    </>
  );
};

export default KeyRack;
