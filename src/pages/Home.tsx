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
      <h2 className="card__container--subheader">
        {activeCard ? (
          <button className="card__container--button" onClick={removeCard}>
            Remove card
          </button>
        ) : null}
      </h2>
      <div className="card__container--activeCard">
        {activeCard ? (
          <Card
            cardNumber={activeCard.cardNumber}
            cardHolder={activeCard.cardHolder}
            expirationDate={activeCard.expirationDate}
            vendor={activeCard.vendor}
          />
        ) : (
          <p>No active card.</p>
        )}
      </div>
      <div className="card__container--list">
        {inactiveCards?.map((card: CardProps, index: number) => (
          <div
            key={index}
            className={`card__container--list-item-${inactiveCards.length}`}
            onClick={() => setActiveCardFunc(card.cardNumber)}>
            <Card
              cardNumber={card.cardNumber}
              cardHolder={card.cardHolder}
              expirationDate={card.expirationDate}
              vendor={card.vendor}
            />
          </div>
        ))}
      </div>
      <Button className="addbutton" title={'Add new card'} filled={false} to={'/addcard'} />
    </div>
  );
};

export default Home;
