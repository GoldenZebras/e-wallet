import React from 'react';
import './button.scss';
import { useNavigate } from 'react-router-dom';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  title: string;
  filled: boolean;
  to: string;
}

const Button: React.FC<ButtonProps> = ({ title, filled, to }) => {
  const navigate = useNavigate();
  const navigateToDestination = () => {
    navigate(to);
  };
  return (
    <button
      className={`card__addButton ${filled ? 'filled' : 'outlined'}`}
      onClick={navigateToDestination}>
      {title}
    </button>
  );
};
export default Button;
