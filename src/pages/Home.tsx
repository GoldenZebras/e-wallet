import Card from '../components/card/Card';
import { CardList } from '../constants/CardList';

const HomeComponent = () => {
  return (
    <div>
      {CardList.map((card, index) => (
        <Card
          key={index}
          cardNumber={card.cardNumber}
          cardHolder={card.cardHolder}
          expirationDate={card.expirationDate}
          vendor={card.vendor}
          activeCard={card.activeCard}
        />
      ))}
    </div>
  );
};

export default HomeComponent;
