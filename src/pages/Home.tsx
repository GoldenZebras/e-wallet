import Card from '../components/card/Card';
import { CardList } from '../constants/CardList';
import useLocalStorage from '../sass/useLocalStorage';
import { STORAGE_KEY } from '../constants/StorageKey';
import { CardProps } from '../models/CardProps';

const HomeComponent = () => {
  const { value, removeCard, setActiveCard } = useLocalStorage(STORAGE_KEY, CardList);

  return (
    <div className="card__container">
      {value.map((card: CardProps, index: number) => (
        <div
          key={index}
          className={`card__container--item ${card.active ? 'active' : ''}`}
          onClick={() => setActiveCard(index)}>
          <Card
            cardNumber={card.cardNumber}
            cardHolder={card.cardHolder}
            expirationDate={card.expirationDate}
            vendor={card.vendor}
            active={card.active}
          />
          <button onClick={() => removeCard(index)}>Ta bort</button>
        </div>
      ))}
    </div>
  );
};

export default HomeComponent;
