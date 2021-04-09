import "./App.css";
import Header from "./components/Header/header";
import AppContainer from "./components/AppContainer/appContainer";
import jwtDecode from "jwt-decode";
import React from "react";
class App extends React.Component {
  state = {};

  componentDidMount() {
    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      this.setState({ user, isAuthenticate: true });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="App">
        <Header user={this.state.user} isAuthenticate />
        <AppContainer user={this.state.user} isAuthenticate />
      </div>
    );
  }
}

export default App;
