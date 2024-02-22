import Card from '../components/card/Card';
import { InitialCards } from '../constants/InitialCards';
import useLocalStorage from '../hooks/useLocalStorage';
import { STORAGE_KEY } from '../constants/StorageKey';
import Button from '../components/button/Button';
import './home.scss';
import CardList from '../components/list/CardList';

const Home = () => {
  const { removeCard, setActiveCardFunc, activeCard, cards } = useLocalStorage(
    STORAGE_KEY,
    InitialCards
  );

  return (
    <div className="card__container">
      <h1 className="card__container--header">E-wallet</h1>
      <h2 className="card__container--subheader">
        Active card
        {activeCard ? (
          <button className="card__container--button" onClick={removeCard}>
            Remove card
          </button>
        ) : null}
      </h2>
      <div className="card__container--activeCard">
        {activeCard ? <Card {...activeCard} /> : <p>No active card.</p>}
      </div>

      <CardList
        onCardClick={(nmbr: string) => setActiveCardFunc(nmbr)}
        cards={cards}
      />
      <Button
        className="addbutton"
        title={'Add new card'}
        filled={false}
        to={'/addcard'}
      />
    </div>
  );
};

export default Home;
