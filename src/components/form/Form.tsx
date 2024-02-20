import Button from '../button/Button';
import './form.scss';
import useLocalStorage from '../../hooks/useLocalStorage';
import { STORAGE_KEY } from '../../constants/StorageKey';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { FormData } from '../../models/FormData';
import { selectItems } from '../../constants/SelectItems';

interface FormProps {
  formData: FormData;
  error: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  validator: () => boolean;
}

const Form: React.FC<FormProps> = ({ formData, error, handleChange, validator }) => {
  const { addCard } = useLocalStorage(STORAGE_KEY, []);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validator();
    if (isValid) {
      const success = addCard({
        cardNumber: formData.cardNumber,
        cardHolder: formData.name,
        expirationDate: formData.valid,
        vendor: formData.vendor,
        active: true,
      });

      if (success) setTimeout(() => navigate('/'), 750);
    }
  };

  return (
    <form className="form" action="submit" onSubmit={(e) => handleSubmit(e)}>
      <label className="form-subtitles">Card number</label>
      <input
        placeholder="XXXX XXXX XXXX XXXX"
        maxLength={16}
        type="string"
        value={formData.cardNumber}
        className="input"
        name="cardNumber"
        onChange={(e) => handleChange(e)}
      />

      <label className="form-subtitles">Cardholder name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder="FIRSTNAME LASTNAME"
        className="input"
        onChange={(e) => handleChange(e)}
      />

      <article className="valid-ccv">
        <div className="form-subtitles">
          <label>Valid thru</label>
          <br></br>
          <input
            type="text"
            className="input v-c"
            placeholder="MM/YY"
            value={formData.valid}
            name="valid"
            onChange={(e) => handleChange(e)}
            maxLength={5}
          />
        </div>
        <div className="form-subtitles">
          <label>CCV</label>
          <br></br>
          <input
            type="text"
            maxLength={3}
            value={formData.ccv}
            className="input v-c"
            name="ccv"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </article>

      <label className="form-subtitles">Vendor</label>
      <select
        className="input select-element"
        name="vendor"
        onChange={(e) => handleChange(e)}
        defaultValue={''}>
        <option value="" disabled hidden></option>
        {selectItems.map((item, index) => (
          <option key={index} value={item.value} className={`option ${item.value}`}>
            {item.label}
          </option>
        ))}
      </select>
      <div className="form-errors">{error}</div>

      <Button title={'Add card'} filled={true} />
    </form>
  );
};

export default Form;
