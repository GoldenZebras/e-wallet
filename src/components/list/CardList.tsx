import { CardProps } from '../../models/CardProps';
import Card from '../card/Card';
import React, { useEffect, useState } from 'react';
import './cardList.scss';

interface CardListProps {
  cards: CardProps[];
  onCardClick: (nmbr: string) => void;
}

const CardList: React.FC<CardListProps> = ({ cards, onCardClick }) => {
  const [listOfCards, setListOfCards] = useState<Array<CardProps>>(cards);

  useEffect(() => {
    setListOfCards(() => {
      return cards.filter((card) => !card.active);
    });
  }, [cards]);

  return (
    <div className="card__container--list">
      {listOfCards?.map((card: CardProps, index: number) => (
        <div
          key={index}
          className={`card__container--list-item-${listOfCards.length}`}
          onClick={() => onCardClick(card.cardNumber)}>
          <Card {...card} />
        </div>
      ))}
    </div>
  );
};
export default CardList;
