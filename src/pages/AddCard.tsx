import './addCard.scss';
import '../components/card/card.scss';
import Card from '../components/card/Card';
import Form from '../components/form/Form';
import useFormValidator from '../hooks/useFormValidator';
import backbtn from '../assets/backbutton.png';
import { useNavigate } from 'react-router-dom';

const AddCard = () => {
  const [formData, error, handleChange, validator] = useFormValidator();
  const navigate = useNavigate();
  return (
    <main className="main-add-cards">
      <div className="title">Add a new bank card</div>
      <img src={backbtn} alt="back-btn" className="back-btn" onClick={() => navigate('/')} />
      <p className="new-card-title">New card</p>
      <Card
        cardNumber={formData.cardNumber}
        cardHolder={formData.name}
        expirationDate={formData.valid}
        vendor={formData.vendor}
      />
      <Form formData={formData} error={error} handleChange={handleChange} validator={validator} />
    </main>
  );
};

export default AddCard;
