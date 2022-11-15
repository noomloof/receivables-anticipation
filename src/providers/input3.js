import { createContext, useState } from 'react';

export const Input3Context = createContext([]);

export const Input3Provider = ({ children }) => {
  const [input3, setInput3] = useState('');

  return (
    <Input3Context.Provider value={{ input3, setInput3 }}>
      {children}
    </Input3Context.Provider>
  );
};
