import { createContext, useState } from 'react';

export const Input4Context = createContext([]);

export const Input4Provider = ({ children }) => {
  const [input4, setInput4] = useState('');

  return (
    <Input4Context.Provider value={{ input4, setInput4 }}>
      {children}
    </Input4Context.Provider>
  );
};
