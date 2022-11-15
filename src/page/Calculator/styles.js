import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--back);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DualHolder = styled.div`
  height: 60%;
  width: 56%;
  display: flex;
  flex-direction: row;
  background: white;
`;

export const InputHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 54%;
  /* justify-content: space-between; */

  padding: 40px;
  h2 {
    margin-bottom: 20px;
  }
`;

export const ResultsHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 46%;
  background: var(--result-back);
  padding: 50px 20px 0 20px;
  overflow-y: scroll;

  h1 {
    font-style: italic;
    display: flex;
    justify-content: center;
    color: var(--result);
  }

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #aeaeae;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const HR = styled.div`
  display: flex;
  justify-content: center;

  hr {
    margin: 18px 0;
    width: 85%;
    height: 1.25px;
    background-color: var(--hr);
    border: none;
  }
`;
