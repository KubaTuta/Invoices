import { useState } from "react";
import { CustomDatePicker, Layout, StyledSelect, Tile } from "./styles";
// import Comment from "./Comment";

export const KeyRack = () => {
  const records = JSON.parse(localStorage.getItem("invoices"));

  const createSelectedFilters = () => {
    const filters = {};

    records.forEach((singleCarDataObject) => {
      if (typeof singleCarDataObject === "object") {
        Object.keys(singleCarDataObject).forEach((key) => {
          filters[key] = "ALL";
        });
      }
    });
    return filters;
  };

  const [selectedFilters, setSelectedFilters] = useState(
    createSelectedFilters()
  );

  const headers = Object.keys(selectedFilters);

  const filteredRecords = records.filter((singleCarDataObject) => {
    return headers.every((header) => {
      return (
        selectedFilters[header] === "ALL" ||
        selectedFilters[header] === singleCarDataObject[header]
      );
    });
  });

  const handleFilterChanger = (filter, filterType) => {
    setSelectedFilters((prevFilter) => ({
      ...prevFilter,
      [filterType]: isNaN(filter) ? filter : parseFloat(filter),
    }));
  };

  const handleDate = (date) => {
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    setSelectedFilters({ ...selectedFilters, invoiceIssue: formattedDate });
  };

  const dateFormatter = () => {
    const dateArray = selectedFilters.invoiceIssue.split(".");
    const day = parseInt(dateArray[0], 10);
    const month = parseInt(dateArray[1], 10) - 1;
    const year = parseInt(dateArray[2], 10);
    return new Date(year, month, day);
  };

  // const [comments, setComments] = useState(filteredRecords.map((filterType) => filterType["comment"]))
  // console.log(comments)

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
            new Set(filteredRecords.map((filterType) => filterType[header]))
          );
          if (header === "invoiceIssue") {
            return (
              <CustomDatePicker
                selected={
                  selectedFilters.invoiceIssue === "ALL"
                    ? new Date()
                    : dateFormatter()
                }
                onSelect={(date) => handleDate(date)}
                onClickOutside={() =>
                  setSelectedFilters({
                    ...selectedFilters,
                    invoiceIssue: "ALL",
                  })
                }
                dateFormat="dd.MM.yyyy"
              />
            );
          } else if (header === "comment") {
            return (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedFilters[header] === "ALL"}
                  />
                  ALL
                </label>
                {unique.slice(0, 3).map((status) => (
                  <div key={status}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedFilters[header] === status}
                      />
                      {status}
                    </label>
                  </div>
                ))}
              </div>

              // <Comment
              //   index={index}
              //   selectedFilter={selectedFilter}
              //   header={header}
              //   unique={unique}
              // />
            );
          } else
            return (
              <StyledSelect
                key={index}
                value={selectedFilters[header]}
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

      {filteredRecords.slice(0, 100).map((singleCarDataObject, index) => (
        <Layout key={singleCarDataObject.id}>
          {headers.map((header, index) => (
            <Tile key={index}>{singleCarDataObject[header]}</Tile>
          ))}
        </Layout>
      ))}
      <button>BACK</button>
      <button>NEXT</button>
    </>
  );
};

export default KeyRack;
