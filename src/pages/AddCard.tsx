import "./addCard.scss";
import "../components/card/card.scss";
import Card from "../components/card/Card";
import Form from "../components/form/Form";

const AddCard = () => {
  return (
    <main className="main-add-cards">
      <div className="title">Add a new bank card</div>
      <p className="new-card-title">New card</p>
      <Card
        cardNumber="XXXX XXXX XXXX XXXX"
        cardHolder="Firstname Lastname"
        expirationDate="MM/YY"
        vendor="bitcoin"
        active={true}
        isPlaceHolder={true}
      />
      <Form />
    </main>
  );
};

export default AddCard;
