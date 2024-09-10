import { VerticalDiv } from "../../common/styles";

const TplStatus = ({ plates }) => {
  const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
  console.log(invoices);

  return (
    <VerticalDiv>
      {plates.map((plate) => {
        const invoice = invoices.find((invoice) => invoice.plate === plate);
        if (invoice) {
          return <div>{invoice.oc}</div>;
        } else return <>Brak</>;
      })}
    </VerticalDiv>
  );
};
export default TplStatus;
