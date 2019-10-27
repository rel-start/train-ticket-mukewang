import './Ticket.css';
import React, {
  memo,
} from "react";

export default memo(function Ticket(props: ITicketProps) {
  const {
    price,
    type,
  } = props;

  return (
    <div className="ticket">
      <p>
        <span className="ticket-type">{type}</span>
        <span className="ticket-price">{price}</span>
      </p>
      <div className="label">坐席</div>
    </div>
  );
})

interface ITicketProps {
  price: number,
  type: string,
}