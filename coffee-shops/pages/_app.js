import { createContext, useReducer } from 'react';
import '../styles/globals.css'

export const StoreContext = createContext({});

export const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFEE_STORES: 'SET_COFFEE_STORES'
};

const storeReducer = (state, action) => {
  switch(action.type) {
    case ACTION_TYPES.SET_LAT_LONG: 
      return { ...state, latLong: action.payload };

    case ACTION_TYPES.SET_COFFEE_STORES: 
      return { ...state, coffeeStores: action.payload };
    
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: "",
    coffeeStores: []
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
};

const App = ({ Component, pageProps }) => {
  return (
    <div>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
  );
};

export default App;
