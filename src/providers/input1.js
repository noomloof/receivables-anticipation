import { createContext, useState } from 'react';

export const Input1Context = createContext([]);

export const Input1Provider = ({ children }) => {
  const [input1, setInput1] = useState('');

  return (
    <Input1Context.Provider value={{ input1, setInput1 }}>
      {children}
    </Input1Context.Provider>
  );
};
