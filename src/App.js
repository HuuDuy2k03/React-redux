import "./App.scss";
import Header from "./components/Header/Header";
import { Link } from "react-router-dom";
const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div>
        test
        <div>
          <button>
            <Link to="/user">go to User page</Link>
          </button>
          <button>
            <Link to="/admin">go to Admin page</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
