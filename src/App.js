import Calculator from './page/Calculator';
import GlobalProvider from './providers';

function App() {
  return (
    <>
      <GlobalProvider>
        <Calculator />
      </GlobalProvider>
    </>
  );
}

export default App;
