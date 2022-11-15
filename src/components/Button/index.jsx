import { Container } from './styles';
import './loading.css';
import { LoadingContext } from '../../providers/loading';
import { useContext } from 'react';

const Button = ({ text, buttonClick }) => {
  const { loading } = useContext(LoadingContext);

  return (
    <Container>
      <button
        onClick={loading ? null : () => buttonClick()}
        className='action-button'
        // If loading is TRUE, then you cannot execute
        // another simulation. If loading is FALSE,
        // then you are free to press the button.
      >
        {
          loading ? <div className='lds-dual-ring'></div> : text
          // CSS for a loading button
        }
      </button>
    </Container>
  );
};

export default Button;
