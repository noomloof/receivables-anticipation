import { Input1Provider } from './input1';
import { Input2Provider } from './input2';
import { Input3Provider } from './input3';
import { Input4Provider } from './input4';
import { LoadingProvider } from './loading';

const GlobalProvider = ({ children }) => {
  return (
    <>
      <Input1Provider>
        <Input2Provider>
          <Input3Provider>
            <Input4Provider>
              <LoadingProvider>{children}</LoadingProvider>
            </Input4Provider>
          </Input3Provider>
        </Input2Provider>
      </Input1Provider>
    </>
  );
};

export default GlobalProvider;
