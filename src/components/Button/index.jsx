import { Container } from './styles';
import './loading.css';
import { LoadingContext } from '../../providers/loading';
import { useContext } from 'react';

const Button = ({ text, buttonClick }) => {
  const { loading } = useContext(LoadingContext);

  return (
    <Container>
      <button
        onClick={() => buttonClick()}
        className='action-button'
      >
        {loading ? <div className='lds-dual-ring'></div> : text}
      </button>
    </Container>
  );
};

export default Button;
