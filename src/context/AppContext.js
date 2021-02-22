import React, { createContext, useReducer } from 'react';
import reducer, { initialState } from './reducer';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
