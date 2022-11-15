import { createContext, useState } from 'react';

export const Input2Context = createContext([]);

export const Input2Provider = ({ children }) => {
  const [input2, setInput2] = useState('');

  return (
    <Input2Context.Provider value={{ input2, setInput2 }}>
      {children}
    </Input2Context.Provider>
  );
};
