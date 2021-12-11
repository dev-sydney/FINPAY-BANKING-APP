import './App.scss';
import LeftPaneComponent from './components/panes/LeftPaneComponent';
import RightPaneComponent from './components/panes/RightPaneComponent';
function App() {
  return (
    <div className="App">
      <LeftPaneComponent />
      <RightPaneComponent />
    </div>
  );
}

export default App;
