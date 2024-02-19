import { useState } from 'react';
import Button from '../button/Button';
import './form.scss';
import { FormData } from '../../models/FormData';
import useLocalStorage from '../../hooks/useLocalStorage';
import { STORAGE_KEY } from '../../constants/StorageKey';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const { addCard } = useLocalStorage(STORAGE_KEY, []);
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    cardNumber: '',
    valid: '',
    ccv: '',
    vendor: '',
  });
  const selectItems = [
    {
      value: 'bitcon',
      label: 'Bitcoin inc',
    },
    {
      value: 'ninja',
      label: 'Ninja bank',
    },
    {
      value: 'blockchain',
      label: 'Block chain inc',
    },
    {
      value: 'evilcorp',
      label: 'Evil corp',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name !== 'name' && name !== 'vendor' && name !== 'valid') {
      const parsedValue = Number(value);
      !isNaN(parsedValue) && setFormData({ ...formData, [name]: value });
    } else if (name == 'valid') {
      value.length === 2 && formData.valid.length != 3
        ? setFormData({ ...formData, [name]: value + '/' })
        : setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    let errorMessage = '';
    const [firstname, lastname] = formData.name.split(' ');

    if (!firstname || !lastname) {
      errorMessage = 'Fullname is required';
    }

    if (!formData.cardNumber.trim() || formData.cardNumber.length < 16) {
      errorMessage = 'Card number is required, 16 digits';
    }

    if (!formData.valid.trim()) {
      errorMessage = 'Valid Thru is required';
    } else {
      const [month, year] = formData.valid.split('/');
      if (Number(month) > 12) {
        errorMessage = 'Month cannot be higher then 12';
      } else if (Number(year) < 24) {
        errorMessage = 'Year cannot be lower then current year';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.valid)) {
        errorMessage = 'Valid Thru must be in the format mm/yy';
      }
    }

    if (!formData.vendor.trim()) {
      errorMessage = 'Vendor must be chosen';
    }
    if (!formData.ccv.trim() || formData.ccv.trim().length < 3) {
      errorMessage = 'CCV must be 3 digits long';
    }

    return errorMessage;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validated = validateForm();
    setError(validated!);
    if (validated.length == 0) {
      addCard({
        cardNumber: formData.cardNumber,
        cardHolder: formData.name,
        expirationDate: formData.valid,
        vendor: formData.vendor,
        active: false,
      });

      navigate('/');
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
            className="input"
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
            className="input"
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
