import Card from '../components/card/Card';
import { CardList } from '../constants/CardList';
import useLocalStorage from '../hooks/useLocalStorage';
import { STORAGE_KEY } from '../constants/StorageKey';
import { CardProps } from '../models/CardProps';
import Button from '../components/button/Button';
import './home.scss';

const Home = () => {
  const { removeCard, setActiveCardFunc, activeCard, inactiveCards } = useLocalStorage(
    STORAGE_KEY,
    CardList
  );

  return (
    <div className="card__container">
      <h1 className="card__container--header">E-wallet</h1>
      <div className="card__container--activeCard">
        <h2 className="card__container--activeCard header">active card</h2>
        <div>
          {activeCard ? (
            <>
              <button>remove</button>
              <Card
                cardNumber={activeCard.cardNumber}
                cardHolder={activeCard.cardHolder}
                expirationDate={activeCard.expirationDate}
                vendor={activeCard.vendor}
                active={activeCard.active}
              />
            </>
          ) : (
            <p>No active card.</p>
          )}
        </div>
      </div>
      {inactiveCards?.map((card: CardProps, index: number) => (
        <div
          key={index}
          className={`card__container--item ${card.active ? 'active' : ''}`}
          onClick={() => setActiveCardFunc(index)}>
          <Card
            cardNumber={card.cardNumber}
            cardHolder={card.cardHolder}
            expirationDate={card.expirationDate}
            vendor={card.vendor}
            active={card.active}
          />
        </div>
      ))}
      <Button title={'Add new card'} filled={false} to={'/addcard'} />
    </div>
  );
};

export default Home;
