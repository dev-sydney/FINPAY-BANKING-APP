import './App.scss';
import LeftPaneComponent from './components/panes/LeftPaneComponent';
import RightPaneComponent from './components/panes/RightPaneComponent';

import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <LeftPaneComponent />
        <RightPaneComponent />
      </div>
    </Provider>
  );
}

export default App;
