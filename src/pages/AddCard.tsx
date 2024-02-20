import './addCard.scss';
import '../components/card/card.scss';
import Card from '../components/card/Card';
import Form from '../components/form/Form';
import useFormValidator from '../hooks/useFormValidator';

const AddCard = () => {
  const [formData, error, handleChange, validator] = useFormValidator();
  return (
    <main className="main-add-cards">
      <div className="title">Add a new bank card</div>
      <p className="new-card-title">New card</p>
      <Card
        cardNumber={formData.cardNumber}
        cardHolder={formData.name}
        expirationDate={formData.valid}
        vendor={formData.vendor}
        active={true}
      />
      <Form formData={formData} error={error} handleChange={handleChange} validator={validator} />
    </main>
  );
};

export default AddCard;
