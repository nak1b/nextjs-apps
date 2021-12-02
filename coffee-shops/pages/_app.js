import '../styles/globals.css';
import { StoreProvider } from '../store/store-context';

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
