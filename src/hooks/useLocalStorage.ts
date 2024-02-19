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
      const updatedValue = [...prevValue, card];
      localStorage.setItem(key, JSON.stringify(updatedValue));
      return updatedValue;
    });
  };

  const removeCard = (index: number) => {
    // gör att denna tar bort active card och inte något annat.
    //uppdatera värdet på cardsarray etc
    // setValue((prevValue) => {
    //   const updatedValue = [...prevValue];
    //   updatedValue.splice(index, 1);
    //   localStorage.setItem(key, JSON.stringify(updatedValue));
    //   return updatedValue;
    // });
  };

  const setActiveCardFunc = (index: number) => {
    setValue((prevValue) => {
      const updatedValue = prevValue.map((card, i) => ({
        ...card,
        active: i === index,
      }));
      const newActiveCard = updatedValue.find((card) => card.active);
      const newInactiveCards = updatedValue.filter((card) => !card.active);
      setActiveCard(newActiveCard);
      setInactiveCards(newInactiveCards);
      localStorage.setItem(key, JSON.stringify(updatedValue));
      return updatedValue;
    });
  };

  return { value, setValue, removeCard, addCard, setActiveCardFunc, activeCard, inactiveCards };
};

export default useLocalStorage;
