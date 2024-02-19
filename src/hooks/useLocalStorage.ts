import { useState, useEffect } from 'react';
import { CardProps } from '../models/CardProps';

const useLocalStorage = (key: string, initialValue: CardProps[]) => {
  const [value, setValue] = useState<CardProps[]>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });
  const [activeCard, setActiveCard] = useState<CardProps | undefined>(() => {
    const storedValue = localStorage.getItem(key);
    const parsedValue: CardProps[] = storedValue ? JSON.parse(storedValue) : initialValue;
    return parsedValue.find((card) => card.active);
  });

  const [inactiveCards, setInactiveCards] = useState<CardProps[]>(
    value.filter((card) => !card.active)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  const addCard = (card: CardProps) => {
    setValue((prevValue) => {
      const cardExists = prevValue.some((c) => c.cardNumber === card.cardNumber);
      if (cardExists) {
        prompt(`Card with card number ${card.cardNumber} already exists.`);
        return prevValue;
      }
      const updatedValue = [...prevValue, card];
      localStorage.setItem(key, JSON.stringify(updatedValue));
      return updatedValue;
    });
  };

  const removeCard = () => {
    setValue((prevValue) => {
      const updatedValue = prevValue.filter((card) => !card.active);
      localStorage.setItem(key, JSON.stringify(updatedValue));
      return updatedValue;
    });
    setActiveCard(undefined);
    setInactiveCards(value.filter((card) => !card.active));
  };

  const setActiveCardFunc = (cardNumber: string) => {
    setValue((prevValue) => {
      const updatedValue = prevValue.map((card) => ({
        ...card,
        active: cardNumber === card.cardNumber,
      }));
      const newActiveCard = updatedValue.find((card) => card.active);
      const newInactiveCards = updatedValue.filter((card) => !card.active);

      setActiveCard(newActiveCard);
      setInactiveCards(newInactiveCards);
      localStorage.setItem(key, JSON.stringify(updatedValue));
      return updatedValue;
    });
  };

  return { removeCard, addCard, setActiveCardFunc, activeCard, inactiveCards };
};

export default useLocalStorage;
