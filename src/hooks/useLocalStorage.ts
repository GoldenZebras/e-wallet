import { useState, useEffect } from 'react';
import { CardProps } from '../models/CardProps';

const useLocalStorage = (key: string, initialCards: CardProps[]) => {
  const [cards, setCards] = useState<CardProps[]>(() => {
    const storedCards = localStorage.getItem(key);
    return storedCards ? JSON.parse(storedCards) : initialCards;
  });

  const [activeCard, setActiveCard] = useState<CardProps | undefined>(() => {
    const storedCards = localStorage.getItem(key);
    const parsedCards: CardProps[] = storedCards
      ? JSON.parse(storedCards)
      : initialCards;
    return parsedCards.find((card) => card.active);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cards));
  }, [cards]);

  const addCard = (card: CardProps) => {
    let isSuccess: boolean = true;
    setCards((prevCards) => {
      const cardExists = prevCards.some(
        (c) => c.cardNumber === card.cardNumber
      );
      if (cardExists) {
        alert(`Card with card number ${card.cardNumber} already exists.`);
        isSuccess = false;
        return prevCards;
      }
      const updatedCards = prevCards.map((c) => ({ ...c, active: false }));

      setActiveCard(card);
      return [...updatedCards, card];
    });
    return isSuccess;
  };

  const removeCard = () => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => !card.active);
      return updatedCards;
    });
    setActiveCard(undefined);
  };

  const setActiveCardFunc = (cardNumber: string) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) => ({
        ...card,
        active: cardNumber === card.cardNumber,
      }));
      const newActiveCard = updatedCards.find((card) => card.active);

      setActiveCard(newActiveCard);
      return updatedCards;
    });
  };

  return { removeCard, addCard, setActiveCardFunc, activeCard, cards };
};

export default useLocalStorage;
