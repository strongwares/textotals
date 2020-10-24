// import logo from "./logo.svg";
import logo from "./assets/icons/logo.png";
import "./aatapp.css";

function App() {
  return (
    <div className="aatapp-container">
      <header className="aatapp-header">
        <img src={logo} className="aatapp-logo" alt="logo" />
        <p>Action Account Totals</p>
      </header>
    </div>
  );
}

export default App;
