var XLSX = require("xlsx");

export const useHooks = (setData, file) => {
  const today = new Date().toLocaleDateString("pl-PL", {
    year: "numeric",
    minute: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
  });

  const handleConvertRecords = (event) => {
    event.preventDefault();
    if (file[0]) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file[0]);

      fileReader.onload = (event) => {
        const fileData = event.target.result;
        const workbook = XLSX.read(fileData, { type: "binary" });
        const resultArray = [];

        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const range = XLSX.utils.decode_range(worksheet["!ref"]);
          const rows = range.e.r;

          for (let i = 1; i <= rows; i++) {
            const cellA = worksheet[XLSX.utils.encode_cell({ r: i, c: 0 })];
            const cellB = worksheet[XLSX.utils.encode_cell({ r: i, c: 36 })];
            const cellC = worksheet[XLSX.utils.encode_cell({ r: i, c: 2 })];
            const cellD = worksheet[XLSX.utils.encode_cell({ r: i, c: 37 })];
            const cellE = worksheet[XLSX.utils.encode_cell({ r: i, c: 18 })];

            if (cellA) {
              const plate = cellA.v;
              const fvNumber = cellB ? cellB.v : undefined;
              const status = cellC ? cellC.v : "Brak";
              const excelDate = cellD ? cellD.v : "Brak";
              const comment = cellE ? cellE.v : undefined;
              const invoiceIssue =
                excelDate !== "Brak"
                  ? new Date(
                      (excelDate - 25569) * 86400000
                    ).toLocaleDateString("pl-PL", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit"
                    })
                  : undefined;
              const obj = { id: i, plate, status, fvNumber, invoiceIssue, comment };
              resultArray.push(obj);
            }
          }
        });
        resultArray.unshift(today);
        setData((prevData) => {
          const dataArray = [...prevData];
          dataArray[0] = resultArray;
          return dataArray;
        });
      };
    }
  };

  const handleConvertAuctionLossess = (event) => {
    event.preventDefault();
    if (file[1]) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file[1]);

      fileReader.onload = (event) => {
        const fileData = event.target.result;
        const workbook = XLSX.read(fileData, { type: "binary" });
        const resultArray = [];

        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const range = XLSX.utils.decode_range(worksheet["!ref"]);
          const rows = range.e.r;

          for (let i = 1; i <= rows; i++) {
            const cellA = worksheet[XLSX.utils.encode_cell({ r: i, c: 0 })];
            const cellB = worksheet[XLSX.utils.encode_cell({ r: i, c: 1 })];

            if (cellA) {
              const plate = cellA.v;
              const loss = cellB ? cellB.v : "nieaktualne";
              const obj = { id: i, plate, loss };
              resultArray.push(obj);
            }
          }
        });
        resultArray.unshift(today);
        setData((prevData) => {
          const dataArray = [...prevData];
          dataArray[1] = resultArray;
          return dataArray;
        });
      };
    }
  };

  return {
    handleConvertRecords,
    handleConvertAuctionLossess,
    setData,
  };
};
