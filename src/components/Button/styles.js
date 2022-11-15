import styled from 'styled-components';

export const Container = styled.div`
  button {
    background: var(--back);
    color: var(--text);

    margin-top: 15px;
    padding: 20px 47.5px;
    transition: 0.3s;

    font-size: 1.125rem;

    &:hover {
      background: var(--border);
      color: var(--result);
    }

    &:active {
      background: var(--text);
      color: var(--result);
    }
  }
`;
