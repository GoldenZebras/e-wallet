import React from 'react';
import { CardProps } from '../../models/CardProps';
import './card.scss';

const Card: React.FC<CardProps> = ({ cardHolder, cardNumber, expirationDate, vendor }) => {
  return (
    <div className={`card ${vendor}`}>
      <div className="card__number">{cardNumber}</div>
      <div className="card__holder">{cardHolder}</div>
      <div className="card__expiry">{expirationDate}</div>
      <figure className={`card__vendor ${vendor}`}></figure>
    </div>
  );
};
export default Card;