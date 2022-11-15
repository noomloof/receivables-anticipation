import { useState } from 'react';
import { Container } from './styles';

const Input = (props) => {
  const [input, setInput] = useState('');

  return (
    <Container>
      <input
        className={`input-${props.name}`}
        type='text'
        name={props.name}
        value={input}
        autoComplete='aaaaaaaaaaaaa'
        onChange={(e) => {
          setInput(e.target.value);

          if (props.setInput1) {
            props.setInput1(e.target.value);
          } else if (props.setInput2) {
            props.setInput2(e.target.value);
          } else if (props.setInput3) {
            props.setInput3(e.target.value);
          } else if (props.setInput4) {
            props.setInput4(e.target.value);
          }
        }}
      />
      <label htmlFor={props.name}> {props.label} </label>
      {props.detail ? <section> {props.detail} </section> : null}
    </Container>
  );
};

export default Input;
