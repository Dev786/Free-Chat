import { AppContextProvider } from './Components/AppContext/appContext';
import Wrapper from './Components/Wrapper';
function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Wrapper></Wrapper>
      </AppContextProvider>
    </div>
  );
}

export default App;
