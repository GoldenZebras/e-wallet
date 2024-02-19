import { useState, useEffect } from 'react';
import { CardProps } from '../models/CardProps';

const useLocalStorage = (key: string, initialValue: CardProps[]) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  const addCard = (card: CardProps) => {
    const currentValue = localStorage.getItem(key);
    if (currentValue) {
      const parsedValue = JSON.parse(currentValue);
      parsedValue.push(card);
      localStorage.setItem(key, JSON.stringify(parsedValue));
      setValue(parsedValue);
    }
  };

  const removeCard = (index: number) => {
    const currentValue = localStorage.getItem(key);
    if (currentValue) {
      const parsedValue = JSON.parse(currentValue);
      parsedValue.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(parsedValue));
      setValue(parsedValue);
    }
  };

  const setActiveCard = (index: number) => {
    setActiveCardIndex(index);
    const currentValue = localStorage.getItem(key);
    if (currentValue) {
      const parsedValue = JSON.parse(currentValue);
      parsedValue.forEach((card: CardProps, i: number) => {
        card.active = i === index;
      });
      localStorage.setItem(key, JSON.stringify(parsedValue));
      setValue(parsedValue);
    }
  };

  return { value, setValue, removeCard, addCard, setActiveCard, activeCardIndex };
};

export default useLocalStorage;
