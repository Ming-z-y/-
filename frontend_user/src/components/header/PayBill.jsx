import "./header.css"

export const PayBill = ({ isDisplay }) => {
  return <div className="pay_the_bill" style={{ display: isDisplay ? "block" : "none" }}>pay it</div>;
}