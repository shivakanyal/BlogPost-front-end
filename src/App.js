import "./App.css";
import Header from "./components/Header/header";
import AppContainer from "./components/AppContainer/appContainer";
// import { Route, Switch, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Header />
      <AppContainer />
    </div>
  );
}

export default App;
