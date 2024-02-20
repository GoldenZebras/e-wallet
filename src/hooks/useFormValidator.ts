import { useState } from 'react';
import { FormData } from '../models/FormData';

const useFormValidator = (): [
  FormData,
  string,
  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  () => boolean
] => {
  const initialFormData: FormData = {
    name: '',
    cardNumber: '',
    valid: '',
    vendor: '',
    ccv: '',
  };

  //States för hantering av våra värden - Formulärdatan samt felmeddelande
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState<string>('');

  // Funktion för hantering av ändringar i formulär
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name !== 'name' && name !== 'vendor' && name !== 'valid') {
      const parsedValue = Number(value);
      !isNaN(parsedValue) && setFormData({ ...formData, [name]: value });
    } else if (name === 'valid') {
      value.length === 2 && formData.valid.length !== 3
        ? setFormData({ ...formData, [name]: value + '/' })
        : setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  //Validator för att returnera om det gått bra eller inte att validera formuläret.
  const validator = (): boolean => {
    const valid = validateForm();
    setError(valid);
    const isValid: boolean = valid === '';
    return isValid;
  };

  const validateForm = () => {
    const [firstname, lastname] = formData.name.split(' ');

    if (!firstname || !lastname) {
      return 'Fullname is required';
    }

    if (!formData.cardNumber.trim() || formData.cardNumber.length < 16) {
      return 'Card number is required, 16 digits';
    }

    if (!formData.valid.trim()) {
      return 'Valid Thru is required';
    } else {
      const [month, year] = formData.valid.split('/');

      if (Number(month) > 12) {
        return 'Month cannot be higher than 12';
      } else if (Number(year) < 24) {
        return 'Year cannot be lower than the current year';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.valid)) {
        return 'Valid Thru must be in the format mm/yy';
      }
    }

    if (!formData.vendor.trim()) {
      return 'Vendor must be chosen';
    }
    if (!formData.ccv.trim() || formData.ccv.trim().length < 3) {
      return 'CCV must be 3 digits long';
    }

    return '';
  };

  return [formData, error, handleChange, validator];
};

export default useFormValidator;
