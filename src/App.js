import "./App.scss";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <div className="app-container">
      <div className="Header-container">
        <Header />
      </div>
      <div className="Main-container">
        <div className="Sidenav-container">
        </div>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
