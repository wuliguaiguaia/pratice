import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux'
// import Provider from './components/Provider'
import { store } from './redux/store'
// import Todos from './components/Todos'
import Todos from './components/connect-Todos'
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Todos></Todos>
      </div>
    </Provider>
  );
}

export default App;
