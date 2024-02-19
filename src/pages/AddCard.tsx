import './addCard.scss';
import Form from '../components/form/Form';

const AddCard = () => {
  return (
    <main className="main-add-cards">
      <div className="title">Add a new bank card</div>

      <p className="new-card-title">New card</p>

      {/* <Card /> */}

      <Form />
    </main>
  );
};

export default AddCard;
