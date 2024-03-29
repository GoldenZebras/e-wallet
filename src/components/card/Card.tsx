import React from "react";
import { CardProps } from "../../models/CardProps";
import "./card.scss";

const Card: React.FC<CardProps> = ({
  cardHolder,
  cardNumber,
  expirationDate,
  vendor,
}) => {
  function formatCardNumber(cardNumber: string) {
    while (cardNumber.length < 16) {
      cardNumber += "X";
    }
    return cardNumber.replace(/(.{4})/g, "$1 ").trim();
  }

  return (
    <div className={`card ${vendor}`}>
      <div className="card__number">{formatCardNumber(cardNumber)}</div>
      <div className="card__holder">{cardHolder}</div>
      <div className="card__expiry">{expirationDate}</div>
      <figure className={`card__vendor ${vendor}`}></figure>
      <figure className={`card__emv ${vendor}`}></figure>
    </div>
  );
};
export default Card;
