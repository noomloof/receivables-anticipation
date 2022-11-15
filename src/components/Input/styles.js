import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin-bottom: 28px;
  /* display: flex; */
  flex-direction: column;

  input {
    outline: none;
    text-align: left;
    border: 1px solid var(--inp-border);
    border-radius: 5px;

    width: 75%;

    padding: 12.5px;

    background: white;
    transition: 0.3s;

    color: var(--text);

    &:focus {
      border: 1px solid var(--focus);
      transition: 0.3s;
      color: var(--focus);
    }
  }

  label {
    position: absolute;
    top: 15px;
    left: 4.4rem;
    color: var(--text);
    transition: 0.3s;
    font-size: 0.85rem;
    pointer-events: none;
    background: white;
  }

  input:focus ~ label,
  input:not([value='']) ~ label {
    top: -0.24rem;
    left: 4.125rem;
    color: var(--focus);
    font-size: 0.775rem;
    padding-left: 3px;
    padding-right: 3px;
    transition: 0.4s;
  }

  input:not(:focus):valid ~ label {
    color: var(--text);
  }

  section {
    font-size: 0.625rem;
    position: absolute;
    left: 4.25rem;
    margin-top: 2px;
    color: var(--text);
  }
`;
